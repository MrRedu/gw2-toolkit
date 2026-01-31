import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import Providers from '@/components/providers'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mrredu.vercel.app'),
  title: {
    template: '%s | GW2 Toolkit',
    default: 'GW2 Toolkit',
  },
  description: `A toolkit for Guild Wars 2 players`,
  keywords: ['Guild Wars 2', 'toolkit'],
  authors: [{ name: 'Eduardo R.', url: 'https://github.com/MrRedu' }],
  creator: 'Eduardo R. (@MrRedu)',
  publisher: 'Eduardo R. (@MrRedu)',
  category: 'toolkit',
  openGraph: {
    title: 'GW2 Toolkit',
    description: `A toolkit for Guild Wars 2 players`,
    url: undefined,
    siteName: 'GW2 Toolkit',
    // images: [
    //   {
    //     url: '',
    //     width: 600,
    //     height: 600,
    //     alt: '',
    //   },
    //   {
    //     url: '',
    //     width: 1920,
    //     height: 1080,
    //     alt: '',
    //   },
    // ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    // canonical: 'https://gw2-toolkit.vercel.app',
  },
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }]
}

export default async function RootLayout({
  children,
  // params,
}: Readonly<{
  children: React.ReactNode
  // params: Promise<{ locale: string }>
}>) {
  // const { locale } = await params

  return (
    <html
      lang="en"
      // lang={locale}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers
        // locale={locale}
        >
          <main className="mx-auto min-h-svh max-w-7xl">
            <>{children}</>
          </main>
        </Providers>
      </body>
    </html>
  )
}
