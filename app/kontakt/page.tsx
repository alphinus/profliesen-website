'use client';

import Hero from '@/components/marketing/Hero';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';
import ImageUpload from '@/components/ui/ImageUpload';
import { uploadImage, submitContactForm } from '@/lib/supabase';
import toast, { Toaster } from 'react-hot-toast';

export default function KontaktPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // 1. Upload images first
      const imageUrls: string[] = [];

      if (uploadedFiles.length > 0) {
        toast.loading(`Bilder werden hochgeladen... (0/${uploadedFiles.length})`, {
          id: 'upload',
        });

        for (let i = 0; i < uploadedFiles.length; i++) {
          const file = uploadedFiles[i];
          const url = await uploadImage(file);

          if (url) {
            imageUrls.push(url);
            toast.loading(`Bilder werden hochgeladen... (${i + 1}/${uploadedFiles.length})`, {
              id: 'upload',
            });
          }
        }

        toast.dismiss('upload');
      }

      // 2. Submit form with image URLs
      const result = await submitContactForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        message: data.message,
        images: imageUrls,
      });

      if (result.success) {
        // 3. Send email notification
        try {
          await fetch('/api/send-notification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              phone: data.phone,
              service: data.service,
              message: data.message,
              images: imageUrls,
            }),
          });
        } catch (emailError) {
          console.error('Email notification error:', emailError);
          // Continue anyway - form was submitted successfully
        }

        toast.success('✅ Anfrage erfolgreich gesendet! Wir melden uns in Kürze.', {
          duration: 5000,
        });
        reset();
        setUploadedFiles([]);
      } else {
        toast.error(`❌ Fehler: ${result.error || 'Bitte versuchen Sie es später erneut.'}`, {
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('❌ Ein unerwarteter Fehler ist aufgetreten', {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
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
      info: ['info@profliesen.de', 'Antwort innerhalb von 24h'],
    },
  ];

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <Hero
        title="Kontakt"
        subtitle="Nehmen Sie Kontakt mit uns auf - Wir freuen uns auf Ihre Anfrage"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Enhanced Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-secondary-900">
                Anfrage senden
              </h2>
              <p className="text-secondary-600 mb-8">
                Füllen Sie das Formular aus und fügen Sie optional Bilder Ihres Projekts hinzu.
                Wir melden uns schnellstmöglich bei Ihnen.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                    Name *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-secondary-300'
                    }`}
                    placeholder="Ihr vollständiger Name"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                    E-Mail *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-secondary-300'
                    }`}
                    placeholder="ihre@email.de"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                    Telefon (optional)
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-secondary-300'
                    }`}
                    placeholder="+49 123 456789"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-secondary-700 mb-2">
                    Gewünschte Leistung
                  </label>
                  <select
                    {...register('service')}
                    id="service"
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="fliesen">Fliesen- & Plattenverlegung</option>
                    <option value="bad">Badsanierung</option>
                    <option value="terrasse">Terrassen & Balkone</option>
                    <option value="kueche">Küchen</option>
                    <option value="trockenbau">Trockenbau</option>
                    <option value="maler">Malerarbeiten</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                    Ihre Nachricht *
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.message ? 'border-red-500' : 'border-secondary-300'
                    }`}
                    placeholder="Beschreiben Sie Ihr Projekt..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Projekt-Bilder (optional)
                  </label>
                  <ImageUpload
                    onImagesChange={setUploadedFiles}
                    maxFiles={5}
                    maxSize={10}
                  />
                </div>

                {/* Privacy */}
                <div className="flex items-start">
                  <input
                    {...register('privacy')}
                    type="checkbox"
                    id="privacy"
                    className="mt-1 mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                  />
                  <label htmlFor="privacy" className="text-sm text-secondary-600">
                    Ich habe die{' '}
                    <a href="/datenschutz" className="text-primary-600 hover:underline font-medium">
                      Datenschutzerklärung
                    </a>{' '}
                    zur Kenntnis genommen und stimme der Verarbeitung meiner Daten zu. *
                  </label>
                </div>
                {errors.privacy && (
                  <p className="mt-2 text-sm text-red-600">{errors.privacy.message}</p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-primary w-full flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Anfrage senden
                    </>
                  )}
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
                  <div key={index} className="flex items-start gap-4 p-4 bg-secondary-50 rounded-lg">
                    <div className="text-4xl">{item.icon}</div>
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
              <div className="bg-primary-50 border border-primary-200 p-6 rounded-lg mb-8">
                <h3 className="font-semibold text-lg text-secondary-900 mb-4 flex items-center gap-2">
                  <span>🕐</span>
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

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white border border-secondary-200 rounded-lg">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="text-sm font-medium text-secondary-900">Kostenlose Beratung</p>
                </div>
                <div className="text-center p-4 bg-white border border-secondary-200 rounded-lg">
                  <div className="text-3xl mb-2">⚡</div>
                  <p className="text-sm font-medium text-secondary-900">Schnelle Antwort</p>
                </div>
                <div className="text-center p-4 bg-white border border-secondary-200 rounded-lg">
                  <div className="text-3xl mb-2">🎯</div>
                  <p className="text-sm font-medium text-secondary-900">Präzise Kalkulation</p>
                </div>
                <div className="text-center p-4 bg-white border border-secondary-200 rounded-lg">
                  <div className="text-3xl mb-2">🔒</div>
                  <p className="text-sm font-medium text-secondary-900">Datenschutz</p>
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
