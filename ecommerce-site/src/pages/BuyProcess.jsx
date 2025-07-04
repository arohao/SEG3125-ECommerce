import { useState } from "react";
import { useCart } from "../contexts/CartContext";

export default function BuyProcess() {
  const { cartItems, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState({ name: "", email: "" });
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: "", expiry: "" });

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handlePersonalChange = (e) =>
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  const handlePaymentChange = (e) =>
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity,
    0
  );

  const handleConfirm = () => {
    // Simulate purchase
    clearCart();
    nextStep();
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Follow Instructions to Buy</h2>
      <div className="mb-4">Step {step} of 4</div>

      {step === 1 && (
        <div>
          <h4>Step 1: Review Your Cart</h4>
          {cartItems.length === 0 ? (
            <p>Your cart is empty. Please add items before continuing.</p>
          ) : (
            <>
              <ul className="list-group mb-3">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.name}</strong> x {item.quantity}
                    </div>
                    <div>{item.price}</div>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between fw-bold">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </li>
              </ul>
              <button
                className="btn btn-primary"
                onClick={nextStep}
                disabled={cartItems.length === 0}
              >
                Next: Enter Personal Information
              </button>
            </>
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          <h4>Step 2: Enter Personal Information</h4>
          <input
            className="form-control mb-2"
            name="name"
            placeholder="Full Name"
            value={personalInfo.name}
            onChange={handlePersonalChange}
          />
          <input
            className="form-control mb-2"
            name="email"
            placeholder="Email Address"
            type="email"
            value={personalInfo.email}
            onChange={handlePersonalChange}
          />
          <button className="btn btn-secondary me-2" onClick={prevStep}>
            Back
          </button>
          <button
            className="btn btn-primary"
            onClick={nextStep}
            disabled={!personalInfo.name || !personalInfo.email}
          >
            Next: Payment
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h4>Step 3: Payment Details</h4>
          <input
            className="form-control mb-2"
            name="cardNumber"
            placeholder="Card Number"
            value={paymentInfo.cardNumber}
            onChange={handlePaymentChange}
          />
          <input
            className="form-control mb-2"
            name="expiry"
            placeholder="Expiry Date (MM/YY)"
            value={paymentInfo.expiry}
            onChange={handlePaymentChange}
          />
          <button className="btn btn-secondary me-2" onClick={prevStep}>
            Back
          </button>
          <button
            className="btn btn-primary"
            onClick={handleConfirm}
            disabled={!paymentInfo.cardNumber || !paymentInfo.expiry}
          >
            Confirm Purchase
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h4>Step 4: Confirmation</h4>
          <p>Thank you for your purchase!</p>
          <p>A confirmation email has been sent to {personalInfo.email}.</p>
          <button className="btn btn-primary" onClick={() => setStep(1)}>
            Buy Another Item
          </button>
        </div>
      )}
    </div>
  );
}
