import React from 'react';
import { 
  Maximize2, 
  Settings, 
  Palette, 
  Type, 
  Maximize, 
  Sparkles,
  Sliders,
  PenTool
} from 'lucide-react';
import { LedConfig } from '../types';
import { LEDPreview } from './LEDPreview';

interface ConsoleControllerProps {
  config: LedConfig;
  onConfigChange: (newConfig: LedConfig) => void;
  onLaunch: () => void;
}

const AVAILABLE_FONTS = [
  { name: 'Moul (Khmer Bold)', value: 'Moul', lang: 'Khmer' },
  { name: 'Battambang (Khmer Classic)', value: 'Battambang', lang: 'Khmer' },
  { name: 'Kantumruy Pro (Khmer Modern)', value: 'Kantumruy Pro', lang: 'Khmer' },
  { name: 'Nokora (Khmer Serif)', value: 'Nokora', lang: 'Khmer' },
  { name: 'Space Mono (English Tech)', value: 'Space Mono', lang: 'English' },
  { name: 'Sora (English Geometric)', value: 'Sora', lang: 'English' },
];

const PRESET_COLORS = [
  { name: 'Electric Cyan', hex: '#00f3ff' },
  { name: 'Hot Pink', hex: '#fface8' },
  { name: 'Emerald Volt', hex: '#79ff5b' },
  { name: 'Siren Magenta', hex: '#ff24e4' },
  { name: 'Glow White', hex: '#ffffff' },
  { name: 'Cyber Orange', hex: '#ff7b00' },
  { name: 'Laser Red', hex: '#ff2a2a' },
];

const PRESET_BACKGROUNDS = [
  { name: 'True Black', hex: '#000000' },
  { name: 'Cabinet Dark', hex: '#131313' },
  { name: 'Retro Slate', hex: '#1c1b1b' },
];

