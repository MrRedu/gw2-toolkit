'use client'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AlertCircle, Link2, Zap } from 'lucide-react'
import { useIntlayer as t } from 'next-intlayer'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { useApiKeyStore } from '@/store/use-api-key-store'

const API_KEY_PLACEHOLDER =
  'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXXXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'

export const ModalAddApiKey = () => {
  const content = t('modal-add-api-key')
  const [value, setValue] = useState('')
  const addApiKey = useApiKeyStore((state) => state.addApiKey)

  const {
    mutate: fetchAccount,
    isPending,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: async (apiKey: string) => {
      const response = await fetch(
        `https://api.guildwars2.com/v2/account?access_token=${apiKey}`,
      )
      if (!response.ok) {
        throw new Error('Invalid API Key')
      }
      const data = await response.json()
      return data
    },
    onSuccess: (data) => {
      addApiKey(value, data.name)
      setValue('')
    },
  })

  const isValid = value.length === API_KEY_PLACEHOLDER.length

  const handleAdd = () => {
    if (isValid) {
      reset()
      fetchAccount(value)
    }
  }

  return (
    <Card className="border-primary gradient-border parchment-texture w-full rounded-2xl px-4 py-8">
      <CardHeader className="flex items-center gap-2">
        <Link2 className="text-primary size-6" />
        <Typography variant="h2" className="pb-0! text-xl">
          {content.title}
        </Typography>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <Input
            placeholder={API_KEY_PLACEHOLDER}
            className="h-12"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              if (isError) reset()
            }}
          />
          <Button
            size="lg"
            className="h-12 font-semibold uppercase"
            disabled={!isValid || isPending}
            onClick={handleAdd}
          >
            {isPending ? 'Checking...' : content.action}
            {!isPending && (
              <Zap
                className="ml-2 size-5"
                aria-hidden="true"
                fill="currentColor"
              />
            )}
          </Button>
        </div>

        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error instanceof Error
                ? error.message
                : 'Something went wrong while validating the API Key.'}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
