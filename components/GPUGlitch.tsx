
import React, { useState, useEffect } from 'react';

export const GPUGlitch: React.FC = () => {
  const [artifacts, setArtifacts] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newArtifacts = Array.from({ length: 25 }).map((_, i) => ({
        id: Math.random(),
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        width: Math.random() * 400 + 'px',
        height: Math.random() * 2 + 'px',
        color: ['#ff0000', '#000000', '#ffffff', '#ff00ff', '#ffaa00'][Math.floor(Math.random() * 5)],
        opacity: Math.random() * 0.8,
        transform: `skew(${Math.random() * 90 - 45}deg)`
      }));
      setArtifacts(newArtifacts);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[8000] pointer-events-none mix-blend-hard-light overflow-hidden">
      {artifacts.map(art => (
        <div 
          key={art.id}
          className="absolute"
          style={{
            top: art.top,
            left: art.left,
            width: art.width,
            height: art.height,
            backgroundColor: art.color,
            opacity: art.opacity,
            transform: art.transform,
            boxShadow: `0 0 10px ${art.color}`
          }}
        />
      ))}
      {/* Random pixel blocks */}
      {Array.from({length: 50}).map((_, i) => (
        <div 
          key={i}
          className="absolute bg-red-600 animate-flash"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: '10px',
            height: '10px',
            opacity: Math.random(),
            animationDelay: `${Math.random()}s`
          }}
        />
      ))}
      <div className="absolute inset-0 bg-red-900/5 animate-flicker-intense" />
      <style>{`
        @keyframes flash {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes flicker-intense {
          0% { opacity: 0; filter: invert(0); }
          1% { opacity: 0.3; filter: invert(1); }
          2% { opacity: 0; }
          10% { opacity: 0.1; }
          100% { opacity: 0; }
        }
        .animate-flicker-intense {
          animation: flicker-intense 0.3s infinite;
        }
      `}</style>
    </div>
  );
};
