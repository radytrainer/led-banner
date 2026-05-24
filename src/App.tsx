import { useState } from 'react';
import { LedConfig } from './types';
import { ConsoleController } from './components/ConsoleController';
import { FullScreenDisplay } from './components/FullScreenDisplay';

export default function App() {
  const [viewMode, setViewMode] = useState<'controller' | 'display'>('controller');
  const [config, setConfig] = useState<LedConfig>({
    text: 'GO CAMBODIA!',
    scrollSpeed: 5, // 5s marquee scroll time
    fontSize: 48,
    letterSpacing: 0.1, // 0.1em letter spacing
    textColor: '#00f3ff', // neon electric cyan
    backgroundColor: '#131313', // cabinet dark background
    isBold: true,
    effectType: 'scroll',
    fontFamily: 'Space Mono',
  });

  const handleConfigChange = (newConfig: LedConfig) => {
    setConfig(newConfig);
  };

  const updateConfigPartial = (updated: Partial<LedConfig>) => {
    setConfig(prev => ({ ...prev, ...updated }));
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {viewMode === 'controller' ? (
        <ConsoleController 
          config={config}
          onConfigChange={handleConfigChange}
          onLaunch={() => setViewMode('display')}
        />
      ) : (
        <FullScreenDisplay 
          config={config}
          onClose={() => setViewMode('controller')}
          onUpdateConfig={updateConfigPartial}
        />
      )}
    </div>
  );
}
