import { useCart } from '../contexts/CartContext'
import '../styles/component_styles/ProductList.css'

const ProductList = ({ products }) => {
  const { addToCart } = useCart()

  if (!products.length) return <p>No products found.</p>

  return (
    <div className="row g-4">
      {products.map(p => {
        // Calculate discount percent if any
        const hasDeal =
          p.originalPrice && p.originalPrice > p.price
        const discountPercent = hasDeal
          ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
          : 0

        return (
          <div key={p.id} className="col-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm position-relative">

              {/* Discount Badge */}
              {hasDeal && (
                <div
                  className="badge bg-danger position-absolute"
                  style={{ top: "10px", right: "10px", zIndex: 10 }}
                  title={`${discountPercent}% off`}
                >
                  -{discountPercent}%
                </div>
              )}

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
                <p className="mb-1">
                  {hasDeal ? (
                    <>
                      <span
                        className="text-muted me-2"
                        style={{ textDecoration: 'line-through' }}
                      >
                        ${p.originalPrice.toFixed(2)}
                      </span>
                      <span className="fw-bold text-success">
                        ${p.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="fw-bold text-success">${p.price.toFixed(2)}</span>
                  )}
                </p>
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
        )
      })}
    </div>
  )
}

export default ProductList
