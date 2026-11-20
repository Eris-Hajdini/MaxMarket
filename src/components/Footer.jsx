import React from 'react';
import { ShieldCheck, Truck, Headphones } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Footer({ onSelectCategory, categories = [] }) {
  const handleCategory = (catId) => {
    if (onSelectCategory) onSelectCategory(catId);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const dynamicCategories = categories && categories.length > 0
    ? categories.filter(c => c.id !== 'all' && c.id !== 'offers')
    : [
        { id: 'kuhinja', name: 'Kitchen' },
        { id: 'organizim', name: 'Storage' },
        { id: 'shtepia', name: 'Home & Living' },
        { id: 'pastrimi', name: 'Cleaning' }
      ];

  return (
    <footer className="mz-footer" id="footer-section">
      {/* Trust bar */}
      <div className="mz-footer-trust">
        <div className="mz-trust-item">
          <ShieldCheck size={28} strokeWidth={1.5} />
          <span>Secure checkout</span>
        </div>
        <div className="mz-trust-divider" />
        <div className="mz-trust-item">
          <Truck size={28} strokeWidth={1.5} />
          <span>Fast delivery</span>
        </div>
        <div className="mz-trust-divider" />
        <div className="mz-trust-item">
          <Headphones size={28} strokeWidth={1.5} />
          <span>Customer support</span>
        </div>
      </div>

      {/* Main footer content */}
      <div className="mz-footer-main">
        <div className="mz-footer-brand">
          <BrandLogo size={24} />
          <p className="mz-footer-brand-desc">
            Everyday essentials for a better home. Quality products for kitchen, storage, cleaning and decor.
          </p>
        </div>

        <div className="mz-footer-col">
          <h4 className="mz-footer-heading">Categories</h4>
          <ul className="mz-footer-links">
            {dynamicCategories.map(c => (
              <li key={c.id}><button onClick={() => handleCategory(c.id)}>{c.name}</button></li>
            ))}
          </ul>
        </div>

        <div className="mz-footer-col">
          <h4 className="mz-footer-heading">Help</h4>
          <ul className="mz-footer-links">
            <li><button onClick={() => alert('Delivery across Kosovo within 24-48h. Free for orders over €50!')}>Delivery</button></li>
            <li><button onClick={() => alert('Returns accepted within 14 days of receipt.')}>Returns</button></li>
            <li><button onClick={() => alert('Payment on delivery (Cash on Delivery).')}>Payment</button></li>
            <li><button onClick={() => alert('Contact: +383 44 123 456 | info@mixzone-ks.com')}>Contact us</button></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mz-footer-bottom">
        <span>© {new Date().getFullYear()} MixZone. All rights reserved.</span>
        <span>Designed for every home.</span>
      </div>
    </footer>
  );
}
