import { type Dictionary, t } from 'intlayer'

const apiKeysPageContent = {
  key: 'api-keys-page',
  content: {
    title: t({
      en: 'API Management',
      es: 'Gestión de API',
    }),
    description: t({
      en: 'Link your Guild Wars 2 account securely to unlock real-time tracking of your gold, items, and character progress.',
      es: 'Enlace tu cuenta de Guild Wars 2 de forma segura para desbloquear el seguimiento en tiempo real de tu oro, objetos y progreso de personaje.',
    }),
  },
} satisfies Dictionary

export default apiKeysPageContent
