
import React from 'react';

interface ControlPanelProps {
  onClose: () => void;
  onLock: () => void;
  onCrash: () => void;
  onGPUMelt: () => void;
  onVirus: () => void;
  onNeuralMeltdown: () => void;
  onCorrupt: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ 
  onClose, onLock, onCrash, onGPUMelt, onVirus, onNeuralMeltdown, onCorrupt 
}) => {
  return (
    <div className="absolute right-8 bottom-24 z-[100] w-96 glass rounded-3xl p-6 shadow-2xl animate-in slide-in-from-right-10 fade-in duration-300">
      <div className="flex items-center justify-between mb-8 text-red-500">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl glass flex items-center justify-center overflow-hidden border-red-500/50">
             <img src="https://picsum.photos/50/50?grayscale" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-sm">anhdaynekkkk</h3>
            <p className="text-[10px] opacity-40 uppercase tracking-widest text-red-600">PROTOCOL_BROKEN</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onLock} className="p-2 glass rounded-lg text-red-500 hover:bg-red-400/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-8">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 px-2 text-red-500">CORE DESTRUCTION TOOLS</h4>
        
        <div className="grid grid-cols-4 gap-2">
          <button 
            onClick={onGPUMelt}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-fuchsia-600/20 border border-fuchsia-500/30 hover:bg-fuchsia-500/40 transition-all group"
          >
            <div className="text-fuchsia-500">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="14" x="3" y="5" rx="2"/><path d="M7 10h10"/><path d="M7 14h10"/></svg>
            </div>
            <span className="text-[7px] font-bold uppercase">GPU</span>
          </button>

          <button 
            onClick={onVirus}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-red-600/20 border border-red-500/30 hover:bg-red-500/40 transition-all group"
          >
            <div className="text-red-500">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M12 22v-2"/></svg>
            </div>
            <span className="text-[7px] font-bold uppercase">BREACH</span>
          </button>

          <button 
            onClick={onNeuralMeltdown}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-purple-600/30 border border-purple-500/50 hover:bg-purple-500/50 transition-all group animate-pulse"
          >
            <div className="text-purple-400">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 1 0 10 10"/></svg>
            </div>
            <span className="text-[7px] font-bold uppercase">CRAZY</span>
          </button>

          <button 
            onClick={onCorrupt}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-yellow-600/30 border border-yellow-500/50 hover:bg-yellow-500/50 transition-all group animate-vibrate-mild"
          >
            <div className="text-yellow-400">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <span className="text-[7px] font-bold uppercase">CORRUPT</span>
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <button 
          onClick={onCrash}
          className="w-full py-4 glass border-red-500/50 text-red-500 font-black uppercase text-xs tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all shadow-[0_0_20px_rgba(255,0,0,0.2)]"
        >
          FORCE_KERNEL_CRASH
        </button>
      </div>

      <div className="flex items-center justify-between opacity-50 border-t border-white/5 pt-4 text-red-500">
        <span className="text-[10px] font-bold uppercase tracking-widest">ERROR_0X889</span>
        <span className="text-[10px] font-bold uppercase tracking-widest animate-bounce">MELTDOWN IMMINENT</span>
      </div>
      
      <div className="fixed inset-0 z-[-1]" onClick={onClose} />
    </div>
  );
};
