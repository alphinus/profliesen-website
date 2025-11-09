'use client';

import Hero from '@/components/marketing/Hero';
import { useState } from 'react';

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Hier später Formspree oder andere Form-Handler Integration
    console.log('Form submitted:', formData);
    setSubmitted(true);

    // Reset nach 3 Sekunden
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Adresse',
      info: ['Musterstraße 123', '12345 Musterstadt'],
    },
    {
      icon: '📞',
      title: 'Telefon',
      info: ['+49 (0) 123 456789', 'Mo-Fr: 8:00 - 17:00 Uhr'],
    },
    {
      icon: '✉️',
      title: 'E-Mail',
      info: ['info@meisterbetrieb.de', 'Antwort innerhalb von 24h'],
    },
  ];

  return (
    <>
      <Hero
        title="Kontakt"
        subtitle="Nehmen Sie Kontakt mit uns auf - Wir freuen uns auf Ihre Anfrage"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-secondary-900">
                Anfrage senden
              </h2>
              <p className="text-secondary-600 mb-8">
                Füllen Sie das Formular aus und wir melden uns schnellstmöglich bei Ihnen.
                Alle Felder mit * sind Pflichtfelder.
              </p>

              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
                  Vielen Dank für Ihre Nachricht! Wir melden uns in Kürze bei Ihnen.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Ihr Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="ihre@email.de"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="+49 123 456789"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-secondary-700 mb-2">
                    Gewünschte Leistung
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="renovierung">Renovierung</option>
                    <option value="sanierung">Sanierung</option>
                    <option value="innenausbau">Innenausbau</option>
                    <option value="badezimmer">Badezimmer & Sanitär</option>
                    <option value="elektro">Elektroarbeiten</option>
                    <option value="reparatur">Reparaturen & Wartung</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                    Ihre Nachricht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Beschreiben Sie Ihr Projekt..."
                  />
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="privacy" className="text-sm text-secondary-600">
                    Ich habe die{' '}
                    <a href="/datenschutz" className="text-primary-600 hover:underline">
                      Datenschutzerklärung
                    </a>{' '}
                    zur Kenntnis genommen. *
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full"
                >
                  Anfrage senden
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-secondary-900">
                Kontaktinformationen
              </h2>

              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-4xl mr-4">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg text-secondary-900 mb-1">
                        {item.title}
                      </h3>
                      {item.info.map((line, idx) => (
                        <p key={idx} className="text-secondary-600">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Opening Hours */}
              <div className="bg-secondary-50 p-6 rounded-lg mb-8">
                <h3 className="font-semibold text-lg text-secondary-900 mb-4">
                  Öffnungszeiten
                </h3>
                <div className="space-y-2 text-secondary-700">
                  <div className="flex justify-between">
                    <span>Montag - Freitag:</span>
                    <span className="font-medium">08:00 - 17:00 Uhr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samstag:</span>
                    <span className="font-medium">Nach Vereinbarung</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sonntag:</span>
                    <span className="font-medium">Geschlossen</span>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-secondary-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-secondary-600">
                  <div className="text-5xl mb-2">🗺️</div>
                  <p>Google Maps Integration</p>
                  <p className="text-sm">(Wird später hinzugefügt)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="section bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Notfall-Service</h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Bei dringenden Notfällen erreichen Sie unseren Notdienst unter:
          </p>
          <a
            href="tel:+491234567890"
            className="text-4xl font-bold hover:text-primary-200 transition-colors inline-block"
          >
            +49 (0) 123 456 7890
          </a>
          <p className="text-primary-200 mt-4">24/7 Erreichbarkeit bei Notfällen</p>
        </div>
      </section>
    </>
  );
}
