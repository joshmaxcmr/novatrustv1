import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nova Trust Finance Corporation | Microfinance de Confiance',
  description: 'Nova Trust Finance Corporation - Votre partenaire de confiance pour des solutions de microfinance innovantes et accessibles.',
  keywords: 'microfinance, crédit, épargne, Nova Trust, finance, services bancaires',
  authors: [{ name: 'Nova Trust Finance Corporation' }],
  metadataBase: new URL('https://novatrust.com'),
  openGraph: {
    title: 'Nova Trust Finance Corporation',
    description: 'Solutions de microfinance innovantes et accessibles',
    url: 'https://novatrust.com',
    siteName: 'Nova Trust Finance',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nova Trust Finance Corporation',
    description: 'Solutions de microfinance innovantes et accessibles',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#312D5E',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  )
}