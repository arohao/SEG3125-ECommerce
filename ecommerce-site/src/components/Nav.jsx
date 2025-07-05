import { NavLink, Link } from 'react-router-dom'
import '../styles/component_styles/Nav.css'
import SearchIcon from '../assets/icons/search-icon.svg'
import CartIcon from '../assets/icons/cart-icon.svg'
import { useCart } from '../contexts/CartContext'

function Nav() {
  const { cartItems } = useCart()
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  return (
    <nav className="d-flex align-items-center justify-content-between px-5 py-3 border-bottom">
      <Link to="/" className="d-flex align-items-center text-decoration-none">
        <img
          src="https://via.placeholder.com/40"
          alt="Logo"
          width="40"
          height="40"
          className="me-2 logo"
        />
        <span className="fs-4 fw-bold logo-text">PCPartzOnCommand</span>
      </Link>

      <ul className="d-flex list-unstyled mb-0 align-items-center">
        <li className="ms-4">
          <NavLink
            to="/catalog"
            className="text-dark text-decoration-none fw-bold"
          >
            Shop Products
          </NavLink>
        </li>

        <li className="ms-4">
          <Link to="/cart" className="text-decoration-none">
            <button className="btn btn-primary fw-bold d-flex align-items-center">
              <img
                src={CartIcon}
                width="20"
                height="20"
                className="me-2"
                alt="Cart"
              />
              <span>View Cart ({totalCount})</span>
            </button>
          </Link>
        </li>

      </ul>
    </nav>
  )
}

export default Nav
