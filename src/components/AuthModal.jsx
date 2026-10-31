import React, { useState } from 'react';
import { X, User, Lock, Mail, ShieldAlert, CheckCircle2, LogIn } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();
    const trimmedPass = password.trim();

    if (!trimmedEmail || !trimmedPass) {
      setError('Ju lutem plotësoni të gjitha fushat.');
      return;
    }

    // Secret Admin Login: Email: "Admin", Password: "Admin" (invisible to customers)
    if (trimmedEmail === 'Admin' && trimmedPass === 'Admin') {
      const adminUser = {
        name: 'Administrator',
        email: 'admin@maxmarket.com',
        role: 'admin'
      };
      setSuccessMsg('Mirësevini përsëri!');
      setTimeout(() => {
        onLoginSuccess(adminUser);
        onClose();
        setSuccessMsg('');
        setEmail('');
        setPassword('');
      }, 500);
      return;
    }

    // Regular Client Login
    const clientUser = {
      name: trimmedEmail.split('@')[0] || 'Klient',
      email: trimmedEmail,
      role: 'client'
    };
    setSuccessMsg(`Mirësevini, ${clientUser.name}!`);
    setTimeout(() => {
      onLoginSuccess(clientUser);
      onClose();
      setSuccessMsg('');
      setEmail('');
      setPassword('');
    }, 500);
  };

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="auth-header">
          <div className="auth-icon-wrap">
            <User size={28} />
          </div>
          <h2>Kyqu në MaxMarket</h2>
          <p>Hyni në llogarinë tuaj për të parë porositë dhe ofertat</p>
        </div>

        {error && (
          <div className="auth-alert error">
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="auth-alert success">
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrap">
              <Mail size={18} className="field-icon" />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrap">
              <Lock size={18} className="field-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-submit-btn">
            <LogIn size={18} />
            <span>Kyqu</span>
          </button>
        </form>

        <div className="auth-footer-help">
          <p>Nuk keni ende llogari? Shkruani emailin dhe kyçeni menjëherë.</p>
        </div>
      </div>
    </div>
  );
}
