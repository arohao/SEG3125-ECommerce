import { useCart } from '../contexts/CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart()
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  )

  const handleQuantityChange = (id, value) => {
    const qty = Math.max(1, Math.min(99, Number(value) || 1))
    setQuantities(prev => ({ ...prev, [id]: qty }))
    updateQuantity(id, qty)
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity,
    0
  )

  return (
    <div className="container py-4">
      <h2 className="mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="d-flex align-items-center mb-4 p-3 border rounded bg-white"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: 120, height: 120, objectFit: 'contain' }}
                  className="me-3"
                />
                <div className="flex-grow-1">
                  <h6>{item.name}</h6>
                  <p className="mb-1 text-muted" style={{ fontSize: '0.9rem' }}>
                    {item.specs}
                  </p>
                  <p className="fw-bold text-success mb-0">{item.price}</p>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={quantities[item.id]}
                    onChange={e => handleQuantityChange(item.id, e.target.value)}
                    className="form-control form-control-sm mb-2"
                    style={{ width: 60 }}
                  />
                  <button
                    className="btn btn-link text-danger p-0"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="border rounded p-4 sticky-top bg-white" style={{ top: '20px' }}>
              <h5>Order Summary</h5>
              <p className="mb-2">
                Subtotal ({cartItems.length} items):{' '}
                <span className="fw-bold">${subtotal.toFixed(2)}</span>
              </p>
              <button
                className="btn btn-warning w-100 mt-3"
                onClick={() => navigate('/checkout')}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
              <small className="text-muted d-block mt-2">
                * Checkout button disabled (demo only)
              </small>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
