import Link from 'next/link';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import ImageGallery from '@/components/ui/ImageGallery';

export default function Home() {
  return (
    <>
      {/* Conversion-Optimized Hero */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
        </div>

        <div className="container-custom relative">
          <div className="py-20 md:py-32 max-w-5xl mx-auto">
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-2xl">⭐</span>
                <span className="font-semibold">4.9/5 Sterne</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-2xl">🏆</span>
                <span className="font-semibold">Meisterbetrieb</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-2xl">✅</span>
                <span className="font-semibold">500+ Projekte</span>
              </div>
            </div>

            {/* Hero Content */}
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Ihre Fliesenarbeiten in
                <span className="block text-primary-200">Perfektion umgesetzt</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto leading-relaxed">
                Professionelle Fliesen- & Plattenverlegung mit <strong>über 20 Jahren Erfahrung</strong>.
                Von der Planung bis zur makellosen Ausführung.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link
                  href="/kontakt"
                  className="btn-primary bg-white text-primary-700 hover:bg-primary-50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all px-8 py-4 text-lg font-bold"
                >
                  🚀 Jetzt kostenlos anfragen
                </Link>
                <Link
                  href="/portfolio"
                  className="btn-secondary bg-primary-800/50 hover:bg-primary-800 backdrop-blur-sm border-2 border-white/30 px-8 py-4 text-lg"
                >
                  💎 Referenzen ansehen
                </Link>
              </div>

              {/* Social Proof */}
              <div className="text-primary-200 flex items-center justify-center gap-2 flex-wrap">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-primary-400 border-2 border-white" />
                  <div className="w-10 h-10 rounded-full bg-primary-300 border-2 border-white" />
                  <div className="w-10 h-10 rounded-full bg-primary-500 border-2 border-white" />
                </div>
                <p className="text-sm">
                  <strong className="text-white">500+ zufriedene Kunden</strong> vertrauen uns
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* USP Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: 'Express-Service', desc: 'Schnelle Termine & pünktliche Fertigstellung' },
              { icon: '💰', title: 'Faire Preise', desc: 'Transparente Kostenvoranschläge garantiert' },
              { icon: '🛡️', title: '5 Jahre Garantie', desc: 'Qualitätsgarantie auf alle Arbeiten' },
              { icon: '📞', title: '24/7 Erreichbar', desc: 'Notdienst & schnelle Reaktionszeit' },
            ].map((usp, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-white border border-primary-100 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="text-5xl mb-3">{usp.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-secondary-900">{usp.title}</h3>
                <p className="text-secondary-600 text-sm">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Gallery */}
      <section className="section bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-secondary-900">
              Unsere Premium-Referenzen
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Überzeugen Sie sich von der Qualität unserer Arbeit
            </p>
          </div>

          <ImageGallery />

          <div className="text-center mt-12">
            <Link href="/portfolio" className="btn-primary">
              Alle Referenzen ansehen →
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-secondary-900">
              Unsere Leistungen
            </h2>
            <p className="text-xl text-secondary-600">
              Professionell. Zuverlässig. Termingerecht.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🏛️',
                title: 'Fliesen & Platten',
                features: ['Bodenfliesen', 'Wandfliesen', 'Naturstein', 'Großformat'],
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: '🚿',
                title: 'Badsanierung',
                features: ['Komplettbäder', 'Duschsanierung', 'Modern Design', 'Barrierefreiheit'],
                color: 'from-cyan-500 to-cyan-600'
              },
              {
                icon: '🌿',
                title: 'Außenbereich',
                features: ['Terrassen', 'Balkone', 'Gartenwege', 'Pool-Umrandung'],
                color: 'from-teal-500 to-teal-600'
              },
              {
                icon: '🏠',
                title: 'Küchen',
                features: ['Fliesenspiegel', 'Arbeitsplatten', 'Bodenbeläge', 'Modern & Klassisch'],
                color: 'from-indigo-500 to-indigo-600'
              },
              {
                icon: '🔨',
                title: 'Renovierung',
                features: ['Altbausanierung', 'Modernisierung', 'Entkernung', 'Neubau'],
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: '🔧',
                title: 'Allround-Service',
                features: ['Trockenbau', 'Malerarbeiten', 'Elektrik', 'Sanitär'],
                color: 'from-pink-500 to-pink-600'
              },
            ].map((service, i) => (
              <div key={i} className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all overflow-hidden border border-secondary-100 hover:border-primary-300">
                <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                <div className="p-6">
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-secondary-900 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center text-secondary-600">
                        <span className="text-primary-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/leistungen" className="btn-primary">
              Alle Leistungen entdecken →
            </Link>
          </div>
        </div>
      </section>

      {/* Before/After Showcase */}
      <section className="section bg-gradient-to-br from-secondary-900 to-secondary-800 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Transformation in Perfektion
            </h2>
            <p className="text-xl text-secondary-300">
              Sehen Sie selbst: Vorher vs. Nachher
            </p>
          </div>

          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop"
            afterImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
            alt="Badezimmer Renovierung"
          />

          <div className="text-center mt-12">
            <Link href="/portfolio" className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
              Mehr Transformationen ansehen →
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-secondary-900">
              Das sagen unsere Kunden
            </h2>
            <div className="flex justify-center items-center gap-2 text-yellow-500 text-3xl mb-2">
              {'⭐'.repeat(5)}
            </div>
            <p className="text-xl text-secondary-600">
              4.9/5 Sterne aus über 150 Bewertungen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Michael Schmidt',
                role: 'Hausbesitzer',
                text: 'Absolut professionelle Arbeit! Unser neues Badezimmer sieht fantastisch aus. Pünktlich, sauber und faire Preise.',
                rating: 5,
              },
              {
                name: 'Sarah Weber',
                role: 'Wohnungseigentümerin',
                text: 'Von der Beratung bis zur Fertigstellung alles perfekt. Die Küchenfliesen sind ein echter Hingucker geworden!',
                rating: 5,
              },
              {
                name: 'Thomas Müller',
                role: 'Geschäftsführer',
                text: 'Schnell, zuverlässig und höchste Qualität. Für unsere Büroräume genau der richtige Partner. Sehr empfehlenswert!',
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl shadow-md border border-primary-100">
                <div className="flex text-yellow-500 mb-4">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className="text-secondary-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center font-bold text-primary-700">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-secondary-900">{testimonial.name}</div>
                    <div className="text-sm text-secondary-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Bereit für Ihr Traumprojekt?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
            Kostenlose Beratung & unverbindliches Angebot in 24 Stunden
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/kontakt"
              className="btn-primary bg-white text-primary-700 hover:bg-primary-50 shadow-xl text-lg px-10 py-4"
            >
              📞 Jetzt Kontakt aufnehmen
            </Link>
            <Link
              href="tel:+491234567890"
              className="btn-secondary bg-primary-800 hover:bg-primary-900 border-2 border-white/30 text-lg px-10 py-4"
            >
              ☎️ Direkt anrufen
            </Link>
          </div>

          <p className="text-primary-200 text-sm">
            ✓ Kostenlose Erstberatung &nbsp;&nbsp; ✓ Transparente Preise &nbsp;&nbsp; ✓ 5 Jahre Garantie
          </p>
        </div>
      </section>
    </>
  );
}
