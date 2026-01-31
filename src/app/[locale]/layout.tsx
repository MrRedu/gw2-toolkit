import type { Metadata } from 'next'
import { Federo, Geist, Geist_Mono } from 'next/font/google'
import {
  getHTMLTextDir,
  // getIntlayer, getMultilingualUrls
} from 'intlayer'
import type { NextLayoutIntlayer } from 'next-intlayer'
import { IntlayerServerProvider } from 'next-intlayer/server'
import { Header } from '@/components/layout/header/header'
import Providers from '@/components/providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const federoSans = Federo({
  variable: '--font-federo-sans',
  weight: ['400'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  // metadataBase: new URL('https://mrredu.vercel.app'),
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

// export const generateMetadata = async ({ params }: LocalPromiseParams): Promise<Metadata> => {
//   const { locale } = await params;

//   const metadata = getIntlayer('metadata', locale);

//   const multilingualUrls = getMultilingualUrls('/');
//   const localizedUrl = multilingualUrls[locale as keyof typeof multilingualUrls];

//   return {
//     ...metadata,
//     alternates: {
//       canonical: localizedUrl,
//       languages: { ...multilingualUrls, 'x-default': '/' },
//     },
//     openGraph: {
//       url: localizedUrl,
//     },
//   };
// };

export { generateStaticParams } from 'next-intlayer'

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${federoSans.variable} ${geistMono.variable} antialiased`}
      >
        <IntlayerServerProvider locale={locale}>
          <Providers locale={locale}>
            <Header />
            <main className="min-h-[calc(100svh-var(--header-height))]">
              {children}
            </main>
          </Providers>
        </IntlayerServerProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
