import { type Dictionary, t } from 'intlayer'

const tableRegisteredApiKeysContent = {
  key: 'table-registered-api-keys',
  content: {
    title: t({
      en: 'Registered Keys',
      es: 'Claves registradas',
    }),
    tableHeader: {
      status: t({
        en: 'Status',
        es: 'Estado',
      }),
      account: t({
        en: 'Account',
        es: 'Cuenta',
      }),
      apiKey: t({
        en: 'API Key',
        es: 'Clave API',
      }),
      actions: t({
        en: 'Actions',
        es: 'Acciones',
      }),
    },
    tableBody: {
      emptyState: t({
        en: 'No API keys registered yet.',
        es: 'No hay claves API registradas todavía.',
      }),
      status: {
        valid: t({
          en: 'Valid',
          es: 'Valido',
        }),
        invalid: t({
          en: 'Invalid',
          es: 'Invalido',
        }),
      },
    },
  },
} satisfies Dictionary

export default tableRegisteredApiKeysContent
