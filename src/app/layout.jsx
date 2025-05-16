import "./globals.css";
import Script from 'next/script'
import ClientWrapper from './ClientWrapper'
import { use } from 'react';

export const metadata = {
  title: 'Hermes-Dev | Software Development Solutions',
  description: 'Hermes provides high-quality software development services, web applications, and digital solutions for businesses of all sizes. Our expert team delivers custom solutions tailored to your unique business needs.',
  keywords: ['hermes', 'software development', 'web applications', 'nextjs', 'tailwind css', 'responsive design', 'digital solutions', 'web development', 'mobile apps'],
  metadataBase: new URL('https://hermes.dev'),
  openGraph: {
    title: 'Hermes-Dev | Software Development Solutions',
    description: 'Professional software development services tailored to your unique business needs. From web applications to digital solutions, we bring your ideas to life.',
    url: 'https://hermes.dev',
    siteName: 'Hermes',
    images: [
      {
        url: '/images/Only-Hermes-Dev-Logo.png', 
        width: 1200,
        height: 630,
        alt: 'Hermes Development',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hermes-Dev | Software Development Solutions',
    description: 'Professional software development services tailored to your unique business needs.',
    images: ['/images/Only-Hermes-Dev-Logo.png'],
    creator: '@hermesdev',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/FavIcon.png', type: 'image/png' },
      { url: '/images/Only-Hermes-Dev-Logo.png', type: 'image/png' },
    ],
    shortcut: '/images/FavIcon.png',
    apple: { url: '/images/Only-Hermes-Dev-Logo.png', type: 'image/png' },
    other: {
      rel: 'apple-touch-icon',
      url: '/images/Only-Hermes-Dev-Logo.png',
    },
  },
  alternates: {
    canonical: 'https://hermes.dev',
    languages: {
      'en': 'https://hermes.dev/en',
      'th': 'https://hermes.dev/th',
    },
  },
  verification: {
    google: 'google-site-verification=YOUR_GOOGLE_VERIFICATION_CODE',
  },
  category: 'technology',
  creator: 'Hermes Development Team',
  publisher: 'Hermes Development',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1, 
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
};

export default function RootLayout({ children, params }) {
  // For top-level layout, params might not have locale directly
  // We'll use simpler approach by checking if params has locale
  const unwrappedParams = use(params);
  const locale = unwrappedParams?.locale || 'en';
  
  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <Script 
          id="analytics" 
          strategy="afterInteractive"
        >
          {`
            function sendToAnalytics(metric) {
              const body = JSON.stringify(metric);
              const url = '/api/analytics';
              
              if (navigator.sendBeacon) {
                navigator.sendBeacon(url, body);
              } else {
                fetch(url, {
                  body,
                  method: 'POST',
                  keepalive: true,
                }).catch(error => {
                  console.error('Error sending web-vitals data:', error);
                });
              }
            }
            
            // Try to load web-vitals if needed
            try {
              import('web-vitals').then(({ onCLS, onFID, onLCP, onTTFB, onINP }) => {
                onCLS(sendToAnalytics);
                onFID(sendToAnalytics);
                onLCP(sendToAnalytics);
                onTTFB(sendToAnalytics);
                onINP(sendToAnalytics);
                console.log('Web Vitals reporting initialized');
              });
            } catch (err) {
              console.error('Failed to initialize web-vitals reporting:', err);
            }
          `}
        </Script>
      </head>
      <body className="font-sukhumvit antialiased bg-white text-gray-900 min-h-screen flex flex-col">
        <ClientWrapper locale={locale}>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}