import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import AppLayout from './layouts/AppLayout.tsx'
import WhitepaperPage from './pages/Whitepaper.tsx'
import ScrollToTop from './components/scrollToTop.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<App />} />
          <Route path='/whitepaper' element={<WhitepaperPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
