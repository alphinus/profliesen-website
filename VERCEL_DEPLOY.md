# 🚀 Vercel Deployment Guide

## Schnellste Methode: Web Interface (Empfohlen!)

### Schritt 1: Bei Vercel anmelden
Gehe zu: **https://vercel.com/login**

Wähle: **Continue with GitHub**
- Du wirst automatisch eingeloggt (nutzt dein GitHub Account)

### Schritt 2: Neues Projekt importieren
Nach dem Login:
1. Klicke auf: **"Add New..." → Project**
2. Oder direkt: **https://vercel.com/new**

### Schritt 3: Repository auswählen
1. Du siehst deine GitHub Repositories
2. Suche nach: **profliesen-website**
3. Klicke: **"Import"**

### Schritt 4: Projekt konfigurieren
**Framework Preset**: Next.js (wird automatisch erkannt ✓)

**Root Directory**: `.` (Standard, nicht ändern)

**Build Settings** (automatisch erkannt):
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**Environment Variables**: (NICHT nötig für jetzt)

### Schritt 5: Deploy!
Klicke auf: **"Deploy"**

⏱️ Deployment dauert ca. 1-2 Minuten

---

## ✅ Nach erfolgreichem Deployment

### Du bekommst automatisch:
- **Production URL**: `profliesen-website.vercel.app`
- **Preview URLs**: Für jeden Branch/PR
- **SSL Certificate**: Automatisch (HTTPS)
- **CDN**: Global verteilt
- **Auto-Deployment**: Bei jedem Git Push

### Dashboard zeigt:
- ✓ Deployment Status
- ✓ Build Logs
- ✓ Domains
- ✓ Analytics
- ✓ Settings

---

## 🌐 Custom Domain hinzufügen (später)

Wenn du eine Domain hast (z.B. profliesen.de):

1. Gehe zu: **Settings → Domains**
2. Klicke: **"Add Domain"**
3. Gib ein: `profliesen.de`
4. Folge den DNS-Anweisungen
5. Fertig! (DNS Propagation: 24-48h)

---

## 📊 Vercel Features die du nutzt

### Automatisch aktiviert:
- ✅ **Image Optimization** (Next.js Images)
- ✅ **Edge Functions** (Serverless)
- ✅ **Analytics** (Web Vitals)
- ✅ **Git Integration** (Auto Deploy)
- ✅ **Preview Deployments** (Für PRs)
- ✅ **Rollback** (Zu älteren Versionen)

### Kostenlos enthalten:
- 100 GB Bandwidth/Monat
- 6000 Build-Minuten/Monat
- Unlimited Websites
- SSL Certificates
- DDoS Protection

---

## 🔄 Workflow nach Deployment

### Neue Änderungen deployen:
```bash
# Lokal ändern
git add .
git commit -m "feat: neue Features"
git push

# Vercel deployed automatisch!
```

### Verschiedene Branches testen:
```bash
# Feature Branch erstellen
git checkout -b feature/neue-galerie
git push origin feature/neue-galerie

# Vercel erstellt automatisch Preview URL!
```

---

## 🐛 Troubleshooting

### Build schlägt fehl?
1. Prüfe Build Logs in Vercel Dashboard
2. Teste lokal: `npm run build`
3. Prüfe Dependencies: `npm install`

### Environment Variables fehlen?
Settings → Environment Variables → Add

### Domain funktioniert nicht?
1. Prüfe DNS Settings
2. Warte 24-48h für Propagation
3. Vercel Support kontaktieren

---

## 📈 Nach dem Deployment

### Prüfe deine Website:
- [ ] Alle Seiten laden korrekt
- [ ] Galerie funktioniert
- [ ] Vorher/Nachher-Slider arbeitet
- [ ] Mobile Ansicht OK
- [ ] Performance Score (Lighthouse)

### Nächste Schritte:
1. Custom Domain verbinden
2. Analytics aktivieren
3. SEO optimieren
4. Content aktualisieren
5. Shop-Integration vorbereiten

---

## 🎯 URLs nach Deployment

Deine Website wird verfügbar sein unter:
- **Production**: `https://profliesen-website.vercel.app`
- **Git Branch**: `https://profliesen-website-git-[branch].vercel.app`
- **Commit**: `https://profliesen-website-[hash].vercel.app`

---

**Viel Erfolg beim Deployment! 🚀**
