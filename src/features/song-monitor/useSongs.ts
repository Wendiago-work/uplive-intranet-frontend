import { useQuery } from '@tanstack/react-query'
import { fetchSongs, fetchSummary } from './data'

export function useSongs() {
  return useQuery({
    queryKey: ['songs'],
    queryFn: fetchSongs,
  })
}

export function useSongSummary() {
  return useQuery({
    queryKey: ['song-summary'],
    queryFn: fetchSummary,
  })
}
