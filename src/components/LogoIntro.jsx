import React, { useEffect, useState } from 'react';
import { HouseMLogo } from './BrandLogo';

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
    // Smooth flight duration before unmounting
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
      {/* Big Clean Minimalist Logo Matching Screenshot */}
      <div className={`clean-intro-logo-box ${isExiting ? 'glide-to-top-left' : ''}`}>
        <div className="clean-intro-icon-wrap">
          <HouseMLogo size={64} color="#1b4332" />
        </div>
        <div className="clean-intro-text-wrap">
          <span className="clean-intro-title">MaxMarket</span>
          <span className="clean-intro-subtitle">Gjithçka për shtëpinë</span>
        </div>
      </div>

      {/* Subtle clean progress indicator for login */}
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
