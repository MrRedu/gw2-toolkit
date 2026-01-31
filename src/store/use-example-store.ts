import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface ExampleState {
  count: number
  increase: (by: number) => void
  reset: () => void
}

export const useExampleStore = create<ExampleState>()(
  persist(
    (set) => ({
      count: 0,
      increase: (by) => set((state) => ({ count: state.count + by })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: 'example-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
