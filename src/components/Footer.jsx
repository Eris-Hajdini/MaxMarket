import React from 'react';
import { ShieldCheck, Truck, Headphones, Phone, Mail, MapPin, Clock } from 'lucide-react';
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
        { id: 'kitchen', name: 'Kuzhina' },
        { id: 'storage', name: 'Organizim & Ruajtje' },
        { id: 'cleaning', name: 'Pastrimi' },
        { id: 'dining', name: 'Tavolina & Servirje' },
        { id: 'decor', name: 'Dekori' },
        { id: 'home', name: 'Shtëpia' }
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
          <span>Kujdesi ndaj klientit 24/7</span>
        </div>
      </div>

      {/* ── Main Footer Columns ── */}
      <div className="mz-footer-main" style={{ gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr' }}>
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
          </ul>
        </div>

        <div className="mz-footer-col" id="contact-info">
          <h4 className="mz-footer-heading">Kontakt</h4>
          <ul className="mz-footer-links" style={{ gap: '10px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.9rem' }}>
              <Phone size={15} style={{ color: '#ea580c', flexShrink: 0 }} />
              <span>+383 44 123 456</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.9rem' }}>
              <Mail size={15} style={{ color: '#ea580c', flexShrink: 0 }} />
              <span>info@mixzone-ks.com</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.9rem' }}>
              <MapPin size={15} style={{ color: '#ea580c', flexShrink: 0 }} />
              <span>Prishtinë, Kosovë</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.9rem' }}>
              <Clock size={15} style={{ color: '#ea580c', flexShrink: 0 }} />
              <span>E Hënë – E Shtunë: 08:00 – 20:00</span>
            </li>
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
