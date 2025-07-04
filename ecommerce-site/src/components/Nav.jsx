import { NavLink, Link } from 'react-router-dom'
import '../styles/component_styles/Nav.css'
import SearchIcon from '../assets/icons/search-icon.svg'
import CartIcon from '../assets/icons/cart-icon.svg'

function Nav() {
  return (
    <nav className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
      <Link to="/" className="d-flex align-items-center text-decoration-none">
        <img
          src="https://via.placeholder.com/40"
          alt="Logo"
          width="40"
          height="40"
          className="me-2 logo"
        />
        <span className="fs-4 fw-bold logo-text">Placeholder</span>
      </Link>

      <ul className="d-flex list-unstyled mb-0 align-items-center">
        <li className="ms-4">
          <NavLink
            to="/blank-for-now"
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
              View Cart (0)
            </button>
          </Link>
        </li>

        <li className="ms-4">
          <img
            src={SearchIcon}
            width="30"
            height="30"
            alt="Search"
            className="me-2"
            role="button"
          />
        </li>
      </ul>
    </nav>
  )
}

export default Nav
