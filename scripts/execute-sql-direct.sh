#!/bin/bash

# Supabase SQL direkt via REST API ausführen
SUPABASE_URL="https://ribcbajrgmmxjidemyvj.supabase.co"
SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpYmNiYWpyZ21teGppZGVteXZqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcwMjk4NCwiZXhwIjoyMDc4Mjc4OTg0fQ.8CaejEPQWD1seKM7aMCuj6GaDo9NTYS-nzvkCwRT-ZI"

SQL="
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
DROP POLICY IF EXISTS \"Anyone can insert submissions\" ON contact_submissions;
CREATE POLICY \"Anyone can insert submissions\"
  ON contact_submissions FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS \"Anyone can read submissions\" ON contact_submissions;
CREATE POLICY \"Anyone can read submissions\"
  ON contact_submissions FOR SELECT USING (true);

-- Trigger für updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS \$\$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
\$\$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON contact_submissions;
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
"

# Via pg_net Query (experimentell)
curl -X POST "${SUPABASE_URL}/rest/v1/rpc/exec" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"query\": $(echo "$SQL" | jq -Rs .)}"
