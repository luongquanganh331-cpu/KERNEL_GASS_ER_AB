
import React, { useState, useEffect } from 'react';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [time, setTime] = useState(new Date());
  const [code, setCode] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return "BOOT_ERROR_LOG_" + date.getTime();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUnlock();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-red-950/10">
      {/* Glitchy Clock Area */}
      <div className="text-center mb-16 relative">
        <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
        <h1 className="text-9xl font-black tracking-tighter text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.8)] glitch-text">
          {formatTime(time)}
        </h1>
        <p className="text-sm font-mono tracking-[0.5em] text-red-400 mt-4 opacity-70">
          {formatDate(time)}
        </p>
      </div>

      {/* User Area */}
      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full border-4 border-red-600/50 p-1 animate-pulse">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden grayscale contrast-150">
               <img src="https://picsum.photos/100/100?grayscale" alt="Avatar" className="w-full h-full object-cover opacity-50" />
            </div>
          </div>
          <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] font-bold px-2 py-1 rounded-sm shadow-lg">FAILED</div>
        </div>

        <h2 className="text-3xl font-black mb-1 text-red-500 uppercase tracking-tighter">SECURE_BOOT_FAILURE</h2>
        <p className="text-xs font-mono text-red-400/50 mb-8">INTEGRITY_CHECK_LOST // DATA_BREACH_DETECTED</p>

        <form onSubmit={handleSubmit} className="relative group">
          <input 
            autoFocus
            type="text" 
            placeholder="BYPASS KERNEL..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-80 px-6 py-4 rounded-none glass bg-red-950/40 border-red-500/50 outline-none focus:border-red-400 text-center font-mono text-red-400 placeholder:text-red-900 transition-all focus:w-96 shadow-[0_0_20px_rgba(153,27,27,0.3)]"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-red-600 flex items-center justify-center hover:bg-red-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </form>
      </div>

      {/* System Warning */}
      <div className="absolute bottom-8 w-full flex flex-col items-center gap-2">
        <div className="flex gap-4 text-[10px] font-black tracking-widest text-red-600 opacity-80 animate-pulse">
          <span>CRITICAL_MELTDOWN</span>
          <span>•</span>
          <span>GPU_OVERHEAT_0X44</span>
          <span>•</span>
          <span>VIRUS_BREACH</span>
        </div>
        <div className="h-[2px] w-64 bg-red-950 rounded-full overflow-hidden">
           <div className="h-full bg-red-600 w-1/3 animate-[loading_1s_infinite_linear]" />
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};
