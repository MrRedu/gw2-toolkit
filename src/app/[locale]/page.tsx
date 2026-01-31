import { type Metadata } from 'next'
import { getIntlayer, getMultilingualUrls } from 'intlayer'
import { type LocalPromiseParams } from 'next-intlayer'
import { getLocale, useIntlayer as t } from 'next-intlayer/server'
import { ClientComponent } from '@/components/client-component/client-component'
import { ServerComponent } from '@/components/server-component/server-component'
import { Typography } from '@/components/ui/typography'

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params

  const metadata = getIntlayer('home-page-metadata', locale)

  const multilingualUrls = getMultilingualUrls('/')
  const localizedUrl = multilingualUrls[locale as keyof typeof multilingualUrls]

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, 'x-default': '/' },
    },
    openGraph: {
      url: localizedUrl,
    },
  }
}

export default async function HomePage() {
  const locale = await getLocale() // Or use params.locale
  const content = t('home-page', locale)

  return (
    <>
      <Typography variant="h3">{content.title}</Typography>
      <ServerComponent />
      <ClientComponent />
    </>
  )
}
