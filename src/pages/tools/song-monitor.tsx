import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import {
  useSongMonitorApps,
  useSongMonitorConditions,
  useSongMonitorCountries,
  useSongMonitorMerged,
  type SongPerformanceRecord,
} from '@/api/song-monitor'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { cn } from '@/lib/utils'
import { downloadCsv } from '@/lib/csv'

type ComboOption = { value: string; label: string }

type ComboboxProps = {
  label: string
  value: string
  onChange: (val: string) => void
  options: ComboOption[]
  placeholder: string
  searchPlaceholder: string
  emptyLabel?: string
  loading?: boolean
  disabled?: boolean
  className?: string
}

function Combobox({
  label,
  value,
  onChange,
  options,
  placeholder,
  searchPlaceholder,
  emptyLabel = 'No results found.',
  loading = false,
  disabled = false,
  className,
}: ComboboxProps) {
  const [open, setOpen] = useState(false)

  const selected = useMemo(() => options.find((o) => o.value === value), [options, value])

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="min-w-[220px] justify-between"
            disabled={disabled}
          >
            <span className="truncate">
              {selected ? selected.label : loading ? 'Loading…' : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[260px] p-0">
          <Command
            filter={(value, search, keywords) => {
              const term = search.trim().toLowerCase()
              if (!term) return 1
              const haystack = [value, ...(keywords ?? [])].join(' ').toLowerCase()
              return haystack.includes(term) ? 1 : 0
            }}
          >
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{loading ? 'Loading…' : emptyLabel}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    keywords={[option.label, option.value]}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === option.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    <span className="truncate">{option.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default function SongMonitorPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [appId, setAppId] = useState(() => searchParams.get('appId') ?? '')
  const [condition, setCondition] = useState(() => searchParams.get('condition') ?? '')
  const [country, setCountry] = useState(() => searchParams.get('country') ?? '')

  useEffect(() => {
    const next = new URLSearchParams()
    if (appId) next.set('appId', appId)
    if (condition) next.set('condition', condition)
    if (country) next.set('country', country)
    setSearchParams(next, { replace: true })
  }, [appId, condition, country, setSearchParams])

  const {
    data: appOptions = [],
    isPending: appLoading,
    error: appError,
  } = useSongMonitorApps()

  const {
    data: conditionOptions = [],
    isPending: conditionLoading,
    error: conditionError,
  } = useSongMonitorConditions(appId)

  const {
    data: countryOptions = [],
    isPending: countryLoading,
    error: countryError,
  } = useSongMonitorCountries()

  // disable auto run query
  const {
    data: mergedRows,
    isFetching: mergedLoading,
    error: mergedError,
    refetch: refetchMerged,
  } = useSongMonitorMerged({ appId, condition, country }, { enabled: false })

  const appComboOptions = useMemo(() => appOptions.map((id) => ({ value: id, label: id })), [appOptions])
  const conditionComboOptions = useMemo(
    () => conditionOptions.map((code) => ({ value: code, label: code })),
    [conditionOptions],
  )
  const countryComboOptions = useMemo(
    () =>
      countryOptions.map((c) => ({
        value: c.country,
        label: `${c.country} (${c.country_code})`,
      })),
    [countryOptions],
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!appId.trim() || !condition.trim() || !country.trim()) return
    await refetchMerged()
  }

  const displayError = (err: unknown) =>
    err instanceof Error ? err.message : err ? String(err) : null

  const exportFileName = useMemo(() => {
    const parts = ['songlist']
    if (appId) parts.push(appId)
    if (condition) parts.push(condition)
    if (country) parts.push(country)
    const safe = parts.join('_').replace(/[^a-z0-9_-]+/gi, '_')
    return `${safe || 'songlist'}.csv`
  }, [appId, condition, country])

  const handleExport = () => {
    if (!mergedRows || mergedRows.length === 0) return
    const headers = [
      'id',
      'songName',
      'artistName',
      'rank',
      'user_count',
      'song_start_count',
      'total_ads_per_DAU',
    ]

    downloadCsv(mergedRows as Record<string, unknown>[], headers, exportFileName)
  }

  return (
    <div className="space-y-4 mt-8">
      <div>
        <h1 className="text-2xl font-semibold">Song List Monitor</h1>
        <p className="text-sm text-muted-foreground">
          Query Firebase song lists and Metabase performance data by App ID and Condition.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-wrap items-end gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <Combobox
                label="App ID"
                value={appId}
                onChange={setAppId}
                options={appComboOptions}
                placeholder="Select an app"
                searchPlaceholder="Search app..."
                emptyLabel="No apps found."
                loading={appLoading}
                disabled={appLoading || appComboOptions.length === 0}
              />
              {appError && <span className="text-xs text-destructive">{displayError(appError)}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <Combobox
                label="Condition"
                value={condition}
                onChange={setCondition}
                options={conditionComboOptions}
                placeholder="Select condition"
                searchPlaceholder="Search condition..."
                emptyLabel="No conditions found."
                loading={conditionLoading}
                disabled={conditionLoading || conditionComboOptions.length === 0}
              />
              {conditionError && <span className="text-xs text-destructive">{displayError(conditionError)}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <Combobox
                label="Country"
                value={country}
                onChange={setCountry}
                options={countryComboOptions}
                placeholder="Select a country"
                searchPlaceholder="Search country..."
                emptyLabel="No countries found."
                loading={countryLoading}
                disabled={countryLoading || countryComboOptions.length === 0}
              />
              {countryError && <span className="text-xs text-destructive">{displayError(countryError)}</span>}
            </div>

            <Button type="submit" disabled={mergedLoading || !appId.trim() || !condition.trim() || !country.trim()}>
              {mergedLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                'Fetch'
              )}
            </Button>
            {mergedError && <span className="text-sm font-semibold text-destructive">{displayError(mergedError)}</span>}
          </form>
        </CardContent>
      </Card>

      <Card className="min-h-[320px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-primary">Songlist</CardTitle>
          <Button
            size="sm"
            onClick={handleExport}
            disabled={!mergedRows || mergedRows.length === 0 || mergedLoading}
          >
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          {mergedLoading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Fetching…
            </div>
          )}
          {!mergedLoading && mergedRows && mergedRows.length === 0 && (
            <p className="text-sm text-muted-foreground">No merged data returned.</p>
          )}
          {!mergedLoading && mergedRows && mergedRows.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Song ID</TableHead>
                  <TableHead>Song</TableHead>
                  <TableHead>Artist</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead>User Count</TableHead>
                  <TableHead>Song Starts</TableHead>
                  <TableHead>Ads / DAU</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mergedRows.map((row: SongPerformanceRecord) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.songName}</TableCell>
                    <TableCell>{row.artistName}</TableCell>
                    <TableCell>{row.rank ?? '—'}</TableCell>
                    <TableCell>{row.user_count ?? '—'}</TableCell>
                    <TableCell>{row.song_start_count ?? '—'}</TableCell>
                    <TableCell>{row.total_ads_per_DAU ?? '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {!mergedLoading && !mergedRows && (
            <p className="text-sm text-muted-foreground">No data yet. Run a query to see results.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
