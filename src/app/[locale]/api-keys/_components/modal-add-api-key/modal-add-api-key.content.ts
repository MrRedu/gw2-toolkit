import { type Dictionary, t } from 'intlayer'

const modalAddApiKeyContent = {
  key: 'modal-add-api-key',
  content: {
    title: t({
      en: 'Add New API Key',
      es: 'Agregar nueva clave de API',
    }),
    action: t({
      en: 'Register key',
      es: 'Registrar clave',
    }),
  },
} satisfies Dictionary

export default modalAddApiKeyContent
