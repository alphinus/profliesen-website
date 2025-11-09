import Hero from '@/components/marketing/Hero';
import Link from 'next/link';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';

export default function Home() {
  const services = [
    {
      title: 'Fliesen & Platten',
      description: 'Professionelle Verlegung von Fliesen und Naturstein für Boden und Wand',
      icon: '🏛️',
    },
    {
      title: 'Bad & Sanitär',
      description: 'Komplette Badsanierung mit hochwertigen Fliesen und modernem Design',
      icon: '🚿',
    },
    {
      title: 'Terrassen & Außenbereich',
      description: 'Terrassenplatten, Balkon und Außenfliesen für jeden Anspruch',
      icon: '🌿',
    },
    {
      title: 'Allround-Service',
      description: 'Trockenbau, Malerarbeiten und weitere Handwerksleistungen',
      icon: '🔧',
    },
  ];

  const features = [
    {
      title: 'Über 20 Jahre Erfahrung',
      description: 'Langjährige Expertise in allen Bereichen des Handwerks',
    },
    {
      title: 'Meisterbetrieb',
      description: 'Zertifizierte Qualität durch unsere Meisterqualifikation',
    },
    {
      title: 'Faire Preise',
      description: 'Transparente Kostenvoranschläge ohne versteckte Gebühren',
    },
    {
      title: 'Schnelle Umsetzung',
      description: 'Zuverlässige Terminplanung und pünktliche Fertigstellung',
    },
  ];

  return (
    <>
      <Hero
        title="Meisterhafte Fliesenarbeiten & Allround-Handwerk"
        subtitle="Professionelle Fliesen- und Plattenverlegung mit über 20 Jahren Erfahrung. Von der Planung bis zur perfekten Ausführung."
      />

      {/* Services Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Unsere Leistungen</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Wir bieten Ihnen ein umfassendes Spektrum an professionellen Handwerksleistungen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-secondary-200 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-secondary-900">
                  {service.title}
                </h3>
                <p className="text-secondary-600">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/leistungen" className="btn-primary">
              Alle Leistungen ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Warum wir?</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Diese Vorteile machen uns zu Ihrem idealen Partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-secondary-900">
                  {feature.title}
                </h3>
                <p className="text-secondary-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Vorher & Nachher</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Sehen Sie selbst, wie wir Räume verwandeln - mit Präzision und Liebe zum Detail
            </p>
          </div>

          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800"
            afterImage="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800"
            alt="Badezimmer Renovierung"
          />

          <div className="text-center mt-8">
            <p className="text-secondary-600 mb-4">
              Ziehen Sie den Regler, um den Unterschied zu sehen
            </p>
            <Link href="/portfolio" className="btn-primary inline-block">
              Weitere Projekte ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bereit für Ihr nächstes Projekt?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch und kostenlosen Kostenvoranschlag
          </p>
          <Link
            href="/kontakt"
            className="btn-primary bg-white text-primary-600 hover:bg-primary-50 inline-block"
          >
            Jetzt Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </>
  );
}
