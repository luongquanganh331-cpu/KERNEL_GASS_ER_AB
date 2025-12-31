
import React, { useState, useEffect, useRef } from 'react';
import { Launcher } from './Launcher';
import { ControlPanel } from './ControlPanel';
import { GeminiApp } from './GeminiApp';
import { WallpaperApp } from './WallpaperApp';
import { MydoomRelayApp } from './MydoomRelayApp';
import { AppConfig } from '../types';

interface DesktopProps {
  onLock: () => void;
  onCrash: () => void;
  onGPUMelt: () => void;
  onVirus: () => void;
  onNeuralMeltdown: () => void;
  onSetWallpaper: (url: string) => void;
  battery: number;
}

export const Desktop: React.FC<DesktopProps> = ({ 
  onLock, onCrash, onGPUMelt, onVirus, onNeuralMeltdown, onSetWallpaper, battery 
}) => {
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [controlOpen, setControlOpen] = useState(false);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [disruptionActive, setDisruptionActive] = useState(false);
  const [appCorruption, setAppCorruption] = useState<Record<string, boolean>>({});
  const [relayLogs, setRelayLogs] = useState<string[]>([]);
  
  // Simulated Resource Strain Metrics
  const [cpuUsage, setCpuUsage] = useState(85);
  const [ramUsage, setRamUsage] = useState(72);
  const [coreTemp, setCoreTemp] = useState(68);
  const [sectorCorruption, setSectorCorruption] = useState(42);

  // Mydoom Spreading Simulation Domains
  const domains = ['microsoft.com', 'fbi.gov', 'apple.com', 'nasa.gov', 'navy.mil', 'gov.ru', 'fcc.gov', 'kremlin.ru', 'interpol.int'];

  useEffect(() => {
    const interval = setInterval(() => {
      const isRelaying = activeApp === 'browser';
      
      setCpuUsage(prev => {
        const bonus = isRelaying ? 15 : 0;
        const jitter = Math.random() * 20 - 8;
        return Math.min(100, Math.max(75, prev + jitter + (bonus * Math.random())));
      });

      setRamUsage(prev => {
        // Simulating a memory leak: drifting upwards
        const leak = isRelaying ? 0.8 : 0.2;
        const jitter = Math.random() * 4 - 2;
        return Math.min(99.9, Math.max(60, prev + jitter + leak));
      });

      setCoreTemp(prev => {
        const heatFactor = cpuUsage > 90 ? 2 : (cpuUsage > 80 ? 0.5 : -0.5);
        return Math.min(105, Math.max(45, prev + heatFactor + (Math.random() * 2 - 1)));
      });

      setSectorCorruption(prev => {
        return Math.min(100, prev + (Math.random() > 0.95 ? 0.1 : 0));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeApp, cpuUsage]);

  // Background Relay Task
  useEffect(() => {
    if (activeApp !== 'browser') return;

    const relayTask = setInterval(() => {
      const domain = domains[Math.floor(Math.random() * domains.length)];
      const success = Math.random() > 0.1;
      const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      
      const eventTypes = ['PAYLOAD_DELIVERED', 'SMTP_RELAY_ESTABLISHED', 'WORM_INJECTED', 'MX_OVERRIDE'];
      const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      
      const newLog = success 
        ? `[RELAY_OK] ${type} -> admin@${domain} [${ip}]`
        : `[RELAY_FAIL] connection reset by firewall [${domain}]`;

      setRelayLogs(prev => [newLog, ...prev].slice(0, 20));

      if (Math.random() > 0.92) onVirus();
    }, 800);

    return () => clearInterval(relayTask);
  }, [activeApp, onVirus]);

  const apps: AppConfig[] = [
    { id: 'browser', name: 'MYDOOM_RELAY', icon: '📬', color: 'bg-zinc-800' },
    { id: 'gemini', name: 'GOOGLE_AI_STUDIO', icon: '🧠', color: 'bg-black' },
    { id: 'messages', name: 'MELISSA_OUTLOOK', icon: '📧', color: 'bg-pink-900' },
    { id: 'wallpaper', name: 'FLAME_RECON', icon: '🔥', color: 'bg-yellow-950' },
    { id: 'terminal', name: 'CIH_FLASH_TOOL', icon: '💾', color: 'bg-blue-900' },
  ];

  const triggerVirusStorm = () => {
    setDisruptionActive(true);
    for(let i = 0; i < 8; i++) {
      setTimeout(() => onVirus(), i * 120);
    }
    if (Math.random() > 0.8) {
      setTimeout(() => onCrash(), 2500);
    }
    setTimeout(() => setDisruptionActive(false), 2500);
  };

  const handleOpenApp = (id: string) => {
    if (Math.random() > 0.65) {
      triggerVirusStorm();
      return;
    }
    setActiveApp(id);
    setLauncherOpen(false);
  };

  const handleCorrupt = () => {
    if (activeApp) {
      setAppCorruption(prev => ({ ...prev, [activeApp]: true }));
      onVirus();
      setDisruptionActive(true);
      setTimeout(() => setDisruptionActive(false), 800);

      if (Math.random() > 0.4) {
        setTimeout(() => onCrash(), 1500);
      }
    } else {
      triggerVirusStorm();
    }
  };

  const isExtremeStrain = cpuUsage > 96 || ramUsage > 95 || coreTemp > 98;

  return (
    <div className={`relative w-full h-full flex flex-col font-mono ${disruptionActive || isExtremeStrain ? 'animate-vibrate-intense' : ''}`}>
      {/* Botnet Background Visualization */}
      {activeApp === 'browser' && (
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0 flex flex-wrap overflow-hidden gap-1 p-2">
           {Array.from({ length: 400 }).map((_, i) => (
             <div key={i} className={`w-2 h-2 rounded-sm ${Math.random() > 0.95 ? 'bg-red-600 animate-ping shadow-[0_0_10px_#f00]' : 'bg-green-950/20'} transition-all duration-1000`} />
           ))}
        </div>
      )}

      {/* Visual Disruption Overlay */}
      {(disruptionActive || isExtremeStrain) && (
        <div className="absolute inset-0 z-[10000] bg-red-950/20 flex flex-col items-center justify-center pointer-events-none overflow-hidden">
           {isExtremeStrain && <div className="text-4xl font-black text-white animate-pulse bg-red-600 px-8 py-2">!! THERMAL_THROTTLING_ACTIVE !!</div>}
        </div>
      )}

      {/* Global Infection Monitor Widget */}
      {activeApp === 'browser' && (
        <div className="absolute top-12 right-12 w-80 glass border-2 border-red-600/50 p-6 z-10 animate-in slide-in-from-right-10 overflow-hidden shadow-[0_0_80px_rgba(255,0,0,0.3)]">
          <div className="flex items-center justify-between border-b border-red-900/50 pb-3 mb-4">
             <span className="text-[12px] font-black text-red-500 uppercase tracking-widest animate-pulse">MASS_MAILER_BOTNET</span>
             <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping delay-100" />
             </div>
          </div>
          <div className="space-y-1.5 h-56 overflow-hidden">
            {relayLogs.map((log, i) => (
              <div key={i} className={`text-[9px] font-mono leading-none truncate ${log.includes('RELAY_OK') ? 'text-green-500 font-bold' : 'text-red-700 italic opacity-50'}`}>
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Status Bar (Resource Monitors) */}
      <div className="h-10 w-full glass-dark flex items-center justify-between px-6 text-[10px] font-mono tracking-tighter text-red-500 border-b border-red-900/50 relative z-50 overflow-hidden">
         <div className="absolute inset-0 bg-red-600/5 animate-flicker pointer-events-none" />
         
         <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2">
               <span className="text-zinc-500 uppercase tracking-[0.2em]">System_Health:</span>
               <span className="text-red-600 font-black animate-pulse">CRITICAL</span>
            </div>
            
            <div className="flex items-center gap-4 border-l border-red-900/50 pl-6 h-full">
              {/* CPU MONITOR */}
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[8px] opacity-60">
                  <span>CPU_CORE</span>
                  <span className={cpuUsage > 95 ? 'text-white' : ''}>{Math.round(cpuUsage)}%</span>
                </div>
                <div className="w-24 h-2 bg-red-950/50 border border-red-900/30 p-[1px] relative overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${cpuUsage > 90 ? 'bg-red-600 animate-pulse shadow-[0_0_10px_#f00]' : 'bg-orange-600'}`} style={{ width: `${cpuUsage}%` }} />
                </div>
              </div>

              {/* RAM MONITOR */}
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[8px] opacity-60">
                  <span>RAM_VIRT</span>
                  <span className={ramUsage > 90 ? 'text-white' : ''}>{Math.round(ramUsage)}%</span>
                </div>
                <div className="w-24 h-2 bg-red-950/50 border border-red-900/30 p-[1px] relative overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${ramUsage > 85 ? 'bg-white' : 'bg-yellow-600'}`} style={{ width: `${ramUsage}%` }} />
                </div>
              </div>

              {/* TEMP MONITOR */}
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[8px] opacity-60">
                  <span>TEMP_CORE</span>
                  <span className={coreTemp > 90 ? 'text-white animate-flash' : ''}>{Math.round(coreTemp)}°C</span>
                </div>
                <div className="w-24 h-2 bg-red-950/50 border border-red-900/30 p-[1px] relative overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${coreTemp > 90 ? 'bg-red-500 shadow-[0_0_15px_#f00]' : 'bg-red-900'}`} style={{ width: `${Math.min(100, (coreTemp/105)*100)}%` }} />
                </div>
              </div>

              {/* SECTOR CORRUPTION MONITOR */}
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[8px] opacity-60">
                  <span>SECTOR_CORRUPTION</span>
                  <span>{Math.round(sectorCorruption)}%</span>
                </div>
                <div className="w-24 h-2 bg-red-950/50 border border-red-900/30 p-[1px] relative overflow-hidden">
                  <div className="h-full bg-zinc-800" style={{ width: `${sectorCorruption}%` }} />
                  {/* Glitch overlays on bars */}
                  <div className="absolute inset-0 bg-white/20 animate-flash pointer-events-none" style={{ opacity: cpuUsage > 95 ? 0.5 : 0 }} />
                </div>
              </div>
            </div>
         </div>

         <div className="flex items-center gap-6">
            <span className="animate-pulse text-red-600 font-black tracking-[0.3em] uppercase underline decoration-2 underline-offset-4">!! CRITICAL_CORRUPTION !!</span>
            <span className="flex items-center gap-2">
               PWR: {battery}%
               <div className={`w-10 h-4 border border-red-500 p-0.5 ${battery < 20 ? 'animate-ping bg-red-600' : ''}`}>
                  <div className="h-full bg-red-600 shadow-[0_0_5px_#f00]" style={{ width: `${battery}%` }} />
               </div>
            </span>
            <span className="text-red-600 font-black">0x{Math.floor(Math.random() * 9999).toString(16).toUpperCase()}</span>
         </div>
      </div>

      <div className="flex-1 p-8 relative flex items-center justify-center overflow-hidden">
        {activeApp === 'gemini' && (
          <div className={`absolute inset-0 flex items-center justify-center p-4 z-20 ${appCorruption['gemini'] ? 'animate-corrupt-severe' : 'animate-vibrate-mild'}`}>
            <GeminiApp onClose={() => setActiveApp(null)} isCorrupted={appCorruption['gemini']} />
            {appCorruption['gemini'] && <div className="absolute inset-0 z-[100] bg-red-900/5 pointer-events-none animate-flicker-intense" />}
          </div>
        )}
        {activeApp === 'wallpaper' && (
          <div className={`absolute inset-0 flex items-center justify-center p-4 z-[9999] ${appCorruption['wallpaper'] ? 'animate-corrupt-severe' : 'animate-vibrate-mild'}`}>
            <WallpaperApp 
              onClose={() => setActiveApp(null)} 
              onSetWallpaper={(url) => { onSetWallpaper(url); setActiveApp(null); }} 
            />
          </div>
        )}
        {activeApp === 'browser' && (
          <div className={`absolute inset-0 flex items-center justify-center p-4 z-[9999] ${appCorruption['browser'] ? 'animate-corrupt-severe' : ''}`}>
            <MydoomRelayApp onClose={() => setActiveApp(null)} />
          </div>
        )}
        
        {!activeApp && (
          <div className="text-center opacity-40 pointer-events-none select-none relative z-10">
            <div className="text-[18vw] font-black text-red-800 mix-blend-difference animate-pulse italic uppercase tracking-tighter">INFECTED</div>
            <div className="text-4xl font-mono text-white bg-red-900 inline-block px-10 py-3 border-8 border-red-600 shadow-[0_0_100px_rgba(255,0,0,0.5)]">
               BOTNET_OVERLOAD: MYDOOM.A
            </div>
          </div>
        )}
      </div>

      {launcherOpen && <Launcher onClose={() => setLauncherOpen(false)} onOpenApp={handleOpenApp} />}
      {controlOpen && <ControlPanel 
        onClose={() => setControlOpen(false)} 
        onLock={onLock} 
        onCrash={onCrash} 
        onGPUMelt={onGPUMelt}
        onVirus={onVirus}
        onNeuralMeltdown={onNeuralMeltdown}
        onCorrupt={handleCorrupt}
      />}

      {/* Hijacked Dock */}
      <div className="h-40 w-full flex justify-center items-center pb-12 z-50">
        <div className={`glass px-12 py-6 rounded-none flex items-center gap-10 shadow-[0_0_200px_rgba(255,0,0,0.5)] border-[6px] border-zinc-800 ${isExtremeStrain ? 'animate-jitter-extreme scale-95 opacity-80' : 'animate-jitter-extreme'}`}>
          <button 
            onClick={() => {
              if(Math.random() > 0.5) onVirus();
              setLauncherOpen(!launcherOpen);
            }}
            className="w-24 h-24 rounded-none glass hover:bg-zinc-700/60 flex items-center justify-center transition-all animate-spin-hyper border-4 border-zinc-600 shadow-[inset_0_0_20px_#f00]"
          >
            <div className="w-12 h-12 rounded-none border-[12px] border-red-600 animate-pulse" />
          </button>

          {apps.map((app, idx) => (
            <button 
              key={app.id}
              onClick={() => handleOpenApp(app.id)}
              style={{ animationDelay: `${idx * 0.1}s` }}
              className={`
                w-24 h-24 rounded-none ${app.color} flex flex-col items-center justify-center shadow-2xl 
                transition-all hover:scale-[1.8] hover:-translate-y-24 active:rotate-180 animate-float-violent
                ${activeApp === app.id ? 'ring-[15px] ring-red-600 animate-ping border-white border-4' : 'border-4 border-zinc-900'}
              `}
            >
              <span className="text-5xl mb-1 animate-vibrate-icon">{app.icon}</span>
              <div className="text-[6px] font-black uppercase text-white tracking-widest leading-none text-center">{app.name}</div>
            </button>
          ))}

          <button 
            onClick={() => {
              triggerVirusStorm();
              setControlOpen(!controlOpen);
            }}
            className="w-24 h-24 rounded-none glass hover:bg-red-700/60 flex flex-col items-center justify-center animate-bounce-fast border-4 border-white shadow-[0_0_30px_#fff]"
          >
             <span className="text-4xl mb-1 animate-ping">⚡</span>
             <span className="text-[12px] font-black text-white tracking-widest uppercase italic">CONTROL</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes flash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-flash { animation: flash 0.1s infinite; }
        @keyframes jitter-extreme {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-5px, 5px) skew(2deg); }
          20% { transform: translate(5px, -5px) skew(-2deg); }
          30% { transform: translate(-2px, 2px); filter: hue-rotate(45deg); }
          100% { transform: translate(0, 0); }
        }
        .animate-jitter-extreme { animation: jitter-extreme 0.15s infinite; }
        .glass-dark { background: rgba(0,0,0,0.98); }
      `}</style>
    </div>
  );
};
