
import React from 'react';

const FloralDivider: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center my-8 md:my-10 ${className}`}>
      <svg width="100" height="20" viewBox="0 0 200 40" className="text-primary/70 md:w-[120px] md:h-[24px]" fill="currentColor">
        <path d="M0 20 Q20 5 40 20 T80 20" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="100" cy="20" r="6" className="opacity-80" />
        <path d="M120 20 Q140 5 160 20 T200 20" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="100" cy="20" r="2.5" className="text-accent/80" fill="currentColor"/>
      </svg>
    </div>
  );
};

export default FloralDivider;
