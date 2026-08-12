import React from 'react';
import { RotateCcw, Download } from 'lucide-react';

export default function AdminBackupTab({ resetToDefaults, showToast }) {
  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-200/80 dark:border-white/10">
      <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
        <RotateCcw size={18} className="text-indigo-600 dark:text-indigo-400" />
        <span>Portfolio Data Backup &amp; Reset Controls</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
          <h4 className="text-sm font-bold text-black dark:text-white">Export Full JSON Backup</h4>
          <p className="text-xs text-black dark:text-slate-300 font-normal">Download a snapshot of your complete portfolio configuration.</p>
          <button
            onClick={() => {
              const stateString = localStorage.getItem("portfolio_master_data_v3");
              const blob = new Blob([stateString || '{}'], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `datta-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
              a.click();
              showToast('Backup downloaded successfully!', 'info');
            }}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
          >
            <Download size={14} />
            <span>Download JSON Backup</span>
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/20 space-y-3">
          <h4 className="text-sm font-bold text-rose-800 dark:text-rose-300">Reset Factory Defaults</h4>
          <p className="text-xs text-rose-700 dark:text-rose-400 font-normal">Revert all profile, projects, skills, and configuration to default template.</p>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reset everything back to factory defaults?")) {
                resetToDefaults();
                showToast('Portfolio reset to defaults!', 'warning');
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Reset to Factory Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
}
