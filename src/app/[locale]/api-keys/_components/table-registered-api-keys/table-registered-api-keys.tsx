'use client'
import { CircleSmall, KeyRound, Trash2 } from 'lucide-react'
import { useIntlayer as t } from 'next-intlayer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { useApiKeyStore } from '@/store/use-api-key-store'

export const TableRegisteredApiKeys = () => {
  const content = t('table-registered-api-keys')
  const { apiKeys, removeApiKey } = useApiKeyStore()

  return (
    <div className="border-secondary bg-card rounded-2xl border">
      <Typography
        variant="h3"
        className="flex items-center gap-2 border-b px-6 py-4 text-xl"
      >
        <KeyRound className="text-primary size-6" />
        {content.title}
      </Typography>
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="border-none">
            <TableHead className="px-6 py-4 text-center font-semibold">
              {content.tableHeader.status}
            </TableHead>
            <TableHead className="px-6 py-4 font-semibold">
              {content.tableHeader.account}
            </TableHead>
            <TableHead className="px-6 py-4 font-semibold">
              {content.tableHeader.apiKey}
            </TableHead>
            <TableHead className="px-6 py-4 text-center font-semibold">
              {content.tableHeader.actions}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                <Typography className="text-muted-foreground">
                  {content.tableBody.emptyState}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            apiKeys.map((item) => (
              <TableRow key={item.apiKey} className="border-none">
                <TableCell className="px-6 py-4 text-center">
                  <Badge
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      item.status.toLowerCase() === 'valid'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-red-500/10 text-red-500'
                    }`}
                  >
                    <CircleSmall className="mr-1 size-3" fill="currentColor" />
                    {item.status.toLowerCase() === 'valid' &&
                      content.tableBody.status.valid}
                    {item.status.toLowerCase() === 'invalid' &&
                      content.tableBody.status.invalid}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Typography variant="large" className="">
                    {item.account}
                  </Typography>
                </TableCell>
                <TableCell className="px-6 py-4 text-center">
                  <Typography
                    variant="code"
                    className="text-muted-foreground block max-w-50! overflow-hidden text-xs text-ellipsis"
                  >
                    {item.apiKey}
                  </Typography>
                </TableCell>
                <TableCell className="px-6 py-4 text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive h-8 w-8 transition-colors"
                    onClick={() => removeApiKey(item.apiKey)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
