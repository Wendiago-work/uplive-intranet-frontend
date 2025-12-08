import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo-purple.png";
import { cn } from "../lib/utils";
import { Button} from "./ui/button";
import {AnimatedLinkText} from "./ui/animated-link"

type NavbarProps = {
  variant?: "default" | "floating-pill";
};

const baseLinkClasses = "block font-title text-xl uppercase text-foreground hover:text-primary transition-colors";

export function Navbar({ variant = "default" }: NavbarProps) {
  const [open, setOpen] = useState(false);

  if (variant === "floating-pill") {
    return (
      <header className="absolute left-0 right-0 top-6 z-40 flex justify-center">
        <nav className="flex w-full container py-4 max-w-6xl items-center justify-between rounded-full bg-background backdrop-blur-sm">
          {/* Left: Logo & Nav Items */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img src={logo} alt="Uplive" className="h-8 w-auto" />
              <span className="text-lg font-bold text-primary">Intranet</span>
            </Link>
            <NavLink
              to="/tools/song-monitor"
              className={baseLinkClasses}
            >
              <AnimatedLinkText>Tools</AnimatedLinkText>
            </NavLink>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-30 h-14 border-b border-border/60 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/70 shadow-sm"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Uplive" className="h-8 w-auto" />
          <span className="text-sm font-semibold text-foreground">
            Intranet
          </span>
        </Link>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
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
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition hover:text-primary",
                isActive && "text-primary"
              )
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/tools/song-monitor"
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition hover:text-primary",
                isActive && "text-primary"
              )
            }
          >
            Tools
          </NavLink>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background/95 px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-2">
            <Link to="/" className="block py-2 text-sm font-medium">
              Home
            </Link>
            <Link
              to="/tools/song-monitor"
              className="block py-2 text-sm font-medium"
            >
              Tools
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
