import React from 'react';

/**
 * MixZone colorful pinwheel logo icon (SVG recreation of the brand logo)
 */
export function MixZoneIcon({ size = 32, className = '' }) {
  // 8 colorful circles arranged in a pinwheel ring
  const circles = [
    { angle: 0,   color: '#FF4444' },   // red
    { angle: 45,  color: '#FF8C00' },   // orange
    { angle: 90,  color: '#FFD700' },   // yellow
    { angle: 135, color: '#32CD32' },   // green
    { angle: 180, color: '#00BFFF' },   // cyan
    { angle: 225, color: '#1E90FF' },   // blue
    { angle: 270, color: '#8A2BE2' },   // purple
    { angle: 315, color: '#CC00CC' },   // magenta
  ];

  const cx = size / 2;
  const cy = size / 2;
  const ringRadius = size * 0.30;
  const dotRadius = size * 0.145;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {circles.map(({ angle, color }, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = cx + ringRadius * Math.cos(rad);
        const y = cy + ringRadius * Math.sin(rad);
        return <circle key={i} cx={x} cy={y} r={dotRadius} fill={color} />;
      })}
    </svg>
  );
}

// Keep HouseMLogo export for backward compat (LogoIntro uses it)
export function HouseMLogo({ size = 28, color = 'currentColor', className = '' }) {
  return <MixZoneIcon size={size} className={className} />;
}

export default function BrandLogo({ size = 26, color = '#1a3b32', textColor = '#1a1a1a', onClick = null }) {
  return (
    <div
      className="brand-logo-root"
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '9px',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none'
      }}
    >
      <MixZoneIcon size={size + 4} />
      <span
        style={{
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: `${size * 0.85}px`,
          fontWeight: 800,
          letterSpacing: '-0.5px',
          color: '#1a1a1a',
          lineHeight: 1
        }}
      >
        MixZone
      </span>
    </div>
  );
}
