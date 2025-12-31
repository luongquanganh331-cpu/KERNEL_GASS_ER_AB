
import React, { useState, useEffect } from 'react';

export const NeuralMeltdown: React.FC = () => {
  const [params, setParams] = useState({
    rotate: 0,
    scale: 1,
    invert: 0,
    contrast: 100,
    hue: 0,
    brightness: 1
  });

  const viruses = [
    "MYDOOM", "WANNA_CRY", "ILOVEYOU", "STUXNET", "CODE_RED", 
    "SQL_SLAMMER", "ZEUS", "MELISSA", "SASSER", "CONFICKER", 
    "CRYPTOLOCKER", "FLASHBACK", "CIH", "FLAME", "SKYWIPER", 
    "KINDLY_CHECK", "SUCUVU"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setParams({
        rotate: (Math.random() - 0.5) * 50,
        scale: 0.6 + Math.random() * 0.8,
        invert: Math.random() > 0.4 ? 1 : 0,
        contrast: 500 + Math.random() * 500,
        hue: Math.random() * 360,
        brightness: 0.1 + Math.random() * 0.9
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9500] pointer-events-none mix-blend-difference overflow-hidden">
      <div 
        className="w-full h-full transition-all duration-75 border-[300px] border-red-950/80"
        style={{
          transform: `rotate(${params.rotate}deg) scale(${params.scale})`,
          filter: `invert(${params.invert}) contrast(${params.contrast}%) hue-rotate(${params.hue}deg) brightness(${params.brightness})`,
          backgroundColor: params.invert ? 'rgba(200,0,0,0.4)' : 'transparent'
        }}
      >
        {/* Massive flashing text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
            <div className="text-[30vw] font-black text-red-600 opacity-40 uppercase animate-flash-extreme">INFECTED</div>
            <div className="text-[12vw] font-black text-pink-500 opacity-30 uppercase animate-flash-slow italic tracking-tighter">TOTAL_SYSTEM_COLLAPSE</div>
        </div>

        {/* Floating Virus Names */}
        {viruses.map((v, i) => (
          <div 
            key={i}
            className="absolute text-[12vw] font-black text-red-500/20 whitespace-nowrap"
            style={{
              top: `${(i * 10) % 100}%`,
              left: `${(i * 18) % 80}%`,
              transform: `rotate(${Math.random() * 180 - 90}deg)`
            }}
          >
            {v}
          </div>
        ))}
      </div>
      
      {/* Heavy Static GIF Overlay */}
      <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uWUicGLeE/giphy.gif')] opacity-25 mix-blend-overlay" />

      <style>{`
        @keyframes flashExtreme {
          0%, 100% { opacity: 0.1; transform: scale(1) skew(0deg); }
          50% { opacity: 0.8; transform: scale(1.1) skew(10deg); filter: hue-rotate(90deg); }
        }
        @keyframes flashSlow {
          0%, 100% { opacity: 0.3; transform: rotate(0deg) scale(1); }
          50% { opacity: 0.05; transform: rotate(10deg) scale(0.85); }
        }
        .animate-flash-extreme { animation: flashExtreme 0.05s infinite; }
        .animate-flash-slow { animation: flashSlow 0.4s infinite; }
      `}</style>
    </div>
  );
};
