import { useState } from 'react'

import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import CategoryBox from '../components/CategoryBox.jsx';
import ShopByBrand from '../components/ShopByBrand.jsx';

import '../styles/App.css'
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <Nav />
      <Hero />
      <CategoryBox />
      <ShopByBrand />
    </div>
  )
}

export default App
