# 🚀 GitHub Deployment - Version 0.1

## Git Tag erstellt ✅
- **Version**: v0.1
- **Status**: Ready for GitHub

## 📋 Schritte zum GitHub Upload

### Option 1: GitHub Web Interface (Empfohlen für Anfänger)

#### 1. Neues Repository erstellen
1. Gehe zu https://github.com/new
2. Repository Name: `profliesen-website` (oder dein Wunschname)
3. Description: `ProFliesen - State-of-the-Art Fliesenleger Website mit intelligenter Galerie`
4. **Wichtig**: ❌ NICHT "Initialize with README" anklicken
5. Klicke "Create repository"

#### 2. Repository mit lokalem Code verbinden
Kopiere diese Befehle und führe sie im Terminal aus:

```bash
cd /Users/mg1/handwerker-website

# Remote hinzufügen (ERSETZE: dein-username mit deinem GitHub Namen)
git remote add origin https://github.com/dein-username/profliesen-website.git

# Code und Tags hochladen
git push -u origin main
git push origin v0.1
```

#### 3. Fertig! 🎉
Dein Code ist jetzt auf GitHub mit Version Tag v0.1

---

### Option 2: Mit GitHub CLI (Automatisch)

Wenn du GitHub CLI installiert hast:

```bash
cd /Users/mg1/handwerker-website

# Repository erstellen und pushen
gh repo create profliesen-website --public --source=. --remote=origin --push

# Tag hochladen
git push origin v0.1
```

---

## 🏷️ Versions-Tags

### Aktuelle Version
- **v0.1** - Initial Release (ProFliesen Launch)

### Zukünftige Versionen
- **v0.2** - Shop-Integration vorbereitet
- **v0.3** - CMS Integration
- **v1.0** - Production Ready mit echten Inhalten

---

## 📦 Was ist in v0.1 enthalten?

### Features
✓ Professionelle Fliesenleger-Website
✓ Intelligente Galerie (Filter, Lightbox, Keyboard Nav)
✓ Vorher/Nachher-Slider (Interactive)
✓ 5 vollständige Seiten
✓ Responsive Design
✓ Next.js 16 + React 19 + TypeScript
✓ Tailwind CSS 3
✓ SEO-optimiert

### Komponenten
- `components/ui/ImageGallery.tsx`
- `components/ui/Lightbox.tsx`
- `components/ui/BeforeAfterSlider.tsx`
- `components/marketing/Header.tsx`
- `components/marketing/Footer.tsx`
- `components/marketing/Hero.tsx`

### Seiten
- `/` - Startseite mit Hero & Services
- `/leistungen` - 6 Services + Material + Prozess
- `/portfolio` - Galerie + Vorher/Nachher
- `/ueber-uns` - Team & Geschichte
- `/kontakt` - Kontaktformular

---

## 🔐 .env Datei

**WICHTIG**: Die `.env` Datei wird NICHT auf GitHub hochgeladen (steht in .gitignore)

Für Deployment musst du Umgebungsvariablen auf Vercel/Netlify setzen:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_FORMSPREE_ID` (später)

---

## 📊 Repository Einstellungen (Empfohlen)

Nach dem Upload auf GitHub:

### About Section
- **Description**: State-of-the-Art Fliesenleger Website mit intelligenter Galerie
- **Website**: (später deine Vercel URL)
- **Topics**: `nextjs`, `react`, `typescript`, `tailwind`, `website`, `handwerker`, `fliesen`

### Branch Protection
- Main branch schützen
- Require pull request reviews (optional)

### GitHub Pages (optional)
- Kann für Dokumentation genutzt werden

---

## 🚀 Nächste Schritte nach GitHub Upload

1. **Vercel Deployment**
   - Vercel Account mit GitHub verbinden
   - Repository importieren
   - Automatisches Deployment bei jedem Push

2. **Domain verbinden**
   - Custom Domain in Vercel konfigurieren
   - DNS Einstellungen anpassen

3. **Environment Variables**
   - In Vercel Settings konfigurieren

4. **CI/CD Setup** (optional)
   - GitHub Actions für Tests
   - Automatische Checks bei PRs

---

## 📝 Git Workflow für zukünftige Updates

```bash
# Feature entwickeln
git checkout -b feature/neue-galerie
# ... Code ändern ...
git add .
git commit -m "feat: neue Galerie Funktion"

# Auf main mergen
git checkout main
git merge feature/neue-galerie

# Neue Version erstellen
git tag -a v0.2 -m "Version 0.2: Neue Features"

# Auf GitHub pushen
git push origin main
git push origin v0.2
```

---

## 🆘 Hilfe

### Remote URL ändern
```bash
git remote set-url origin https://github.com/dein-username/neuer-name.git
```

### Remote prüfen
```bash
git remote -v
```

### Alle Tags anzeigen
```bash
git tag -l
```

### Tag löschen (falls Fehler)
```bash
git tag -d v0.1
```

---

**Viel Erfolg! 🎉**
