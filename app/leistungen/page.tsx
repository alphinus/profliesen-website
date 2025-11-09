import Hero from '@/components/marketing/Hero';

export default function LeistungenPage() {
  const services = [
    {
      title: 'Fliesen- & Plattenverlegung',
      description: 'Professionelle Verlegung aller Arten von Fliesen und Platten für Innen- und Außenbereiche.',
      features: [
        'Wandfliesen & Bodenfliesen',
        'Großformat-Fliesen',
        'Naturstein & Mosaik',
        'Feinsteinzeug',
      ],
      icon: '🏛️',
    },
    {
      title: 'Badsanierung',
      description: 'Komplette Badrenovierung vom Fachmann - von der Planung bis zur Fertigstellung.',
      features: [
        'Komplett-Badsanierung',
        'Modernisierung',
        'Barrierefreie Bäder',
        'Wellness-Bäder',
      ],
      icon: '🚿',
    },
    {
      title: 'Terrassen & Balkone',
      description: 'Hochwertige Außenbereichsgestaltung mit langlebigen Materialien.',
      features: [
        'Terrassenplatten',
        'Balkonbeläge',
        'Natursteinverlegung',
        'Abdichtung',
      ],
      icon: '🌿',
    },
    {
      title: 'Küchen',
      description: 'Fliesenarbeiten für Ihre Traumküche - funktional und ästhetisch.',
      features: [
        'Fliesenrückwand',
        'Arbeitsplatten',
        'Bodenfliesen',
        'Spritzschutz',
      ],
      icon: '👨‍🍳',
    },
    {
      title: 'Trockenbau',
      description: 'Professionelle Trockenbauarbeiten für jeden Bedarf.',
      features: [
        'Raumteiler & Wände',
        'Deckenabhängung',
        'Schallschutz',
        'Dachausbau',
      ],
      icon: '🔨',
    },
    {
      title: 'Malerarbeiten',
      description: 'Hochwertige Malerarbeiten als perfekte Ergänzung zu Fliesenarbeiten.',
      features: [
        'Innenanstrich',
        'Fassadenanstrich',
        'Tapezierarbeiten',
        'Spachteltechnik',
      ],
      icon: '🎨',
    },
  ];

  const materials = [
    {
      name: 'Keramik',
      description: 'Klassische und moderne Keramikfliesen in allen Formaten',
    },
    {
      name: 'Feinsteinzeug',
      description: 'Hochwertige, extrem belastbare Fliesen für höchste Ansprüche',
    },
    {
      name: 'Naturstein',
      description: 'Marmor, Granit, Schiefer und weitere edle Natursteine',
    },
    {
      name: 'Mosaik',
      description: 'Kunstvolle Mosaike für besondere Akzente',
    },
  ];

  return (
    <>
      <Hero
        title="Unsere Leistungen"
        subtitle="Fachgerechte Fliesen- und Plattenverlegung sowie Komplettlösungen für Ihr Zuhause"
      />

      {/* Main Services */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Kompetenz in allen Bereichen</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Als Fachbetrieb für Fliesen- und Plattenverlegung bieten wir Ihnen das komplette Spektrum
              professioneller Handwerksleistungen.
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

      {/* Materials Section */}
      <section className="section bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Materialien</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Wir verarbeiten alle gängigen Materialien und beraten Sie gerne bei der Auswahl
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {materials.map((material, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold mb-2 text-secondary-900">{material.name}</h3>
                <p className="text-secondary-600 text-sm">{material.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Unser Prozess</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Von der ersten Idee bis zur Fertigstellung - so läuft Ihr Projekt ab
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: '1', title: 'Beratung', desc: 'Kostenlose Erstberatung vor Ort' },
              { step: '2', title: 'Planung', desc: 'Detaillierte Planung & Angebot' },
              { step: '3', title: 'Material', desc: 'Materialauswahl & Beschaffung' },
              { step: '4', title: 'Ausführung', desc: 'Professionelle Umsetzung' },
              { step: '5', title: 'Übergabe', desc: 'Abnahme & Nachbetreuung' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2 text-secondary-900">{item.title}</h3>
                <p className="text-secondary-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="section bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Unser Qualitätsversprechen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <div className="text-4xl mb-3">✓</div>
                <h3 className="font-bold text-lg mb-2">Präzise Verlegung</h3>
                <p className="text-primary-100">Millimetergenau und fachgerecht</p>
              </div>
              <div>
                <div className="text-4xl mb-3">✓</div>
                <h3 className="font-bold text-lg mb-2">Premium Materialien</h3>
                <p className="text-primary-100">Nur hochwertige Markenprodukte</p>
              </div>
              <div>
                <div className="text-4xl mb-3">✓</div>
                <h3 className="font-bold text-lg mb-2">5 Jahre Garantie</h3>
                <p className="text-primary-100">Auf alle unsere Arbeiten</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
            Ihre Leistung nicht dabei?
          </h2>
          <p className="text-xl mb-8 text-secondary-600 max-w-2xl mx-auto">
            Sprechen Sie uns an! Wir beraten Sie gerne zu allen Fliesen- und Handwerksleistungen
            und finden die passende Lösung für Ihr Projekt.
          </p>
          <a href="/kontakt" className="btn-primary inline-block">
            Jetzt anfragen
          </a>
        </div>
      </section>
    </>
  );
}
