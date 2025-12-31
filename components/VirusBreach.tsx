
import React, { useState, useEffect } from 'react';

type VirusType = 
  | 'mydoom' | 'wannacry' | 'iloveyou' | 'stuxnet' 
  | 'cih' | 'worm' | 'vbs_script' | 'codered' 
  | 'melissa' | 'sasser' | 'zeus' | 'conficker' 
  | 'cryptolocker' | 'flashback' | 'flame';

interface Popup {
  id: number;
  x: number;
  y: number;
  type: VirusType;
  content: string;
  velocity: { x: number; y: number };
  scale: number;
}

export const VirusBreach: React.FC = () => {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [bloodyHearts, setBloodyHearts] = useState<{ id: number, x: number, y: number, speed: number, size: number }[]>([]);
  const [sasserCountdown, setSasserCountdown] = useState<number | null>(null);
  const [codeRedActive, setCodeRedActive] = useState(false);
  const [cihProgress, setCihProgress] = useState(0);
  const [mydoomLogs, setMydoomLogs] = useState<string[]>([]);

  const getIntensityClass = (type: VirusType) => {
    switch (type) {
      case 'wannacry':
      case 'cih':
      case 'cryptolocker':
      case 'stuxnet':
      case 'codered':
        // High intensity: frequent, violent intermittent glitches
        return 'animate-intermittent-shake-high animate-intermittent-flicker-high';
      case 'mydoom':
      case 'iloveyou':
      case 'sasser':
      case 'flame':
      case 'zeus':
        // Medium intensity: occasional unstable glitches
        return 'animate-intermittent-shake-med animate-intermittent-flicker-med';
      default:
        // Low intensity: rare, subtle glitches
        return 'animate-intermittent-shake-low animate-intermittent-flicker-low';
    }
  };

  useEffect(() => {
    const initialPopups: Popup[] = [
      { id: 1, x: 5, y: 15, type: 'mydoom', content: "andy; I'm just doing my job, nothing personal, sorry.", velocity: { x: 0.1, y: 0.05 }, scale: 1 },
      { id: 2, x: 55, y: 10, type: 'wannacry', content: "Oops, your files have been encrypted! Send 300 USD in Bitcoin.", velocity: { x: -0.05, y: 0.1 }, scale: 1.1 },
      { id: 3, x: 25, y: 40, type: 'iloveyou', content: "ILOVEYOU: Kindly check the attached LOVE-LETTER-FOR-YOU.TXT.vbs", velocity: { x: 0.15, y: -0.1 }, scale: 1 },
      { id: 4, x: 10, y: 70, type: 'cih', content: "CIH v1.2 [Chernobyl] - Erasing Flash BIOS...", velocity: { x: 0.2, y: 0.1 }, scale: 1.3 },
      { id: 5, x: 70, y: 50, type: 'flame', content: "FLAME: Espionage Module Loaded. Monitoring Bluetooth & Audio.", velocity: { x: -0.1, y: 0.2 }, scale: 1.1 }
    ];
    setPopups(initialPopups);

    const moveInterval = setInterval(() => {
      setPopups(prev => prev.map(p => {
        let newX = p.x + p.velocity.x;
        let newY = p.y + p.velocity.y;
        let newVX = p.velocity.x;
        let newVY = p.velocity.y;

        if (newX < 0 || newX > 75) newVX *= -1;
        if (newY < 0 || newY > 75) newVY *= -1;

        return { ...p, x: newX, y: newY, velocity: { x: newVX, y: newVY } };
      }));
      
      if (Math.random() > 0.6) {
        setBloodyHearts(prev => [
          ...prev.slice(-40), 
          { id: Date.now() + Math.random(), x: Math.random() * 100, y: -10, speed: 0.8 + Math.random() * 2, size: 15 + Math.random() * 25 }
        ]);
      }
      setBloodyHearts(prev => prev.map(h => ({ ...h, y: h.y + h.speed })).filter(h => h.y < 110));

    }, 30);

    const spawnInterval = setInterval(() => {
      const types: VirusType[] = ['codered', 'melissa', 'sasser', 'zeus', 'conficker', 'stuxnet', 'flashback', 'cryptolocker', 'cih', 'flame', 'mydoom'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      if (type === 'sasser' && sasserCountdown === null) setSasserCountdown(60);
      if (type === 'codered') setCodeRedActive(true);

      const contents: Record<string, string> = {
        codered: "Hacked By Chinese!",
        melissa: "Here is that document you asked for... don't show anyone else ;-)",
        sasser: "System Shutdown Initialized by LSASS.EXE",
        zeus: "CREDENTIAL_LEAK: Bank of Gemini credentials stolen.",
        conficker: "Remote Access Service Started. Peer-to-Peer network active.",
        stuxnet: "CENTRIFUGE_SPEED_CONTROL_ERROR: Target: Natanz-OS",
        flashback: "Java Update Required. Please enter admin password to continue.",
        cryptolocker: "RSA-2048 encryption applied to all /home directories.",
        cih: "CIH.Chernobyl: Overwriting Flash BIOS firmware...",
        flame: "Flame v2.1: Keylogging stream active. Audio recording started.",
        mydoom: "andy; I'm just doing my job, nothing personal, sorry."
      };

      setPopups(prev => {
        if (prev.length > 40) return prev.slice(1);
        return [...prev, {
          id: Date.now(),
          x: Math.random() * 70,
          y: Math.random() * 70,
          type: type as VirusType,
          content: contents[type] || "GENERIC_MALWARE_DETECTION",
          velocity: { x: (Math.random() - 0.5) * 5, y: (Math.random() - 0.5) * 5 },
          scale: 0.9 + Math.random() * 0.4
        }];
      });
    }, 2000);

    const cihTimer = setInterval(() => {
        setCihProgress(prev => (prev < 100 ? prev + 1 : 0));
    }, 100);

    const mydoomTimer = setInterval(() => {
      const domains = ["gmail.com", "yahoo.com", "microsoft.com", "gov.ir", "fbi.gov", "nasa.gov", "apple.com"];
      const randomIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      const randomDomain = domains[Math.floor(Math.random() * domains.length)];
      setMydoomLogs(prev => [`SENT: payload.zip to admin@${randomDomain} [${randomIP}]`, ...prev].slice(0, 10));
    }, 800);

    return () => {
      clearInterval(moveInterval);
      clearInterval(spawnInterval);
      clearInterval(cihTimer);
      clearInterval(mydoomTimer);
    };
  }, []);

  useEffect(() => {
    if (sasserCountdown !== null && sasserCountdown > 0) {
      const timer = setTimeout(() => setSasserCountdown(sasserCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [sasserCountdown]);

  return (
    <div className="fixed inset-0 z-[9000] pointer-events-none select-none overflow-hidden font-mono text-red-500">
      {/* Code Red Banner Overlay */}
      {codeRedActive && (
        <div className="absolute top-0 left-0 w-full bg-red-600 text-white text-center py-2 font-black animate-pulse z-[10000] text-3xl tracking-widest">
          Hacked By Chinese!
          <button onClick={() => setCodeRedActive(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs border p-1 px-2 hover:bg-white hover:text-red-600 pointer-events-auto transition-colors">CLOSE</button>
        </div>
      )}

      {/* Mydoom Spreading Console */}
      <div className="absolute top-40 left-10 w-80 bg-zinc-900 border-2 border-zinc-700 p-3 z-[9997] pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.9)] opacity-90">
        <div className="flex items-center justify-between border-b border-zinc-700 pb-2 mb-2">
           <span className="text-zinc-400 text-[10px] font-bold">Mydoom.A@mm // Mass Mailer</span>
           <div className="flex gap-1">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
             <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse delay-75" />
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-150" />
           </div>
        </div>
        <div className="text-[9px] text-green-500 font-mono space-y-1 h-32 overflow-hidden">
           {mydoomLogs.map((log, i) => (
             <div key={i} className="whitespace-nowrap overflow-hidden text-ellipsis">{log}</div>
           ))}
        </div>
        <div className="mt-2 text-[8px] text-zinc-500 italic border-t border-zinc-800 pt-2">
           "andy; I'm just doing my job, nothing personal, sorry."
        </div>
      </div>

      {/* Sasser Shutdown Box */}
      {sasserCountdown !== null && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-200 border-2 border-zinc-400 p-8 shadow-[10px_10px_0_rgba(0,0,0,0.5)] w-96 text-black pointer-events-auto z-[9999]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-600 flex items-center justify-center text-white text-2xl font-black">X</div>
            <div className="font-bold text-sm">System Shutdown</div>
          </div>
          <div className="text-xs mb-6 leading-relaxed">
            This system is shutting down. Please save all work in progress and log off. Any unsaved changes will be lost. This shutdown was initiated by NT AUTHORITY\SYSTEM.
            <br/><br/>
            <span className="font-bold text-red-600">Time before shutdown: 00:00:{sasserCountdown.toString().padStart(2, '0')}</span>
          </div>
          <div className="text-[10px] text-zinc-500">Message: The system process 'C:\WINDOWS\system32\lsass.exe' terminated unexpectedly with status code 128.</div>
        </div>
      )}

      {/* CIH / Chernobyl BIOS Overwrite Window */}
      <div className="absolute bottom-20 right-20 w-96 bg-blue-900 border-4 border-white p-4 text-white z-[9999] pointer-events-auto shadow-[20px_20px_0_rgba(0,0,0,0.8)]">
        <div className="bg-white text-blue-900 font-bold px-2 py-1 mb-4 flex justify-between items-center uppercase italic">
            <span>AWARD Software BIOS Update</span>
            <span>CIH v1.2</span>
        </div>
        <div className="text-[10px] space-y-2">
            <div className="flex justify-between">
                <span>Current BIOS:</span>
                <span className="text-yellow-400">Ver 1.0 (04/26/1998)</span>
            </div>
            <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-red-500 font-bold animate-pulse">ERASING FLASH MEMORY...</span>
            </div>
            <div className="w-full bg-blue-950 h-6 border border-white p-1">
                <div className="h-full bg-yellow-400 transition-all duration-100" style={{ width: `${cihProgress}%` }} />
            </div>
            <div className="grid grid-cols-8 gap-1 pt-4 text-[8px] opacity-70">
                {Array.from({ length: 32 }).map((_, i) => (
                    <div key={i} className={i < (cihProgress / 3) ? 'text-red-500' : 'text-emerald-500'}>
                        {i < (cihProgress / 3) ? 'BAD' : 'OK'}
                    </div>
                ))}
            </div>
            <div className="text-center pt-4 text-red-500 font-black animate-ping">
                !! DO NOT TURN OFF POWER !!
            </div>
        </div>
      </div>

      {/* Falling Bloody Hearts (ILOVEYOU) */}
      {bloodyHearts.map(h => (
        <div key={h.id} className="absolute text-red-600 animate-wiggle opacity-80" style={{ left: `${h.x}%`, top: `${h.y}%`, fontSize: `${h.size}px`, filter: 'drop-shadow(0 0 10px #ff0000)' }}>
          {Math.random() > 0.5 ? '❤️' : '💔'}
        </div>
      ))}

      {/* Popups */}
      {popups.map((p) => (
        <div 
          key={p.id}
          className={`absolute pointer-events-auto border-2 shadow-[15px_15px_0px_rgba(0,0,0,0.8)] overflow-hidden transform transition-all duration-150 ${getIntensityClass(p.type)} ${
            p.type === 'wannacry' || p.type === 'cryptolocker' ? 'bg-red-900 border-white w-[350px]' : 
            p.type === 'mydoom' || p.type === 'sasser' ? 'bg-zinc-100 border-zinc-500 w-72 text-black' : 
            p.type === 'iloveyou' || p.type === 'melissa' ? 'bg-pink-700 border-red-200 w-64' :
            p.type === 'zeus' ? 'bg-emerald-900 border-emerald-400 w-80 text-emerald-100' :
            p.type === 'stuxnet' ? 'bg-blue-950 border-blue-400 w-80 text-blue-400' :
            p.type === 'cih' ? 'bg-blue-800 border-white w-80 text-white' :
            p.type === 'flame' ? 'bg-black border-yellow-500 w-80 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]' :
            'bg-black border-red-600 w-80 text-red-500'
          }`}
          style={{ top: `${p.y}%`, left: `${p.x}%`, transform: `rotate(${(p.x % 10) - 5}deg) scale(${p.scale})`, zIndex: Math.floor(p.id % 1000) }}
        >
          <div className={`flex items-center justify-between px-2 py-1 text-[9px] font-black tracking-widest ${
            p.type === 'mydoom' || p.type === 'sasser' ? 'bg-blue-800 text-white' : 
            p.type === 'cih' ? 'bg-white text-blue-800' :
            p.type === 'flame' ? 'bg-yellow-600 text-black' :
            'bg-black text-red-600'
          }`}>
            <span>{p.type.toUpperCase()}_EXE</span>
            <button onClick={() => setPopups(prev => prev.filter(pop => pop.id !== p.id))} className="w-4 h-4 bg-red-600 text-white flex items-center justify-center border border-white/20">X</button>
          </div>
          
          <div className="p-4 relative">
            {p.type === 'mydoom' && <div className="text-[10px] text-blue-700 italic mb-2">SMTP_RELAY_INITIALIZED</div>}
            <div className={`text-[10px] leading-tight break-words uppercase ${p.type === 'mydoom' ? 'font-serif italic' : 'font-bold'}`}>
              {p.content}
            </div>
            {/* Scanline overlay for extra glitchiness */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent h-1 w-full animate-popup-scanline pointer-events-none" />
          </div>
          <div className={`h-1 w-full overflow-hidden ${p.type === 'flame' ? 'bg-yellow-900/30' : 'bg-red-600/30'}`}>
             <div className={`h-full animate-progress ${p.type === 'flame' ? 'bg-yellow-500' : 'bg-red-600'}`} />
          </div>
        </div>
      ))}

      <style>{`
        @keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }
        @keyframes wiggle { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(5px); } }
        @keyframes popup-scanline { 0% { top: -10%; } 100% { top: 110%; } }

        /* Intermittent Shake - High Intensity */
        @keyframes intermittent-shake-high {
          0%, 15%, 35%, 55%, 75%, 95%, 100% { transform: translate(0, 0) rotate(0); }
          5%, 25%, 45%, 65%, 85% { transform: translate(-4px, 2px) rotate(-1deg); }
          10%, 30%, 50%, 70%, 90% { transform: translate(4px, -2px) rotate(1deg); }
        }

        /* Intermittent Flicker - High Intensity */
        @keyframes intermittent-flicker-high {
          0%, 12%, 24%, 36%, 48%, 60%, 72%, 84%, 96%, 100% { opacity: 1; filter: contrast(1); }
          6%, 18%, 30%, 42%, 54%, 66% { opacity: 0.4; filter: contrast(3) hue-rotate(90deg) invert(0.2); }
        }

        /* Intermittent Shake - Medium Intensity */
        @keyframes intermittent-shake-med {
          0%, 40%, 60%, 100% { transform: translate(0, 0); }
          45%, 55% { transform: translate(-2px, 1px) rotate(-0.5deg); }
          50% { transform: translate(2px, -1px) rotate(0.5deg); }
        }

        /* Intermittent Flicker - Medium Intensity */
        @keyframes intermittent-flicker-med {
          0%, 30%, 50%, 70%, 100% { opacity: 1; filter: grayscale(0); }
          40%, 60% { opacity: 0.7; filter: grayscale(1) contrast(1.5); }
        }

        /* Intermittent Shake - Low Intensity */
        @keyframes intermittent-shake-low {
          0%, 80%, 100% { transform: translate(0, 0); }
          85%, 95% { transform: translate(-1px, 0); }
          90% { transform: translate(1px, 0); }
        }

        /* Intermittent Flicker - Low Intensity */
        @keyframes intermittent-flicker-low {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0.8; }
        }

        .animate-progress { animation: progress 2s linear infinite; }
        .animate-wiggle { animation: wiggle 1s infinite; }
        .animate-popup-scanline { animation: popup-scanline 3s linear infinite; }

        .animate-intermittent-shake-high { animation: intermittent-shake-high 0.8s infinite; }
        .animate-intermittent-flicker-high { animation: intermittent-flicker-high 0.5s infinite; }
        
        .animate-intermittent-shake-med { animation: intermittent-shake-med 3s infinite; }
        .animate-intermittent-flicker-med { animation: intermittent-flicker-med 4s infinite; }
        
        .animate-intermittent-shake-low { animation: intermittent-shake-low 8s infinite; }
        .animate-intermittent-flicker-low { animation: intermittent-flicker-low 6s infinite; }
      `}</style>
    </div>
  );
};
