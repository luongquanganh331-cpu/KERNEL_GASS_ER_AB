
import React from 'react';

interface WallpaperAppProps {
  onClose: () => void;
  onSetWallpaper: (url: string) => void;
}

export const WallpaperApp: React.FC<WallpaperAppProps> = ({ onClose, onSetWallpaper }) => {
  const wallpapers = [
    { name: 'Default Void', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Neural Grid', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Abstract Chaos', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop' },
    { name: 'System Core', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop' },
    { name: 'Glitch Sky', url: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1932&auto=format&fit=crop' },
    { name: 'Deep Crimson', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop' },
  ];

  return (
    <div className="w-full h-full max-w-4xl glass rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
      <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-lg">🎨</div>
          <h2 className="text-sm font-bold tracking-tight">System Personalization</h2>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-3 gap-6">
          {wallpapers.map((wp) => (
            <button
              key={wp.url}
              onClick={() => onSetWallpaper(wp.url)}
              className="group relative aspect-video rounded-xl overflow-hidden border border-white/10 hover:border-teal-500/50 transition-all"
            >
              <img src={wp.url} alt={wp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-bold uppercase tracking-widest">{wp.name}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/5">
          <h3 className="text-xs font-black uppercase tracking-widest text-teal-400 mb-4">Interface Options</h3>
          <div className="flex gap-4">
             <button className="flex-1 p-4 rounded-xl glass border-white/10 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest">
               Light Protocol (DISABLED)
             </button>
             <button className="flex-1 p-4 rounded-xl bg-teal-600/20 border border-teal-500/50 text-xs font-bold uppercase tracking-widest">
               Dark Neural Core (ACTIVE)
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
