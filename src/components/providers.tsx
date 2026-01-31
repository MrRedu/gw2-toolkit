'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type LocalesValues } from 'intlayer'
import { IntlayerClientProvider } from 'next-intlayer'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { getQueryClient } from '@/lib/query-client'

interface ProvidersProps {
  children: React.ReactNode
  locale: LocalesValues
}

export default function Providers({ children, locale }: ProvidersProps) {
  const queryClient = getQueryClient()

  return (
    <IntlayerClientProvider locale={locale}>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </IntlayerClientProvider>
  )
}
