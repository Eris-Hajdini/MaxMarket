import React, { useEffect, useState } from 'react';

export default function LogoIntro({ onFinish, isLogin = false, loginUser = null, duration = 3000 }) {
  const [phase, setPhase] = useState('spin'); // 'spin' -> 'shrink' -> 'logo'
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Phase 1: Colorful circle spins for 1.1s
    const t1 = setTimeout(() => {
      setPhase('shrink');
    }, 1100);

    // Phase 2: Shrinks down and reveals the full MixZone logo at 1.45s
    const t2 = setTimeout(() => {
      setPhase('logo');
    }, 1450);

    // Phase 3: Transition smoothly into website or admin
    const totalTime = isLogin ? 3400 : duration;
    const t3 = setTimeout(() => {
      triggerFlyTransition();
    }, totalTime);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isLogin, duration]);

  const triggerFlyTransition = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 650);
  };

  const isAdmin = loginUser && loginUser.role === 'admin';

  return (
    <div
      className={`clean-white-intro-overlay ${isExiting ? 'intro-fade-out' : ''}`}
      onClick={triggerFlyTransition}
      title="Kliko për të vazhduar"
    >
      <div className="mz-intro-stage-container">
        {/* Step 1: Big spinning colorful circle */}
        {(phase === 'spin' || phase === 'shrink') && (
          <div className={`mz-intro-spin-box ${phase === 'shrink' ? 'mz-spin-shrink' : ''}`}>
            <img
              src="/mixzone-icon.png"
              alt="MixZone Icon"
              className="mz-intro-spinning-icon"
            />
          </div>
        )}

        {/* Step 2: Full MixZone logo appears smoothly */}
        {phase === 'logo' && (
          <div className="mz-intro-logo-box">
            <img
              src="/mixzone-logo.png"
              alt="MixZone"
              className="mz-intro-full-logo"
            />
            <span className="mz-intro-tagline">
              Everyday essentials for a better home
            </span>
          </div>
        )}
      </div>

      {isLogin && !isExiting && (
        <div className="clean-intro-login-status">
          <div className="clean-intro-progress-bar">
            <div className="clean-intro-progress-fill" />
          </div>
          <span className="clean-intro-status-text">
            {isAdmin ? 'Duke hapur Panelin e Administratorit...' : `Mirësevini përsëri, ${loginUser?.name || 'Klient'}!`}
          </span>
        </div>
      )}
    </div>
  );
}
