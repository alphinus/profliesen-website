# 📧 Resend Email Benachrichtigungen Setup

## Übersicht

Bei jeder neuen Kontaktanfrage erhältst du automatisch eine Email an **alphinus@gmail.com** mit allen Details.

---

## 🚀 Quick Setup (2 Minuten)

### Schritt 1: Resend Account erstellen

1. Öffne: **https://resend.com/signup**
2. Registriere dich mit **alphinus@gmail.com**
3. Bestätige deine Email

### Schritt 2: API Key erstellen

1. Gehe zu: **Dashboard** → **API Keys**
2. Klicke **"Create API Key"**
3. Einstellungen:
   - **Name**: `ProFliesen Contact Form`
   - **Permission**: **Sending access**
4. Klicke **"Add"**
5. **KOPIERE DEN KEY SOFORT!** (wird nur einmal angezeigt)

### Schritt 3: Lokal konfigurieren

Füge den API Key zu `.env.local` hinzu:

```bash
# In /Users/mg1/handwerker-website/.env.local

RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxx
```

Restart Dev Server:
```bash
npm run dev
```

### Schritt 4: Auf Vercel konfigurieren

1. Vercel Dashboard → **Dein Projekt** → **Settings** → **Environment Variables**
2. Klicke **"Add New"**
3. Einstellungen:
   - **Key**: `RESEND_API_KEY`
   - **Value**: (Dein Resend API Key)
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
4. Klicke **"Save"**
5. **Redeploy** triggern

---

## ✅ Testen

### Lokal testen:

1. `npm run dev`
2. Öffne: `http://localhost:3000/kontakt`
3. Fülle das Formular aus
4. Sende ab
5. **Prüfe dein Email-Postfach** (alphinus@gmail.com)

### Production testen:

1. Gehe zu deiner Live-Site
2. Fülle Kontaktformular aus
3. Sende ab
4. Prüfe Email!

---

## 📧 Email-Template Features

Die Benachrichtigungs-Email enthält:

✅ Name des Anfragenden
✅ Email-Adresse (clickable mailto:)
✅ Telefonnummer (clickable tel:)
✅ Gewünschte Leistung
✅ Nachricht (formatiert)
✅ Hochgeladene Bilder (als Links)
✅ Direktlink zum Supabase Dashboard
✅ Zeitstempel (Deutsche Zeit)
✅ Professionelles Design in ProFliesen-Farben

---

## ⚙️ Erweiterte Konfiguration

### Email-Absender ändern

In `app/api/send-notification/route.ts`:

```typescript
from: 'ProFliesen Kontaktformular <noreply@profliesen.de>',
```

⚠️ **Wichtig**: Für Custom Domain musst du die Domain in Resend verifizieren!
Sonst wird die Email von: `noreply@resend.dev` gesendet.

### Domain verifizieren (optional):

1. Resend Dashboard → **Domains**
2. Klicke **"Add Domain"**
3. Domain: `profliesen.de`
4. Folge den DNS-Anweisungen
5. Warte auf Verifizierung

### Mehrere Email-Empfänger:

```typescript
to: ['alphinus@gmail.com', 'info@profliesen.de'],
```

### BCC für Archivierung:

```typescript
bcc: ['archiv@profliesen.de'],
```

---

## 🔍 Troubleshooting

### Email kommt nicht an

**1. Prüfe Spam-Ordner**
   - Resend Emails landen manchmal im Spam
   - Markiere als "Kein Spam"

**2. Prüfe Resend Dashboard**
   - https://resend.com/emails
   - Siehst du die gesendete Email?
   - Status: Delivered / Bounced / Failed?

**3. Prüfe API Key**
   - `.env.local` hat `RESEND_API_KEY`
   - Vercel hat Environment Variable
   - Key startet mit `re_`

**4. Prüfe Logs**
   - Browser Console (F12) auf Fehler
   - Vercel Function Logs
   - Resend Dashboard → Logs

### "Domain not verified" Error

Lösung: Nutze die Standard-Domain `resend.dev`:

```typescript
from: 'ProFliesen <noreply@resend.dev>',
```

Später kannst du eine Custom Domain verifizieren.

### Rate Limits (Free Plan)

- **100 Emails/Tag**
- **3000 Emails/Monat**

Für mehr: Upgrade auf Pro ($20/Monat = 50k Emails)

---

## 📊 Resend Free Plan

✅ **100 Emails pro Tag**
✅ **3000 Emails pro Monat**
✅ **Unbegrenzte Domains**
✅ **Webhooks**
✅ **Email Logs (30 Tage)**
✅ **API Access**

Für ProFliesen absolut ausreichend!

---

## 🔐 Sicherheit

⚠️ **WICHTIG**:

1. **NIEMALS** den `RESEND_API_KEY` committen
2. Er ist bereits in `.gitignore` (via `.env*`)
3. Auf Vercel nur als Environment Variable setzen
4. Niemals im Client-Code nutzen (nur Server-Side!)

---

## 🎯 Next Steps nach Setup

### Email Auto-Antwort an Kunden:

Füge hinzu in `route.ts`:

```typescript
// Auto-Reply to customer
await resend.emails.send({
  from: 'ProFliesen <info@profliesen.de>',
  to: [email], // Customer email
  subject: 'Danke für Ihre Anfrage!',
  html: `
    <h1>Vielen Dank für Ihre Anfrage!</h1>
    <p>Hallo ${name},</p>
    <p>wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen.</p>
    <p>Beste Grüße,<br>Ihr ProFliesen Team</p>
  `,
});
```

### Slack/Discord Webhook:

Zusätzlich zur Email auch Slack-Benachrichtigung senden.

### Email Templates mit React:

Nutze `@react-email/components` für noch schönere Templates.

---

## ✅ Checklist

- [ ] Resend Account erstellt
- [ ] API Key generiert
- [ ] API Key in `.env.local` gesetzt
- [ ] Dev Server neugestartet
- [ ] Lokal getestet
- [ ] API Key in Vercel gesetzt
- [ ] Production deployed
- [ ] Production getestet
- [ ] Email erhalten ✅

**Viel Erfolg! 🚀**
