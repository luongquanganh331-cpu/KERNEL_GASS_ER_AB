
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

interface GeminiAppProps {
  onClose: () => void;
  isCorrupted?: boolean;
}

export const GeminiApp: React.FC<GeminiAppProps> = ({ onClose, isCorrupted }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "SYSTEM_INITIALIZED: Neural Core 4.0 // INTEGRITY_LEVEL: 0%" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    const response = await geminiService.sendMessage(userMsg, messages);
    
    // Push "loi loi" heavy logic: random character corruption and virus noise
    const glitchedResponse = isCorrupted && Math.random() > 0.5 
      ? `0x${Math.floor(Math.random()*0xFFFFFFFF).toString(16).toUpperCase()}: [CRITICAL_IO_FAULT] ${response.substring(0, 10)}... [WANNACRY_ENCRYPTION_LAYER_DETECTED]`
      : response;

    setMessages(prev => [...prev, { role: 'assistant', content: glitchedResponse }]);
    setIsTyping(false);
  };

  return (
    <div className={`w-full h-full max-w-5xl glass rounded-none flex flex-col overflow-hidden shadow-[0_50px_150px_rgba(255,0,0,0.4)] border-4 border-white/5 animate-in zoom-in-95 duration-500 ${isCorrupted ? 'animate-vibrate-intense grayscale invert contrast-200' : ''}`}>
      {/* Heavy Corrupted App Header */}
      <div className={`px-6 py-4 flex items-center justify-between border-b border-red-600/30 bg-black/60 ${isCorrupted ? 'bg-red-950/80' : ''}`}>
        <div className="flex items-center gap-6">
          <div className={`w-12 h-12 rounded-none bg-gradient-to-br ${isCorrupted ? 'from-red-600 to-black animate-spin-hyper' : 'from-purple-600 to-blue-500'} flex items-center justify-center shadow-[0_0_20px_#f00]`}>
            {isCorrupted ? <span className="text-2xl">💀</span> : <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>}
          </div>
          <div>
            <h2 className="text-sm font-black tracking-[0.4em] uppercase italic text-white">{isCorrupted ? 'GOOGLE_AI_STUDIO [DEADLINK]' : 'Google AI Studio'}</h2>
            <div className="flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full ${isCorrupted ? 'bg-red-600 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
               <span className="text-[10px] opacity-60 uppercase font-black tracking-[0.2em]">{isCorrupted ? 'MEMORY_EXHAUSTED' : 'Operational'}</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="w-12 h-12 rounded-none border-2 border-red-600/30 hover:bg-red-600 hover:text-white text-red-600 flex items-center justify-center transition-all group">
          <svg className="group-hover:rotate-180 transition-transform" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      {/* Heavy Glitched Chat Area */}
      <div 
        ref={scrollRef}
        className={`flex-1 overflow-y-auto p-12 space-y-12 scroll-smooth relative ${isCorrupted ? 'bg-[#0a0000] font-mono' : ''}`}
      >
        {/* Memory Leaks Visualization when corrupted */}
        {isCorrupted && (
          <div className="absolute inset-0 pointer-events-none opacity-10 select-none">
            {Array.from({length: 40}).map((_, i) => (
              <div key={i} className="text-[8vw] font-black absolute whitespace-nowrap animate-float-violent" style={{ top: `${(i*7.3)%100}%`, left: `${(i*19)%100}%`, color: i % 2 === 0 ? '#f00' : '#fff' }}>
                0x{Math.floor(Math.random()*0xFFFF).toString(16)}_FAULT
              </div>
            ))}
          </div>
        )}

        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-6 duration-300 relative`}
          >
            <div className={`max-w-[70%] p-8 rounded-none relative border-2 ${
              msg.role === 'user' 
                ? (isCorrupted ? 'bg-red-950/80 border-red-600 text-red-100 italic skew-x-3' : 'bg-blue-600/5 border-blue-500/20 text-blue-50')
                : (isCorrupted ? 'bg-black border-red-900 text-red-500 -skew-x-3 animate-jitter-extreme' : 'bg-white/5 border-white/10 text-white/80')
            }`}>
              {msg.role === 'assistant' && (
                <div className={`text-[9px] font-black uppercase tracking-[0.5em] opacity-30 mb-4 border-b border-red-950 pb-2 ${isCorrupted ? 'text-red-600' : ''}`}>
                  {isCorrupted ? 'KERNEL_EXCEPTION_DUMP' : 'Neural Link v4.0'}
                </div>
              )}
              <div className={`text-sm leading-relaxed whitespace-pre-wrap ${isCorrupted ? 'opacity-70 line-through' : ''}`}>
                {msg.content}
              </div>
              
              {/* Massive Error Stickers when corrupted */}
              {isCorrupted && Math.random() > 0.8 && (
                 <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-red-600 text-black flex items-center justify-center font-black text-xs rotate-12 shadow-[0_0_40px_#f00]">IO_ERROR</div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-in fade-in">
            <div className={`p-6 bg-red-950/30 border-2 border-red-600/50 flex gap-4 items-center ${isCorrupted ? 'bg-red-600 animate-flash' : ''}`}>
              <div className="w-3 h-3 bg-red-600 animate-ping" />
              <div className="w-3 h-3 bg-red-600 animate-ping" style={{ animationDelay: '0.2s' }} />
              <div className="w-3 h-3 bg-red-600 animate-ping" style={{ animationDelay: '0.4s' }} />
              <span className="text-[10px] font-black text-red-600 uppercase">Processing_Corruption...</span>
            </div>
          </div>
        )}
      </div>

      {/* Glitched Input */}
      <div className={`p-10 bg-black/80 border-t-4 border-red-600/20 ${isCorrupted ? 'bg-red-950' : ''}`}>
        <form onSubmit={handleSend} className="relative group">
          <input 
            autoFocus
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isCorrupted ? "INJECT_PAYLOAD_HERE..." : "Transmit to Neural Core..."}
            className={`w-full pl-10 pr-24 py-6 rounded-none bg-black/50 border-2 border-red-900/40 outline-none focus:border-red-600 transition-all text-sm font-black tracking-widest ${isCorrupted ? 'text-red-600 placeholder:text-red-950 italic' : 'text-white'}`}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
             <button 
               type="submit"
               disabled={!input.trim() || isTyping}
               className={`w-14 h-14 rounded-none flex items-center justify-center transition-all shadow-2xl ${isCorrupted ? 'bg-red-600 hover:bg-white hover:text-black' : 'bg-white text-black hover:bg-blue-600 hover:text-white'}`}
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
             </button>
          </div>
        </form>
        <div className="mt-8 flex justify-center gap-16">
           <span className="text-[10px] font-black uppercase opacity-20 hover:opacity-100 transition-opacity cursor-crosshair">AES_256_NULL</span>
           <span className="text-[10px] font-black uppercase opacity-20 hover:opacity-100 transition-opacity cursor-crosshair">LATENCY: INF</span>
           <span className="text-[10px] font-black uppercase opacity-20 hover:opacity-100 transition-opacity cursor-crosshair text-red-600 animate-flash">VIRUS_DETECTED: WANNA_CRY</span>
        </div>
      </div>
      
      <style>{`
        @keyframes spin-hyper {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.5); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .animate-spin-hyper { animation: spin-hyper 0.1s linear infinite; }
      `}</style>
    </div>
  );
};
