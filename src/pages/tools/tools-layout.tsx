import { Home, ListMusic, Sparkles } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { Navbar } from '../../components/navbar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '../../components/ui/sidebar'

export default function ToolsLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="flex">
          <Sidebar collapsible="offcanvas">
            <SidebarHeader className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>Tools</span>
              </div>
              <SidebarTrigger className="lg:hidden" />
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <NavLink to="/" end>
                        {({ isActive }) => (
                          <SidebarMenuButton data-active={isActive} asChild>
                            <span className="flex items-center gap-2">
                              <Home className="h-4 w-4" aria-hidden="true" />
                              <span>Home</span>
                            </span>
                          </SidebarMenuButton>
                        )}
                      </NavLink>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <NavLink to="/tools/song-monitor">
                        {({ isActive }) => (
                          <SidebarMenuButton data-active={isActive} asChild>
                            <span className="flex items-center gap-2">
                              <ListMusic className="h-4 w-4" aria-hidden="true" />
                              <span>Song List Monitor</span>
                            </span>
                          </SidebarMenuButton>
                        )}
                      </NavLink>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="px-4 py-3 text-xs text-muted-foreground">
              Internal tools · Draft
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>

          <SidebarInset>
            <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6 md:px-8">
              <Outlet />
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
