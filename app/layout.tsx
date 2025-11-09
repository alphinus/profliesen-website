import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/marketing/Header';
import Footer from '@/components/marketing/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Handwerker Meisterbetrieb - Ihr Experte für professionelle Handwerksleistungen',
  description: 'Qualitätshandwerk seit über 20 Jahren. Wir bieten professionelle Dienstleistungen in allen Bereichen des Handwerks.',
  keywords: 'Handwerker, Meisterbetrieb, Renovierung, Sanierung, Handwerksleistungen',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
