/**
 * Finaler Test - Alle Features
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('═'.repeat(80));
console.log('🧪 FINALER SETUP TEST');
console.log('═'.repeat(80));
console.log('');

async function testDatabase() {
  console.log('1️⃣ Teste Datenbank...');

  // Test INSERT
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([{
      name: 'Final Test',
      email: 'test@profliesen.de',
      phone: '+49 123 456789',
      service: 'fliesen',
      message: 'Dies ist ein automatischer Final-Test',
      images: []
    }])
    .select();

  if (error) {
    console.log('   ❌ FEHLER:', error.message);
    return false;
  }

  console.log('   ✅ INSERT funktioniert');

  // Test SELECT
  const { data: allData, error: selectError } = await supabase
    .from('contact_submissions')
    .select('*')
    .limit(5);

  if (selectError) {
    console.log('   ❌ SELECT FEHLER:', selectError.message);
    return false;
  }

  console.log('   ✅ SELECT funktioniert');
  console.log('   ℹ️  Einträge in DB:', allData.length);

  // Cleanup
  if (data?.[0]?.id) {
    await supabase.from('contact_submissions').delete().eq('id', data[0].id);
    console.log('   ✅ Test-Eintrag gelöscht');
  }

  console.log('');
  return true;
}

async function testStorage() {
  console.log('2️⃣ Teste Storage...');

  // Test List Buckets
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();

  if (listError) {
    console.log('   ❌ LIST FEHLER:', listError.message);
    return false;
  }

  const uploadsBucket = buckets.find(b => b.name === 'uploads');
  if (!uploadsBucket) {
    console.log('   ❌ Bucket "uploads" nicht gefunden');
    return false;
  }

  console.log('   ✅ Bucket existiert');
  console.log('   ℹ️  Public:', uploadsBucket.public ? 'Ja' : 'Nein');

  // Test Upload
  const testContent = 'Final Test Upload';
  const testFile = new File([testContent], 'final-test.txt', { type: 'text/plain' });
  const fileName = `test/final-${Date.now()}.txt`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('uploads')
    .upload(fileName, testFile);

  if (uploadError) {
    console.log('   ❌ UPLOAD FEHLER:', uploadError.message);
    return false;
  }

  console.log('   ✅ Upload funktioniert');

  // Test Public URL
  const { data: urlData } = supabase.storage
    .from('uploads')
    .getPublicUrl(fileName);

  console.log('   ✅ Public URL:', urlData.publicUrl);

  // Cleanup
  await supabase.storage.from('uploads').remove([fileName]);
  console.log('   ✅ Test-Datei gelöscht');

  console.log('');
  return true;
}

async function main() {
  const dbOk = await testDatabase();
  const storageOk = await testStorage();

  console.log('═'.repeat(80));
  console.log('📊 ERGEBNIS');
  console.log('═'.repeat(80));
  console.log('');
  console.log('Datenbank: ', dbOk ? '✅ Funktioniert' : '❌ Fehler');
  console.log('Storage:   ', storageOk ? '✅ Funktioniert' : '❌ Fehler');
  console.log('');

  if (dbOk && storageOk) {
    console.log('🎉 ALLE TESTS ERFOLGREICH! 🎉');
    console.log('');
    console.log('🚀 Nächste Schritte:');
    console.log('   1. npm run dev');
    console.log('   2. Öffne: http://localhost:3000/kontakt');
    console.log('   3. Teste das Kontaktformular mit Bild-Upload');
    console.log('   4. Prüfe Submissions im Supabase Dashboard');
    console.log('');
  } else {
    console.log('❌ EINIGE TESTS SIND FEHLGESCHLAGEN');
    console.log('   Prüfe die Fehlermeldungen oben.');
    console.log('');
  }
}

main().catch(console.error);
