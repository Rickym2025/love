import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: "LOVE | Le Partecipazioni Digitali d'Autore",
  description: "Partecipazioni e siti per matrimoni interattivi, eleganti ed emozionali.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400..800;1,400..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100 selection:bg-rose-500 selection:text-white">
        {children}

        {/* INIEZIONE CENTRALE DALLA POSIZIONE ORIGINALE RM STUDIO */}
        <Script src="https://rmstudio.app/cookie-banner.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
