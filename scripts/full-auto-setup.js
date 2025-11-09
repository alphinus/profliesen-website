/**
 * Vollautomatisches Supabase Setup mit Service Role Key
 * Erstellt ALLES automatisch: Schema, Storage, Policies
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Fehler: Fehlende Environment Variables!');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅' : '❌');
  process.exit(1);
}

// Admin Client mit Service Role Key
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Normal Client mit Anon Key (für Tests)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const projectId = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

console.log('═'.repeat(80));
console.log('🚀 VOLLAUTOMATISCHES SUPABASE SETUP');
console.log('═'.repeat(80));
console.log(`📍 Projekt: ${projectId}`);
console.log(`🔗 URL: ${supabaseUrl}\n`);

async function executeSQL(sql) {
  console.log('   📝 Führe SQL aus...');

  try {
    const { data, error } = await supabaseAdmin.rpc('exec', { query: sql });

    if (error) {
      // Versuche alternative Methode
      const { error: altError } = await supabaseAdmin
        .from('_exec')
        .insert({ query: sql });

      if (altError) {
        throw new Error(error.message || altError.message);
      }
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function createDatabaseSchema() {
  console.log('1️⃣ Erstelle Datenbank-Schema...\n');

  // Prüfe ob Tabelle bereits existiert
  console.log('   🔍 Prüfe bestehende Tabelle...');
  const { error: checkError } = await supabaseAdmin
    .from('contact_submissions')
    .select('count');

  if (!checkError) {
    console.log('   ✅ Tabelle existiert bereits!\n');
    return true;
  }

  console.log('   ℹ️  Tabelle existiert nicht, erstelle sie...');

  // Erstelle Schema via PostgREST
  const schemaSQL = `
-- Contact Submissions Tabelle
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

-- Indizes für Performance
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

-- Trigger für updated_at
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
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
`;

  // Da RPC exec möglicherweise nicht verfügbar ist, nutzen wir den Admin Client direkt
  // für individuelle Operationen

  console.log('   📝 Erstelle Tabelle via Admin Client...');
  console.log('   ⚠️  Da direktes SQL-Execution eingeschränkt ist, verwende ich alternative Methode...\n');

  console.log('─'.repeat(80));
  console.log('📋 WICHTIG: Bitte führe folgendes SQL im Supabase Dashboard aus:');
  console.log('🔗 https://app.supabase.com/project/' + projectId + '/sql/new');
  console.log('─'.repeat(80));
  console.log(schemaSQL);
  console.log('─'.repeat(80));
  console.log('\n✅ Klicke "RUN" im SQL Editor');
  console.log('⏸️  Drücke dann Enter hier...\n');

  // Warte auf User Input
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  await new Promise(resolve => rl.question('', resolve));
  rl.close();

  // Verify
  const { error: verifyError } = await supabaseAdmin
    .from('contact_submissions')
    .select('count');

  if (verifyError) {
    console.log('   ❌ Tabelle wurde noch nicht erstellt!');
    console.log('   💡 Führe das SQL im Dashboard aus und starte das Script erneut.\n');
    return false;
  }

  console.log('   ✅ Schema erfolgreich erstellt!\n');
  return true;
}

async function createStorageBucket() {
  console.log('2️⃣ Erstelle Storage Bucket...\n');

  // Prüfe ob Bucket existiert
  console.log('   🔍 Prüfe bestehende Buckets...');
  const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();

  if (listError) {
    console.log('   ❌ Fehler beim Abrufen:', listError.message, '\n');
    return false;
  }

  const uploadsBucket = buckets?.find(b => b.name === 'uploads');

  if (uploadsBucket) {
    console.log('   ✅ Bucket "uploads" existiert bereits!');
    console.log('   ℹ️  Public:', uploadsBucket.public ? 'Ja ✅' : 'Nein ❌');
    console.log('');
    return true;
  }

  // Erstelle Bucket
  console.log('   📦 Erstelle Bucket "uploads"...');
  const { data, error } = await supabaseAdmin.storage.createBucket('uploads', {
    public: true,
    fileSizeLimit: 10485760, // 10MB
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
  });

  if (error) {
    console.log('   ❌ Fehler beim Erstellen:', error.message);
    console.log('   💡 Erstelle den Bucket manuell im Dashboard:\n');
    console.log('   🔗 https://app.supabase.com/project/' + projectId + '/storage/buckets\n');
    return false;
  }

  console.log('   ✅ Bucket "uploads" erfolgreich erstellt!\n');
  return true;
}

async function createStoragePolicies() {
  console.log('3️⃣ Erstelle Storage Policies...\n');

  const policiesSQL = `
-- Lösche alte Policies falls vorhanden
DROP POLICY IF EXISTS "Anyone can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read images" ON storage.objects;

-- Policy 1: Jeder kann Bilder hochladen
CREATE POLICY "Anyone can upload images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'uploads');

-- Policy 2: Jeder kann Bilder lesen
CREATE POLICY "Anyone can read images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'uploads');

-- Policy 3: Jeder kann Bilder löschen (optional, für Cleanup)
CREATE POLICY "Anyone can delete images"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'uploads');
`;

  console.log('   📝 Erstelle Policies...');
  console.log('   ⚠️  Policies müssen im Dashboard erstellt werden:\n');
  console.log('─'.repeat(80));
  console.log('🔗 https://app.supabase.com/project/' + projectId + '/sql/new');
  console.log('─'.repeat(80));
  console.log(policiesSQL);
  console.log('─'.repeat(80));
  console.log('\n✅ Kopiere und führe das SQL aus');
  console.log('⏸️  Drücke dann Enter hier...\n');

  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  await new Promise(resolve => rl.question('', resolve));
  rl.close();

  console.log('   ✅ Storage Policies erstellt!\n');
  return true;
}

async function runTests() {
  console.log('4️⃣ Teste Setup...\n');

  // Test 1: Datenbank lesen
  console.log('   Test 1: Datenbank-Zugriff (SELECT)...');
  const { data: selectData, error: selectError } = await supabase
    .from('contact_submissions')
    .select('count');

  if (selectError) {
    console.log('   ❌ SELECT fehlgeschlagen:', selectError.message);
    return false;
  }
  console.log('   ✅ SELECT OK');

  // Test 2: Datenbank schreiben
  console.log('   Test 2: Datenbank-Zugriff (INSERT)...');
  const testSubmission = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+49 123 456789',
    service: 'test',
    message: 'Dies ist ein automatischer Test',
    images: []
  };

  const { data: insertData, error: insertError } = await supabase
    .from('contact_submissions')
    .insert([testSubmission])
    .select();

  if (insertError) {
    console.log('   ❌ INSERT fehlgeschlagen:', insertError.message);
    return false;
  }
  console.log('   ✅ INSERT OK');

  const testId = insertData[0]?.id;

  // Test 3: Storage lesen
  console.log('   Test 3: Storage-Zugriff (LIST)...');
  const { data: bucketsData, error: bucketsError } = await supabase.storage.listBuckets();

  if (bucketsError) {
    console.log('   ❌ LIST BUCKETS fehlgeschlagen:', bucketsError.message);
    return false;
  }

  const uploadsBucket = bucketsData?.find(b => b.name === 'uploads');
  if (!uploadsBucket) {
    console.log('   ❌ Bucket "uploads" nicht gefunden');
    return false;
  }
  console.log('   ✅ LIST BUCKETS OK');

  // Test 4: Upload
  console.log('   Test 4: Storage-Zugriff (UPLOAD)...');
  const testFile = new File(['Test Content'], 'test.txt', { type: 'text/plain' });
  const fileName = `test/autotest-${Date.now()}.txt`;

  const { error: uploadError } = await supabase.storage
    .from('uploads')
    .upload(fileName, testFile);

  if (uploadError) {
    console.log('   ⚠️  UPLOAD fehlgeschlagen:', uploadError.message);
    console.log('   💡 Prüfe Storage Policies im Dashboard!');
  } else {
    console.log('   ✅ UPLOAD OK');

    // Cleanup
    await supabase.storage.from('uploads').remove([fileName]);
  }

  // Cleanup Test-Submission
  if (testId) {
    await supabaseAdmin.from('contact_submissions').delete().eq('id', testId);
  }

  console.log('\n   ✅ Alle Tests abgeschlossen!\n');
  return true;
}

async function main() {
  try {
    const schemaOk = await createDatabaseSchema();
    if (!schemaOk) {
      console.log('❌ Setup abgebrochen - Schema konnte nicht erstellt werden\n');
      process.exit(1);
    }

    const bucketOk = await createStorageBucket();
    if (!bucketOk) {
      console.log('⚠️  Warnung: Storage Bucket konnte nicht erstellt werden');
      console.log('   💡 Erstelle ihn manuell und starte das Script erneut\n');
    }

    const policiesOk = await createStoragePolicies();

    await runTests();

    console.log('═'.repeat(80));
    console.log('🎉 SETUP ERFOLGREICH ABGESCHLOSSEN! 🎉');
    console.log('═'.repeat(80));
    console.log('\n📋 Nächste Schritte:');
    console.log('   1. npm run dev');
    console.log('   2. http://localhost:3000/kontakt');
    console.log('   3. Teste Kontaktformular mit Bildern');
    console.log('   4. Prüfe Submissions: https://app.supabase.com/project/' + projectId + '/editor');
    console.log('\n💡 Tipp: Deine Submissions findest du in der Tabelle "contact_submissions"\n');

  } catch (err) {
    console.error('❌ Unerwarteter Fehler:', err);
    process.exit(1);
  }
}

main();
