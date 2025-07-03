import { NavLink } from 'react-router';
import '../styles/component_styles/Nav.css';
import SearchIcon from '../assets/icons/search-icon.svg'
import CartIcon from '../assets/icons/cart-icon.svg'

function Nav() {
  return (
    <nav className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
      <a href="/" className="d-flex align-items-center text-decoration-none">
        <img src={null} alt="Logo" width="40" height="40" className="me-2 logo" />
        <span className="fs-4 fw-bold logo-text">Placeholder</span>
      </a>
      <ul className="d-flex list-unstyled mb-0 align-items-center">
        <li className="ms-4">
          <NavLink to='/blank-for-now' className="text-dark text-decoration-none fw-bold">Shop Products</NavLink>
        </li>
        <li className="ms-4">
          <NavLink to='/cart'><button className="btn btn-primary fw-bold">
            <img src={CartIcon} width="20" height="20" className='me-2 color-white' />
            View Cart (0)
          </button>
          </NavLink>
        </li>
        <li className="ms-4">
          <span className="text-dark text-decoration-none fw-bold"><img src={SearchIcon} width="30" height="30" className='me-2' /></span>
        </li>
      </ul>
    </nav>
  );

}

export default Nav;