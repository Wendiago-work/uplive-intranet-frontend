import { RefreshCw } from 'lucide-react'
import { format } from '../../utils/format'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import type { SongSummary } from '../data'

type Props = {
  summary?: SongSummary
  isLoading: boolean
  onRefresh: () => void
}

export function KpiCards({ summary, isLoading, onRefresh }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="col-span-2 md:col-span-1">
        <CardHeader>
          <CardTitle>Total songs</CardTitle>
          <CardDescription>Monitored entries</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold">
            {isLoading ? '—' : summary?.total ?? 0}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Flagged</CardTitle>
            <CardDescription>Needs attention</CardDescription>
          </div>
          <Badge variant="warning">Review</Badge>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold">
            {isLoading ? '—' : summary?.flagged ?? 0}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Last sync</CardTitle>
            <CardDescription>Backend pull</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Refresh data"
            onClick={onRefresh}
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">
            {isLoading || !summary ? '—' : format.relative(summary.lastSync)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
