/**
 * Test Upload mit Anon Key (wie im Browser)
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('🧪 Test Upload (wie im Browser)\n');

async function testUpload() {
  // Erstelle Test-Datei
  const testContent = 'Test Upload Content';
  const testFile = new File([testContent], 'test-image.txt', { type: 'text/plain' });
  const fileName = `contact-images/test-${Date.now()}.txt`;

  console.log('📤 Uploade Test-Datei...');
  console.log('   Datei:', fileName);

  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(fileName, testFile);

  if (error) {
    console.log('❌ Upload fehlgeschlagen!');
    console.log('   Fehler:', error.message);
    console.log('   Code:', error.statusCode);
    console.log('');
    console.log('💡 Mögliche Ursachen:');
    console.log('   1. Storage Policies nicht gesetzt');
    console.log('   2. Bucket ist nicht public');
    console.log('   3. Bucket existiert nicht');
    return false;
  }

  console.log('✅ Upload erfolgreich!');
  console.log('   Path:', data.path);
  console.log('');

  // Hole Public URL
  const { data: urlData } = supabase.storage
    .from('uploads')
    .getPublicUrl(fileName);

  console.log('🔗 Public URL:');
  console.log('   ', urlData.publicUrl);
  console.log('');

  // Cleanup
  console.log('🗑️  Lösche Test-Datei...');
  const { error: deleteError } = await supabase.storage
    .from('uploads')
    .remove([fileName]);

  if (deleteError) {
    console.log('⚠️  Löschen fehlgeschlagen:', deleteError.message);
  } else {
    console.log('✅ Test-Datei gelöscht');
  }

  return true;
}

testUpload().then(success => {
  console.log('');
  console.log('═'.repeat(60));
  if (success) {
    console.log('🎉 IMAGE UPLOAD FUNKTIONIERT! 🎉');
    console.log('');
    console.log('Das Kontaktformular ist bereit zum Testen!');
  } else {
    console.log('❌ IMAGE UPLOAD FEHLGESCHLAGEN');
    console.log('');
    console.log('Prüfe Storage Policies im Supabase Dashboard:');
    console.log('https://app.supabase.com/project/ribcbajrgmmxjidemyvj/storage/policies');
  }
  console.log('═'.repeat(60));
  console.log('');
});
