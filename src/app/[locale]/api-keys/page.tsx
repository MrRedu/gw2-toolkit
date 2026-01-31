import { getLocale, useIntlayer as t } from 'next-intlayer/server'
import { Typography } from '@/components/ui/typography'
import { ModalAddApiKey } from './_components/modal-add-api-key/modal-add-api-key'
import { TableRegisteredApiKeys } from './_components/table-registered-api-keys/table-registered-api-keys'

export default async function ApiKeysPage() {
  const locale = await getLocale()
  const content = t('api-keys-page', locale)

  return (
    <section className="section space-y-16">
      <div className="text-center">
        <Typography variant="h1">{content.title}</Typography>
        <Typography
          variant="p"
          className="text-muted-foreground mx-auto max-w-[50ch]"
        >
          {content.description}
        </Typography>
      </div>
      <div className="mx-auto flex max-w-4xl flex-col justify-center gap-8">
        <ModalAddApiKey />
        <TableRegisteredApiKeys />
      </div>
    </section>
  )
}
