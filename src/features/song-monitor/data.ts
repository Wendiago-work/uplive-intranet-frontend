export type SongStatus = 'ok' | 'flagged' | 'pending'

export type Song = {
  id: string
  title: string
  artist: string
  status: SongStatus
  lastAction: string
  updatedAt: string
}

export type SongSummary = {
  total: number
  flagged: number
  lastSync: string
}

const songs: Song[] = [
  {
    id: '1',
    title: 'Midnight Drive',
    artist: 'Nova Echo',
    status: 'ok',
    lastAction: 'Approved',
    updatedAt: '2025-11-28T09:15:00Z',
  },
  {
    id: '2',
    title: 'City Lights',
    artist: 'Violet Wave',
    status: 'flagged',
    lastAction: 'Awaiting rights check',
    updatedAt: '2025-11-30T14:05:00Z',
  },
  {
    id: '3',
    title: 'Dawn Chorus',
    artist: 'Atlas Bloom',
    status: 'pending',
    lastAction: 'Metadata update',
    updatedAt: '2025-12-01T16:20:00Z',
  },
  {
    id: '4',
    title: 'Neon Bloom',
    artist: 'Pulse District',
    status: 'ok',
    lastAction: 'Synced to catalog',
    updatedAt: '2025-11-29T11:45:00Z',
  },
  {
    id: '5',
    title: 'Golden Hour',
    artist: 'Sierra Lane',
    status: 'flagged',
    lastAction: 'Lyrics mismatch',
    updatedAt: '2025-12-02T02:10:00Z',
  },
]

export async function fetchSongs(): Promise<Song[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return songs
}

export async function fetchSummary(): Promise<SongSummary> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return {
    total: songs.length,
    flagged: songs.filter((s) => s.status === 'flagged').length,
    lastSync: '2025-12-02T08:00:00Z',
  }
}
