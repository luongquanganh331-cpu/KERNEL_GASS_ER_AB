
import React from 'react';

interface LauncherProps {
  onClose: () => void;
  onOpenApp: (id: string) => void;
}

export const Launcher: React.FC<LauncherProps> = ({ onClose, onOpenApp }) => {
  const recentFiles = [
    { name: 'DELETED_MEMORIES.dmg', time: '00:00 AM', color: 'text-red-700' },
    { name: 'VIRUS_LOG.txt', time: 'NOW', color: 'text-red-500' },
    { name: 'ILOVEYOU-LETTER.vbs', time: 'FAILED', color: 'text-pink-600' }
  ];

  const apps = [
    { id: 'browser', name: 'BROWSER_HIJACK', icon: '💀', color: 'bg-red-900' },
    { id: 'gemini', name: 'NEURAL_VIRUS', icon: '🧠', color: 'bg-black' },
    { id: 'messages', name: 'SPAM_BOT', icon: '💬', color: 'bg-red-800' },
    { id: 'files', name: 'MISSING_DATA', icon: '📂', color: 'bg-zinc-900' },
    { id: 'notes', name: 'RANSOM_NOTE', icon: '📝', color: 'bg-red-950' },
    { id: 'wallpaper', name: 'RECOVERY', icon: '🎨', color: 'bg-teal-900' },
    { id: 'terminal', name: 'SELF_DESTRUCT', icon: '🐚', color: 'bg-black' },
  ];

  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center bg-red-950/40 backdrop-blur-xl animate-in fade-in zoom-in duration-100">
      <div 
        className="w-full max-w-2xl glass-blood rounded-none p-10 shadow-[0_0_200px_rgba(255,0,0,0.5)] border-4 border-red-600 transform skew-x-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corrupted Search Bar */}
        <div className="relative mb-12 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center font-black text-xl text-white">!</div>
          <input 
            autoFocus
            type="text" 
            placeholder="SEARCHING_FOR_SURVIVORS..."
            className="w-full pl-20 pr-8 py-5 rounded-none bg-black/80 border-2 border-red-600 outline-none focus:border-white transition-all text-xl font-mono text-red-500 animate-pulse"
          />
        </div>

        {/* Missing Files */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black tracking-[0.5em] text-red-600 uppercase">FILES_MISSING_FROM_CORE</h3>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {recentFiles.map(file => (
              <div key={file.name} className="bg-red-950/20 p-5 border-2 border-red-600/30 hover:bg-red-600/20 transition-all cursor-not-allowed group">
                <div className={`text-3xl mb-3 ${file.color} animate-vibrate-icon`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
                </div>
                <div className="text-xs font-black truncate text-red-500">{file.name}</div>
                <div className="text-[10px] opacity-40 mt-1 font-mono">{file.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Infected Apps Grid */}
        <div className="grid grid-cols-4 gap-y-12 gap-x-6 max-h-[400px] overflow-y-auto pb-6">
          {apps.map(app => (
            <button 
              key={app.id} 
              onClick={() => onOpenApp(app.id)}
              className="flex flex-col items-center gap-4 group transition-transform hover:scale-125"
            >
              <div className={`w-20 h-20 rounded-none ${app.color} flex items-center justify-center text-4xl shadow-2xl border-2 border-red-600/50 group-hover:bg-red-600 group-hover:rotate-12 transition-all`}>
                {app.icon}
              </div>
              <span className="text-[10px] font-black text-red-600 tracking-tighter uppercase group-hover:text-white">{app.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Invisible backdrop to close */}
      <div className="absolute inset-0 z-[-1]" onClick={onClose} />
      <style>{`
        .glass-blood { background: rgba(30, 0, 0, 0.95); }
      `}</style>
    </div>
  );
};
