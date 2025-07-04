import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './styles/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './pages/App.jsx'
import BrandCatalog from './components/BrandCatalog.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/catalog/brand/:brandSlug" element={<BrandCatalog />} />
    </Routes>
  </BrowserRouter>
)
