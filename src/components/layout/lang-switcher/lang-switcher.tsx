'use client'

import Link from 'next/link'
import { getLocalizedUrl } from 'intlayer'
import { useLocale } from 'next-intlayer'

export const LangSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } = useLocale()

  return (
    <div>
      {availableLocales.map((localeItem) => (
        <Link
          key={localeItem}
          href={getLocalizedUrl(pathWithoutLocale, localeItem)}
          aria-current={locale === localeItem ? 'page' : undefined}
          onClick={() => setLocale(localeItem)}
          replace // Will ensure that the "go back" browser button will redirect to the previous page
        >
          <span>{localeItem} /</span>
        </Link>
      ))}
    </div>
  )
}
