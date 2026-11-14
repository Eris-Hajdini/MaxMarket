import React, { useState } from 'react';
import { X, Lock, Mail, ShieldAlert, CheckCircle2, LogIn, ShieldCheck } from 'lucide-react';
import { HouseMLogo } from './BrandLogo';

export default function AuthModal({ isOpen = true, onClose, onLoginSuccess }) {
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

    // Admin Login check: case-insensitive for "admin", "Admin", or "admin@maxmarket.com"
    const isEmailAdmin = trimmedEmail.toLowerCase() === 'admin' || trimmedEmail.toLowerCase() === 'admin@maxmarket.com';

    if (isEmailAdmin) {
      const adminUser = {
        name: 'Administrator',
        email: 'admin@maxmarket.com',
        role: 'admin'
      };
      // Immediately open admin page without delay
      onLoginSuccess(adminUser);
      onClose();
      setEmail('');
      setPassword('');
      setError('');
      return;
    }

    // Regular Client Login
    const clientUser = {
      name: trimmedEmail.includes('@') ? trimmedEmail.split('@')[0] : trimmedEmail,
      email: trimmedEmail.includes('@') ? trimmedEmail : `${trimmedEmail}@klient.com`,
      role: 'client'
    };
    setSuccessMsg(`Mirësevini përsëri, ${clientUser.name}!`);
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
      <div className="clean-auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          className="clean-auth-close-btn" 
          onClick={onClose}
          aria-label="Mbyll"
        >
          <X size={20} />
        </button>

        <div className="clean-auth-header">
          <div className="clean-auth-logo-wrap">
            <HouseMLogo size={38} color="#1e473b" />
          </div>
          <h2 className="clean-auth-title">Kyqu në MaxMarket</h2>
          <p className="clean-auth-subtitle">
            Hyni në llogarinë tuaj për të parë porositë ose në panelin e administratorit.
          </p>
        </div>

        {error && (
          <div className="clean-auth-alert error">
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="clean-auth-alert success">
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="clean-auth-form">
          <div className="clean-form-group">
            <label className="clean-form-label">Email ose Përdoruesi</label>
            <div className="clean-input-wrap">
              <Mail size={18} className="clean-field-icon" />
              <input
                type="text"
                className="clean-text-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />
            </div>
          </div>

          <div className="clean-form-group">
            <label className="clean-form-label">Fjalëkalimi</label>
            <div className="clean-input-wrap">
              <Lock size={18} className="clean-field-icon" />
              <input
                type="password"
                className="clean-text-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="clean-auth-submit-btn">
            <LogIn size={18} />
            <span>Kyqu Tani</span>
          </button>
        </form>

        <div className="clean-auth-footer">
          <div className="clean-admin-hint">
            <ShieldCheck size={14} color="#1e473b" />
            <span>Llogaria Admin: <code>Admin</code> / <code>Admin</code></span>
          </div>
        </div>
      </div>
    </div>
  );
}
