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
    <>
      <h2 style={{ textAlign: 'center', marginTop: '100px' }}> Browse by Category</h2>
      <div className="category-box container mt-3 px-4 py-4">
        <div className="row">
          {categories.map(({ name, slug, icon }, index) => {
            // Add 'mx-auto' only to second row items (index 3,4,5)
            const isSecondRow = index >= 3 && index <= 5;
            return (
              <div
                key={slug}
                className={`col-6 col-md-4 col-lg-3 mb-3 ${isSecondRow ? 'mx-auto' : ''}`}
                style={{ textAlign: 'center', }}
              >
                <Link to={`/catalog?category=${slug}`} className=" text-decoration-none text-center">
                  <i className={`bi ${icon} fs-2 mb-2 d-block`}></i>
                  <span className="fw-semibold">{name}</span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}


export default CategoryBox
