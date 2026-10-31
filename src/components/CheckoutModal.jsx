import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Truck, ShoppingBag, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ isOpen, onClose, cart, onOrderPlaced }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Prishtinë');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod = Cash on Delivery
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 30 ? 0 : 2.5;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !surname || !email || !phone || !address) {
      alert("Ju lutem plotësoni të gjitha fushat e kërkuara!");
      return;
    }

    const newOrderId = 'MAX-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);
    setIsSuccess(true);

    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch (err) {}

    setTimeout(() => {
      onOrderPlaced({
        orderId: newOrderId,
        name,
        surname,
        email,
        phone,
        address,
        city,
        items: cart,
        total
      });
    }, 2500);
  };

  return (
    <div className="checkout-backdrop" onClick={onClose}>
      <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="checkout-success-box">
            <div className="success-anim-icon">
              <CheckCircle size={64} color="#2b8a3e" />
            </div>
            <h2>Porosia u Konfirmua me Sukses!</h2>
            <p className="order-code-badge">Numri i Porosisë: <strong>{orderId}</strong></p>
            <p className="success-sub">
              Faleminderit <strong>{name} {surname}</strong>! Një konfirmim dhe faturë u dërgua në emailin <strong>{email}</strong>.
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
                <span>💵 Totali për pagesë (Cash):</span>
                <strong>€{total.toFixed(2)}</strong>
              </div>
            </div>
            <div className="success-actions-row">
              <button className="view-my-order-btn" onClick={() => {
                onClose();
                if (window.openCustomerOrdersModal) {
                  window.openCustomerOrdersModal();
                }
              }}>
                <Package size={17} />
                <span>Shiko Porosinë Time (Në Pritje)</span>
              </button>
              <button className="done-btn" onClick={onClose}>
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
