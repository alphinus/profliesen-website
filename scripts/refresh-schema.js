/**
 * Aktualisiere Supabase Schema Cache
 */

const { createClient } = require('@supabase/supabase-js');
const https = require('https');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const projectId = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

console.log('🔄 Aktualisiere Schema Cache...\n');

// Methode 1: Triggere Schema-Reload via PostgREST
async function reloadSchema() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: `${projectId}.supabase.co`,
      path: '/rest/v1/',
      method: 'POST',
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('   Response Status:', res.statusCode);
        resolve({ status: res.statusCode, data });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// Methode 2: Force Reconnect via Client
async function forceReconnect() {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Mehrere Queries um Cache zu zwingen
  for (let i = 0; i < 3; i++) {
    await supabase.from('contact_submissions').select('count');
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

async function testCache() {
  console.log('🧪 Teste Schema Cache...\n');

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([{
      name: 'Cache Test',
      email: 'test@test.com',
      message: 'Test'
    }])
    .select();

  if (error) {
    console.log('❌ Cache noch nicht aktualisiert');
    console.log('   Fehler:', error.message);
    console.log('');
    console.log('💡 Warte 30 Sekunden und versuche erneut...');
    return false;
  }

  console.log('✅ Cache aktualisiert!');
  console.log('   INSERT funktioniert');
  console.log('');

  // Cleanup
  if (data?.[0]?.id) {
    await supabase.from('contact_submissions').delete().eq('id', data[0].id);
  }

  return true;
}

async function main() {
  try {
    console.log('Methode 1: Force Reconnect...');
    await forceReconnect();
    console.log('   ✅ Abgeschlossen\n');

    console.log('Methode 2: Schema Reload Request...');
    await reloadSchema();
    console.log('   ✅ Abgeschlossen\n');

    await testCache();

    console.log('═'.repeat(60));
    console.log('Wenn der Test fehlschlägt:');
    console.log('- Warte 30-60 Sekunden');
    console.log('- Führe Script erneut aus: node scripts/refresh-schema.js');
    console.log('═'.repeat(60));

  } catch (err) {
    console.error('❌ Fehler:', err.message);
  }
}

main();
