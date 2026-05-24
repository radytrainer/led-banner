import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, FastForward, Rewind, Palette, Maximize, Minimize, ZoomIn, ZoomOut } from 'lucide-react';
import { LedConfig } from '../types';
import { LEDPreview } from './LEDPreview';

interface FullScreenDisplayProps {
  config: LedConfig;
  onClose: () => void;
  onUpdateConfig: (updated: Partial<LedConfig>) => void;
}

const NEON_COLORS = [
  '#00f3ff', // Electric Cyan
  '#fface8', // Hot Pink
  '#79ff5b', // Lime Green
  '#ff7b00', // Cyber Orange
  '#ff2a2a', // Neon Red
  '#bd00ff', // Vivid Purple
  '#ffff00', // Laser Yellow
  '#ffffff', // Pure White
];

export const FullScreenDisplay: React.FC<FullScreenDisplayProps> = ({ config, onClose, onUpdateConfig }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentColor, setCurrentColor] = useState(config.textColor);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize display color from config
  useEffect(() => {
    setCurrentColor(config.textColor);
  }, [config.textColor]);

  // Mouse activity tracker for autohiding UI controller overlays
  const showControlsAndScheduleHide = () => {
    setControlsVisible(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
  };

  useEffect(() => {
    showControlsAndScheduleHide();
    const handleMouseMove = () => showControlsAndScheduleHide();
    const handleTouchStart = () => showControlsAndScheduleHide();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  // Cycle neon colors
  const handleColorCycle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = NEON_COLORS.indexOf(currentColor);
    const nextIndex = (currentIndex + 1) % NEON_COLORS.length;
    const nextColor = NEON_COLORS[nextIndex];
    setCurrentColor(nextColor);
    onUpdateConfig({ textColor: nextColor });
  };

  const PRESET_BACKGROUNDS = [
    '#000000', '#131313', '#1c1b1b', '#1a0b1e', '#0b1a1e'
  ];

  const handleBgColorCycle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentBg = config.backgroundColor || '#000000';
    const currentIndex = PRESET_BACKGROUNDS.indexOf(currentBg.toLowerCase());
    const nextIndex = (currentIndex + 1) % PRESET_BACKGROUNDS.length;
    const nextBg = PRESET_BACKGROUNDS[nextIndex];
    onUpdateConfig({ backgroundColor: nextBg });
  };

  // Speed handlers (lower duration = faster speed)
  const handleSpeedUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateConfig({ scrollSpeed: Math.max(1, config.scrollSpeed - 1) });
  };

  const handleSpeedDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateConfig({ scrollSpeed: Math.min(15, config.scrollSpeed + 1) });
  };

  // Font Size handlers
  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateConfig({ fontSize: Math.min(120, config.fontSize + 4) });
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateConfig({ fontSize: Math.max(20, config.fontSize - 4) });
  };

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(prev => !prev);
  };

  // Double click or explicit button fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error('Error attempting fullscreen:', err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
          .then(() => setIsFullscreen(false));
      }
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Assemble dynamic configuration for display
  const displayConfig: LedConfig = {
    ...config,
    textColor: currentColor,
    effectType: isPlaying ? config.effectType : 'static', // Stop animation by forcing central static if paused
  };

  return (
    <div 
      className={`fixed inset-0 bg-black overflow-hidden select-none z-50 transition-all ${
        !controlsVisible ? 'cursor-none-active' : ''
      }`}
      onDoubleClick={toggleFullscreen}
      onTouchEnd={showControlsAndScheduleHide}
    >
      {/* Immersive display layout with custom height and grid overrides */}
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <LEDPreview 
          config={displayConfig} 
          className="h-full w-full" 
          isFullScreen={true}
        />
      </div>

      {/* Atmospheric digital overlays */}
      <div className="absolute inset-0 scanlines pointer-events-none z-20" />
      <div className="absolute inset-0 led-canvas-overlay pointer-events-none z-30" />

      {/* Control Overlay Interface */}
      <div 
        ref={overlayRef}
        className={`absolute inset-0 flex flex-col justify-between p-6 pointer-events-none z-40 transition-opacity duration-500 ease-in-out ${
          controlsVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top bar controls */}
        <div className="flex justify-between items-center w-full">
          {/* Top Left Theme Switchers */}
          <div className="flex gap-3">
            <button
              onClick={handleColorCycle}
              className="glass-pill rounded-full p-3 font-mono text-[11px] tracking-wider text-white hover:text-primary-container pointer-events-auto flex items-center gap-2 px-4 transition-all duration-150 active:scale-95"
              title="Cycle Display Color"
            >
              <Palette className="w-5 h-5 text-secondary-custom" style={{ color: currentColor }} />
              <span>TEXT COLOR</span>
            </button>
            <button
              onClick={handleBgColorCycle}
              className="glass-pill rounded-full p-3 font-mono text-[11px] tracking-wider text-white hover:text-primary-container pointer-events-auto flex items-center gap-2 px-4 transition-all duration-150 active:scale-95"
              title="Cycle Background Color"
            >
              <div 
                className="w-4 h-4 rounded-full border border-white/50" 
                style={{ backgroundColor: config.backgroundColor }}
              />
              <span>BG COLOR</span>
            </button>
          </div>

          {/* Top Right Exit and Screen Modes */}
          <div className="flex gap-3 items-center">
            <button
              onClick={handlePlayPause}
              className="glass-pill rounded-full p-3 text-primary-container hover:text-white pointer-events-auto transition-all duration-150 active:scale-95"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-primary-container" /> : <Play className="w-5 h-5 fill-primary-container" />}
            </button>
            <div className="w-px h-6 bg-white/20 mx-1" />
            <button
              onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
              className="glass-pill rounded-full p-3 text-white/80 hover:text-white pointer-events-auto transition-all duration-150 active:scale-95"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="glass-pill rounded-full p-3 text-white/80 hover:text-red-400 pointer-events-auto transition-all duration-150 active:scale-95"
              title="Exit Full Screen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Playback HUD panel */}
        <div className="self-center flex flex-col items-center gap-4 mb-6">
          
          {/* Slider Controls Panel */}
          <div className="bg-black/60 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/10 shadow-lg w-[280px] sm:w-[350px] pointer-events-auto flex flex-col gap-4">
            
            {/* Speed Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono uppercase text-white/60">
                <span>Scroll Speed</span>
                <span className="text-primary-container font-bold">{config.scrollSpeed}s</span>
              </div>
              <input 
                type="range"
                min="1"
                max="15"
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer outline-none"
                value={config.scrollSpeed}
                onChange={(e) => onUpdateConfig({ scrollSpeed: Number(e.target.value) })}
              />
            </div>

            {/* Font Size Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono uppercase text-white/60">
                <span>Font Size</span>
                <span className="text-primary-container font-bold">{config.fontSize}px</span>
              </div>
              <input 
                type="range"
                min="20"
                max="120"
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer outline-none"
                value={config.fontSize}
                onChange={(e) => onUpdateConfig({ fontSize: Number(e.target.value) })}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
