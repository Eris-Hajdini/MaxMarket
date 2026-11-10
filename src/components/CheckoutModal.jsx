import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Truck, Package, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ isOpen = true, onClose, cart, currentUser, onOrderPlaced, onViewMyOrders }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Prishtinë');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  // Auto-fill customer info if logged in
  useEffect(() => {
    if (currentUser && currentUser.role !== 'admin') {
      if (currentUser.name && !name) setName(currentUser.name);
      if (currentUser.email && !email) setEmail(currentUser.email);
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 30 ? 0 : 2.5;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !surname.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      alert("Ju lutem plotësoni të gjitha fushat e kërkuara!");
      return;
    }

    const newOrderId = 'MAX-' + Math.floor(100000 + Math.random() * 900000);
    const orderData = {
      orderId: newOrderId,
      name: name.trim(),
      surname: surname.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city,
      items: [...cart],
      total,
      paymentMethod
    };

    // Save order immediately into state & localStorage
    onOrderPlaced(orderData);
    setCreatedOrder(orderData);
    setIsSuccess(true);

    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch (err) {}
  };

  const handleReturnToWebsite = () => {
    setIsSuccess(false);
    onClose();
  };

  const handleGoToMyOrders = () => {
    setIsSuccess(false);
    onClose();
    if (onViewMyOrders) {
      onViewMyOrders();
    }
  };

  return (
    <div className="checkout-backdrop" onClick={handleReturnToWebsite}>
      <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={handleReturnToWebsite}>
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="checkout-success-box">
            <div className="success-anim-icon">
              <CheckCircle size={64} color="#2b8a3e" />
            </div>
            <h2>Porosia u Konfirmua me Sukses!</h2>
            <p className="order-code-badge">Numri i Porosisë: <strong>{createdOrder?.orderId}</strong></p>
            <p className="success-sub">
              Faleminderit <strong>{name} {surname}</strong>! Porosia juaj u regjistrua me sukses dhe është ruajtur në llogarinë tuaj.
            </p>

            <div className="success-details-summary">
              <div className="summary-line">
                <span>📍 Adresa e dorëzimit:</span>
                <strong>{address}, {city}</strong>
              </div>
              <div className="summary-line">
                <span>📞 Numri kontaktues:</span>
                <strong>{phone}</strong>
              </div>
              <div className="summary-line">
                <span>💵 Totali për pagesë:</span>
                <strong>€{total.toFixed(2)}</strong>
              </div>
            </div>

            <div className="success-actions-row">
              <button className="view-my-order-btn" onClick={handleGoToMyOrders}>
                <Package size={17} />
                <span>Shiko tek Porositë e Mia</span>
              </button>
              <button className="done-btn" onClick={handleReturnToWebsite}>
                Kthehu në Dyqan
              </button>
            </div>
          </div>
        ) : (
          <div className="checkout-form-container">
            <div className="checkout-header">
              <div className="checkout-pill">
                <Truck size={15} /> Dërgesë në Kosovë & Rajon
              </div>
              <h2>Përfundo Porosinë</h2>
              <p>Plotësoni të dhënat e sakta për dërgimin e pakos tek ju.</p>
            </div>

            <div className="checkout-grid-layout">
              {/* Form Side */}
              <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Emri *</label>
                    <input
                      type="text"
                      placeholder="Emri"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Mbiemri *</label>
                    <input
                      type="text"
                      placeholder="Mbiemri"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Numri i Telefonit *</label>
                    <input
                      type="tel"
                      placeholder="Numri i telefonit"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Qyteti *</label>
                    <select value={city} onChange={(e) => setCity(e.target.value)}>
                      <option value="Prishtinë">Prishtinë</option>
                      <option value="Prizren">Prizren</option>
                      <option value="Pejë">Pejë</option>
                      <option value="Gjakovë">Gjakovë</option>
                      <option value="Ferizaj">Ferizaj</option>
                      <option value="Gjilan">Gjilan</option>
                      <option value="Mitrovicë">Mitrovicë</option>
                      <option value="Tjetër">Qytet tjetër</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Mënyra e Pagesës</label>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                      <option value="cod">Para në dorë (Cash on Delivery)</option>
                      <option value="card">Kartelë Bankare në Dorëzim</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Adresa e Plotë (Rruga, Numri, Kati) *</label>
                  <input
                    type="text"
                    placeholder="Adresa"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="confirm-order-submit-btn">
                  <span>Konfirmo Porosinë (€{total.toFixed(2)})</span>
                  <ArrowRight size={18} />
                </button>
              </form>

              {/* Mini Cart Summary Side */}
              <div className="checkout-summary-side">
                <h4>Përmbledhja ({cart.reduce((s, i) => s + i.quantity, 0)} artikuj)</h4>
                <div className="mini-cart-list">
                  {cart.map((item) => (
                    <div key={item.id} className="mini-item">
                      <img src={item.image} alt={item.name} />
                      <div className="mini-item-info">
                        <h5>{item.name}</h5>
                        <span>{item.quantity} × €{item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mini-totals">
                  <div className="mini-row">
                    <span>Nëntotali:</span>
                    <strong>€{subtotal.toFixed(2)}</strong>
                  </div>
                  <div className="mini-row">
                    <span>Transporti:</span>
                    <strong className={shipping === 0 ? "free-text" : ""}>
                      {shipping === 0 ? "FALAS" : `€${shipping.toFixed(2)}`}
                    </strong>
                  </div>
                  <div className="mini-row total-row">
                    <span>Totali:</span>
                    <span className="grand-price">€{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