export const ConsoleController: React.FC<ConsoleControllerProps> = ({ config, onConfigChange, onLaunch }) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onConfigChange({ ...config, text: e.target.value.slice(0, 100) });
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Dynamic atmospheric ambient glow behind the preview screen */}
      <div 
        className="absolute top-0 left-12 right-12 h-64 opacity-10 blur-[120px] rounded-full pointer-events-none transition-all duration-500"
        style={{ backgroundColor: config.textColor }}
      />

      {/* Main Console Content */}
      <main className="pt-12 pb-20 px-4 md:px-8 max-w-5xl mx-auto space-y-6">
        
        {/* Immersive LED Live Simulator Screen Box */}
        <section 
          className="relative w-full aspect-[21/9] md:aspect-[3/1] bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center cursor-pointer group transition-all hover:border-primary-container/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)]"
          onClick={onLaunch}
        >
          <LEDPreview 
            config={config} 
            className="w-full h-full py-4 px-4" 
            isFullScreen={false} 
          />
          {/* Bezel details for high fidelity look */}
          <div className="absolute top-2 left-3 font-mono text-[8px] text-white/30 tracking-widest pointer-events-none uppercase">
            CH: 01 // EMULATED GRID
          </div>
          
          {/* Top right fullscreen icon hint */}
          <div className="absolute top-2 right-3 text-white/30 group-hover:text-primary-container transition-colors">
            <Maximize2 className="w-4 h-4" />
          </div>

          <div 
            className="absolute bottom-2 right-3 font-mono text-[8px] tracking-widest pointer-events-none uppercase transition-colors"
            style={{ color: `${config.textColor}99` }}
          >
            Font: {config.fontFamily}
          </div>
          {/* Bezel frame borders */}
          <div className="absolute inset-0 pointer-events-none border border-white/5 group-hover:border-primary-container/20 transition-colors rounded-xl z-20" />
        </section>

        {/* Minimal Controller Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Group 1: Text Message Input Config (Col span 4) */}
          <div className="md:col-span-4 glass-card p-6 rounded-xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white/90">
                <PenTool className="w-4 h-4 text-primary-container" />
                <h3 className="font-mono text-xs uppercase tracking-wider">MESSAGE CONFIG</h3>
              </div>
              <textarea 
                className="w-full h-32 bg-black/45 border border-white/10 rounded-lg p-3 font-mono text-sm focus:outline-none focus:border-primary-container transition-all resize-none shadow-inner text-white"
                style={{ fontFamily: config.fontFamily }}
                value={config.text}
                onChange={handleTextChange}
                maxLength={100}
                placeholder="សូមសរសេរអក្សរនៅទីនេះ..."
              />
              <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
                <span>Khmer & English Support</span>
                <span>{config.text.length}/100</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5 justify-start">
              {['GO TEAM!', 'HAPPY BIRTHDAY', 'GO CAMBODIA!', 'សួស្តីឆ្នាំថ្មី', 'ដានី', 'ស៊ូៗ!', '❤️I love you!❤️', '❤️ខ្ញុំស្រលាញ់អ្នក❤️'].map(preset => (
                <button
                  key={preset}
                  onClick={() => onConfigChange({ ...config, text: preset })}
                  className="px-2 py-1 text-[9px] font-mono border border-white/10 hover:border-primary-container hover:text-primary-container rounded bg-white/[0.02] active:scale-95 transition-all text-white/70"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Group 2: Choose Font Selection (Col span 4) */}
          <div className="md:col-span-4 glass-card p-6 rounded-xl space-y-4">
            <div className="flex items-center gap-2 text-white/90">
              <Type className="w-4 h-4 text-primary-container" />
              <h3 className="font-mono text-xs uppercase tracking-wider">CHOOSE FONT</h3>
            </div>
            
            <p className="text-[11px] text-white/40 leading-relaxed font-mono">
              Apply beautifully optimized typography filters for local languages.
            </p>

            <div className="space-y-2 max-h-[175px] overflow-y-auto pr-1">
              {AVAILABLE_FONTS.map(font => {
                const isSelected = config.fontFamily === font.value;
                return (
                  <button
                    key={font.value}
                    onClick={() => onConfigChange({ ...config, fontFamily: font.value })}
                    className={`w-full p-2.5 rounded-lg text-left border text-xs flex justify-between items-center transition-all ${
                      isSelected 
                        ? 'border-primary-container bg-primary-container/10 text-white font-bold shadow-[0_0_10px_rgba(0,243,255,0.1)]' 
                        : 'border-white/5 bg-black/20 text-white/70 hover:border-white/10'
                    }`}
                  >
                    <span style={{ fontFamily: font.value }}>
                      {font.name}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider font-mono opacity-50 px-1.5 py-0.5 rounded bg-white/5">
                      {font.lang}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 3: Custom Sliders - Speed, Size, Space (Col span 4) */}
          <div className="md:col-span-4 glass-card p-6 rounded-xl space-y-5">
            <div className="flex items-center gap-2 text-white/90">
              <Sliders className="w-4 h-4 text-primary-container" />
              <h3 className="font-mono text-xs uppercase tracking-wider">MOTION &amp; SCALE</h3>
            </div>

            <div className="space-y-4">
              {/* Scroll Speed Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono uppercase text-white/60">
                  <span>Scroll Speed</span>
                  <span className="text-primary-container font-bold">{config.scrollSpeed}s</span>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="15"
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer outline-none"
                  value={config.scrollSpeed}
                  onChange={(e) => onConfigChange({ ...config, scrollSpeed: Number(e.target.value) })}
                />
              </div>

              {/* Font Size Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono uppercase text-white/60">
                  <span>Font Size</span>
                  <span className="text-primary-container font-bold">{config.fontSize}px</span>
                </div>
                <input 
                  type="range"
                  min="20"
                  max="80"
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer outline-none"
                  value={config.fontSize}
                  onChange={(e) => onConfigChange({ ...config, fontSize: Number(e.target.value) })}
                />
              </div>

              {/* Letter Spacing Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono uppercase text-white/60">
                  <span>Letter Space</span>
                  <span className="text-primary-container font-bold">{(config.letterSpacing).toFixed(2)}em</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="50"
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer outline-none"
                  value={config.letterSpacing * 100}
                  onChange={(e) => onConfigChange({ ...config, letterSpacing: Number(e.target.value) / 100 })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Group 4: Visual Style Palette row */}
        <div className="glass-card p-6 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/90 font-mono text-xs uppercase tracking-wider">
              <Palette className="w-4 h-4 text-secondary-custom" />
              Glow Text Color
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {PRESET_COLORS.map(color => (
                <button
                  key={color.name}
                  onClick={() => onConfigChange({ ...config, textColor: color.hex })}
                  className={`w-8 h-8 rounded-sm border hover:scale-110 active:scale-95 transition-all duration-150 relative ${
                    config.textColor.toLowerCase() === color.hex.toLowerCase() 
                      ? 'border-white scale-105 shadow-[0_0_12px_rgba(255,255,255,0.4)]' 
                      : 'border-transparent'
                  }`}
                  style={{ 
                    backgroundColor: color.hex,
                    boxShadow: `0 0 8px ${color.hex}50`
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/90 font-mono text-xs uppercase tracking-wider">
              <Maximize className="w-4 h-4 text-secondary-custom" />
              Background Pixel Base
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {PRESET_BACKGROUNDS.map(bg => (
                <button
                  key={bg.name}
                  onClick={() => onConfigChange({ ...config, backgroundColor: bg.hex })}
                  className={`px-4 py-2 text-xs font-mono rounded border hover:scale-105 active:scale-95 transition-all text-white ${
                    config.backgroundColor === bg.hex ? 'border-primary-container bg-white/5' : 'border-white/10 bg-black/40'
                  }`}
                  style={{ backgroundColor: bg.hex }}
                  title={bg.name}
                >
                  {bg.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Start Display Full-Screen Launcher Button */}
        <section className="flex flex-col items-center pt-4">
          <button 
            onClick={onLaunch}
            className="group relative px-12 py-5 bg-primary-container text-slate-950 font-display font-black text-base tracking-wider rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(0,243,255,0.4)] hover:shadow-[0_0_55px_rgba(0,243,255,0.7)] flex items-center gap-3 uppercase cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              START DISPLAY
              <Maximize2 className="w-5 h-5 shrink-0" />
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-xl"></div>
          </button>
          
          <p className="mt-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 animate-pulse text-center">
            Tap launcher to enter full-screen digital marquee
          </p>
        </section>
      </main>
    </div>
  );
};
