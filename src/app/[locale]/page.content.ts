import { type Dictionary, t } from 'intlayer'

const homePageContent = {
  key: 'home-page',
  content: {
    title: t({
      en: 'Home',
      es: 'Inicio',
    }),
  },
} satisfies Dictionary

export default homePageContent
