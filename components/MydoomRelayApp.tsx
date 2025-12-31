
import React, { useState, useEffect, useRef } from 'react';

interface MydoomRelayAppProps {
  onClose: () => void;
}

export const MydoomRelayApp: React.FC<MydoomRelayAppProps> = ({ onClose }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [stats, setStats] = useState({ sent: 0, failed: 0, threads: 16 });
  const logEndRef = useRef<HTMLDivElement>(null);

  const domains = [
    'microsoft.com', 'fbi.gov', 'yahoo.com', 'whitehouse.gov', 
    'google.com', 'aol.com', 'nasa.gov', 'navy.mil', 'kremlin.ru'
  ];

  const subjects = [
    'test', 'hi', 'hello', 'Mail Delivery System', 'Status', 'Server Report'
  ];

  const failureReasons = [
    'Connection timed out',
    'Recipient unknown',
    'Relay access denied',
    'SPF check failed',
    'Greylisted (retry later)',
    'DNSBL block: IP blacklisted',
    'MX record not found',
    'SMTP error 550: Message rejected'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const domain = domains[Math.floor(Math.random() * domains.length)];
      const subject = subjects[Math.floor(Math.random() * subjects.length)];
      const success = Math.random() > 0.15; // Slightly increased failure rate
      const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      
      let newLog = '';
      if (success) {
        newLog = `[OK] Sent to admin@${domain} (Subj: ${subject}) via ${ip}`;
      } else {
        const reason = failureReasons[Math.floor(Math.random() * failureReasons.length)];
        newLog = `[FAIL] ${reason} at relay ${ip} for user@${domain}`;
      }

      setLogs(prev => [...prev.slice(-60), newLog]);
      setStats(prev => ({
        ...prev,
        sent: success ? prev.sent + 1 : prev.sent,
        failed: success ? prev.failed : prev.failed + 1,
        threads: Math.max(1, prev.threads + (Math.random() > 0.8 ? 1 : -1))
      }));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="w-full h-full max-w-4xl glass rounded-none border-4 border-zinc-700 bg-zinc-950 flex flex-col overflow-hidden shadow-[20px_20px_0_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="px-4 py-2 flex items-center justify-between bg-zinc-800 border-b-2 border-zinc-700 text-zinc-300">
        <div className="flex items-center gap-3">
          <span className="text-xl">📬</span>
          <h2 className="text-xs font-black uppercase tracking-widest">Mydoom.A@mm // Mass Mailer Engine</h2>
        </div>
        <button onClick={onClose} className="w-6 h-6 bg-red-800 hover:bg-red-600 text-white flex items-center justify-center border border-white/20">X</button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-0 border-b border-zinc-800 bg-black">
        <div className="p-4 border-r border-zinc-800">
          <div className="text-[8px] text-zinc-500 uppercase mb-1">Total Sent</div>
          <div className="text-2xl font-black text-green-500 tracking-tighter">{stats.sent.toLocaleString()}</div>
        </div>
        <div className="p-4 border-r border-zinc-800">
          <div className="text-[8px] text-zinc-500 uppercase mb-1">Failed/Blocked</div>
          <div className="text-2xl font-black text-red-500 tracking-tighter animate-pulse">{stats.failed.toLocaleString()}</div>
        </div>
        <div className="p-4">
          <div className="text-[8px] text-zinc-500 uppercase mb-1">Active Threads</div>
          <div className="text-2xl font-black text-yellow-500 tracking-tighter">{stats.threads}</div>
        </div>
      </div>

      {/* Terminal Area */}
      <div className="flex-1 bg-black p-4 font-mono text-[10px] overflow-y-auto overflow-x-hidden text-zinc-400 custom-scrollbar">
        <div className="mb-4 text-blue-500 opacity-80 border-b border-blue-900/30 pb-2">
          - - - MYDOOM SMTP RELAY SERVICE v1.04 - - -<br/>
          - - - TARGETING: PORT 25/587 - - -<br/>
          - - - PAYLOAD: attachment.zip (Mydoom.worm) - - -<br/>
          [SYSTEM] Initializing SMTP engine...<br/>
          [SYSTEM] Port 1034 opened for backdoor communications...
        </div>
        {logs.map((log, i) => (
          <div key={i} className={`mb-0.5 border-l-2 pl-2 ${log.startsWith('[OK]') ? 'text-green-800 border-green-900' : 'text-red-900 border-red-950 animate-intermittent-flicker-low'}`}>
            {log}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>

      {/* Footer Decoration */}
      <div className="p-2 bg-zinc-900 border-t border-zinc-800 flex justify-between items-center italic">
        <span className="text-[9px] text-zinc-600">"andy; I'm just doing my job, nothing personal, sorry."</span>
        <div className="flex gap-2 items-center">
           <div className="text-[8px] text-zinc-700 font-bold uppercase mr-2">RELAY_LOAD</div>
           <div className="h-1.5 w-16 bg-zinc-800 rounded-full overflow-hidden">
             <div className="h-full bg-red-600 animate-[loading_2s_infinite_linear]" />
           </div>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: black; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; }
        @keyframes intermittent-flicker-low {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0.5; }
        }
        .animate-intermittent-flicker-low { animation: intermittent-flicker-low 4s infinite; }
      `}</style>
    </div>
  );
};
