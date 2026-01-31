import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface ApiKeyData {
  status: string
  account: string
  apiKey: string
}

interface ApiKeyState {
  apiKeys: ApiKeyData[]
  addApiKey: (apiKey: string, account: string) => void
  removeApiKey: (apiKey: string) => void
}

export const useApiKeyStore = create<ApiKeyState>()(
  persist(
    (set) => ({
      apiKeys: [],
      addApiKey: (apiKey, account) =>
        set((state) => {
          if (state.apiKeys.some((k) => k.apiKey === apiKey)) return state

          const newEntry: ApiKeyData = {
            status: 'valid',
            account: account,
            apiKey,
          }
          return { apiKeys: [newEntry, ...state.apiKeys] }
        }),
      removeApiKey: (apiKey) =>
        set((state) => ({
          apiKeys: state.apiKeys.filter((k) => k.apiKey !== apiKey),
        })),
    }),
    {
      name: 'api-key-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
