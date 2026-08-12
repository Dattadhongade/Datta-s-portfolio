import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  MessageSquare,
  Mail,
  Phone,
  Send,
  Trash2,
  Eye,
  ExternalLink,
  CheckCircle,
  Clock,
  User,
  Copy,
  Check,
  X,
  ChevronDown
} from 'lucide-react';

export default function AdminMessagesTab({
  messages,
  markMessageRead,
  updateMessageRemark,
  deleteMessage,
  showToast
}) {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (showToast) showToast('Copied to clipboard!', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getRemarkBadge = (remark, unread) => {
    const currentRemark = remark || (unread ? 'New' : 'Read');
    switch (currentRemark) {
      case 'New':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-[10px] font-extrabold tracking-wide uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            New
          </span>
        );
      case 'Email Sent':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold tracking-wide uppercase flex items-center gap-1">
            <CheckCircle size={10} className="text-blue-500" />
            Email Sent
          </span>
        );
      case 'Call Done':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold tracking-wide uppercase flex items-center gap-1">
            <Phone size={10} className="text-emerald-500" />
            Call Done
          </span>
        );
      case 'In Discussion':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-[10px] font-extrabold tracking-wide uppercase flex items-center gap-1">
            <Clock size={10} className="text-amber-500" />
            In Discussion
          </span>
        );
      case 'Completed':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-[10px] font-extrabold tracking-wide uppercase flex items-center gap-1">
            <CheckCircle size={10} className="text-purple-500" />
            Completed
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-slate-500/15 border border-slate-500/30 text-slate-700 dark:text-slate-300 text-[10px] font-extrabold tracking-wide uppercase">
            {currentRemark}
          </span>
        );
    }
  };

  const getGmailUrl = (msg) => {
    if (!msg || !msg.email) return '#';
    const to = encodeURIComponent(msg.email);
    const subject = encodeURIComponent(`Re: Portfolio Inquiry - ${msg.firstName || 'Hello'}`);
    const body = encodeURIComponent(
      `Hi ${msg.firstName || ''},\n\nThank you for reaching out through my portfolio website regarding:\n"${msg.description || ''}"\n\nBest regards,\nDatta Dhongade`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-bold shadow-2xs">
          <MessageSquare size={16} />
          <span>Inbound Inquiries &amp; Messages ({(messages || []).length})</span>
        </div>
      </div>

      {/* Message Cards Grid */}
      {(messages || []).length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center text-slate-400 text-xs font-medium border border-slate-200/80 dark:border-white/10 space-y-2">
          <MessageSquare size={32} className="mx-auto text-slate-500/50" />
          <p className="font-semibold text-slate-600 dark:text-slate-300">No contact inquiries received yet.</p>
          <p className="text-[11px]">When visitors submit your public Contact Form, their messages will appear here as actionable cards.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
          {(messages || []).map((msg) => {
            const currentRemark = msg.remark || (msg.unread ? 'New' : 'Read');

            return (
              <div
                key={msg.id}
                className={`glass-card rounded-2xl p-5 border flex flex-col justify-between space-y-4 transition-all hover:shadow-lg ${
                  msg.unread || currentRemark === 'New'
                    ? 'border-cyan-500/40 bg-cyan-500/5'
                    : 'border-slate-200/80 dark:border-white/10'
                }`}
              >
                {/* Top Row: User Avatar/Initials, Name, Timestamp & Status Badge */}
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md shrink-0">
                      {(msg.firstName?.[0] || 'U').toUpperCase()}
                      {(msg.lastName?.[0] || '').toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                          {msg.firstName} {msg.lastName || ''}
                        </h4>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {msg.time || 'Recent message'}
                      </span>
                    </div>
                  </div>

                  {getRemarkBadge(msg.remark, msg.unread)}
                </div>

                {/* Contact Meta Details: Email & Mobile Number */}
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {msg.email && (
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2 truncate">
                        <Mail size={13} className="text-cyan-500 shrink-0" />
                        <span className="font-semibold truncate">{msg.email}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.email, `email-${msg.id}`)}
                        className="p-1 text-slate-400 hover:text-cyan-500 transition-colors cursor-pointer shrink-0"
                        title="Copy email"
                      >
                        {copiedId === `email-${msg.id}` ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                      </button>
                    </div>
                  )}

                  {msg.mobileNumber && (
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2 truncate">
                        <Phone size={13} className="text-emerald-500 shrink-0" />
                        <span className="font-semibold truncate">{msg.mobileNumber}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href={`tel:${msg.mobileNumber}`}
                          className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold hover:bg-emerald-500/20"
                          title="Call"
                        >
                          Call
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopy(msg.mobileNumber, `phone-${msg.id}`)}
                          className="p-1 text-slate-400 hover:text-emerald-500 transition-colors cursor-pointer"
                          title="Copy phone"
                        >
                          {copiedId === `phone-${msg.id}` ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Action Bar: View, Send Email (Gmail), Remark Dropdown, Delete */}
                <div className="pt-2 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* View Full Message Details */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMessage(msg);
                        if (msg.unread && markMessageRead) {
                          markMessageRead(msg.id);
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-2xs"
                      title="View full message modal"
                    >
                      <Eye size={13} className="text-cyan-500" />
                      <span>View</span>
                    </button>

                    {/* Send Email / Redirect directly to Gmail */}
                    <a
                      href={getGmailUrl(msg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-linear-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95"
                      title="Compose email directly in Gmail"
                    >
                      <Send size={12} />
                      <span>Send Email</span>
                      <ExternalLink size={11} className="opacity-80" />
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Remark / Status Dropdown */}
                    <div className="relative">
                      <select
                        value={currentRemark}
                        onChange={(e) => {
                          const newRemark = e.target.value;
                          if (updateMessageRemark) {
                            updateMessageRemark(msg.id, newRemark);
                          }
                          if (showToast) {
                            showToast(`Status updated to "${newRemark}"`, 'success');
                          }
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-black dark:text-slate-200 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer shadow-2xs"
                      >
                        <option value="New">Status: New</option>
                        <option value="Email Sent">Email Sent</option>
                        <option value="Call Done">Call Done</option>
                        <option value="In Discussion">In Discussion</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    {/* Delete Message Button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete message from ${msg.firstName}?`)) {
                          deleteMessage(msg.id);
                          if (showToast) showToast('Message deleted', 'warning');
                        }
                      }}
                      className="p-1.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                      title="Delete message"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FULL MESSAGE DETAILS MODAL */}
      {selectedMessage && createPortal(
        <div
          className="fixed inset-0 z-9999 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="glass-card rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-slate-200/80 dark:border-white/10 shadow-2xl space-y-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                  {(selectedMessage.firstName?.[0] || 'U').toUpperCase()}
                  {(selectedMessage.lastName?.[0] || '').toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-black dark:text-white">
                    {selectedMessage.firstName} {selectedMessage.lastName || ''}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    {selectedMessage.time || 'Recent message'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-400 hover:text-white cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Contact Details Meta */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-cyan-500" />
                  <span className="font-semibold">{selectedMessage.email}</span>
                </div>
                <button
                  onClick={() => handleCopy(selectedMessage.email, 'modal-email')}
                  className="px-2 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold hover:bg-cyan-100 cursor-pointer"
                >
                  {copiedId === 'modal-email' ? 'Copied' : 'Copy'}
                </button>
              </div>

              {selectedMessage.mobileNumber && (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-emerald-500" />
                    <span className="font-semibold">{selectedMessage.mobileNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${selectedMessage.mobileNumber}`}
                      className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold hover:bg-emerald-500/20"
                    >
                      Call
                    </a>
                    <button
                      onClick={() => handleCopy(selectedMessage.mobileNumber, 'modal-phone')}
                      className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-300 cursor-pointer"
                    >
                      {copiedId === 'modal-phone' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Full Message Text */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message Description</label>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap font-normal">
                {selectedMessage.description}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/80 dark:border-white/10">
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-500">Remark:</label>
                <select
                  value={selectedMessage.remark || (selectedMessage.unread ? 'New' : 'Read')}
                  onChange={(e) => {
                    const newRemark = e.target.value;
                    setSelectedMessage((prev) => ({ ...prev, remark: newRemark }));
                    if (updateMessageRemark) {
                      updateMessageRemark(selectedMessage.id, newRemark);
                    }
                    if (showToast) showToast(`Remark set to "${newRemark}"`, 'success');
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-black dark:text-slate-200 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
                >
                  <option value="New">New</option>
                  <option value="Email Sent">Email Sent</option>
                  <option value="Call Done">Call Done</option>
                  <option value="In Discussion">In Discussion</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={getGmailUrl(selectedMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-linear-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send size={13} />
                  <span>Reply in Gmail</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
