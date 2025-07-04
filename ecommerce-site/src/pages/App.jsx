import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import CategoryBox from '../components/CategoryBox.jsx'
import ShopByBrand from '../components/ShopByBrand.jsx'

import '../styles/App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

function App() {
  return (
    <div className="app">
      <Nav />
      <Hero />
      <CategoryBox />
      <ShopByBrand />
    </div>
  )
}

export default App
