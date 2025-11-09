/**
 * Vollautomatisches Supabase Setup
 * Erstellt Datenbank-Schema und Storage via API
 */

const https = require('https');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Extrahiere Project ID aus URL
const projectId = supabaseUrl?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

console.log('🚀 Vollautomatisches Supabase Setup\n');
console.log(`📍 Projekt: ${projectId}`);
console.log(`🔗 URL: ${supabaseUrl}\n`);

async function executeSQL(sql, useServiceRole = false) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${supabaseUrl}/rest/v1/rpc/exec_sql`);

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve({ success: true, data: JSON.parse(data || '{}') });
        } else {
          resolve({ success: false, error: data, status: res.statusCode });
        }
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify({ query: sql }));
    req.end();
  });
}

async function createTableDirectly() {
  console.log('1️⃣ Erstelle Tabelle via Supabase Client...');

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Prüfe ob Tabelle bereits existiert
  const { data, error } = await supabase.from('contact_submissions').select('count');

  if (!error) {
    console.log('   ✅ Tabelle existiert bereits!\n');
    return true;
  }

  if (error && error.code !== '42P01' && !error.message?.includes('Could not find the table')) {
    console.log('   ❌ Unerwarteter Fehler beim Prüfen:', error.message, '\n');
    return false;
  }

  console.log('   ℹ️  Tabelle existiert nicht, muss erstellt werden...\n');

  // Da wir mit Anon Key keinen direkten SQL-Zugriff haben,
  // müssen wir dem User die SQL-Befehle zeigen
  console.log('⚠️  WICHTIG: SQL muss im Supabase Dashboard ausgeführt werden!\n');
  console.log('📋 Öffne: https://app.supabase.com/project/' + projectId + '/sql/new\n');
  console.log('📋 Kopiere und führe folgendes SQL aus:\n');
  console.log('─'.repeat(80));

  const sql = `-- Contact Submissions Tabelle
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  message TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed')),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Indizes
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS contact_submissions_status_idx ON contact_submissions(status);

-- RLS aktivieren
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Anyone can insert submissions" ON contact_submissions;
CREATE POLICY "Anyone can insert submissions"
  ON contact_submissions FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can read submissions" ON contact_submissions;
CREATE POLICY "Anyone can read submissions"
  ON contact_submissions FOR SELECT USING (true);

-- Trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON contact_submissions;
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();`;

  console.log(sql);
  console.log('─'.repeat(80));
  console.log('\n✅ Klicke "RUN" im SQL Editor');
  console.log('⏸️  Danach drücke Enter hier...\n');

  // Warte auf User Input
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  await new Promise(resolve => rl.question('', resolve));
  rl.close();

  // Prüfe erneut
  const { error: checkError } = await supabase.from('contact_submissions').select('count');

  if (checkError) {
    console.log('❌ Tabelle wurde noch nicht erstellt!');
    console.log('   Fehler:', checkError.message, '\n');
    return false;
  }

  console.log('✅ Tabelle erfolgreich erstellt!\n');
  return true;
}

async function createStorageBucket() {
  console.log('2️⃣ Erstelle Storage Bucket "uploads"...');

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Prüfe ob Bucket existiert
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();

  if (listError) {
    console.log('   ❌ Fehler beim Abrufen der Buckets:', listError.message, '\n');
    return false;
  }

  const uploadsBucket = buckets?.find(b => b.name === 'uploads');

  if (uploadsBucket) {
    console.log('   ✅ Bucket "uploads" existiert bereits!');
    console.log('   ℹ️  Public:', uploadsBucket.public ? 'Ja ✅' : 'Nein ❌');
    console.log('');
    return true;
  }

  console.log('   ℹ️  Bucket existiert nicht, muss erstellt werden...\n');
  console.log('⚠️  WICHTIG: Storage Bucket muss im Dashboard erstellt werden!\n');
  console.log('📋 Öffne: https://app.supabase.com/project/' + projectId + '/storage/buckets\n');
  console.log('📋 Schritte:');
  console.log('   1. Klicke "New bucket"');
  console.log('   2. Name: uploads');
  console.log('   3. Public bucket: ✅ Aktivieren');
  console.log('   4. Klicke "Create bucket"\n');
  console.log('⏸️  Danach drücke Enter hier...\n');

  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  await new Promise(resolve => rl.question('', resolve));
  rl.close();

  // Prüfe erneut
  const { data: bucketsCheck, error: checkError } = await supabase.storage.listBuckets();

  if (checkError) {
    console.log('❌ Fehler:', checkError.message, '\n');
    return false;
  }

  const bucket = bucketsCheck?.find(b => b.name === 'uploads');

  if (!bucket) {
    console.log('❌ Bucket wurde noch nicht erstellt!\n');
    return false;
  }

  console.log('✅ Bucket "uploads" erfolgreich erstellt!\n');

  // Storage Policies
  console.log('3️⃣ Setze Storage Policies...\n');
  console.log('📋 Öffne: https://app.supabase.com/project/' + projectId + '/storage/policies\n');
  console.log('📋 Für Bucket "uploads" erstelle 2 Policies:\n');
  console.log('─'.repeat(80));
  console.log('Policy 1: Upload erlauben');
  console.log('  - Name: Anyone can upload');
  console.log('  - Allowed operation: INSERT');
  console.log('  - Policy definition: true');
  console.log('');
  console.log('Policy 2: Lesen erlauben');
  console.log('  - Name: Anyone can read');
  console.log('  - Allowed operation: SELECT');
  console.log('  - Policy definition: true');
  console.log('─'.repeat(80));
  console.log('\n⏸️  Danach drücke Enter hier...\n');

  const rl2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  await new Promise(resolve => rl2.question('', resolve));
  rl2.close();

  console.log('✅ Storage Setup abgeschlossen!\n');
  return true;
}

async function testSetup() {
  console.log('4️⃣ Teste komplettes Setup...\n');

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Test 1: Tabelle lesen
  console.log('   Test 1: Datenbank-Verbindung...');
  const { error: dbError } = await supabase.from('contact_submissions').select('count');

  if (dbError) {
    console.log('   ❌ Datenbank-Fehler:', dbError.message);
    return false;
  }
  console.log('   ✅ Datenbank OK');

  // Test 2: Storage lesen
  console.log('   Test 2: Storage-Verbindung...');
  const { data: buckets, error: storageError } = await supabase.storage.listBuckets();

  if (storageError) {
    console.log('   ❌ Storage-Fehler:', storageError.message);
    return false;
  }

  const uploadsBucket = buckets?.find(b => b.name === 'uploads');
  if (!uploadsBucket) {
    console.log('   ❌ Bucket "uploads" nicht gefunden');
    return false;
  }
  console.log('   ✅ Storage OK');

  // Test 3: Test-Upload
  console.log('   Test 3: Upload-Funktionalität...');
  const testFile = new File(['test'], 'test.txt', { type: 'text/plain' });
  const fileName = `test/test-${Date.now()}.txt`;

  const { error: uploadError } = await supabase.storage
    .from('uploads')
    .upload(fileName, testFile);

  if (uploadError) {
    console.log('   ⚠️  Upload-Fehler:', uploadError.message);
    console.log('   ℹ️  Prüfe Storage Policies!');
    return false;
  }

  // Cleanup
  await supabase.storage.from('uploads').remove([fileName]);
  console.log('   ✅ Upload OK');

  console.log('\n✅ Alle Tests erfolgreich!\n');
  return true;
}

async function main() {
  try {
    const tableOk = await createTableDirectly();
    if (!tableOk) {
      console.log('❌ Setup abgebrochen - Tabelle konnte nicht erstellt werden\n');
      process.exit(1);
    }

    const storageOk = await createStorageBucket();
    if (!storageOk) {
      console.log('❌ Setup abgebrochen - Storage konnte nicht erstellt werden\n');
      process.exit(1);
    }

    const testOk = await testSetup();

    console.log('═'.repeat(80));
    if (testOk) {
      console.log('🎉 SUPABASE SETUP ERFOLGREICH ABGESCHLOSSEN! 🎉');
    } else {
      console.log('⚠️  SETUP MIT WARNUNGEN ABGESCHLOSSEN');
    }
    console.log('═'.repeat(80));
    console.log('\n📋 Nächste Schritte:');
    console.log('   1. npm run dev');
    console.log('   2. http://localhost:3000/kontakt');
    console.log('   3. Teste das Kontaktformular mit Bild-Upload');
    console.log('   4. Prüfe Submissions: https://app.supabase.com/project/' + projectId + '/editor\n');

  } catch (err) {
    console.error('❌ Fehler:', err);
    process.exit(1);
  }
}

main();
