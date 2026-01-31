'use client'

import { useIntlayer } from 'next-intlayer'

export const ClientComponent = () => {
  const content = useIntlayer('client-component')

  return (
    <>
      <h2>{content.title}</h2>
    </>
  )
}
