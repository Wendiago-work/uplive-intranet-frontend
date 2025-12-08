import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

const API_BASE = import.meta.env.VITE_API_BASE ?? '/api'
const COUNTRY_CSV_URL =
  import.meta.env.VITE_COUNTRY_CSV_URL ??
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRt5UzH0OQARBJQjtIagJzsPTa5u1VfrkTRDQS1lkHPxm0Nz5AGwEQR3Z9ALvULStpENXFd6cktzuRF/pub?gid=1507620471&single=true&output=csv'

export type SongRecord = {
  id: string
  songName: string
  artistName: string
}

export type SongPerformanceRecord = SongRecord & {
  rank?: number | null
  user_count?: number | null
  song_start_count?: number | null
  total_ads_per_DAU?: number | null
}

export type SongMonitorResponse = {
  source: {
    firebaseSongs: SongRecord[]
    metabase: Record<string, unknown>[]
  }
  merged: SongPerformanceRecord[]
}

export async function fetchAppList(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/song-monitor/apps`)
  if (!res.ok) throw new Error(`Failed to load apps (${res.status})`)
  const data: unknown = await res.json()
  return Array.isArray(data)
    ? (data as { appId?: string }[])
        .map((row) => row?.appId)
        .filter((v): v is string => typeof v === 'string' && v.length > 0)
    : []
}

export async function fetchConditionList(appId: string): Promise<string[]> {
  if (!appId) return []
  const res = await fetch(`${API_BASE}/song-monitor/conditions?appId=${encodeURIComponent(appId)}`)
  if (!res.ok) throw new Error(`Failed to load conditions (${res.status})`)
  const data: unknown = await res.json()
  return Array.isArray(data)
    ? (data as string[]).filter((g): g is string => typeof g === 'string' && g.length > 0)
    : []
}

export async function fetchCountries(): Promise<{ country: string; country_code: string }[]> {
  const res = await fetch(COUNTRY_CSV_URL)
  if (!res.ok) throw new Error(`Failed to load countries (${res.status})`)
  const text = await res.text()
  const rows = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
  const [, ...dataRows] = rows
  return dataRows
    .map((line) => line.split(','))
    .filter((cols) => cols.length >= 2)
    .map(([country, country_code]) => ({ country: country.trim(), country_code: country_code.trim() }))
}

export async function fetchSongMonitor(params: {
  appId: string
  condition: string
  country: string
}): Promise<SongPerformanceRecord[]> {
  const { appId, condition, country } = params
  if (!appId || !condition || !country) return []

  const url = `${API_BASE}/song-monitor?appId=${encodeURIComponent(appId)}&condition=${encodeURIComponent(
    condition,
  )}&country=${encodeURIComponent(country)}`

  const res = await fetch(url)
  const text = await res.text()
  let body: SongMonitorResponse | string = text
  try {
    body = JSON.parse(text)
  } catch {
    // response might be plain text error
  }

  if (!res.ok) {
    const message = typeof body === 'string' ? body : 'Request failed'
    throw new Error(message)
  }

  if (typeof body === 'object' && body !== null && 'merged' in body && Array.isArray((body as SongMonitorResponse).merged)) {
    return (body as SongMonitorResponse).merged
  }

  return []
}

export function useSongMonitorApps(options?: UseQueryOptions<string[]>) {
  return useQuery({
    queryKey: ['song-monitor', 'apps'],
    queryFn: fetchAppList,
    staleTime: 5 * 60 * 1000,
    ...options,
  })
}

export function useSongMonitorConditions(appId: string, options?: UseQueryOptions<string[]>) {
  return useQuery({
    queryKey: ['song-monitor', 'conditions', appId],
    queryFn: () => fetchConditionList(appId),
    enabled: Boolean(appId),
    retry: 1,
    ...options,
  })
}

export function useSongMonitorCountries(options?: UseQueryOptions<{ country: string; country_code: string }[]>) {
  return useQuery({
    queryKey: ['song-monitor', 'countries'],
    queryFn: fetchCountries,
    staleTime: Infinity,
    ...options,
  })
}

type MergedOptions = Omit<UseQueryOptions<SongPerformanceRecord[]>, 'queryKey' | 'queryFn'>

export function useSongMonitorMerged(
  params: { appId: string; condition: string; country: string },
  options?: MergedOptions,
) {
  const { appId, condition, country } = params
  const enabled = options?.enabled ?? false
  return useQuery({
    queryKey: ['song-monitor', 'merged', appId, condition, country],
    queryFn: () => fetchSongMonitor(params),
    enabled,
    retry: false,
    ...options,
  })
}
