import { create } from 'zustand'
import type { SongStatus } from './data'

type FilterState = {
  query: string
  status: SongStatus | 'all'
  setQuery: (value: string) => void
  setStatus: (value: SongStatus | 'all') => void
}

export const useSongFilters = create<FilterState>((set) => ({
  query: '',
  status: 'all',
  setQuery: (value) => set({ query: value }),
  setStatus: (value) => set({ status: value }),
}))
