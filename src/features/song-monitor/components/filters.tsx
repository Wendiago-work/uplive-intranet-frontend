import { Search } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { useSongFilters } from '../state'

const statusFilters = [
  { label: 'All', value: 'all' },
  { label: 'OK', value: 'ok' },
  { label: 'Flagged', value: 'flagged' },
  { label: 'Pending', value: 'pending' },
] as const

export function FiltersPanel() {
  const { query, status, setQuery, setStatus } = useSongFilters()

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search songs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {statusFilters.map((item) => (
          <Button
            key={item.value}
            variant={status === item.value ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setStatus(item.value)}
            aria-pressed={status === item.value}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
