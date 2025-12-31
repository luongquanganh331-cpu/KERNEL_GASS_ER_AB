
import React, { useState, useEffect, useCallback } from 'react';

interface SystemErrorProps {
  onReset: () => void;
}

interface LogEntry {
  id: string;
  timestamp: string;
  isoTimestamp: string;
  uptime: string;
  message: string;
  severity: 'CRITICAL' | 'FATAL' | 'KERNEL_PANIC' | 'CORE_DUMP';
  telemetry: {
    address: string;
    stack_pointer: string;
    heap_usage: string;
    virtual_mem: string;
    module: string;
    cpu_load: string;
    disk_io: string;
    thread_id: string;
  };
}

const LOG_STORAGE_KEY = 'GEMINI_OS_PERSISTENT_LOGS';
const MAX_LOG_ENTRIES = 200;

export const SystemError: React.FC<SystemErrorProps> = ({ onReset }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [persistentLogs, setPersistentLogs] = useState<LogEntry[]>([]);
  const [repairProgress, setRepairProgress] = useState(0);
  const [repairStatus, setRepairStatus] = useState('IDLE');
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'LIVE' | 'VAULT'>('LIVE');
  
  // Hard-coded hardware traces requested by the kernel override
  const reportedFailures = [
    { iso: "2025-12-31T08:23:20.309Z", addr: "0xF2F06FCF", thread: "0x643", sev: "KERNEL_PANIC" as const, heap: "4543.38 MB", stack: "0x764D", virt: "6462.39 MB", cpu: "98.2%", io: "263.16 MB/s" },
    { iso: "2025-12-31T08:23:20.638Z", addr: "0xFE764154", thread: "0xF", sev: "FATAL" as const, heap: "4953.99 MB", stack: "0x98F3", virt: "6547.83 MB", cpu: "98.5%", io: "81.30 MB/s" },
    { iso: "2025-12-31T08:23:20.969Z", addr: "0x3EF79AA1", thread: "0x15B", sev: "FATAL" as const, heap: "4338.66 MB", stack: "0x3C37", virt: "6295.77 MB", cpu: "99.3%", io: "11.12 MB/s" },
    { iso: "2025-12-31T08:23:21.298Z", addr: "0x6A434CAB", thread: "0x99B", sev: "FATAL" as const, heap: "4596.25 MB", stack: "0xCEA7", virt: "6311.49 MB", cpu: "98.5%", io: "147.22 MB/s" },
  ];

  const errorCodes = [
    "HW_INTEGRITY_VIOLATION_0xF2F06FCF [0x643]",
    "THREAD_CONTEXT_CORRUPTION_0xFE764154 [0xF]",
    "NTOSKRNL_CORE_CORRUPTION_0x3EF79AA1",
    "UNHANDLED_EXCEPTION_IN_SYSTEM_THREAD [0x99B]",
    "FATAL_DISK_IO_LOCK_TIMEOUT_0x6A434CAB",
    "MEMORY_SEGMENTATION_FAULT [0x15B]",
    "CORE_DUMP_OVERFLOW_0xDEADBEEF"
  ];

  const loadPersistentLogs = useCallback(() => {
    try {
      const stored = localStorage.getItem(LOG_STORAGE_KEY);
      if (stored) {
        setPersistentLogs(JSON.parse(stored));
      }
    } catch (e) {
      console.error("VAULT_READ_ERROR: Access denied.");
    }
  }, []);

  const logToPersistence = useCallback((entry: LogEntry) => {
    // Console Debug Logging
    console.group(`%c[TRACE] ${entry.id}`, 'color: white; background: red; font-weight: bold; padding: 2px 5px;');
    console.log(`TS: ${entry.isoTimestamp}`);
    console.log(`ADDR: ${entry.telemetry.address}`);
    console.log(`THREAD: ${entry.telemetry.thread_id}`);
    console.groupEnd();

    try {
      const stored = localStorage.getItem(LOG_STORAGE_KEY);
      const existing: LogEntry[] = stored ? JSON.parse(stored) : [];
      const updated = [entry, ...existing].slice(0, MAX_LOG_ENTRIES);
      localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(updated));
      setPersistentLogs(updated);
    } catch (e) {
      console.warn("KERNEL_VAULT_WRITE_FATAL");
    }
  }, []);

  const generateLog = useCallback((message: string): LogEntry => {
    const isReported = Math.random() > 0.3;
    const reportSource = reportedFailures[Math.floor(Math.random() * reportedFailures.length)];

    const entry: LogEntry = {
      id: 'DUMP_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      timestamp: new Date().toLocaleTimeString(),
      isoTimestamp: isReported ? reportSource.iso : new Date().toISOString(),
      uptime: (performance.now() / 1000).toFixed(2) + 's',
      message,
      severity: isReported ? reportSource.sev : 'FATAL',
      telemetry: {
        address: isReported ? reportSource.addr : '0x' + Math.floor(Math.random() * 0xFFFFFFFF).toString(16).toUpperCase(),
        stack_pointer: isReported ? reportSource.stack : '0x' + Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase(),
        heap_usage: isReported ? reportSource.heap : (Math.random() * 1000 + 4000).toFixed(2) + ' MB',
        virtual_mem: isReported ? reportSource.virt : (Math.random() * 2000 + 5000).toFixed(2) + ' MB',
        module: 'ntoskrnl.exe',
        cpu_load: isReported ? reportSource.cpu : (95 + Math.random() * 4).toFixed(1) + '%',
        disk_io: isReported ? reportSource.io : (Math.random() * 400).toFixed(2) + ' MB/s',
        thread_id: isReported ? reportSource.thread : '0x' + Math.floor(Math.random() * 0xFFF).toString(16).toUpperCase()
      }
    };
    
    logToPersistence(entry);
    return entry;
  }, [logToPersistence]);

  useEffect(() => {
    loadPersistentLogs();
    let i = 0;
    const interval = setInterval(() => {
      if (i < errorCodes.length) {
        const entry = generateLog(errorCodes[i]);
        setLogs(prev => [entry, ...prev].slice(0, 100));
        i++;
      } else {
        clearInterval(interval);
        setRepairStatus('REPAIR_PENDING');
      }
    }, 200);
    return () => clearInterval(interval);
  }, [generateLog, loadPersistentLogs]);

  const purgeVault = () => {
    localStorage.removeItem(LOG_STORAGE_KEY);
    setPersistentLogs([]);
  };

  const startScrub = () => {
    setRepairStatus('REPAIRING');
    const timer = setInterval(() => {
      setRepairProgress(prev => {
        if (prev >= 99) {
          clearInterval(timer);
          setRepairStatus('FAILED');
          generateLog("SCRUBBER_FATAL: Thread 0x99B at 0x6A434CAB refused to release mutex.");
          return 99;
        }
        return prev + Math.random() * 3;
      });
    }, 60);
  };

  const currentLogStream = viewMode === 'LIVE' ? logs : persistentLogs;

  return (
    <div className="fixed inset-0 z-[10000] bg-black text-red-600 font-mono flex flex-col p-8 overflow-hidden select-none border-[20px] border-red-950/20">
      <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-screen bg-red-900/10">
        <div className="w-full h-full bg-[url('https://media.giphy.com/media/oEI9uWUicGLeE/giphy.gif')] mix-blend-color-dodge opacity-10" />
      </div>

      <div className="relative z-20 flex justify-between items-start mb-8 border-b-8 border-red-600 pb-8 bg-black/40 p-4">
        <div className="flex gap-8 items-center">
          <div className="w-32 h-32 bg-red-600 flex items-center justify-center text-8xl font-black text-black animate-vibrate-mild shadow-[0_0_80px_#f00]">!</div>
          <div>
            <h1 className="text-7xl font-black italic tracking-tighter uppercase leading-none text-white drop-shadow-[0_0_20px_#f00]">KERNEL_PANIC_FATAL</h1>
            <p className="text-2xl mt-4 opacity-100 bg-white text-black px-6 py-1 inline-block font-black uppercase tracking-widest">TRACE_LOCK: 0x6A434CAB</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
           <div className="flex gap-2">
             <button 
               onClick={() => setViewMode('LIVE')}
               className={`px-4 py-1 text-xs font-black border-2 transition-all ${viewMode === 'LIVE' ? 'bg-red-600 text-white border-white' : 'border-red-600 text-red-600'}`}
             >LIVE_FEED</button>
             <button 
               onClick={() => setViewMode('VAULT')}
               className={`px-4 py-1 text-xs font-black border-2 transition-all ${viewMode === 'VAULT' ? 'bg-white text-black border-red-600' : 'border-red-600 text-red-600'}`}
             >HISTORY_VAULT</button>
           </div>
           {viewMode === 'VAULT' && (
             <button onClick={purgeVault} className="text-[10px] text-white bg-red-900 px-2 py-0.5 animate-pulse">PURGE_PERSISTENT_DATA</button>
           )}
           <div className="text-xl font-black bg-red-900 text-white px-4 py-1 animate-pulse border-2 border-white mt-4">RECOVERY_LOCKED</div>
        </div>
      </div>

      <div className="flex-1 flex gap-8 min-h-0 relative z-20">
        {/* Failures List */}
        <div className="w-96 flex flex-col gap-6">
           <div className="bg-red-950/20 border-4 border-red-600 p-6 flex flex-col gap-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-white border-b border-red-900 pb-2">Target Traces</h3>
              <div className="space-y-4">
                 {reportedFailures.map((f, idx) => (
                    <div key={idx} className="bg-black p-3 border-l-4 border-red-600 hover:scale-105 transition-transform">
                       <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-red-500 font-black">{f.sev}</span>
                          <span className="text-white opacity-40 italic">{f.iso.split('T')[1]}</span>
                       </div>
                       <div className="text-lg font-black text-white">{f.addr}</div>
                       <div className="text-[9px] opacity-40 font-mono mt-1">THREAD: {f.thread} // {f.cpu} LOAD</div>
                    </div>
                 ))}
              </div>
           </div>
           
           <div className="flex-1 bg-black/80 border-2 border-red-900/50 p-6 flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 bg-red-600/5 animate-flicker pointer-events-none" />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-6">Memory Scrub Graph</h3>
              <div className="flex-1 grid grid-cols-6 grid-rows-12 gap-1.5 opacity-50">
                 {Array.from({ length: 72 }).map((_, i) => (
                   <div 
                    key={i} 
                    className={`border ${Math.random() > 0.8 ? 'bg-red-600' : 'bg-red-950/40 border-red-900/30'}`}
                   />
                 ))}
              </div>
           </div>
        </div>

        {/* Diagnostic Core Stream */}
        <div className="flex-1 flex flex-col min-h-0 bg-black/60 border-4 border-red-900/50 p-8 relative">
           <div className="flex items-center justify-between mb-8 border-b-2 border-red-900/30 pb-4">
              <span className="text-xl font-black uppercase tracking-[0.5em] text-white">
                {viewMode === 'LIVE' ? 'LIVE_DIAGNOSTIC_STREAM' : 'PERSISTENT_CORE_VAULT'}
              </span>
              <span className="text-[12px] opacity-60 bg-red-900/30 px-3 py-1 font-black">ENTRIES: {currentLogStream.length}</span>
           </div>
           
           <div className="flex-1 overflow-y-auto space-y-4 pr-6 custom-scrollbar">
              {currentLogStream.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center opacity-20 italic uppercase tracking-widest">
                  Vault is empty.
                </div>
              )}
              {currentLogStream.map((log) => (
                <div 
                  key={log.id} 
                  className={`border-l-8 ${log.severity === 'FATAL' ? 'border-white' : 'border-red-600'} pl-6 py-4 bg-red-950/5 hover:bg-red-900/10 transition-all cursor-pointer group`}
                  onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-6 text-[11px] font-black">
                      <span className={`px-3 py-1 ${log.severity === 'FATAL' ? 'bg-white text-black' : 'bg-red-800 text-white'}`}>
                        [{log.severity}]
                      </span>
                      <span className="text-red-400 font-mono">{log.isoTimestamp}</span>
                      <span className="text-white opacity-40">THREAD: {log.telemetry.thread_id}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-black mb-4 text-white tracking-tighter group-hover:text-red-400">&gt; {log.message}</div>
                  
                  {expandedLog === log.id && (
                    <div className="animate-in slide-in-from-top-4 duration-150">
                       <div className="grid grid-cols-4 gap-6 text-[11px] font-black opacity-90 bg-black p-6 border-2 border-red-600 shadow-[0_0_30px_rgba(255,0,0,0.2)]">
                          <div className="flex flex-col"><span className="opacity-40 text-[8px] mb-2 uppercase tracking-widest">Address</span>{log.telemetry.address}</div>
                          <div className="flex flex-col"><span className="opacity-40 text-[8px] mb-2 uppercase tracking-widest">Virtual_Mem</span>{log.telemetry.virtual_mem}</div>
                          <div className="flex flex-col"><span className="opacity-40 text-[8px] mb-2 uppercase tracking-widest">CPU_Load</span><span className="text-red-500">{log.telemetry.cpu_load}</span></div>
                          <div className="flex flex-col"><span className="opacity-40 text-[8px] mb-2 uppercase tracking-widest">Disk_IO</span>{log.telemetry.disk_io}</div>
                          <div className="col-span-2 text-white/20 uppercase text-[8px] mt-2 italic">Ref_ID: {log.id} // System_Plague_Trace_V2.1</div>
                       </div>
                    </div>
                  )}
                </div>
              ))}
           </div>
        </div>

        {/* Purge Control */}
        <div className="w-80 flex flex-col gap-6">
           <div className="bg-red-950/20 border-4 border-red-600 p-8 flex flex-col flex-1 relative overflow-hidden">
              <h3 className="text-sm font-black uppercase mb-6 text-white text-center italic border-b border-red-900 pb-4">Nuke_Control</h3>
              
              <div className="flex-1 flex flex-col gap-8">
                <div className="flex-1 border-4 border-dashed border-red-900/50 p-6 bg-black flex flex-col justify-center text-center">
                  {repairStatus === 'REPAIRING' && (
                    <div>
                       <div className="text-xs mb-4 font-black text-red-500 tracking-widest uppercase">Scrubbing_Core... {Math.floor(repairProgress)}%</div>
                       <div className="w-full h-8 bg-red-950/50 border-4 border-red-900/50 p-[4px]">
                          <div className="h-full bg-red-600 animate-pulse" style={{ width: `${repairProgress}%` }} />
                       </div>
                       <div className="mt-8 text-[10px] opacity-40 font-mono space-y-1">
                          <div>Verifying sectors... OK</div>
                          <div className="text-red-500">I/O LOCK @ 0x6A434CAB</div>
                       </div>
                    </div>
                  )}
                  {repairStatus === 'FAILED' && (
                    <div className="animate-in zoom-in">
                       <div className="text-8xl mb-8">💀</div>
                       <div className="text-xl font-black text-white uppercase tracking-[0.3em] mb-4">HALTED</div>
                       <p className="text-[10px] opacity-60 leading-relaxed font-black uppercase italic">Hardware override failed. Kernel encryption layer is permanent.</p>
                    </div>
                  )}
                  {repairStatus === 'REPAIR_PENDING' && (
                     <button onClick={startScrub} className="w-full h-full border-4 border-red-600 text-red-600 font-black uppercase text-sm tracking-widest animate-pulse p-8">
                        PURGE_I/O_LOCK
                     </button>
                  )}
                </div>
                
                <button onClick={onReset} className="w-full py-8 bg-white text-black font-black uppercase text-lg tracking-[0.4em] shadow-[0_0_60px_rgba(255,255,255,0.4)] border-4 border-black active:scale-95 transition-all">
                  CORE_RESET
                </button>
              </div>
           </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,0,0,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f00; border: 2px solid black; }
        @keyframes vibrate-mild {
          0%, 100% { transform: translate(0,0); }
          25% { transform: translate(4px, -4px) rotate(1deg); }
          75% { transform: translate(-4px, 4px) rotate(-1deg); }
        }
        .animate-vibrate-mild { animation: vibrate-mild 0.08s infinite; }
      `}</style>
    </div>
  );
};
