import React from 'react';
import { ArrowRight, Sparkles, Leaf, Award, HeartHandshake } from 'lucide-react';

export default function CleanHero({ onShopNow, onViewOffers }) {
  return (
    <section className="mz-hero">
      {/* ── 2D Abstract Creative Background Elements ── */}
      <div className="mz-hero-2d-canvas" aria-hidden="true">
        {/* 2D Soft Organic Color Blobs */}
        <div className="mz-2d-blob blob-terracotta" />
        <div className="mz-2d-blob blob-amber" />
        <div className="mz-2d-blob blob-sage" />

        {/* 2D Decorative Grid Dots Pattern */}
        <svg className="mz-2d-dots-pattern" width="160" height="160" viewBox="0 0 160 160" fill="none">
          <pattern id="dot-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#d1d5db" />
          </pattern>
          <rect width="160" height="160" fill="url(#dot-grid)" />
        </svg>

        {/* 2D Minimalist Botanical Leaf Line Art */}
        <svg className="mz-2d-botanical botanical-left" width="80" height="140" viewBox="0 0 80 140" fill="none">
          <path d="M40 10V130M40 30C28 24 20 16 20 8C28 8 36 16 40 30ZM40 50C52 44 60 36 60 28C52 28 44 36 40 50ZM40 70C28 64 20 56 20 48C28 48 36 56 40 70ZM40 90C52 84 60 76 60 68C52 68 44 76 40 90ZM40 110C28 104 20 96 20 88C28 88 36 96 40 110Z" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* 2D Sparkling Starbursts */}
        <div className="mz-2d-sparkle sparkle-1">✦</div>
        <div className="mz-2d-sparkle sparkle-2">✦</div>
        <div className="mz-2d-sparkle sparkle-3">✦</div>

        {/* 2D Geometric Arch */}
        <svg className="mz-2d-arch" width="200" height="260" viewBox="0 0 200 260" fill="none">
          <path d="M10 250V100C10 50.2944 50.2944 10 100 10C149.706 10 190 50.2944 190 100V250" stroke="#e5e7eb" strokeWidth="2.2" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="mz-hero-inner">
        {/* Left Column: Typography, Badges & Action Buttons */}
        <div className="mz-hero-left">
          {/* Subtle creative pill chip */}
          <div className="mz-hero-pill-badge">
            <Sparkles size={14} className="pill-badge-icon" />
            <span>Koleksioni i Ri 2026 • MixZone</span>
          </div>

          <h1 className="mz-hero-title">
            Gjithçka thelbësore<br />
            për një shtëpi <span className="mz-title-highlight">me stil</span>
          </h1>

          <p className="mz-hero-subtitle">
            Cilësi e lartë. Praktike. Çmime të volitshme për çdo ditë në shtëpinë tuaj.
          </p>

          <div className="mz-hero-actions-row">
            <button className="mz-hero-btn mz-hero-primary" onClick={onShopNow}>
              <span>Eksploro koleksionin</span>
              <ArrowRight size={17} />
            </button>

            <button className="mz-hero-btn mz-hero-secondary" onClick={onViewOffers}>
              <span>Shiko ofertat</span>
            </button>
          </div>

          {/* Quick trust metrics */}
          <div className="mz-hero-perks-row">
            <div className="mz-hero-perk">
              <Leaf size={15} style={{ color: '#16a34a' }} />
              <span>Materiale të zgjedhura</span>
            </div>
            <span className="mz-perk-dot">•</span>
            <div className="mz-hero-perk">
              <Award size={15} style={{ color: '#ea580c' }} />
              <span>Garanci cilësie 100%</span>
            </div>
          </div>
        </div>

        {/* Right Column: Creative Framed Photo with 2D Floating Accents */}
        <div className="mz-hero-right">
          <div className="mz-hero-image-stage">
            {/* 2D Decorative background offset card */}
            <div className="mz-image-backdrop-layer" />

            {/* Fresh modern lifestyle photo */}
            <div className="mz-image-frame">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
                alt="Ambient modern dhe komod për shtëpi me stil"
                className="mz-hero-img"
                loading="eager"
              />
            </div>

            {/* 2D Floating Badge 1 (Top Left) */}
            <div className="mz-floating-tag tag-top">
              <span className="floating-tag-emoji">✨</span>
              <div className="floating-tag-text">
                <strong>Dizajn Modern</strong>
                <small>Elegancë & komoditet</small>
              </div>
            </div>

            {/* 2D Floating Badge 2 (Bottom Right) */}
            <div className="mz-floating-tag tag-bottom">
              <span className="floating-tag-emoji">⭐️</span>
              <div className="floating-tag-text">
                <strong>4.9 / 5 Vlerësim</strong>
                <small>Nga blerësit tanë</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
