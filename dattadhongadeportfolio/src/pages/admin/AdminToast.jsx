import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

export default function AdminToast({ toast, setToast }) {
  // Auto scroll to top + auto dismiss
  useEffect(() => {
    if (!toast) return;
    // Scroll the main scrollable area to top
    const main = document.querySelector('main');
    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });

    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast, setToast]);

  if (!toast) return null;

  const isError = toast.type === 'error';
  const isWarning = toast.type === 'warning';
  const isInfo = toast.type === 'info';

  const styles = isError
    ? 'bg-slate-900/97 text-rose-200 border-rose-500/50 shadow-[0_4px_30px_rgba(244,63,94,0.35)]'
    : isWarning
    ? 'bg-slate-900/97 text-amber-200 border-amber-500/50 shadow-[0_4px_30px_rgba(245,158,11,0.35)]'
    : isInfo
    ? 'bg-slate-900/97 text-cyan-200 border-cyan-500/50 shadow-[0_4px_30px_rgba(6,182,212,0.35)]'
    : 'bg-slate-900/97 text-emerald-200 border-emerald-500/50 shadow-[0_4px_30px_rgba(16,185,129,0.35)]';

  const Icon = isError ? AlertCircle : isWarning ? AlertTriangle : isInfo ? Info : CheckCircle2;
  const iconColor = isError ? 'text-rose-400' : isWarning ? 'text-amber-400' : isInfo ? 'text-cyan-400' : 'text-emerald-400';
  const badgeBg = isError
    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
    : isWarning
    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    : isInfo
    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

  const label = isError ? 'ERROR' : isWarning ? 'WARNING' : isInfo ? 'NOTICE' : 'SUCCESS';

  return createPortal(
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-99999 pointer-events-auto w-[min(90vw,480px)] animate-in fade-in slide-in-from-top-4 duration-300">
      <div className={`w-full px-4 py-3 rounded-2xl backdrop-blur-xl border flex items-center justify-between gap-3 text-sm font-semibold shadow-2xl ${styles}`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <Icon size={18} className={`shrink-0 ${iconColor}`} />
          <span className={`px-2 py-0.5 rounded-md border text-[10px] font-mono uppercase tracking-wider shrink-0 ${badgeBg}`}>
            {label}
          </span>
          <span className="text-slate-100 text-xs sm:text-sm font-medium truncate">{toast.message}</span>
        </div>
        <button
          onClick={() => setToast(null)}
          className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
          title="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </div>,
    document.body
  );
}
