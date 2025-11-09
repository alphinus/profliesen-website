import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

export default function Hero({
  title,
  subtitle,
  ctaText = 'Jetzt Kontakt aufnehmen',
  ctaLink = '/kontakt',
  backgroundImage,
}: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="relative container-custom py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={ctaLink} className="btn-primary bg-white text-primary-600 hover:bg-primary-50">
              {ctaText}
            </Link>
            <Link
              href="/leistungen"
              className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600"
            >
              Unsere Leistungen
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
