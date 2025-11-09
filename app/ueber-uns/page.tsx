import Hero from '@/components/marketing/Hero';

export default function UeberUnsPage() {
  const team = [
    {
      name: 'Max Mustermann',
      role: 'Geschäftsführer & Meister',
      description: 'Mit über 25 Jahren Erfahrung im Handwerk leitet Max unser Team mit Expertise und Leidenschaft.',
      icon: '👨‍🔧',
    },
    {
      name: 'Anna Schmidt',
      role: 'Projektleiterin',
      description: 'Anna koordiniert alle Projekte und sorgt für reibungslose Abläufe und termingerechte Fertigstellung.',
      icon: '👩‍💼',
    },
    {
      name: 'Thomas Weber',
      role: 'Meister Sanitär',
      description: 'Thomas ist unser Spezialist für alle sanitären Arbeiten und Badsanierungen.',
      icon: '👨‍🔧',
    },
    {
      name: 'Lisa Müller',
      role: 'Kundenberatung',
      description: 'Lisa ist Ihre erste Ansprechpartnerin und berät Sie kompetent zu allen Fragen.',
      icon: '👩‍💻',
    },
  ];

  const values = [
    {
      title: 'Qualität',
      description: 'Höchste Qualitätsstandards in Material und Ausführung sind für uns selbstverständlich.',
      icon: '⭐',
    },
    {
      title: 'Zuverlässigkeit',
      description: 'Auf uns können Sie sich verlassen - bei Terminen, Zusagen und Ausführung.',
      icon: '🤝',
    },
    {
      title: 'Fairness',
      description: 'Transparente Preise und ehrliche Beratung bilden die Basis unserer Zusammenarbeit.',
      icon: '💯',
    },
    {
      title: 'Kundenzufriedenheit',
      description: 'Ihr Zufriedenheit ist unser oberstes Ziel - bei jedem Projekt.',
      icon: '😊',
    },
  ];

  const milestones = [
    { year: '2003', event: 'Gründung des Meisterbetriebs' },
    { year: '2008', event: 'Erweiterung des Teams auf 10 Mitarbeiter' },
    { year: '2015', event: 'Auszeichnung "Handwerksbetrieb des Jahres"' },
    { year: '2020', event: 'Über 500 erfolgreich abgeschlossene Projekte' },
    { year: '2023', event: '20-jähriges Firmenjubiläum' },
  ];

  return (
    <>
      <Hero
        title="Über uns"
        subtitle="Lernen Sie unser Team und unsere Philosophie kennen - Ihr Partner für professionelles Handwerk"
      />

      {/* Company Story */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="section-title">Unsere Geschichte</h2>
            <div className="text-lg text-secondary-700 space-y-4">
              <p>
                Seit über 20 Jahren sind wir Ihr zuverlässiger Partner für professionelle Handwerksleistungen
                in der Region. Was als kleiner Meisterbetrieb begann, ist heute ein etabliertes Unternehmen
                mit einem erfahrenen Team von Fachkräften.
              </p>
              <p>
                Unsere Leidenschaft für qualitativ hochwertige Arbeit und die Zufriedenheit unserer Kunden
                treiben uns jeden Tag an. Jedes Projekt ist für uns eine neue Herausforderung, die wir mit
                Engagement, Fachwissen und handwerklichem Geschick meistern.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-12 text-secondary-900">
              Unsere Meilensteine
            </h3>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-8">
                  <div className="bg-primary-600 text-white font-bold text-xl px-6 py-3 rounded-lg min-w-[100px] text-center">
                    {milestone.year}
                  </div>
                  <div className="flex-1 bg-secondary-50 p-4 rounded-lg">
                    <p className="text-secondary-800 font-medium">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Unser Team</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Lernen Sie die Menschen kennen, die mit Leidenschaft und Expertise für Sie arbeiten
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg text-center shadow-md">
                <div className="text-6xl mb-4">{member.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-secondary-900">{member.name}</h3>
                <p className="text-primary-600 font-semibold mb-3">{member.role}</p>
                <p className="text-secondary-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Unsere Werte</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Diese Prinzipien leiten uns bei unserer täglichen Arbeit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-secondary-900">{value.title}</h3>
                <p className="text-secondary-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Qualifikationen & Zertifikate</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg text-center shadow-md">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-bold text-lg text-secondary-900">Meisterbetrieb</h3>
              <p className="text-secondary-600 text-sm mt-2">Zertifizierte Meisterqualifikation</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-md">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-lg text-secondary-900">Qualitätssiegel</h3>
              <p className="text-secondary-600 text-sm mt-2">Ausgezeichnete Kundenzufriedenheit</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-md">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-bold text-lg text-secondary-900">Versichert</h3>
              <p className="text-secondary-600 text-sm mt-2">Voll versichert und haftpflichtgedeckt</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Überzeugt? Lernen Sie uns kennen!
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Kontaktieren Sie uns für ein persönliches Beratungsgespräch. Wir freuen uns auf Ihr Projekt!
          </p>
          <a
            href="/kontakt"
            className="btn-primary bg-white text-primary-600 hover:bg-primary-50 inline-block"
          >
            Kontakt aufnehmen
          </a>
        </div>
      </section>
    </>
  );
}
