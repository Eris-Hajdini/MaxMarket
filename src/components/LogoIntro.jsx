import React, { useEffect, useState } from 'react';

export default function LogoIntro({ onFinish, isLogin = false, loginUser = null, duration = 2200 }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const stayTime = isLogin ? 2600 : duration;

    const timer = setTimeout(() => {
      triggerFlyTransition();
    }, stayTime);

    return () => clearTimeout(timer);
  }, [isLogin, duration]);

  const triggerFlyTransition = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 750);
  };

  const isAdmin = loginUser && loginUser.role === 'admin';

  return (
    <div
      className={`clean-white-intro-overlay ${isExiting ? 'intro-fade-out' : ''}`}
      onClick={triggerFlyTransition}
      title="Kliko për të vazhduar"
    >
      <div className={`clean-intro-logo-box ${isExiting ? 'glide-to-top-left' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <img
          src="/mixzone-logo.png"
          alt="MixZone"
          style={{ height: '72px', maxWidth: '85vw', objectFit: 'contain', display: 'block' }}
        />
        <span className="clean-intro-subtitle" style={{ fontSize: '0.95rem', color: '#666', fontWeight: '500' }}>
          Everyday essentials for a better home
        </span>
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
