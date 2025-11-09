import Hero from '@/components/marketing/Hero';

export default function LeistungenPage() {
  const services = [
    {
      title: 'Renovierung & Sanierung',
      description: 'Umfassende Renovierungs- und Sanierungsarbeiten für Wohn- und Geschäftsräume. Von der Planung bis zur schlüsselfertigen Übergabe.',
      features: [
        'Komplette Raumrenovierung',
        'Altbausanierung',
        'Denkmalschutz-Sanierung',
        'Modernisierung',
      ],
      icon: '🏗️',
    },
    {
      title: 'Innenausbau',
      description: 'Professioneller Innenausbau nach Ihren individuellen Wünschen und Vorstellungen.',
      features: [
        'Trockenbau & Ständerwände',
        'Deckenverkleidung',
        'Bodenverlegung',
        'Malerarbeiten',
      ],
      icon: '🎨',
    },
    {
      title: 'Außenarbeiten',
      description: 'Fachgerechte Arbeiten an der Gebäudeaußenseite für langanhaltenden Schutz und Optik.',
      features: [
        'Fassadenarbeiten',
        'Dacharbeiten',
        'Terrassenbau',
        'Zaunbau',
      ],
      icon: '🏠',
    },
    {
      title: 'Badezimmer & Sanitär',
      description: 'Komplette Badsanierung und sanitäre Installationen vom Fachmann.',
      features: [
        'Komplett-Badsanierung',
        'Fliesenverlegung',
        'Sanitärinstallation',
        'Barrierefreie Bäder',
      ],
      icon: '🚿',
    },
    {
      title: 'Elektroarbeiten',
      description: 'Sichere und normgerechte Elektroinstallationen für Ihr Zuhause oder Unternehmen.',
      features: [
        'Elektroinstallation',
        'Smart Home Integration',
        'Beleuchtungskonzepte',
        'Elektro-Checks',
      ],
      icon: '⚡',
    },
    {
      title: 'Reparaturen & Wartung',
      description: 'Schnelle Hilfe bei Reparaturen und regelmäßige Wartungsarbeiten.',
      features: [
        'Schnelle Reparaturen',
        'Wartungsarbeiten',
        'Notdienst',
        'Inspektionen',
      ],
      icon: '🔧',
    },
  ];

  return (
    <>
      <Hero
        title="Unsere Leistungen"
        subtitle="Umfassende Handwerksleistungen aus Meisterhand - Für Privat- und Gewerbekunden"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Kompetenz in allen Bereichen</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Als Meisterbetrieb bieten wir Ihnen professionelle Handwerksleistungen in allen Gewerken.
              Überzeugen Sie sich von unserer Expertise und Qualität.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg border border-secondary-200 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-secondary-900">
                  {service.title}
                </h3>
                <p className="text-secondary-600 mb-6">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-secondary-700">
                      <svg
                        className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ihre Leistung nicht dabei?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Sprechen Sie uns an! Wir beraten Sie gerne zu allen Handwerksleistungen und finden die passende Lösung für Ihr Projekt.
          </p>
          <a
            href="/kontakt"
            className="btn-primary bg-white text-primary-600 hover:bg-primary-50 inline-block"
          >
            Jetzt anfragen
          </a>
        </div>
      </section>
    </>
  );
}
