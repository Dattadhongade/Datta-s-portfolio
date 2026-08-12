import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

export default function AdminToast({ toast, onClose }) {
  if (!toast) return null;

  const isError = toast.type === 'error';
  const isWarning = toast.type === 'warning';
  const isInfo = toast.type === 'info';

  const styles = isError
    ? 'bg-slate-900/95 text-rose-200 border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.3)]'
    : isWarning
    ? 'bg-slate-900/95 text-amber-200 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.3)]'
    : isInfo
    ? 'bg-slate-900/95 text-cyan-200 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)]'
    : 'bg-slate-900/95 text-emerald-200 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]';

  const Icon = isError
    ? AlertCircle
    : isWarning
    ? AlertTriangle
    : isInfo
    ? Info
    : CheckCircle2;

  const iconColor = isError
    ? 'text-rose-400'
    : isWarning
    ? 'text-amber-400'
    : isInfo
    ? 'text-cyan-400'
    : 'text-emerald-400';

  const badgeBg = isError
    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
    : isWarning
    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    : isInfo
    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

  const label = isError ? 'ERROR' : isWarning ? 'WARNING' : isInfo ? 'NOTICE' : 'SUCCESS';

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto min-w-[320px] max-w-lg px-2 animate-in fade-in slide-in-from-top-6 duration-300">
      <div className={`w-full px-4 py-3 rounded-2xl backdrop-blur-xl border flex items-center justify-between gap-3 text-sm font-semibold shadow-2xl ${styles}`}>
        <div className="flex items-center gap-2.5">
          <Icon size={20} className={`shrink-0 ${iconColor}`} />
          <span className={`px-2 py-0.5 rounded-md border text-[10px] font-mono uppercase tracking-wider ${badgeBg}`}>
            {label}
          </span>
          <span className="text-slate-100 text-xs sm:text-sm font-medium">{toast.message}</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Dismiss notification"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
