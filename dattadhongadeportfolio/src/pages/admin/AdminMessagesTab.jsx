import React from 'react';
import { MessageSquare, Mail, Phone, Send, Trash2 } from 'lucide-react';

export default function AdminMessagesTab({
  messages,
  markMessageRead,
  deleteMessage,
  showToast
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="fluid-h3 font-semibold text-black dark:text-white flex items-center gap-2">
          <MessageSquare size={18} className="text-cyan-600 dark:text-cyan-400" />
          <span>Inbound Contact Inquiries ({(messages || []).length})</span>
        </h3>
      </div>

      {(messages || []).length === 0 ? (
        <div className="glass-card rounded-2xl p-8 text-center text-slate-400 text-xs font-medium border border-slate-200 dark:border-white/10">
          No inquiries yet. When visitors submit the contact form, messages will appear here.
        </div>
      ) : (
        <div className="space-y-3">
          {(messages || []).map((msg) => (
            <div key={msg.id} className={`glass-card rounded-2xl p-5 border space-y-3 transition-all ${
              msg.unread ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-slate-200/80 dark:border-white/10'
            }`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center gap-2">
                  <h4 className="fluid-sm font-bold text-black dark:text-white">
                    {msg.firstName} {msg.lastName || ''}
                  </h4>
                  {msg.unread && (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-white text-[10px] font-bold">
                      NEW
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400">{msg.time}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-black dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Mail size={13} className="text-cyan-500" />
                  <span>{msg.email}</span>
                </div>
                {msg.mobileNumber && (
                  <div className="flex items-center gap-1.5">
                    <Phone size={13} className="text-emerald-500" />
                    <span>{msg.mobileNumber}</span>
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-black dark:text-slate-200 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-normal">
                {msg.description}
              </p>

              <div className="flex justify-end gap-2 pt-1">
                <a
                  href={`mailto:${msg.email}?subject=Re: Portfolio Inquiry`}
                  className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Send size={12} />
                  <span>Reply via Email</span>
                </a>
                {msg.unread && (
                  <button
                    onClick={() => {
                      markMessageRead(msg.id);
                      showToast('Marked as read', 'info');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 text-black dark:text-slate-300 text-xs font-bold cursor-pointer"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => {
                    if (window.confirm(`Delete message from ${msg.firstName}?`)) {
                      deleteMessage(msg.id);
                      showToast('Message deleted', 'warning');
                    }
                  }}
                  className="p-1.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 hover:bg-rose-600 hover:text-white cursor-pointer"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
