import { useIntlayer } from 'next-intlayer/server'

export const ServerComponent = () => {
  const content = useIntlayer('server-component')

  return (
    <>
      <h2>{content.title}</h2>
    </>
  )
}
