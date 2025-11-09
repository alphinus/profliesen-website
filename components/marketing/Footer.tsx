import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">
              Meisterbetrieb
            </h3>
            <p className="text-secondary-300 mb-4">
              Ihr zuverlässiger Partner für professionelle Handwerksleistungen.
              Qualität und Präzision seit über 20 Jahren.
            </p>
            <div className="space-y-2 text-secondary-300">
              <p>Musterstraße 123</p>
              <p>12345 Musterstadt</p>
              <p>Tel: +49 (0) 123 456789</p>
              <p>E-Mail: info@meisterbetrieb.de</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Startseite
                </Link>
              </li>
              <li>
                <Link href="/leistungen" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Leistungen
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/ueber-uns" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/impressum" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/agb" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-700 mt-8 pt-8 text-center text-secondary-400">
          <p>&copy; {currentYear} Meisterbetrieb. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
