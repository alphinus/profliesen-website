import Hero from '@/components/marketing/Hero';
import ImageGallery, { GalleryImage } from '@/components/ui/ImageGallery';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';

export default function PortfolioPage() {
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800',
      alt: 'Modernes Badezimmer mit großformatigen Fliesen',
      title: 'Luxus-Badezimmer',
      category: 'Badezimmer',
      featured: true,
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800',
      alt: 'Elegante Küche mit Wandfliesen',
      title: 'Moderne Küche',
      category: 'Küche',
      featured: true,
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
      alt: 'Terrasse mit Natursteinplatten',
      title: 'Naturstein-Terrasse',
      category: 'Außenbereich',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      alt: 'Modernes Wohnzimmer mit Bodenfliesen',
      title: 'Wohnzimmer Premium',
      category: 'Wohnbereich',
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      alt: 'Elegantes Bad mit Mosaik',
      title: 'Mosaik-Design Bad',
      category: 'Badezimmer',
      featured: true,
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
      alt: 'Minimalistisches Badezimmer',
      title: 'Minimalist Bath',
      category: 'Badezimmer',
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      alt: 'Geräumige Küche mit Fliesenrückwand',
      title: 'Familienküche',
      category: 'Küche',
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
      alt: 'Balkon mit Terrassenplatten',
      title: 'Balkon-Oase',
      category: 'Außenbereich',
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
      alt: 'Großzügiger Wohnbereich',
      title: 'Penthouse Wohnbereich',
      category: 'Wohnbereich',
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800',
      alt: 'Spa-ähnliches Badezimmer',
      title: 'Wellness-Bad',
      category: 'Badezimmer',
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
      alt: 'Moderne offene Küche',
      title: 'Open Space Küche',
      category: 'Küche',
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
      alt: 'Gartenterrasse mit Platten',
      title: 'Garten-Terrasse',
      category: 'Außenbereich',
      featured: true,
    },
  ];

  const categories = ['Badezimmer', 'Küche', 'Wohnbereich', 'Außenbereich'];

  const testimonials = [
    {
      name: 'Familie Müller',
      project: 'Komplett-Badsanierung',
      text: 'Absolute Spitzenleistung! Die Fliesen wurden millimetergenau verlegt. Das Team war pünktlich, sauber und äußerst professionell.',
      rating: 5,
    },
    {
      name: 'Thomas Schmidt',
      project: 'Terrassenverlegung',
      text: 'Wir sind begeistert von unserer neuen Terrasse! Die Beratung war top und die Ausführung perfekt. Sehr empfehlenswert!',
      rating: 5,
    },
    {
      name: 'Petra Weber',
      project: 'Küchen-Fliesenrückwand',
      text: 'Die Fliesenarbeiten in unserer Küche sind ein Traum geworden. Tolle Beratung bei der Auswahl und präzise Verlegung!',
      rating: 5,
    },
  ];

  return (
    <>
      <Hero
        title="Unsere Referenzen"
        subtitle="Entdecken Sie unsere hochwertigen Fliesen- und Plattenarbeiten - Jedes Projekt ein Meisterstück"
      />

      {/* Gallery Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Projekt-Galerie</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Durchstöbern Sie unsere Referenzprojekte und lassen Sie sich inspirieren.
              Klicken Sie auf ein Bild für die Detailansicht.
            </p>
          </div>

          <ImageGallery images={galleryImages} categories={categories} />
        </div>
      </section>

      {/* Before/After Showcase */}
      <section className="section bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Vorher & Nachher</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Sehen Sie die beeindruckende Transformation - von alt zu neu
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-secondary-900">
                Badezimmer-Renovierung
              </h3>
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800"
                afterImage="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800"
                alt="Badezimmer Renovierung"
              />
              <p className="mt-4 text-secondary-600">
                Aus einem veralteten Bad wurde eine moderne Wellness-Oase mit großformatigen
                Fliesen und elegantem Design.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-secondary-900">
                Terrassen-Neugestaltung
              </h3>
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800"
                afterImage="https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800"
                alt="Terrassen Neugestaltung"
              />
              <p className="mt-4 text-secondary-600">
                Die alte Terrasse wurde komplett erneuert mit hochwertigen Natursteinplatten
                für maximale Langlebigkeit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Das sagen unsere Kunden</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Kundenzufriedenheit steht bei uns an erster Stelle - Lesen Sie echte Bewertungen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-secondary-50 p-6 rounded-lg shadow-md">
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

      {/* Statistics Section */}
      <section className="section bg-primary-600 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-primary-100">Projekte abgeschlossen</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">20+</div>
              <div className="text-primary-100">Jahre Erfahrung</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-primary-100">Kundenzufriedenheit</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">∞</div>
              <div className="text-primary-100">Leidenschaft für Fliesen</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary-900">
            Ihr Projekt könnte das nächste sein!
          </h2>
          <p className="text-xl mb-8 text-secondary-600 max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam Ihren Traum verwirklichen. Kontaktieren Sie uns für ein
            unverbindliches Beratungsgespräch.
          </p>
          <a href="/kontakt" className="btn-primary inline-block">
            Jetzt Projekt starten
          </a>
        </div>
      </section>
    </>
  );
}
