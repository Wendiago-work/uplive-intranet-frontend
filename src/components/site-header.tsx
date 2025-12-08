import { SidebarIcon } from "lucide-react"
import { Link, NavLink } from "react-router-dom"
import {AnimatedLinkText} from "./ui/animated-link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import logo from "../assets/logo-purple.png"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-50 w-full border-b py-3 bg-background">
      <div className="flex w-full pl-2">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />

        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Uplive" className="h-8 w-auto" />
          <span className="text-sm font-semibold text-foreground">
            Intranet
          </span>
        </Link>

        <div className="pl-6 hidden items-center gap-6 md:flex">
          <NavLink
            to="/tools/song-monitor"
            className={({ isActive }) =>
              cn(
                "font-title text-xl",
                isActive && "text-primary"
              )
            }
          >
            <AnimatedLinkText>Tools</AnimatedLinkText>
          </NavLink>
        </div>
      </div>
    </header>
  )
}
