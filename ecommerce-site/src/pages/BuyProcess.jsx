import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function BuyProcess() {
  const { cartItems, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState({ name: "", email: "" });
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: "", expiry: "" });
  const [surveyData, setSurveyData] = useState({
    rating: "",
    feedback: "",
    easeOfFinding: "",
    priceSatisfaction: "",
    usability: "",
  });
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handlePersonalChange = (e) =>
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });

  const handlePaymentChange = (e) =>
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });

  const handleSurveyChange = (e) =>
    setSurveyData({ ...surveyData, [e.target.name]: e.target.value });

  const handleSurveySubmit = (e) => {
    e.preventDefault();
    setSurveySubmitted(true);
  };

  const handleConfirm = () => {
    clearCart();
    nextStep();
  };

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h2 className="text-center fw-bold">Complete Your Purchase</h2>
        <div className="text-center text-muted">Step {step} of 4</div>
        <div className="progress mt-3" style={{ height: "6px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          {step === 1 && (
            <>
              <h4 className="mb-3">🛒 Step 1: Review Your Cart</h4>
              {cartItems.length === 0 ? (
                <p className="text-danger">Your cart is empty. Please add items before continuing.</p>
              ) : (
                <>
                  <ul className="list-group mb-3">
                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <strong>{item.name}</strong> × {item.quantity}
                        </div>
                        <div>${item.price.toFixed(2)}</div>
                      </li>
                    ))}
                    <li className="list-group-item d-flex justify-content-between fw-bold">
                      <span>Total</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </li>
                  </ul>
                  <div className="text-end">
                    <button
                      className="btn btn-primary"
                      onClick={nextStep}
                      disabled={cartItems.length === 0}
                    >
                      Next: Enter Personal Info →
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <h4 className="mb-3">👤 Step 2: Personal Information</h4>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  className="form-control"
                  name="name"
                  value={personalInfo.name}
                  onChange={handlePersonalChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Email Address</label>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={handlePersonalChange}
                  placeholder="you@example.com"
                />
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={prevStep}>
                  ← Back
                </button>
                <button
                  className="btn btn-primary"
                  onClick={nextStep}
                  disabled={!personalInfo.name || !personalInfo.email}
                >
                  Next: Payment →
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h4 className="mb-3">💳 Step 3: Payment Details</h4>
              <div className="mb-3">
                <label className="form-label">Card Number</label>
                <input
                  className="form-control"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Expiry Date (MM/YY)</label>
                <input
                  className="form-control"
                  name="expiry"
                  value={paymentInfo.expiry}
                  onChange={handlePaymentChange}
                  placeholder="08/26"
                />
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={prevStep}>
                  ← Back
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleConfirm}
                  disabled={!paymentInfo.cardNumber || !paymentInfo.expiry}
                >
                  Confirm Purchase ✅
                </button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="text-center mb-4">
                <h4 className="text-success">✅ Purchase Complete!</h4>
                <p>Thank you for your order, <strong>{personalInfo.name}</strong>.</p>
                <p>A confirmation email has been sent to <strong>{personalInfo.email}</strong>.</p>
              </div>

              <div className="mt-4">
                <h5>💬 We'd love your feedback!</h5>
                {!surveySubmitted ? (
                  <form onSubmit={handleSurveySubmit}>
                    <div className="mb-3">
                      <label className="form-label">How easy was it to find what you were looking for?</label>
                      <select
                        className="form-select"
                        name="easeOfFinding"
                        value={surveyData.easeOfFinding}
                        onChange={handleSurveyChange}
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="very easy">Very easy</option>
                        <option value="easy">Easy</option>
                        <option value="average">Average</option>
                        <option value="difficult">Difficult</option>
                        <option value="very difficult">Very difficult</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">How satisfied are you with the price of your purchase?</label>
                      <select
                        className="form-select"
                        name="priceSatisfaction"
                        value={surveyData.priceSatisfaction}
                        onChange={handleSurveyChange}
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="very satisfied">Very satisfied</option>
                        <option value="satisfied">Satisfied</option>
                        <option value="neutral">Neutral</option>
                        <option value="dissatisfied">Dissatisfied</option>
                        <option value="very dissatisfied">Very dissatisfied</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">How would you rate the overall usability of our website?</label>
                      <select
                        className="form-select"
                        name="usability"
                        value={surveyData.usability}
                        onChange={handleSurveyChange}
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="poor">Poor</option>
                        <option value="terrible">Terrible</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Additional comments:</label>
                      <textarea
                        className="form-control"
                        name="feedback"
                        rows="3"
                        value={surveyData.feedback}
                        onChange={handleSurveyChange}
                        placeholder="Tell us what you liked or how we can improve..."
                      />
                    </div>

                    <button type="submit" className="btn btn-outline-primary">
                      Submit Feedback
                    </button>
                  </form>
                ) : (
                  <div className="alert alert-success mt-3">
                    🎉 Thank you for your feedback!
                  </div>
                )}
              </div>

              <div className="text-center mt-4">
                <Link to="/catalog" className="btn btn-primary">
                  Continue Shopping
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
