import React from 'react';
import { ShieldCheck, LogOut } from 'lucide-react';

export default function AdminHeader({ adminUser, onLogout }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 text-white shadow-xl">
      <div className="flex items-center gap-3.5">
        <div className="p-2.5 rounded-xl bg-indigo-500/20 text-cyan-400 border border-indigo-500/30 shadow-inner">
          <ShieldCheck size={24} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-white tracking-tight">
              Datta's Control Panel
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono uppercase tracking-wider">
              AUTHENTICATED: {adminUser?.username || 'ADMIN'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            MongoDB Database Connection Active • 256-bit Token Encryption
          </p>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-all cursor-pointer shadow-xs hover:border-rose-500/50"
      >
        <LogOut size={15} />
        <span>Log Out</span>
      </button>
    </div>
  );
}
