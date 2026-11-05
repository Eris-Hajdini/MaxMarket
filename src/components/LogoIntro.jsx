import React, { useEffect, useState } from 'react';

export default function LogoIntro({ onFinish, isLogin = false, loginUser = null, duration = 2200 }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Determine how long to display before initiating top-left transition
    // For site open: ~2 seconds; for login: ~2.5-3 seconds
    const stayTime = isLogin ? 2800 : duration;

    const timer = setTimeout(() => {
      triggerFlyTransition();
    }, stayTime);

    return () => clearTimeout(timer);
  }, [isLogin, duration]);

  const triggerFlyTransition = () => {
    setIsExiting(true);
    // After 750ms of smooth flight to top-left, complete and unmount
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 750);
  };

  const isAdmin = loginUser && loginUser.role === 'admin';

  return (
    <div
      className={`simple-intro-overlay ${isExiting ? 'fly-exit' : ''}`}
      onClick={triggerFlyTransition}
      title="Kliko për të vazhduar"
    >
      {/* Ambient warm radial glow */}
      <div className="simple-intro-glow" />

      {/* Big Simple Logo that transitions to Top Left */}
      <div className={`simple-intro-brand-box ${isExiting ? 'flying-top-left' : ''}`}>
        <div className="simple-intro-badge">
          <span>M</span>
        </div>
        <div className="simple-intro-text">
          <span className="simple-intro-max">MAX</span>
          <span className="simple-intro-market">MARKET</span>
        </div>
      </div>

      {/* Subtle indicator for login without cluttering the logo */}
      {isLogin && !isExiting && (
        <div
          style={{
            position: 'absolute',
            bottom: '22%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255, 255, 255, 0.75)',
            fontSize: '0.88rem',
            fontWeight: '600',
            letterSpacing: '0.4px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <div
            style={{
              width: '160px',
              height: '3px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: '#f76707',
                animation: 'simpleIntroProgress 2.5s ease-out forwards'
              }}
            />
          </div>
          <span>
            {isAdmin ? 'Duke hapur Panelin e Administratorit...' : `Duke hapur llogarinë, ${loginUser?.name || ''}...`}
          </span>
        </div>
      )}
    </div>
  );
}
