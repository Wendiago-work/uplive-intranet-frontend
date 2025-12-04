import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/logo-purple.png'
import { cn } from '../lib/utils'
import { Button } from './ui/button'

type NavbarProps = {
  floating?: boolean
}

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Tools', href: '/tools/song-monitor' },
]

export function Navbar({ floating = false }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header
      className={cn(
        'left-0 right-0 top-0 z-30 border-b border-border/60 backdrop-blur supports-backdrop-filter:bg-background/70',
        floating
          ? 'absolute bg-background/40 shadow-lg'
          : 'sticky bg-background shadow-sm',
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Uplive" className="h-8 w-auto" />
          <span className="text-sm font-semibold text-foreground">Intranet</span>
        </Link>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition hover:text-primary',
                  isActive && 'text-primary',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background/95 px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition hover:bg-muted',
                    isActive ||
                      (item.href !== '/' && location.pathname.startsWith(item.href))
                      ? 'text-primary bg-muted'
                      : 'text-foreground',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
