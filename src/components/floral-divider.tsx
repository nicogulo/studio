import React from 'react';

const FloralDivider: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center my-8 ${className}`}>
      <svg width="150" height="30" viewBox="0 0 200 40" className="text-primary" fill="currentColor">
        <path d="M0 20 Q20 0 40 20 T80 20" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="100" cy="20" r="8" />
        <path d="M120 20 Q140 0 160 20 T200 20" stroke="currentColor" strokeWidth="2" fill="none" />
        {/* Simplified flower-like element */}
        <circle cx="100" cy="20" r="3" className="text-accent" fill="currentColor"/>
        <line x1="100" y1="12" x2="100" y2="28" strokeWidth="1.5" stroke="currentColor" />
        <line x1="92" y1="20" x2="108" y2="20" strokeWidth="1.5" stroke="currentColor" />
      </svg>
    </div>
  );
};

export default FloralDivider;
