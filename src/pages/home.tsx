import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/navbar'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card'
import { cn } from '../lib/utils'

const heroImage =
  'https://wpfvk11.mep-cdn.net/uplive-website/home_aboutSection.jpg'

const tiles = [
  {
    title: 'Tools',
    description: 'Launch internal tools quickly, starting with Song List Monitor.',
    href: '/tools/song-monitor',
    active: true,
  },
  {
    title: 'HR',
    description: 'Coming soon: benefits, PTO, and org charts.',
    active: false,
  },
  {
    title: 'News',
    description: 'Internal updates and broadcasts will appear here.',
    active: false,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar floating />

      <main>
        <section className="relative isolate overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="presentation"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-4 py-16 md:px-8">
            <h1 className="text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Welcome Uplivers.
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 md:px-8">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">Navigate</p>
              <h2 className="text-2xl font-semibold">Jump into key areas</h2>
            </div>
            <Button variant="ghost" asChild size="sm" className="hidden md:inline-flex">
              <Link to="/tools/song-monitor">
                Go to tools
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </header>

          <div className="grid gap-4 md:grid-cols-3">
            {tiles.map((tile) => (
              <Card
                key={tile.title}
                className={cn(
                  'group h-full transition hover:-translate-y-0.5 hover:shadow-md',
                  !tile.active && 'opacity-70',
                )}
              >
                <CardContent className="flex h-full flex-col gap-3 p-5">
                  <CardTitle className="flex items-center gap-2">
                    {tile.title}
                  </CardTitle>
                  <CardDescription>{tile.description}</CardDescription>
                  <div className="mt-auto flex items-center justify-between">
                    {tile.active ? (
                      <Button variant="secondary" size="sm" asChild>
                        <Link to={tile.href!}>Open</Link>
                      </Button>
                    ) : (
                      <span className="text-xs font-medium text-muted-foreground">
                        Coming soon
                      </span>
                    )}
                    {tile.active && (
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
