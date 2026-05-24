import React from 'react';
import { LedConfig } from '../types';

interface LEDPreviewProps {
  config: LedConfig;
  className?: string;
  isFullScreen?: boolean;
}

export const LEDPreview: React.FC<LEDPreviewProps> = ({ config, className = '', isFullScreen = false }) => {
  const { text, scrollSpeed, fontSize, letterSpacing, textColor, backgroundColor, isBold, effectType, fontFamily } = config;

  // Derive styles based on configs
  const containerStyle: React.CSSProperties = {
    backgroundColor: backgroundColor || '#131313',
    color: textColor || '#00f3ff',
    fontWeight: isBold ? '700' : '400',
  };

  // Convert settings for display
  const finalLetterSpacing = `${letterSpacing}em`;
  const animationDurationStyle = {
    '--marquee-duration': `${scrollSpeed}s`,
  } as React.CSSProperties;

  // Let's create CSS rules for effects or inline class configurations
  let textClass = 'relative transition-all duration-300 led-mask leading-normal ';
  
  if (!isFullScreen) {
    // scale font size down a bit for compact controller preview window
    textClass += ' text-[32px] md:text-[48px] ';
  }

  // Animation effect mapping
  let scrollWrapperClass = 'w-full flex items-center ';
  let textWrapperClass = '';

  if (effectType === 'scroll') {
    scrollWrapperClass += ' overflow-x-hidden no-scrollbar ';
    textWrapperClass = ' animate-marquee ';
  } else if (effectType === 'blink') {
    scrollWrapperClass += ' justify-center overflow-hidden ';
    textWrapperClass = ' animate-pulse '; // standard pulsing/blinking mapping
  } else if (effectType === 'pulse') {
    scrollWrapperClass += ' justify-center ';
    textWrapperClass = ' animate-bounce ';
  } else {
    // static
    scrollWrapperClass += ' justify-center ';
    textWrapperClass = ' text-center ';
  }

  // Create subtle text shadows matching current colors for hyper-real light emission emission
  const textShadowStyle: React.CSSProperties = {
    color: textColor,
    fontFamily: fontFamily || 'inherit',
    letterSpacing: finalLetterSpacing,
    textShadow: `
      0 0 10px ${textColor}cc,
      0 0 20px ${textColor}99,
      0 0 40px ${textColor}66,
      0 0 80px ${textColor}33
    `,
    fontSize: isFullScreen ? `${fontSize}vh` : undefined, // Convert slider px to vh strictly for fullscreen immersive mode
  };

  return (
    <div 
      className={`relative w-full overflow-x-hidden no-scrollbar flex items-center ${isFullScreen ? 'h-full' : 'min-h-[140px]'} ${className}`}
      style={containerStyle}
    >
      {/* Mesh dot pattern simulate real LEDs */}
      <div className="absolute inset-0 led-dot-matrix opacity-40 pointer-events-none z-10" />
      
      {/* Inner glowing edge overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-10"
        style={{
          background: `radial-gradient(circle, ${textColor}40 0%, transparent 80%)`
        }}
      />

      <div className={scrollWrapperClass}>
        <div 
          className={textWrapperClass}
          style={{ ...animationDurationStyle }}
        >
          <span 
            className={`${textClass}`}
            style={textShadowStyle}
          >
            {text || ' '}
          </span>
        </div>
      </div>
    </div>
  );
};
