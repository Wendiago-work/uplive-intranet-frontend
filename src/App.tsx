import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import SongMonitorPage from './pages/tools/song-monitor'
import ToolsLayout from './pages/tools/tools-layout'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // keep results fresh for 5 minutes
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})

const persister = createSyncStoragePersister({ storage: window.sessionStorage })

function App() {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<ToolsLayout />}>
            <Route path="/tools/song-monitor" element={<SongMonitorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PersistQueryClientProvider>
  )
}

export default App
