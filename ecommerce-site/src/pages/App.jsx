import Nav from "../components/Nav.jsx";
import Hero from "../components/Hero.jsx";
import CategoryBox from "../components/CategoryBox.jsx";
import ShopByBrand from "../components/ShopByBrand.jsx";
import HotDeals from "../components/HotDeals.jsx";

import "../styles/App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
  return (
    <div className="app">
      <Nav />
      <Hero />
      <HotDeals />
      <CategoryBox />
      <ShopByBrand />
    </div>
  );
}