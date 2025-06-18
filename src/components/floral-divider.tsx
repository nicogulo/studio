import React from 'react';

const FloralDivider: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center my-10 md:my-12 ${className}`}> {/* Adjusted margin */}
      <svg width="120" height="24" viewBox="0 0 200 40" className="text-primary/70" fill="currentColor"> {/* Reduced size and opacity */}
        <path d="M0 20 Q20 5 40 20 T80 20" stroke="currentColor" strokeWidth="1.5" fill="none" /> {/* Thinner line, adjusted curve */}
        <circle cx="100" cy="20" r="6" className="opacity-80" /> {/* Smaller circle */}
        <path d="M120 20 Q140 5 160 20 T200 20" stroke="currentColor" strokeWidth="1.5" fill="none" /> {/* Thinner line, adjusted curve */}
        <circle cx="100" cy="20" r="2.5" className="text-accent/80" fill="currentColor"/> {/* Smaller inner circle */}
      </svg>
    </div>
  );
};

export default FloralDivider;
