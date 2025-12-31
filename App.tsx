
import React, { useState, useEffect } from 'react';
import { LockScreen } from './components/LockScreen';
import { Desktop } from './components/Desktop';
import { SystemError } from './components/SystemError';
import { GPUGlitch } from './components/GPUGlitch';
import { VirusBreach } from './components/VirusBreach';
import { NeuralMeltdown } from './components/NeuralMeltdown';
import { AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('locked');
  const [isCrashed, setIsCrashed] = useState(false);
  const [isGPUMelted, setIsGPUMelted] = useState(true);
  const [isVirusInfected, setIsVirusInfected] = useState(true);
  const [isNeuralMeltdown, setIsNeuralMeltdown] = useState(true);
  const [battery, setBattery] = useState(100);
  const [wallpaper, setWallpaper] = useState('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop');

  useEffect(() => {
    // Sluggish Performance Simulation (Kernel lag)
    const crashTimer = setTimeout(() => {
      if (!isCrashed && state === 'locked') {
        setIsCrashed(true);
      }
    }, 6000); 

    // Rapid Battery Drain (Virus symptom)
    const batteryTimer = setInterval(() => {
      setBattery(prev => (prev > 0 ? prev - 1 : 0));
    }, 2000);

    return () => {
      clearTimeout(crashTimer);
      clearInterval(batteryTimer);
    };
  }, [isCrashed, state]);

  const handleUnlock = () => {
    setState('desktop');
    setIsNeuralMeltdown(true);
    setIsGPUMelted(true);
    // Sudden lag spike on unlock
    document.body.style.filter = 'blur(10px) brightness(2)';
    setTimeout(() => { document.body.style.filter = ''; }, 1000);
  };

  const handleLock = () => {
    setState('locked');
  };

  const resetSystem = () => {
    setIsCrashed(false);
    setIsGPUMelted(false);
    setIsVirusInfected(false);
    setIsNeuralMeltdown(false);
    setState('locked');
    window.location.reload(); 
  };

  return (
    <div className={`
      relative w-screen h-screen overflow-hidden bg-black text-white font-sans selection:bg-red-600/60 
      ${isGPUMelted ? 'animate-extreme-vibration' : ''} 
      ${battery < 10 ? 'opacity-30' : ''}
    `}>
      {isCrashed && <SystemError onReset={resetSystem} />}
      {isGPUMelted && <GPUGlitch />}
      {isVirusInfected && <VirusBreach />}
      {isNeuralMeltdown && <NeuralMeltdown />}
      
      {/* Heavy Corrupted Background */}
      <div 
        className="absolute inset-0 transition-all duration-300 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `url(${wallpaper})`,
          filter: (state === 'locked' ? 'blur(80px) brightness(0.1) contrast(500%)' : 'blur(2px) brightness(0.6)') + 
                  (isVirusInfected ? ' grayscale(0.1) sepia(1) hue-rotate(-120deg) invert(0.3)' : '') + 
                  (isNeuralMeltdown ? ' contrast(10) saturate(0) brightness(0.2)' : ''),
          transform: state === 'locked' ? 'scale(3) rotate(30deg)' : 'scale(1.2)'
        }}
      />
      
      {/* Noise and Flicker Layers */}
      <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uWUicGLeE/giphy.gif')] opacity-20 mix-blend-overlay z-1 pointer-events-none" />
      <div className="absolute inset-0 bg-red-600/5 animate-flicker pointer-events-none" />

      {/* Main Content with Lag Simulation */}
      <div className={`relative z-10 w-full h-full ${isNeuralMeltdown ? 'animate-frame-skip' : ''}`}>
        {state === 'locked' ? (
          <LockScreen onUnlock={handleUnlock} />
        ) : (
          <Desktop 
            onLock={handleLock} 
            onCrash={() => setIsCrashed(true)} 
            onGPUMelt={() => setIsGPUMelted(!isGPUMelted)}
            onVirus={() => setIsVirusInfected(!isVirusInfected)}
            onNeuralMeltdown={() => setIsNeuralMeltdown(!isNeuralMeltdown)}
            onSetWallpaper={setWallpaper}
            battery={battery}
          />
        )}
      </div>

      <style>{`
        @keyframes vibration {
          0% { transform: translate(0,0); }
          1% { transform: translate(20px, -20px); filter: hue-rotate(180deg); }
          2% { transform: translate(-20px, 20px) scale(1.1); filter: invert(1); }
          5% { transform: translate(0,0); }
        }
        @keyframes frameSkip {
          0%, 10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90% { opacity: 1; }
          5%, 15%, 25%, 35%, 45%, 55%, 65%, 75%, 85%, 95% { opacity: 0.2; transform: translateX(5px); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.2; }
          55% { opacity: 0.8; }
          60% { opacity: 0.05; }
        }
        .animate-extreme-vibration { animation: vibration 0.1s infinite; }
        .animate-frame-skip { animation: frameSkip 0.5s steps(2) infinite; }
        .animate-flicker { animation: flicker 4s infinite; }
      `}</style>
    </div>
  );
};

export default App;
