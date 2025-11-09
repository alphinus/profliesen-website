# 🚀 Vercel Environment Variables Setup

## Environment Variables die gesetzt werden müssen:

### 1. NEXT_PUBLIC_SUPABASE_URL
```
https://ribcbajrgmmxjidemyvj.supabase.co
```

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpYmNiYWpyZ21teGppZGVteXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MDI5ODQsImV4cCI6MjA3ODI3ODk4NH0.YgX72E1UtiP9tkTcTe4c9e1IQgxK31bMT_ferQDD2rI
```

---

## ⚠️ WICHTIG:

**NIEMALS** diese Keys setzen:
- ❌ `SUPABASE_SERVICE_ROLE_KEY` (nur lokal!)

**Nur diese setzen:**
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📋 Schritt-für-Schritt:

1. Öffne Vercel Dashboard
2. Wähle dein Projekt: **profliesen-website**
3. Gehe zu: **Settings** → **Environment Variables**
4. Klicke: **Add New**

### Für jede Variable:

**Variable 1:**
- Key: `NEXT_PUBLIC_SUPABASE_URL`
- Value: (Kopiere von oben)
- Environments: ✅ Production, ✅ Preview, ✅ Development

**Variable 2:**
- Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Value: (Kopiere von oben)
- Environments: ✅ Production, ✅ Preview, ✅ Development

5. Klicke **Save** nach jeder Variable

---

## 🔄 Deployment triggern

Nach dem Setzen der Variables:

**Option 1: Automatisch**
- Vercel deployed automatisch nach dem Speichern

**Option 2: Manuell**
- Gehe zu: **Deployments**
- Klicke auf letztes Deployment (v0.9.1)
- Klicke: **Redeploy**

---

## ✅ Testen

Nach erfolgreichem Deployment:

1. Öffne deine Live-Site
2. Gehe zu: **/kontakt**
3. Teste das Formular
4. Prüfe Submissions in Supabase

---

## 🔍 Troubleshooting

**Falls Formular nicht funktioniert:**

1. Prüfe Browser Console (F12) auf Fehler
2. Prüfe Vercel Logs: **Deployments** → Letztes Deployment → **Function Logs**
3. Stelle sicher dass Env Vars gesetzt sind: **Settings** → **Environment Variables**

**Falls "Invalid API key" Fehler:**
- Env Vars wurden nicht richtig gesetzt
- Redeploy nach dem Setzen der Env Vars nötig
