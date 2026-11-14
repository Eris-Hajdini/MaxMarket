import React from 'react';

export default function Footer({ onSelectCategory, categories = [] }) {
  const handleCategory = (catId) => {
    if (onSelectCategory) onSelectCategory(catId);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHelp = (topic) => {
    if (topic === 'Dërgesa') {
      alert("Dërgesa në të gjithë Kosovën realizohet brenda 24-48 orëve. Falas për porosi mbi 50 €!");
    } else if (topic === 'Kthimet') {
      alert("Kthimi i produkteve mund të bëhet brenda 14 ditëve nga momenti i pranimit.");
    } else if (topic === 'Pagesa') {
      alert("Pagesa kryhet me para në dorë gjatë pranimit të porosisë (Cash on Delivery).");
    } else if (topic === 'Kontakt') {
      alert("Kujdesi për klientin: Tel: +383 44 123 456 | Email: info@maxmarket-ks.com");
    }
  };

  const dynamicCategories = categories && categories.length > 0
    ? categories.filter((c) => c.id !== 'all' && c.id !== 'offers')
    : [
        { id: 'kuhinja', name: 'Kuhinja' },
        { id: 'organizim', name: 'Organizim & Ruajtje' },
        { id: 'shtepia', name: 'Shtëpia' },
        { id: 'pastrimi', name: 'Pastrimi' }
      ];

  return (
    <footer className="clean-footer-root">
      <div className="container clean-footer-container">
        {/* Left Column: Brand & Cities */}
        <div className="footer-col-brand">
          <div className="footer-brand-title">
            MAXMARKET
          </div>
          <p className="footer-brand-desc">
            Artikuj për kuzhinën, organizimin dhe dekorin e shtëpisë.
          </p>
          <p className="footer-cities-line">
            Prishtinë · Prizren · Pejë · Gjakovë · Gjilan · Ferizaj · Mitrovicë
          </p>
        </div>

        {/* Center Column: BLEJ */}
        <div className="footer-col-nav">
          <h4 className="footer-heading">BLEJ</h4>
          <ul className="footer-links-list">
            {dynamicCategories.map((c) => (
              <li key={c.id}>
                <button onClick={() => handleCategory(c.id)}>{c.name}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: NDIHMË */}
        <div className="footer-col-nav">
          <h4 className="footer-heading">NDIHMË</h4>
          <ul className="footer-links-list">
            <li>
              <button onClick={() => handleHelp('Dërgesa')}>Dërgesa</button>
            </li>
            <li>
              <button onClick={() => handleHelp('Kthimet')}>Kthimet</button>
            </li>
            <li>
              <button onClick={() => handleHelp('Pagesa')}>Pagesa</button>
            </li>
            <li>
              <button onClick={() => handleHelp('Kontakt')}>Kontakt</button>
            </li>
          </ul>
        </div>

        {/* Decorative Silhouette Illustrations matching screenshot */}
        <div className="footer-decorative-silhouettes" aria-hidden="true">
          {/* Spray bottle silhouette */}
          <svg width="44" height="70" viewBox="0 0 44 70" fill="#a4b59e" opacity="0.35">
            <rect x="18" y="0" width="8" height="12" rx="2"/>
            <path d="M14 12H30L27 22H17L14 12Z"/>
            <path d="M17 22L11 32V66C11 68.2 12.8 70 15 70H29C31.2 70 33 68.2 33 66V32L27 22H17Z"/>
            <path d="M26 4H38V8H26V4Z"/>
          </svg>

          {/* Cooking pot / casserole silhouette */}
          <svg width="68" height="48" viewBox="0 0 68 48" fill="#a4b59e" opacity="0.35">
            <ellipse cx="34" cy="8" rx="6" ry="3"/>
            <path d="M12 14C12 12 21.8 10 34 10C46.2 10 56 12 56 14L54 38C54 42.5 45 46 34 46C23 46 14 42.5 14 38L12 14Z"/>
            {/* Handles */}
            <path d="M6 18C4 18 2 20 2 22C2 24 4 26 6 26H12V18H6Z"/>
            <path d="M62 18C64 18 66 20 66 22C66 24 64 26 62 26H56V18H62Z"/>
          </svg>
        </div>
      </div>

      <div className="clean-footer-bottom">
        <div className="container bottom-inner">
          <span>© {new Date().getFullYear()} MaxMarket Sh.p.k. Të gjitha të drejtat e rezervuara.</span>
          <span>Dizajnuar me stil për çdo shtëpi.</span>
        </div>
      </div>
    </footer>
  );
}
