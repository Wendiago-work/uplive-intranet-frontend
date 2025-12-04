import { useState, useEffect } from 'react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'

const API_BASE = import.meta.env.VITE_API_BASE ?? '/api'
const COUNTRY_CSV_URL = '/country.csv'
type AppRow = { appId: string }
type ConditionRow = string
type CountryRow = { country: string; country_code: string }

export default function SongMonitorPage() {
  const [appId, setAppId] = useState('')
  const [condition, setCondition] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [payload, setPayload] = useState<unknown>(null)
  const [appOptions, setAppOptions] = useState<string[]>([])
  const [appLoadError, setAppLoadError] = useState<string | null>(null)
  const [appLoading, setAppLoading] = useState(false)
  const [conditionOptions, setConditionOptions] = useState<string[]>([])
  const [conditionLoading, setConditionLoading] = useState(false)
  const [conditionLoadError, setConditionLoadError] = useState<string | null>(null)
  const [countryOptions, setCountryOptions] = useState<CountryRow[]>([])
  const [country, setCountry] = useState('')
  const [countryLoading, setCountryLoading] = useState(false)
  const [countryLoadError, setCountryLoadError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      setAppLoading(true)
      try {
        const res = await fetch(`${API_BASE}/song-monitor/apps`)
        if (!res.ok) throw new Error(`Failed to load apps (${res.status})`)
        const data: unknown = await res.json()
        const ids = Array.isArray(data)
          ? (data as AppRow[])
              .map((row) => row?.appId)
              .filter((v): v is string => typeof v === 'string' && v.length > 0)
          : []
        setAppOptions(ids)
      } catch (e) {
        setAppLoadError(e instanceof Error ? e.message : String(e))
      } finally {
        setAppLoading(false)
      }
    }
    void run()
  }, [appId])

  // load country list from CSV once
  useEffect(() => {
    const loadCountries = async () => {
      setCountryLoading(true)
      try {
        const res = await fetch(COUNTRY_CSV_URL)
        if (!res.ok) throw new Error(`Failed to load countries (${res.status})`)
        const text = await res.text()
        const rows = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
        const [, ...dataRows] = rows // skip header
        const parsed: CountryRow[] = dataRows
          .map((line) => line.split(','))
          .filter((cols) => cols.length >= 2)
          .map(([country, country_code]) => ({
            country: country.trim(),
            country_code: country_code.trim(),
          }))
        setCountryOptions(parsed)
      } catch (e) {
        setCountryLoadError(e instanceof Error ? e.message : String(e))
      } finally {
        setCountryLoading(false)
      }
    }
    void loadCountries()
  }, [])

  useEffect(() => {
    const loadConditions = async () => {
      if (!appId) return
      setConditionLoading(true)
      setConditionLoadError(null)
      try {
        const res = await fetch(`${API_BASE}/song-monitor/conditions?appId=${encodeURIComponent(appId)}`)
        if (!res.ok) throw new Error(`Failed to load conditions (${res.status})`)
        const data: unknown = await res.json()
        const conditions = Array.isArray(data)
          ? (data as ConditionRow[]).filter((g): g is string => typeof g === 'string' && g.length > 0)
          : []
        setConditionOptions(conditions)
      } catch (e) {
        setConditionLoadError(e instanceof Error ? e.message : String(e))
        setConditionOptions([])
      } finally {
        setConditionLoading(false)
      }
    }
    void loadConditions()
  }, [appId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!appId.trim() || !condition.trim() || !country.trim()) return
    setLoading(true)
    setError(null)
    setPayload(null)
    try {
      const url = `${API_BASE}/song-monitor?appId=${encodeURIComponent(appId.trim())}&condition=${encodeURIComponent(
        condition.trim(),
      )}&country=${encodeURIComponent(country.trim())}`
      const res = await fetch(url)
      const text = await res.text()
      let body: unknown = text
      try {
        body = JSON.parse(text)
      } catch {
        // leave as text
      }
      if (!res.ok) {
        const message = typeof body === 'string' ? body : 'Request failed'
        throw new Error(message)
      }
      setPayload(body)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-primary">Tools</p>
        <h1 className="text-2xl font-semibold">Song List Monitor</h1>
        <p className="text-sm text-muted-foreground">
          Query Firebase song lists and Metabase performance data by App ID and Condition.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Run query</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-wrap items-end gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-foreground" htmlFor="appId">
                App ID
              </label>
              <Select value={appId} onValueChange={setAppId} disabled={appLoading || appOptions.length === 0}>
                <SelectTrigger className="min-w-[220px]" aria-busy={appLoading}>
                  <SelectValue placeholder={appLoading ? 'Loading…' : 'Select an app'} />
                </SelectTrigger>
                <SelectContent>
                  {appOptions.map((id) => (
                    <SelectItem key={id} value={id}>
                      {id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {appLoadError && <span className="text-xs text-destructive">{appLoadError}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-foreground" htmlFor="condition">
                Condition
              </label>
              <Select
                value={condition}
                onValueChange={setCondition}
                disabled={conditionLoading || conditionOptions.length === 0}
              >
                <SelectTrigger className="min-w-[160px]" aria-busy={conditionLoading}>
                  <SelectValue placeholder={conditionLoading ? 'Loading…' : 'Select condition'} />
                </SelectTrigger>
                <SelectContent>
                  {conditionOptions.map((code) => (
                    <SelectItem key={code} value={code}>
                      {code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {conditionLoadError && <span className="text-xs text-destructive">{conditionLoadError}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-foreground" htmlFor="country">
                Country
              </label>
              <Select
                value={country}
                onValueChange={setCountry}
                disabled={countryLoading || countryOptions.length === 0}
              >
                <SelectTrigger className="min-w-[220px]" aria-busy={countryLoading}>
                  <SelectValue placeholder={countryLoading ? 'Loading…' : 'Select a country'} />
                </SelectTrigger>
                <SelectContent>
                  {countryOptions.map((c) => (
                    <SelectItem key={c.country_code} value={c.country}>
                      {c.country} ({c.country_code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {countryLoadError && <span className="text-xs text-destructive">{countryLoadError}</span>}
            </div>
            <Button
              type="submit"
              disabled={loading || !appId.trim() || !condition.trim() || !country.trim()}
            >
              {loading ? 'Running...' : 'Fetch'}
            </Button>
            {error && <span className="text-sm font-semibold text-destructive">{error}</span>}
          </form>
        </CardContent>
      </Card>

      <Card className="min-h-[320px]">
        <CardHeader>
          <CardTitle>Response</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="max-h-[420px] overflow-auto rounded-lg bg-slate-950/90 p-3 text-xs text-slate-50">
            {payload ? JSON.stringify(payload, null, 2) : loading ? 'Loading…' : 'No data yet.'}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
