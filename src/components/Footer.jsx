import React from 'react';
import { ShieldCheck, Truck, Headphones } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Footer({ onSelectCategory, categories = [] }) {
  const handleCategory = (catId) => {
    if (onSelectCategory) onSelectCategory(catId);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const dynamicCategories = [
    { id: 'kitchen', name: 'Kuzhina' },
    { id: 'storage', name: 'Organizim & Ruajtje' },
    { id: 'home', name: 'Shtëpia & Jetesa' },
    { id: 'cleaning', name: 'Pastrimi' },
    { id: 'decor', name: 'Dekori' }
  ];

  return (
    <footer className="mz-footer" id="footer-section">
      {/* ── Trust Bar with Dividers ── */}
      <div className="mz-footer-trust">
        <div className="mz-trust-item">
          <ShieldCheck size={26} strokeWidth={1.8} style={{ color: '#16a34a' }} />
          <span>Blerje 100% e sigurt</span>
        </div>
        <div className="mz-trust-divider" />
        <div className="mz-trust-item">
          <Truck size={26} strokeWidth={1.8} style={{ color: '#ea580c' }} />
          <span>Dërgesë e shpejtë 24-48h</span>
        </div>
        <div className="mz-trust-divider" />
        <div className="mz-trust-item">
          <Headphones size={26} strokeWidth={1.8} style={{ color: '#2563eb' }} />
          <span>Kujdesi ndaj klientit</span>
        </div>
      </div>

      {/* ── Main Footer Columns ── */}
      <div className="mz-footer-main">
        <div className="mz-footer-brand">
          <BrandLogo size={32} />
          <p className="mz-footer-brand-desc">
            Gjithçka thelbësore për një shtëpi më të mirë. Produkte cilësore për kuzhinën, organizimin, pastrimin dhe dekorin me dërgesë në të gjithë Kosovën.
          </p>
        </div>

        <div className="mz-footer-col">
          <h4 className="mz-footer-heading">Kategoritë</h4>
          <ul className="mz-footer-links">
            {dynamicCategories.map(c => (
              <li key={c.id}>
                <button onClick={() => handleCategory(c.id)}>{c.name}</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mz-footer-col">
          <h4 className="mz-footer-heading">Ndihmë & Informacion</h4>
          <ul className="mz-footer-links">
            <li><button onClick={() => alert('Dërgesa në të gjithë Kosovën brenda 24-48 orëve.')}>Dërgesa në Kosovë</button></li>
            <li><button onClick={() => alert('Kthimi i produkteve pranohet me thjeshtësi.')}>Politika e kthimit</button></li>
            <li><button onClick={() => alert('Pagesa bëhet me para në dorë gjatë marrjes së porosisë (Cash on Delivery).')}>Mënyra e pagesës</button></li>
            <li><button onClick={() => alert('Tel: +383 44 123 456 | Email: info@mixzone-ks.com')}>Na kontaktoni</button></li>
          </ul>
        </div>
      </div>

      {/* ── Footer Bottom Copyright ── */}
      <div className="mz-footer-bottom">
        <span>© {new Date().getFullYear()} MixZone. Të gjitha të drejtat e rezervuara.</span>
        <span>Dizajnuar me kujdes për çdo shtëpi.</span>
      </div>
    </footer>
  );
}
