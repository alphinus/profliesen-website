import Hero from '@/components/marketing/Hero';

export default function PortfolioPage() {
  const projects = [
    {
      title: 'Komplette Altbausanierung',
      category: 'Sanierung',
      description: 'Denkmalgerechte Sanierung eines Gründerzeithauses unter Erhalt historischer Substanz.',
      image: '🏛️',
      details: ['Fassadensanierung', 'Innenausbau', 'Elektrik & Sanitär'],
    },
    {
      title: 'Moderne Badsanierung',
      category: 'Badezimmer',
      description: 'Verwandlung eines alten Badezimmers in eine moderne Wellness-Oase.',
      image: '🛁',
      details: ['Komplette Fliesenarbeiten', 'Ebenerdige Dusche', 'Fußbodenheizung'],
    },
    {
      title: 'Dachgeschoss-Ausbau',
      category: 'Innenausbau',
      description: 'Ausbau eines ungenutzten Dachgeschosses zu modernem Wohnraum.',
      image: '🏠',
      details: ['Wärmedämmung', 'Trockenbau', 'Dachfenster'],
    },
    {
      title: 'Gewerbeobjekt-Renovierung',
      category: 'Gewerbe',
      description: 'Komplette Renovierung eines Ladengeschäfts mit kurzer Bauzeit.',
      image: '🏪',
      details: ['Bodenbeläge', 'Malerarbeiten', 'Beleuchtungskonzept'],
    },
    {
      title: 'Terrassenbau mit Holzdeck',
      category: 'Außenbereich',
      description: 'Errichtung einer großzügigen Holzterrasse mit integrierter Beleuchtung.',
      image: '🌳',
      details: ['Holzkonstruktion', 'LED-Beleuchtung', 'Wetterbeständig'],
    },
    {
      title: 'Küchen-Modernisierung',
      category: 'Innenausbau',
      description: 'Neugestaltung einer Küche mit modernem Design und praktischer Aufteilung.',
      image: '👨‍🍳',
      details: ['Fliesenarbeiten', 'Elektroinstallation', 'Wasseranschlüsse'],
    },
  ];

  const testimonials = [
    {
      name: 'Familie Müller',
      project: 'Badsanierung',
      text: 'Hervorragende Arbeit! Pünktlich, sauber und genau nach unseren Wünschen umgesetzt.',
      rating: 5,
    },
    {
      name: 'Thomas Schmidt',
      project: 'Dachausbau',
      text: 'Professionelle Beratung und Ausführung. Wir würden jederzeit wieder beauftragen.',
      rating: 5,
    },
    {
      name: 'Petra Weber',
      project: 'Altbausanierung',
      text: 'Sehr zufrieden mit dem Ergebnis. Das Team hat großartige Arbeit geleistet!',
      rating: 5,
    },
  ];

  return (
    <>
      <Hero
        title="Unsere Referenzen"
        subtitle="Überzeugen Sie sich von der Qualität unserer Arbeit anhand ausgewählter Projekte"
      />

      {/* Projects Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Ausgewählte Projekte</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Jedes Projekt ist einzigartig - hier sehen Sie eine Auswahl unserer erfolgreich abgeschlossenen Arbeiten
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-secondary-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-7xl">
                  {project.image}
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary-600 font-semibold mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-secondary-900">
                    {project.title}
                  </h3>
                  <p className="text-secondary-600 mb-4">{project.description}</p>

                  <ul className="space-y-1">
                    {project.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-secondary-700">
                        <svg
                          className="w-4 h-4 text-primary-600 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Das sagen unsere Kunden</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Kundenzufriedenheit steht bei uns an erster Stelle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-secondary-700 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-secondary-900">{testimonial.name}</p>
                  <p className="text-sm text-secondary-600">{testimonial.project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ihr Projekt könnte das nächste sein!
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam Ihr Projekt verwirklichen. Kontaktieren Sie uns für ein unverbindliches Angebot.
          </p>
          <a
            href="/kontakt"
            className="btn-primary bg-white text-primary-600 hover:bg-primary-50 inline-block"
          >
            Jetzt Projekt starten
          </a>
        </div>
      </section>
    </>
  );
}
