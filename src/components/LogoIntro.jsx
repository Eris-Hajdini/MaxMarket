import React, { useEffect, useState } from 'react';

export default function LogoIntro({ onFinish, isLogin = false, loginUser = null, duration = 3400 }) {
  const [phase, setPhase] = useState('spin'); // 'spin' -> 'shrink' -> 'logo'
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Phase 1: Colorful circle spins slowly 360 degrees for 1.8s
    const t1 = setTimeout(() => {
      setPhase('shrink');
    }, 1800);

    // Phase 2: Shrinks and reveals the full MixZone logo at 2.15s
    const t2 = setTimeout(() => {
      setPhase('logo');
    }, 2150);

    // Phase 3: Transition into store or admin
    const totalTime = isLogin ? 3700 : duration;
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
        {/* Step 1: Spinning colorful circle - 360 degrees, smooth & slow */}
        {(phase === 'spin' || phase === 'shrink') && (
          <div className={`mz-intro-spin-box ${phase === 'shrink' ? 'mz-spin-shrink' : ''}`}>
            <img
              src="/mixzone-icon.png"
              alt="MixZone Icon"
              className="mz-intro-spinning-icon"
            />
          </div>
        )}

        {/* Step 2: Full MixZone logo appears smoothly with Albanian tagline */}
        {phase === 'logo' && (
          <div className="mz-intro-logo-box">
            <img
              src="/mixzone-logo.png"
              alt="MixZone"
              className="mz-intro-full-logo"
            />
            <span className="mz-intro-tagline">
              Artikuj thelbësorë për shtëpinë tuaj
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
