import React, { useEffect, useState } from 'react';
import { ShoppingBag, Sparkles, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export default function LogoIntro({ onFinish, isLogin = false, loginUser = null, duration = 5000 }) {
  const [stage, setStage] = useState(0); // 0: init, 1: logo enter, 2: glow/burst, 3: ready, 4: exiting
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    // Stage 1: Entrance after 200ms
    const t1 = setTimeout(() => setStage(1), 200);
    // Stage 2: Glow & pulse after 1000ms
    const t2 = setTimeout(() => setStage(2), 1000);
    // Stage 3: Ready state after 1800ms
    const t3 = setTimeout(() => setStage(3), 1800);

    // 5-second countdown
    const countdownInterval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // After exactly 5 seconds, trigger smooth exit transition
    const autoExitTimer = setTimeout(() => {
      setStage(4);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 700);
    }, duration);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(autoExitTimer);
      clearInterval(countdownInterval);
    };
  }, [duration, onFinish]);

  const handleSkip = () => {
    setStage(4);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 700);
  };

  const isAdmin = loginUser && loginUser.role === 'admin';

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
          {isLogin ? (
            isAdmin ? (
              <>
                <ShieldCheck size={16} className="sparkle-icon" color="#60a5fa" />
                <span>Identifikimi si Administrator u Verifikua</span>
              </>
            ) : (
              <>
                <UserCheck size={16} className="sparkle-icon" color="#4ade80" />
                <span>Mirë se erdhe përsëri, {loginUser?.name || 'Klient'}!</span>
              </>
            )
          ) : (
            <>
              <Sparkles size={16} className="sparkle-icon" />
              <span>Elegancë & Cilësi për Shtëpinë Tuaj</span>
            </>
          )}
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
            <div className="brand-tagline">
              {isLogin
                ? (isAdmin ? 'PANELI I KONTROLLIT • ADMIN DASHBOARD' : 'DYQANI JUAJ I PREFERUAR • MAXMARKET')
                : 'HOME GOODS • KITCHEN • LIVING'}
            </div>
          </div>
        </div>

        {/* 5-second automatic countdown transition indicator */}
        <div className="intro-actions" style={{ marginTop: '24px' }}>
          <div className="progress-bar-container" style={{ width: '280px', height: '6px', margin: '0 auto 12px' }}>
            <div
              className="progress-bar-fill filled"
              style={{
                width: '100%',
                transition: `width ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1)`
              }}
            ></div>
          </div>

          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.92rem', fontWeight: '600', marginBottom: '8px' }}>
            {isLogin ? (
              isAdmin
                ? `Duke hapur Panelin e Administratorit... (${secondsLeft}s)`
                : `Duke hapur dyqanin tuaj... (${secondsLeft}s)`
            ) : (
              `Po hapet dyqani... (${secondsLeft}s)`
            )}
          </div>

          <button
            onClick={handleSkip}
            className="enter-btn group"
            id="enter-site-btn"
            style={{ padding: '8px 22px', fontSize: '0.85rem' }}
          >
            <span>Vazhdo Menjëherë</span>
            <ArrowRight size={16} className="enter-arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}
