# 🤖 Automatisierung & Deployment Workflows

## ✅ Bereits automatisch aktiviert!

### Vercel-GitHub Integration
**Status**: ✅ Aktiv seit dem ersten Deployment

**Was passiert automatisch:**
```
git push origin main
  ↓
GitHub erkennt Push
  ↓
Vercel startet automatisch Build
  ↓
Deployment nach 1-2 Minuten live
  ↓
Du bekommst Notification
```

**Keine Aktion nötig!** Einfach Code pushen.

---

## 🎯 Deployment-Strategien

### **Strategie 1: Continuous Deployment (Aktuell aktiv)**

**Jeder Push auf main → Sofort live**

✅ **Vorteile:**
- Schnellste Updates
- Keine manuellen Schritte
- Ideal für schnelle Iterationen

❌ **Nachteile:**
- Kein Review-Prozess
- Fehler gehen direkt live

**Verwendung:**
```bash
git add .
git commit -m "feat: neue Galerie"
git push
# → Automatisch deployed!
```

---

### **Strategie 2: Tag-basierte Releases (Empfohlen!)**

**Nur bei Version Tags deployen**

✅ **Vorteile:**
- Kontrollierte Releases
- Versionierung
- Rollback möglich
- Professional Workflow

**Setup:** Bereits eingerichtet in `.github/workflows/deploy.yml`

**Verwendung:**
```bash
# Änderungen committen
git add .
git commit -m "feat: neue Features"
git push

# Wenn bereit für Release:
git tag -a v0.2 -m "Version 0.2: Neue Features"
git push origin v0.2

# → Automatisch deployed + GitHub Release erstellt!
```

---

### **Strategie 3: Pull Request Workflow (Team-Arbeit)**

**Änderungen erst reviewen, dann deployen**

**Workflow:**
```bash
# Feature Branch erstellen
git checkout -b feature/neue-galerie
git add .
git commit -m "feat: verbesserte Galerie"
git push origin feature/neue-galerie

# Auf GitHub: Pull Request erstellen
# → Vercel erstellt automatisch Preview URL

# Nach Review: PR mergen
# → Automatisch auf Production deployed
```

✅ **Vorteile:**
- Code Review
- Preview URLs für Tests
- Sicherer für Teams

---

## 🔧 Vercel Deployment Einstellungen

### **In Vercel Dashboard anpassen:**

**Settings → Git:**
- **Production Branch**: `main` (Standard)
- **Auto-Deploy**: ✅ An (empfohlen)
- **Deploy Hooks**: Für externe Trigger

**Settings → Ignored Build Step:**
```bash
# Nur deployen wenn bestimmte Dateien geändert wurden
git diff HEAD^ HEAD --quiet . ':(exclude)README.md'
```

**Settings → Environment Variables:**
```
NEXT_PUBLIC_SITE_URL=https://profliesen-website.vercel.app
```

---

## 🚀 GitHub Actions Workflows

### **Bereits installiert:**

#### **1. Deploy on Release** (`.github/workflows/deploy.yml`)
- Triggert bei Version Tags
- Erstellt GitHub Release
- Vercel deployed automatisch

#### **Zukünftige Workflows:**

**2. Tests vor Deployment**
```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm run build
      - run: npm run lint
```

**3. Performance Checks**
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse

on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: treosh/lighthouse-ci-action@v10
```

---

## 📋 Freigabe-Prozess Optionen

### **Option A: Automatisch (Aktuell)**
```
Code ändern → Push → Sofort live
```

### **Option B: Tag-Release (Empfohlen)**
```
Code ändern → Push → Review → Tag erstellen → Deployed
```

### **Option C: Manueller Trigger**
```yaml
# .github/workflows/manual-deploy.yml
on:
  workflow_dispatch:  # Manueller Trigger im GitHub UI

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        run: echo "Manual deployment triggered"
```

### **Option D: Schedule-basiert**
```yaml
# Jeden Freitag um 18:00 deployen
on:
  schedule:
    - cron: '0 18 * * 5'
```

---

## 🎯 Empfohlener Workflow für ProFliesen

### **Entwicklung:**
```bash
# Feature entwickeln
git checkout -b feature/neue-funktion
# ... Code ändern ...
git push origin feature/neue-funktion
# → Vercel erstellt Preview URL
```

### **Testing:**
```
Preview URL testen: https://profliesen-website-git-feature-neue-funktion.vercel.app
```

### **Release:**
```bash
# Feature fertig, auf main mergen
git checkout main
git merge feature/neue-funktion

# Version Tag erstellen
git tag -a v0.2 -m "Version 0.2: Neue Funktion"
git push origin main
git push origin v0.2

# → Automatisch deployed!
# → GitHub Release erstellt
```

---

## 📊 Monitoring & Notifications

### **Vercel Notifications:**
Settings → Notifications:
- ✅ Deployment Success
- ✅ Deployment Failed
- ✅ Performance Alerts

### **GitHub Notifications:**
- ✅ Push Events
- ✅ PR Comments (Vercel Bot)
- ✅ Release Published

### **Slack Integration (Optional):**
Vercel → Integrations → Slack
- Deployment Updates
- Build Status
- Error Alerts

---

## 🔄 Rollback-Strategie

### **Vercel Dashboard:**
Deployments → Älteres Deployment → "Promote to Production"

### **Git Revert:**
```bash
# Letzten Commit rückgängig
git revert HEAD
git push

# Zu bestimmtem Tag zurück
git checkout v0.1
git tag -a v0.1.1 -m "Rollback to v0.1"
git push origin v0.1.1
```

---

## 🎯 Nächste Schritte

1. **Jetzt aktiv:**
   - ✅ Auto-Deploy bei Push (main branch)
   - ✅ Preview URLs bei Feature Branches
   - ✅ GitHub Actions für Tag-Releases

2. **Aktivieren bei Bedarf:**
   - [ ] Automatische Tests
   - [ ] Performance Monitoring
   - [ ] Slack Notifications
   - [ ] Custom Deploy Hooks

3. **Für v0.2:**
   - [ ] E2E Tests vor Deployment
   - [ ] Lighthouse CI
   - [ ] Dependency Updates (Dependabot)

---

## ✅ Checklist: Ist dein Workflow optimal?

- [x] Auto-Deploy aktiviert
- [x] GitHub Integration verbunden
- [x] Version Tags werden erstellt
- [ ] Tests laufen automatisch
- [ ] Performance wird gemessen
- [ ] Team kann reviewen (PRs)
- [ ] Notifications sind konfiguriert
- [ ] Rollback-Strategie dokumentiert

---

**Dein aktueller Status: ✅ Vollautomatisch!**

Jeder `git push` deployed automatisch. Kein Agent nötig!

**Willst du mehr Kontrolle?** Nutze Tag-basierte Releases (bereits eingerichtet).
