# Handwerker Website

Eine moderne, responsive Website für einen Handwerker-Meisterbetrieb, gebaut mit Next.js und Tailwind CSS.

## Features

- **Responsive Design**: Optimiert für alle Geräte (Desktop, Tablet, Mobile)
- **Moderne Technologien**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **SEO-optimiert**: Meta-Tags, strukturierte Daten, semantisches HTML
- **Performance**: Schnelle Ladezeiten durch Next.js Optimierungen
- **Vorbereitet für Shop-Integration**: Modulare Struktur für zukünftige E-Commerce-Features

## Seiten

- **Startseite**: Hero-Section, Leistungsübersicht, Vorteile
- **Leistungen**: Detaillierte Übersicht aller Handwerksleistungen
- **Portfolio**: Referenzprojekte und Kundenbewertungen
- **Über uns**: Firmengeschichte, Team, Werte
- **Kontakt**: Kontaktformular, Kontaktinformationen, Öffnungszeiten

## Technologie-Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Sprache**: TypeScript
- **Deployment**: Vercel (empfohlen)

## Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Projekt für Produktion bauen
npm run build

# Produktions-Server starten
npm start
```

Die Website ist dann unter [http://localhost:3000](http://localhost:3000) erreichbar.

## Projektstruktur

```
handwerker-website/
├── app/                      # Next.js App Router Seiten
│   ├── kontakt/             # Kontaktseite
│   ├── leistungen/          # Leistungsseite
│   ├── portfolio/           # Portfolio-Seite
│   ├── ueber-uns/           # Über-uns-Seite
│   ├── shop/                # Zukünftiger Shop (vorbereitet)
│   ├── layout.tsx           # Root Layout
│   ├── page.tsx             # Startseite
│   └── globals.css          # Globale Styles
├── components/
│   ├── marketing/           # Marketing-Komponenten
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Hero.tsx
│   ├── shop/                # Shop-Komponenten (für später)
│   └── ui/                  # Wiederverwendbare UI-Komponenten
├── lib/                     # Utility-Funktionen
├── public/                  # Statische Assets
│   └── images/
└── package.json
```

## Anpassungen

### Farben ändern

Die Farbpalette kann in `tailwind.config.ts` angepasst werden:

```typescript
colors: {
  primary: { ... },    // Hauptfarbe (aktuell Blau)
  secondary: { ... },  // Sekundärfarbe (aktuell Grau)
}
```

### Inhalte ändern

- Texte und Inhalte befinden sich direkt in den Seiten-Dateien im `app/`-Verzeichnis
- Firmendaten (Name, Adresse, Telefon) im Footer: `components/marketing/Footer.tsx`
- Kontaktdaten auf Kontaktseite: `app/kontakt/page.tsx`

### Logo hinzufügen

Ersetzen Sie den Text "Meisterbetrieb" im Header (`components/marketing/Header.tsx`) durch ein `<Image>` Component.

## Nächste Schritte

### Kurzfristig
- [ ] Echte Bilder zu `public/images/` hinzufügen
- [ ] Firmendaten anpassen (Name, Adresse, Telefon, E-Mail)
- [ ] Kontaktformular mit Formspree oder ähnlichem Service verbinden
- [ ] Google Maps Integration auf Kontaktseite
- [ ] Impressum, Datenschutz, AGB Seiten erstellen

### Mittelfristig
- [ ] Blog-Funktion hinzufügen
- [ ] Testimonials-System mit CMS (z.B. Contentful)
- [ ] Performance-Optimierung (Bilder, Fonts)
- [ ] Analytics (Google Analytics, Plausible, etc.)

### Langfristig
- [ ] Shop-Integration (Shopify Buy Button / Snipcart / Custom)
- [ ] Online-Terminbuchung
- [ ] Kundenbewertungen-System
- [ ] Multi-Language Support

## Deployment

### Vercel (Empfohlen)

1. Repository auf GitHub pushen
2. Auf [Vercel](https://vercel.com) registrieren
3. Projekt importieren und deployen

### Alternative: Netlify, Railway, etc.

Das Projekt kann auf jeder Plattform deployed werden, die Node.js und Next.js unterstützt.

## Support

Bei Fragen oder Problemen öffnen Sie ein Issue oder kontaktieren Sie den Entwickler.

## Lizenz

Dieses Projekt wurde für den Meisterbetrieb erstellt.
