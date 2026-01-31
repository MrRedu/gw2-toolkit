import { type Dictionary, t } from 'intlayer'

const headerContent = {
  key: 'header',
  content: {
    title: t({
      en: 'GW2 Toolkit',
      es: 'GW2 Toolkit',
    }),
    apiKeys: {
      title: t({
        en: 'Api Keys',
        es: 'Claves de API',
      }),
      href: t({
        en: '/en/api-keys',
        es: '/es/api-keys',
      }),
    },
  },
} satisfies Dictionary

export default headerContent
