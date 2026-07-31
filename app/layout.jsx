import './globals.css'
import 'leaflet/dist/leaflet.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import StructuredData from '@/components/seo/StructuredData'
import { FavoritesProvider } from '@/contexts/FavoritesContext'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  title: 'PrimeHub — Kenya Real Estate | Land & Homes for Sale',
  description: 'Find land and homes across Kenya in the right location at the right price. Properties in Nanyuki, Kiambu, Nakuru, Mombasa, and more.',
  keywords: 'Kenya real estate, land for sale Kenya, homes for sale Kenya, property Kenya, buy land Kenya, real estate Kenya',
  authors: [{ name: 'PrimeHub' }],
  creator: 'PrimeHub',
  publisher: 'PrimeHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://primehub.co.ke'),
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://primehub.co.ke',
    title: 'PrimeHub — Kenya Real Estate | Land & Homes for Sale',
    description: 'Find land and homes across Kenya in the right location at the right price. Properties in Nanyuki, Kiambu, Nakuru, Mombasa, and more.',
    siteName: 'PrimeHub',
    images: [
      {
        url: '/images/properties/nanyuki-home.jpeg',
        width: 1200,
        height: 630,
        alt: 'PrimeHub Kenya Real Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrimeHub — Kenya Real Estate | Land & Homes for Sale',
    description: 'Find land and homes across Kenya in the right location at the right price.',
    images: ['/images/properties/nanyuki-home.jpeg'],
    creator: '@primehub_ke',
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FavoritesProvider>
          <StructuredData />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  )
}