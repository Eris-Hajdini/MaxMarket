import React from 'react';

/**
 * Clean Geometric House + M Logo Icon matching the screenshot exactly
 */
export function HouseMLogo({ size = 28, color = 'currentColor', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Outer House Contour */}
      <path
        d="M16 3.5L3.5 12.8V27.5C3.5 28.0523 3.94772 28.5 4.5 28.5H27.5C28.0523 28.5 28.5 28.0523 28.5 27.5V12.8L16 3.5Z"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Internal M shape */}
      <path
        d="M9 23.5V15.5L16 21L23 15.5V23.5"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BrandLogo({ size = 26, color = '#1a3b32', textColor = '#1a3b32', onClick = null }) {
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
      <HouseMLogo size={size} color={color} />
      <span
        style={{
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: `${size * 0.78}px`,
          fontWeight: 700,
          letterSpacing: '-0.3px',
          color: textColor,
          lineHeight: 1
        }}
      >
        MaxMarket
      </span>
    </div>
  );
}
