# 🚀 Quick Setup - 2 Minuten

## Schritt 1: SQL ausführen (1 Minute)

1. Öffne: **https://app.supabase.com/project/ribcbajrgmmxjidemyvj/sql/new**

2. Kopiere dieses SQL und klicke "RUN":

```sql
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
```

✅ **Erledigt!** Du solltest "Success. No rows returned" sehen.

---

## Schritt 2: Storage Bucket erstellen (30 Sekunden)

1. Öffne: **https://app.supabase.com/project/ribcbajrgmmxjidemyvj/storage/buckets**

2. Klicke **"New bucket"**

3. Einstellungen:
   - **Name**: `uploads`
   - **Public bucket**: ✅ **JA** (aktivieren!)
   - **File size limit**: 10 MB
   - **Allowed MIME types**: Leer lassen (alle erlaubt)

4. Klicke **"Create bucket"**

✅ **Erledigt!**

---

## Schritt 3: Storage Policies (30 Sekunden)

1. Öffne: **https://app.supabase.com/project/ribcbajrgmmxjidemyvj/sql/new**

2. Kopiere dieses SQL und klicke "RUN":

```sql
-- Storage Policies für uploads Bucket
DROP POLICY IF EXISTS "Anyone can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete images" ON storage.objects;

CREATE POLICY "Anyone can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'uploads');

CREATE POLICY "Anyone can read images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'uploads');

CREATE POLICY "Anyone can delete images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'uploads');
```

✅ **FERTIG!** 🎉

---

## Testen

```bash
npm run dev
```

Dann öffne: **http://localhost:3000/kontakt**

Fülle das Formular aus, lade Bilder hoch und klicke "Senden"!

Prüfe die Submissions: **https://app.supabase.com/project/ribcbajrgmmxjidemyvj/editor**

---

## 🔐 Sicherheitshinweis

⚠️ **WICHTIG**: Der `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` darf **NIEMALS** in Git committed oder öffentlich gemacht werden!

Er ist bereits in `.gitignore` (alle `.env*` Dateien werden ignoriert).

Für Production auf Vercel:
- Verwende **NUR** `NEXT_PUBLIC_SUPABASE_URL` und `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **NIEMALS** den Service Role Key!
