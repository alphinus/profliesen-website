# ProFliesen - Fliesen & Plattenleger Website

Eine state-of-the-art, professionelle Website für einen Fliesenleger-Fachbetrieb mit intelligenter Galerie und modernen Features, gebaut mit Next.js und Tailwind CSS.

## Features

### 🎨 Design & UX
- **Responsive Design**: Perfekt optimiert für alle Geräte (Desktop, Tablet, Mobile)
- **Moderne UI**: Professionelles Design speziell für Fliesenleger/Handwerker
- **Animationen**: Smooth Transitions und Hover-Effekte

### 🖼️ Intelligente Galerie (State-of-the-Art)
- **Filterfunktion**: Kategorisierung nach Badezimmer, Küche, Wohnbereich, Außenbereich
- **Lightbox**: Vollbild-Ansicht mit Keyboard-Navigation (←/→/Esc)
- **Lazy Loading**: Performance-optimiert mit Next.js Image
- **Featured Projects**: Hervorhebung besonderer Projekte
- **Click to Zoom**: Intuitive Bildvergrößerung

### 📧 Enhanced Contact Form (v0.9+)
- **Multi-Image Upload**: Drag & Drop mit bis zu 5 Bildern (je 10MB)
- **Form Validation**: Zod Schema mit Echtzeit-Fehleranzeige
- **Toast Notifications**: Visuelles Feedback bei Submit
- **Supabase Backend**: Automatisches Speichern in PostgreSQL
- **Image Storage**: Supabase Storage für hochgeladene Bilder
- **Loading States**: Animated Spinner während Upload/Submit
- **Error Handling**: Robuste Fehlerbehandlung

### ⚡ Vorher/Nachher-Slider
- **Interactive Slider**: Drag & Touch-Support
- **Before/After Comparison**: Visueller Vergleich von Projekten
- **Responsive**: Funktioniert auf allen Geräten

### 🚀 Technologie
- **Next.js 16**: Neueste Version mit App Router
- **React 19**: Modernste React-Features
- **TypeScript**: Type-Safe Development
- **Tailwind CSS 3**: Utility-First Styling
- **SEO-optimiert**: Meta-Tags, strukturierte Daten, semantisches HTML
- **Performance**: Next.js Image Optimization, Lazy Loading

### 🛒 Shop-Ready
- **Vorbereitet für E-Commerce**: Modulare Struktur für zukünftige Shop-Integration

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
