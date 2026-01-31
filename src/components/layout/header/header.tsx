import Link from 'next/link'
import { useIntlayer, useLocale } from 'next-intlayer/server'
import { LangSwitcher } from '@/components/layout/lang-switcher/lang-switcher'
import { ThemeSwitcher } from '@/components/layout/theme-switcher/theme-switcher'
import { Button } from '@/components/ui/button'

export const Header = () => {
  const { locale } = useLocale()
  const content = useIntlayer('header', locale)

  return (
    <header className="h-header mx-auto flex max-w-7xl items-center justify-between border-b px-4 md:px-6">
      <h1 className="text-2xl font-bold">{content.title}</h1>
      <ThemeSwitcher />
      <LangSwitcher />

      <Button size="lg" className="rounded-full" asChild>
        <Link href={content.apiKeys.href.value}>{content.apiKeys.title}</Link>
      </Button>
    </header>
  )
}
