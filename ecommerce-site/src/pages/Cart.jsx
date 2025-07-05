import { useCart } from '../contexts/CartContext';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  );

  const handleQuantityChange = (id, value) => {
    const qty = Math.max(1, Math.min(99, Number(value) || 1));
    setQuantities(prev => ({ ...prev, [id]: qty }));
    updateQuantity(id, qty);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Nav />
      <div className="container py-5">
        <h2 className="mb-4 text-center">Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="text-center my-5">
            <i className="bi bi-cart-x-fill display-4 text-muted mb-3"></i>
            <h4 className="mb-3">Your cart is currently empty</h4>
            <p className="text-muted mb-4">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/catalog" className="btn btn-primary px-4 py-2 fw-semibold">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="d-flex align-items-center mb-4 p-3 border rounded bg-white shadow-sm"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: 100, height: 100, objectFit: 'contain' }}
                    className="me-3 rounded"
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.name}</h6>
                    <p className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>
                      {item.specs}
                    </p>
                    <div className="fw-bold text-success">${item.price.toFixed(2)}</div>
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
                      className="btn btn-link text-danger p-0 small"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-4">
              <div
                className="border rounded p-4 sticky-top shadow-sm bg-light"
                style={{ top: '20px' }}
              >
                <h5 className="mb-3">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</span>
                  <span className="fw-bold">${subtotal.toFixed(2)}</span>
                </div>
                <hr />
                <button
                  className="btn btn-success w-100 fw-semibold"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
