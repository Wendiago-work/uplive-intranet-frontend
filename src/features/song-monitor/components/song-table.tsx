import { AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { Badge } from '../../../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { ScrollArea } from '../../../components/ui/scroll-area'
import { format } from '../../utils/format'
import type { Song } from '../data'

type Props = {
  songs: Song[]
  isLoading: boolean
}

const statusBadge = (status: Song['status']) => {
  if (status === 'flagged')
    return (
      <Badge variant="warning" className="flex items-center gap-1">
        <AlertCircle className="h-3 w-3" aria-hidden="true" />
        Flagged
      </Badge>
    )
  if (status === 'pending')
    return (
      <Badge variant="muted" className="flex items-center gap-1">
        <Clock className="h-3 w-3" aria-hidden="true" />
        Pending
      </Badge>
    )
  return (
    <Badge variant="primary" className="flex items-center gap-1">
      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
      OK
    </Badge>
  )
}

export function SongTable({ songs, isLoading }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Songs</CardTitle>
        <p className="text-xs text-muted-foreground">
          {isLoading ? 'Loading…' : `${songs.length} items`}
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="max-h-[480px]">
          <table className="min-w-full text-left text-sm">
            <thead className="sticky top-0 bg-muted/60 backdrop-blur">
              <tr className="text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Artist</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last action</th>
                <th className="px-4 py-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr key={song.id} className="border-t border-border/70">
                  <td className="px-4 py-3 font-medium">{song.title}</td>
                  <td className="px-4 py-3">{song.artist}</td>
                  <td className="px-4 py-3">{statusBadge(song.status)}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {song.lastAction}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {format.short(song.updatedAt)}
                  </td>
                </tr>
              ))}
              {!songs.length && !isLoading && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-muted-foreground"
                  >
                    No songs found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
