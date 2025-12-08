import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function ToolsLayout() {
    return (
        <div style={{ "--header-height": "3.5rem" } as React.CSSProperties}>
            <SidebarProvider className="flex flex-col">
                <SiteHeader />
                <div className="flex flex-1">
                    <AppSidebar />
                    <SidebarInset>
                        <main className="container">
                            <Outlet />
                        </main>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    )
}
