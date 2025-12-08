import { Link } from 'react-router-dom'
import { Navbar } from '../components/navbar'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card'
import { cn } from '../lib/utils'
import { Footer } from '@/components/Footer'

const heroImage =
    'https://wpfvk11.mep-cdn.net/uplive-website/home_aboutSection.jpg'

const tiles = [
    {
        title: 'Tools',
        description: 'Internal tools',
        href: '/tools/song-monitor',
        active: true,
    },
]

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section with Floating Navbar */}
            <section className="relative h-[85vh] w-full overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroImage})` }}
                    role="presentation"
                />
                {/* Overlay - Darker as requested */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Floating Navbar (includes Top Bar) */}
                <Navbar variant="floating-pill" />

                {/* Hero Content */}
                <div className="container relative flex h-full max-w-6xl flex-col justify-center">
                    <div className="flex flex-col justify-center space-y-6 text-white">
                        <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl drop-shadow-lg">
                            Welcome <br/> Uplivers!
                        </h1>
                    </div>
                </div>
            </section>

            {/* Navigation Section */}
            <section className="container mt-16">
                <header className="mb-10 flex items-center justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Explore</p>
                        <h2 className="text-2xl font-bold">Navigation</h2>
                    </div>
                </header>

                <div className="grid gap-6 md:grid-cols-3">
                    {tiles.map((tile) => (
                        <Card
                            key={tile.title}
                            className={cn(
                                'group h-full hover-lift border-none shadow-sm bg-card',
                                !tile.active && 'opacity-70',
                            )}
                        >
                            <CardContent className="flex h-full flex-col gap-4 p-6">
                                <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                                    {tile.title}
                                </CardTitle>

                                <CardDescription className="line-clamp-3">
                                    {tile.description}
                                </CardDescription>

                                <div className="mt-auto pt-4">
                                    {tile.active ? (
                                        <Button >
                                            <Link to={tile.href!}>
                                                Open
                                            </Link>
                                        </Button>
                                    ) : (
                                        <span className="text-xs font-medium text-muted-foreground">
                                            Coming soon
                                        </span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <Footer/>
        </div>
    )
}
