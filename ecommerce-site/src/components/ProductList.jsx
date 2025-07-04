import { useCart } from '../contexts/CartContext'
import '../styles/component_styles/ProductList.css'

const ProductList = ({ products }) => {
  const { addToCart } = useCart()

  if (!products.length) return <p>No products found.</p>

  return (
    <div className="row g-4">
      {products.map(p => (
        <div key={p.id} className="col-6 col-md-4 col-lg-3">
          <div className="card h-100 shadow-sm">
            <img
              src={p.img}
              className="card-img-top product-image"
              alt={p.name}
            />
            <div className="card-body d-flex flex-column">
              <h6 className="card-title mb-1">{p.name}</h6>
              <p className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>
                {p.specs}
              </p>
              <p className="fw-bold text-success mb-1">{p.price}</p>
              <div className="mb-2" style={{ fontSize: '0.85rem' }}>
                <span className="text-warning me-2">
                  {'★'.repeat(Math.floor(p.rating))}
                  {'☆'.repeat(5 - Math.floor(p.rating))}
                </span>
                <span className={p.inStock ? 'text-success' : 'text-danger'}>
                  {p.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <button
                className="btn btn-sm btn-primary mt-auto"
                onClick={() => addToCart(p)}
                disabled={!p.inStock}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList
