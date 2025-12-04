import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import SongMonitorPage from './pages/tools/song-monitor'
import ToolsLayout from './pages/tools/tools-layout'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<ToolsLayout />}>
            <Route path="/tools/song-monitor" element={<SongMonitorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
