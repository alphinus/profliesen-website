# 🗄️ Supabase Setup Guide

## Was ist Supabase?
Supabase ist ein Open-Source Backend-as-a-Service (wie Firebase) mit PostgreSQL Datenbank, Storage und Auth.

## 🚀 Quick Setup (5 Minuten)

### Schritt 1: Supabase Account erstellen
1. Gehe zu: **https://supabase.com**
2. Klicke "Start your project"
3. Login mit GitHub (nutzt dein alphinus Account)

### Schritt 2: Neues Projekt erstellen
1. Klicke "New Project"
2. **Name**: `profliesen-website`
3. **Database Password**: Generiere sicheres Passwort (wird automatisch gespeichert)
4. **Region**: `Europe (Frankfurt)` (näher = schneller)
5. Klicke "Create new project"
6. ⏱️ Warte 2-3 Minuten...

### Schritt 3: API Keys kopieren
Nach Projekt-Erstellung:
1. Gehe zu: **Settings → API**
2. Kopiere:
   - **Project URL** (z.B. `https://xyz.supabase.co`)
   - **anon/public key** (langer String)

### Schritt 4: Environment Variables erstellen

**Lokal (.env.local):**
```bash
# Erstelle Datei im Projektordner
cd /Users/mg1/handwerker-website

# Füge diese Zeilen ein (mit deinen Werten):
NEXT_PUBLIC_SUPABASE_URL=https://dein-projekt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dein-anon-key-hier
```

**Auf Vercel:**
1. Gehe zu Vercel Dashboard → Settings → Environment Variables
2. Füge hinzu:
   - `NEXT_PUBLIC_SUPABASE_URL`: Deine Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Dein Anon Key
3. Klicke "Save"
4. Redeploy triggern

---

## 📊 Datenbank Setup

### Schritt 5: Tabelle erstellen
1. In Supabase Dashboard → **SQL Editor**
2. Führe dieses SQL aus:

```sql
-- Contact Submissions Tabelle
CREATE TABLE contact_submissions (
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

-- Index für Performance
CREATE INDEX contact_submissions_created_at_idx ON contact_submissions(created_at DESC);
CREATE INDEX contact_submissions_status_idx ON contact_submissions(status);

-- RLS (Row Level Security) - Wichtig!
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Jeder kann Submissions erstellen
CREATE POLICY "Anyone can insert submissions"
  ON contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Policy: Nur Admins können lesen (später mit Auth)
CREATE POLICY "Admins can read all submissions"
  ON contact_submissions
  FOR SELECT
  USING (true); -- TODO: Später mit Auth beschränken

-- Trigger für updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();
```

### Schritt 6: Storage Bucket erstellen
1. In Supabase Dashboard → **Storage**
2. Klicke "Create a new bucket"
3. **Name**: `uploads`
4. **Public bucket**: ✅ Ja (für Bilder)
5. Klicke "Create bucket"

### Schritt 7: Storage Policy setzen
Im **uploads** Bucket → Policies:

```sql
-- Policy: Jeder kann Bilder hochladen
CREATE POLICY "Anyone can upload images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'uploads');

-- Policy: Jeder kann Bilder lesen
CREATE POLICY "Anyone can read images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'uploads');
```

---

## ✅ Setup Testen

### Test 1: Datenbank Connection
```typescript
// Test in Browser Console auf localhost:3000
import { supabase } from '@/lib/supabase';

const { data, error } = await supabase
  .from('contact_submissions')
  .select('count');

console.log(data); // Sollte {count: 0} zurückgeben
```

### Test 2: Contact Form
1. Gehe zu: `http://localhost:3000/kontakt`
2. Fülle Formular aus
3. Optional: Bilder hochladen
4. Submit

### Test 3: Daten prüfen
1. Supabase Dashboard → Table Editor
2. Öffne `contact_submissions`
3. Deine Test-Submission sollte erscheinen!

---

## 📊 Submissions verwalten

### Alle Submissions anzeigen
Supabase Dashboard → **Table Editor** → `contact_submissions`

### Mit SQL abfragen
```sql
-- Alle neuen Submissions
SELECT * FROM contact_submissions
WHERE status = 'new'
ORDER BY created_at DESC;

-- Zähle Submissions nach Status
SELECT status, COUNT(*) as count
FROM contact_submissions
GROUP BY status;

-- Submissions der letzten 7 Tage
SELECT *
FROM contact_submissions
WHERE created_at > now() - interval '7 days'
ORDER BY created_at DESC;
```

### Export zu CSV
1. Table Editor → `contact_submissions`
2. Klicke "⋮" → "Download as CSV"

---

## 🔒 Sicherheit

### Row Level Security (RLS)
✅ **Bereits aktiviert**

Aktuelle Policies:
- ✅ Jeder kann Submissions erstellen
- ⚠️ Jeder kann Submissions lesen (später mit Auth ändern)

### Für Production (später):
```sql
-- Nur authentifizierte Admins können lesen
DROP POLICY "Admins can read all submissions" ON contact_submissions;

CREATE POLICY "Only authenticated admins can read"
  ON contact_submissions
  FOR SELECT
  USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
```

---

## 📈 Monitoring & Limits

### Free Plan Limits:
- ✅ 500 MB Database
- ✅ 1 GB Storage
- ✅ 2 GB Bandwidth/Monat
- ✅ 500k Edge Function Requests

**Für ProFliesen ausreichend!** (ca. 100-200 Submissions/Monat)

### Usage prüfen:
Settings → Usage

---

## 🔧 Troubleshooting

### Fehler: "Invalid API key"
- Prüfe `.env.local` Datei
- Stelle sicher dass `NEXT_PUBLIC_` Prefix vorhanden
- Restart Dev Server: `npm run dev`

### Fehler: "Row Level Security policy violation"
- Prüfe RLS Policies in Supabase
- SQL aus Schritt 5 nochmal ausführen

### Fehler: "Bucket not found"
- Storage Bucket `uploads` erstellen
- Public access aktivieren

### Bilder werden nicht hochgeladen
- Prüfe Storage Policies
- Prüfe File Size (max 10MB)
- Prüfe Network Tab im Browser DevTools

---

## 🎯 Next Steps nach Setup

### 1. Email Notifications (optional)
Supabase → Database → Functions → Create Function:
```sql
CREATE OR REPLACE FUNCTION send_submission_notification()
RETURNS TRIGGER AS $$
BEGIN
  -- TODO: Integration mit SendGrid/Resend
  -- Email an info@profliesen.de bei neuer Submission
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### 2. Admin Dashboard (v1.0)
- Authentifizierung mit Supabase Auth
- Dashboard zum Verwalten von Submissions
- Status ändern (new → in_progress → completed)

### 3. Webhook Integration
- Webhook bei neuer Submission
- Slack/Discord Notification
- CRM Integration (z.B. HubSpot)

---

## 📚 Ressourcen

- **Docs**: https://supabase.com/docs
- **Dashboard**: https://app.supabase.com
- **Status**: https://status.supabase.com
- **Community**: https://github.com/supabase/supabase/discussions

---

## ✅ Checklist

- [ ] Supabase Konto erstellt
- [ ] Projekt erstellt
- [ ] API Keys kopiert
- [ ] `.env.local` erstellt
- [ ] Tabelle `contact_submissions` erstellt
- [ ] Storage Bucket `uploads` erstellt
- [ ] Policies gesetzt
- [ ] Test-Submission durchgeführt
- [ ] Environment Variables in Vercel gesetzt
- [ ] Production funktioniert

**Viel Erfolg! 🚀**
