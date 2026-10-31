import React, { useEffect, useState } from 'react';
import { ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';

export default function LogoIntro({ onFinish }) {
  const [stage, setStage] = useState(0); // 0: init, 1: logo enter, 2: glow/burst, 3: reveal button / auto zoom-out, 4: exiting

  useEffect(() => {
    // Stage 1: Entrance after 200ms
    const t1 = setTimeout(() => setStage(1), 200);
    // Stage 2: Glow & light pulse after 1100ms
    const t2 = setTimeout(() => setStage(2), 1200);
    // Stage 3: Ready state after 2200ms
    const t3 = setTimeout(() => setStage(3), 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleEnterSite = () => {
    setStage(4);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 700);
  };

  return (
    <div className={`intro-overlay ${stage === 4 ? 'intro-exit' : ''}`}>
      {/* Background ambient lighting blobs */}
      <div className="ambient-blob blob-1"></div>
      <div className="ambient-blob blob-2"></div>
      <div className="ambient-blob blob-3"></div>

      {/* Grid line pattern */}
      <div className="intro-grid-pattern"></div>

      <div className={`intro-content stage-${stage}`}>
        {/* Animated Badge */}
        <div className="intro-badge">
          <Sparkles size={16} className="sparkle-icon" />
          <span>Elegancë & Cilësi për Shtëpinë Tuaj</span>
        </div>

        {/* Big 3D / Glowing Logo */}
        <div className="logo-container">
          <div className="logo-halo"></div>
          
          <div className="logo-icon-box">
            <ShoppingBag className="logo-bag-icon" />
            <div className="shine-line"></div>
          </div>

          <div className="logo-text-wrapper">
            <h1 className="brand-logo-title">
              <span className="brand-max">MAX</span>
              <span className="brand-market">MARKET</span>
            </h1>
            <div className="brand-tagline">HOME GOODS • KITCHEN • LIVING</div>
          </div>
        </div>

        {/* Progress Bar / Entering Controls */}
        <div className="intro-actions">
          <div className="progress-bar-container">
            <div className={`progress-bar-fill ${stage >= 2 ? 'filled' : ''}`}></div>
          </div>
          
          <button 
            onClick={handleEnterSite} 
            className="enter-btn group"
            id="enter-site-btn"
          >
            <span>Hyr në MaxMarket</span>
            <ArrowRight size={20} className="enter-arrow" />
          </button>

          <span className="skip-hint">ose klikoni kudo për të vazhduar</span>
        </div>
      </div>
    </div>
  );
}
