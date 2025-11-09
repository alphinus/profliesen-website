/**
 * Prüfe Supabase Setup Status
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function checkTable() {
  console.log('🔍 Prüfe Datenbank-Tabelle...\n');

  try {
    // Versuche Tabelle zu lesen
    const { data, error, count } = await supabaseAdmin
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.log('❌ Tabelle existiert NICHT');
      console.log('   Fehler:', error.message);
      console.log('   Code:', error.code);
      console.log('');

      if (error.code === '42P01' || error.message.includes('does not exist')) {
        console.log('💡 Lösung: SQL wurde nicht erfolgreich ausgeführt!');
        console.log('   Versuche nochmal im SQL Editor:');
        console.log('   1. Öffne: https://app.supabase.com/project/ribcbajrgmmxjidemyvj/sql/new');
        console.log('   2. Stelle sicher dass das GANZE SQL kopiert wurde');
        console.log('   3. Klicke RUN');
        console.log('   4. Prüfe auf Fehlermeldungen (rot)');
      }

      return false;
    }

    console.log('✅ Tabelle "contact_submissions" existiert!');
    console.log('   Anzahl Einträge:', count || 0);
    console.log('');
    return true;

  } catch (err) {
    console.log('❌ Fehler beim Prüfen:', err.message);
    return false;
  }
}

async function checkStorage() {
  console.log('🔍 Prüfe Storage Buckets...\n');

  try {
    const { data: buckets, error } = await supabaseAdmin.storage.listBuckets();

    if (error) {
      console.log('❌ Fehler beim Abrufen:', error.message);
      return false;
    }

    console.log('📦 Gefundene Buckets:', buckets.length);
    buckets.forEach(bucket => {
      console.log(`   - ${bucket.name} (${bucket.public ? 'Public ✅' : 'Private ❌'})`);
    });
    console.log('');

    const uploadsBucket = buckets.find(b => b.name === 'uploads');

    if (!uploadsBucket) {
      console.log('❌ Bucket "uploads" existiert NICHT');
      console.log('');
      console.log('💡 Lösung:');
      console.log('   1. Öffne: https://app.supabase.com/project/ribcbajrgmmxjidemyvj/storage/buckets');
      console.log('   2. Klicke "New bucket"');
      console.log('   3. Name: uploads');
      console.log('   4. Public bucket: ✅ Aktivieren');
      console.log('   5. Klicke "Create bucket"');
      console.log('');
      return false;
    }

    console.log('✅ Bucket "uploads" existiert!');
    console.log('   Public:', uploadsBucket.public ? 'Ja ✅' : 'Nein ❌');
    console.log('');

    if (!uploadsBucket.public) {
      console.log('⚠️  Bucket ist NICHT public!');
      console.log('   Uploads werden fehlschlagen.');
      console.log('   Ändere Bucket zu "public" im Dashboard.');
      console.log('');
    }

    return true;

  } catch (err) {
    console.log('❌ Fehler:', err.message);
    return false;
  }
}

async function testInsert() {
  console.log('🧪 Teste INSERT in Datenbank...\n');

  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'Automatischer Test'
    };

    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .insert([testData])
      .select();

    if (error) {
      console.log('❌ INSERT fehlgeschlagen:', error.message);
      return false;
    }

    console.log('✅ INSERT erfolgreich!');
    console.log('   ID:', data[0].id);
    console.log('');

    // Cleanup
    await supabaseAdmin
      .from('contact_submissions')
      .delete()
      .eq('id', data[0].id);

    console.log('   ✅ Test-Eintrag gelöscht');
    console.log('');

    return true;

  } catch (err) {
    console.log('❌ Fehler:', err.message);
    return false;
  }
}

async function main() {
  console.log('═'.repeat(80));
  console.log('🔧 SUPABASE STATUS CHECK');
  console.log('═'.repeat(80));
  console.log('');

  const tableOk = await checkTable();
  const storageOk = await checkStorage();

  if (tableOk) {
    await testInsert();
  }

  console.log('═'.repeat(80));
  console.log('📊 ZUSAMMENFASSUNG');
  console.log('═'.repeat(80));
  console.log('');
  console.log('Datenbank-Tabelle:', tableOk ? '✅ OK' : '❌ FEHLT');
  console.log('Storage Bucket:   ', storageOk ? '✅ OK' : '❌ FEHLT');
  console.log('');

  if (tableOk && storageOk) {
    console.log('🎉 SETUP KOMPLETT! 🎉');
    console.log('');
    console.log('Starte Dev Server: npm run dev');
    console.log('Öffne: http://localhost:3000/kontakt');
    console.log('');
  } else {
    console.log('⚠️  SETUP UNVOLLSTÄNDIG');
    console.log('Folge den Anweisungen oben.');
    console.log('');
  }
}

main().catch(console.error);
