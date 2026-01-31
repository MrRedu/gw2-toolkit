// This is the implementation for the "Server" part of TanStack Query (Hydration)
// Following: https://tanstack.com/query/v5/docs/framework/react/guides/advanced-ssr#initial-setup
import { dehydrate,HydrationBoundary } from '@tanstack/react-query'
import { cache } from 'react'

import { makeQueryClient } from '@/lib/query-client'

// Use React cache to prevent re-creating the QueryClient during a single request
export const getQueryClient = cache(() => makeQueryClient())

export { dehydrate, HydrationBoundary }
