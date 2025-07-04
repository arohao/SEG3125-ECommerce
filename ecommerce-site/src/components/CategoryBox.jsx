import { Link } from 'react-router-dom'
import '../styles/component_styles/CategoryBox.css'

const categories = [
  { name: 'Laptops + Tablets', slug: 'laptops', icon: 'bi-laptop' },
  { name: 'Desktops', slug: 'desktops', icon: 'bi-pc-display' },
  { name: 'CPUs', slug: 'cpus', icon: 'bi-cpu' },
  { name: 'Keyboards', slug: 'keyboards', icon: 'bi-keyboard' },
  { name: 'Mice', slug: 'mice', icon: 'bi-mouse' },
  { name: 'Monitors', slug: 'monitors', icon: 'bi-display' }
]

const CategoryBox = () => {
  return (
    <div className="category-box container mt-3 px-4 py-4">
      <div className="row">
        {categories.map(({ name, slug, icon }) => (
          <div key={slug} className="col-6 col-md-4 col-lg-3 mb-3">
            <Link to={`/catalog?category=${slug}`} className="category-card text-decoration-none text-center">
              <i className={`bi ${icon} fs-2 mb-2 d-block`}></i>
              <span className="fw-semibold">{name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryBox
