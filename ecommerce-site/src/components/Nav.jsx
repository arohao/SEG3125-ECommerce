import { NavLink, Link } from 'react-router-dom';
import '../styles/component_styles/Nav.css';
import SearchIcon from '../assets/icons/search-icon.svg';
import Logo from '../assets/icons/logo.png';
import CartIcon from '../assets/icons/cart-icon.svg';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

function Nav() {
  const { cartItems } = useCart();
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="main-nav">
      <div className="nav-left">
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <img src={Logo} alt="Logo" width="40" height="40" className="me-2 logo" />
          <span className="fs-4 fw-bold logo-text">PCPartzOnCommand</span>
        </Link>
        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <NavLink to="/catalog" className="text-dark text-decoration-none fw-bold">
            Shop Products
          </NavLink>
        </li>
        <li>
          <Link to="/cart" className="text-decoration-none">
            <button className="btn btn-primary fw-bold d-flex align-items-center mt-2 mt-md-0">
              <img src={CartIcon} width="20" height="20" className="me-2" alt="Cart" />
              <span>View Cart ({totalCount})</span>
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
