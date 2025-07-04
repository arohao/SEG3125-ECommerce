import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './styles/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './pages/App.jsx'
import BrandCatalog from './components/BrandCatalog.jsx'
import Catalog from './pages/Catalog.jsx'
import Cart from './pages/Cart.jsx'
import { CartProvider } from "./contexts/CartContext.jsx"
import BuyProcess from './pages/BuyProcess.jsx';




createRoot(document.getElementById('root')).render(
  <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/catalog/brand/:brandSlug" element={<BrandCatalog />} />
        <Route path="/catalog" element={<Catalog />} />\
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<BuyProcess />} />
      </Routes>'
    </BrowserRouter>
  </CartProvider>
)
