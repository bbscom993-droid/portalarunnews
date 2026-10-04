import React from 'react';

interface ModernGraffitiLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  tagline?: string;
  showTagline?: boolean;
  className?: string;
  customText?: string;
}

export const ModernGraffitiLogo: React.FC<ModernGraffitiLogoProps> = ({
  size = 'md',
  tagline = 'Jembatan Informasi Nusantara',
  showTagline = true,
  className = '',
  customText,
}) => {
  // Split customText or default into two parts: "ARUN" and "NEWS"
  let firstWord = 'ARUN';
  let secondWord = 'NEWS';

  if (customText) {
    const parts = customText.trim().split(/\s+/);
    if (parts.length >= 2) {
      firstWord = parts[0];
      secondWord = parts.slice(1).join(' ');
    } else if (parts.length === 1 && parts[0]) {
      firstWord = parts[0];
      secondWord = '';
    }
  }

  const sizeClasses = {
    sm: {
      text: 'text-lg sm:text-xl',
      dot: 'w-2 h-2',
      tagline: 'text-[10px] sm:text-[11px]',
      gap: 'gap-1',
    },
    md: {
      text: 'text-2xl sm:text-3xl',
      dot: 'w-2.5 h-2.5',
      tagline: 'text-xs sm:text-sm',
      gap: 'gap-1.5',
    },
    lg: {
      text: 'text-3xl sm:text-4xl',
      dot: 'w-3 h-3',
      tagline: 'text-sm sm:text-base',
      gap: 'gap-2',
    },
    xl: {
      text: 'text-4xl sm:text-5xl lg:text-6xl',
      dot: 'w-3.5 h-3.5',
      tagline: 'text-base sm:text-lg',
      gap: 'gap-2.5',
    },
  }[size];

  return (
    <div className={`flex flex-col select-none ${className}`}>
      <div className={`graffiti-wordmark ${sizeClasses.gap} group-hover:scale-105 transition-transform duration-200`}>
        {/* First Word (ARUN) - Graffiti Tag in vibrant street gold gradient with deep 3D spray shadow */}
        <span 
          className={`font-graffiti tracking-wider uppercase inline-block transform -rotate-2 select-none graffiti-tag-yellow ${sizeClasses.text}`}
          style={{ letterSpacing: '0.04em' }}
        >
          {firstWord}
        </span>

        {/* Second Word (NEWS) - Graffiti Tag in crisp electric street white/cyan with 3D shadow */}
        {secondWord && (
          <span 
            className={`font-graffiti tracking-wider uppercase inline-block transform rotate-1 select-none graffiti-tag-white ${sizeClasses.text}`}
            style={{ letterSpacing: '0.05em' }}
          >
            {secondWord}
          </span>
        )}

        {/* Street spray dot accent / neon pulse */}
        <span 
          className={`inline-block ${sizeClasses.dot} rounded-full bg-yellow-400 animate-pulse shadow-[0_0_10px_#facc15] ml-0.5 border border-yellow-200`} 
          title="Arun News Live Feed"
        />
      </div>

      {/* Modern Graffiti Tagline */}
      {showTagline && tagline && (
        <div className="flex items-center gap-1.5 mt-0.5 sm:mt-1">
          <span className="h-[2px] w-2 sm:w-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full inline-block shadow-[0_0_6px_#facc15]" />
          <span 
            className={`font-graffiti tracking-wide text-yellow-300 dark:text-yellow-400 graffiti-tagline uppercase transform -rotate-0.5 select-none ${sizeClasses.tagline}`}
            style={{ letterSpacing: '0.06em' }}
          >
            {tagline}
          </span>
        </div>
      )}
    </div>
  );
};

export default ModernGraffitiLogo;
