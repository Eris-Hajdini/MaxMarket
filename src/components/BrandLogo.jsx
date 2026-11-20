import React from 'react';

export function MixZoneIcon({ size = 32, className = '' }) {
  return (
    <img
      src="/mixzone-icon.png"
      alt="MixZone"
      width={size}
      height={size}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', objectFit: 'contain' }}
    />
  );
}

export function HouseMLogo({ size = 28, color = 'currentColor', className = '' }) {
  return <MixZoneIcon size={size} className={className} />;
}

export default function BrandLogo({ size = 34, onClick = null, className = '' }) {
  return (
    <div
      className={`brand-logo-root ${className}`}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none'
      }}
    >
      <img
        src="/mixzone-logo.png"
        alt="MixZone"
        style={{
          height: `${size}px`,
          width: 'auto',
          display: 'block',
          objectFit: 'contain'
        }}
      />
    </div>
  );
}
