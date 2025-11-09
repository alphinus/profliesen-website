/**
 * Supabase Setup Script
 * Automatische Konfiguration von Datenbank und Storage
 */

const { createClient } = require('@supabase/supabase-js');

// Env Vars laden
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Fehler: SUPABASE_URL oder ANON_KEY nicht gefunden in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('🚀 Supabase Setup gestartet...\n');

async function testConnection() {
  console.log('1️⃣ Teste Verbindung zu Supabase...');
  try {
    const { data, error } = await supabase.from('contact_submissions').select('count');

    if (error && error.code === '42P01') {
      console.log('   ℹ️  Tabelle existiert noch nicht (erwartet)');
      return true;
    } else if (error) {
      console.log('   ⚠️  Anderer Fehler:', error.message);
      return true; // Verbindung funktioniert aber Tabelle fehlt
    } else {
      console.log('   ✅ Verbindung erfolgreich! Tabelle existiert bereits.');
      return true;
    }
  } catch (err) {
    console.error('   ❌ Verbindung fehlgeschlagen:', err.message);
    return false;
  }
}

async function createTable() {
  console.log('\n2️⃣ Erstelle Datenbank-Tabelle...');
  console.log('   ⚠️  SQL muss manuell im Supabase Dashboard ausgeführt werden!');
  console.log('\n   📋 Gehe zu: https://app.supabase.com → SQL Editor');
  console.log('   📋 Führe folgendes SQL aus:\n');

  const sql = `
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

-- RLS (Row Level Security) aktivieren
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Jeder kann Submissions erstellen
DROP POLICY IF EXISTS "Anyone can insert submissions" ON contact_submissions;
CREATE POLICY "Anyone can insert submissions"
  ON contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Policy: Jeder kann lesen (später mit Auth einschränken)
DROP POLICY IF EXISTS "Anyone can read submissions" ON contact_submissions;
CREATE POLICY "Anyone can read submissions"
  ON contact_submissions
  FOR SELECT
  USING (true);

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
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();
`;

  console.log(sql);
  console.log('\n   ⏸️  Nach Ausführung im Dashboard, drücke Enter...');
}

async function checkTable() {
  console.log('\n3️⃣ Prüfe ob Tabelle erstellt wurde...');
  try {
    const { data, error } = await supabase.from('contact_submissions').select('count');

    if (error) {
      console.log('   ❌ Tabelle wurde noch nicht erstellt!');
      console.log('   ℹ️  Fehler:', error.message);
      return false;
    } else {
      console.log('   ✅ Tabelle erfolgreich erstellt!');
      return true;
    }
  } catch (err) {
    console.log('   ❌ Fehler beim Prüfen:', err.message);
    return false;
  }
}

async function createStorageBucket() {
  console.log('\n4️⃣ Erstelle Storage Bucket "uploads"...');
  console.log('   ⚠️  Storage muss manuell im Supabase Dashboard erstellt werden!');
  console.log('\n   📋 Gehe zu: https://app.supabase.com → Storage');
  console.log('   📋 Schritte:');
  console.log('   1. Klicke "Create a new bucket"');
  console.log('   2. Name: uploads');
  console.log('   3. Public bucket: ✅ Ja (aktivieren)');
  console.log('   4. Klicke "Create bucket"');
  console.log('\n   📋 Dann erstelle Storage Policies (im SQL Editor):\n');

  const storageSql = `
-- Policy: Jeder kann Bilder hochladen
INSERT INTO storage.policies (name, bucket_id, definition)
VALUES (
  'Anyone can upload images',
  'uploads',
  '(bucket_id = ''uploads''::text)'
)
ON CONFLICT DO NOTHING;

-- Policy: Jeder kann Bilder lesen
INSERT INTO storage.policies (name, bucket_id, definition, command)
VALUES (
  'Anyone can read images',
  'uploads',
  '(bucket_id = ''uploads''::text)',
  'SELECT'
)
ON CONFLICT DO NOTHING;
`;

  console.log(storageSql);
  console.log('\n   ⏸️  Nach Erstellung des Buckets, drücke Enter...');
}

async function checkStorage() {
  console.log('\n5️⃣ Prüfe Storage Bucket...');
  try {
    const { data, error } = await supabase.storage.listBuckets();

    if (error) {
      console.log('   ❌ Fehler beim Abrufen der Buckets:', error.message);
      return false;
    }

    const uploadsBucket = data?.find(b => b.name === 'uploads');
    if (uploadsBucket) {
      console.log('   ✅ Storage Bucket "uploads" existiert!');
      console.log('   ℹ️  Public:', uploadsBucket.public ? 'Ja ✅' : 'Nein ❌');
      return true;
    } else {
      console.log('   ❌ Storage Bucket "uploads" wurde noch nicht erstellt!');
      return false;
    }
  } catch (err) {
    console.log('   ❌ Fehler:', err.message);
    return false;
  }
}

async function testUpload() {
  console.log('\n6️⃣ Teste Upload-Funktionalität...');
  try {
    // Erstelle Test-File
    const testContent = 'Test Upload';
    const blob = new Blob([testContent], { type: 'text/plain' });
    const testFile = new File([blob], 'test.txt');

    const fileName = `test-${Date.now()}.txt`;
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(`test/${fileName}`, testFile);

    if (error) {
      console.log('   ❌ Upload fehlgeschlagen:', error.message);
      return false;
    } else {
      console.log('   ✅ Upload erfolgreich!');
      console.log('   ℹ️  Pfad:', data.path);

      // Cleanup
      await supabase.storage.from('uploads').remove([`test/${fileName}`]);
      return true;
    }
  } catch (err) {
    console.log('   ❌ Fehler:', err.message);
    return false;
  }
}

async function main() {
  const connectionOk = await testConnection();

  if (!connectionOk) {
    console.log('\n❌ Setup abgebrochen - Verbindung fehlgeschlagen!');
    console.log('ℹ️  Prüfe deine .env.local Datei');
    process.exit(1);
  }

  // Pause für manuelle SQL-Ausführung
  await createTable();

  // Warte auf Enter
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  await new Promise(resolve => rl.question('', resolve));
  rl.close();

  const tableOk = await checkTable();

  if (!tableOk) {
    console.log('\n⚠️  Bitte führe das SQL im Dashboard aus und starte das Script erneut.');
    process.exit(1);
  }

  // Storage Setup
  await createStorageBucket();

  const rl2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  await new Promise(resolve => rl2.question('', resolve));
  rl2.close();

  const storageOk = await checkStorage();

  if (storageOk) {
    await testUpload();
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Supabase Setup abgeschlossen!');
  console.log('='.repeat(60));
  console.log('\n📋 Nächste Schritte:');
  console.log('   1. Starte Dev Server: npm run dev');
  console.log('   2. Öffne: http://localhost:3000/kontakt');
  console.log('   3. Teste das Kontaktformular');
  console.log('   4. Prüfe Submissions im Supabase Dashboard → Table Editor\n');
}

main().catch(console.error);
