import React, { useState } from 'react';
import { Mail, Send, CheckCircle, MessageSquare, Globe, Copy, Check, User, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { usePortfolio } from '../context/PortfolioContext';

export default function Contact() {
  const { profile, sendContactForm } = usePortfolio();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    description: ''
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleCopyEmail = () => {
    const emailToCopy = profile.email || "dattadhongade@gmail.com";
    navigator.clipboard.writeText(emailToCopy);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.email.trim() || !form.description.trim()) {
      setStatus({ type: 'error', message: 'Please fill in First Name, Email, and Description!' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await sendContactForm(form);
      if (res && res.success) {
        setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
        setForm({
          firstName: '',
          lastName: '',
          mobileNumber: '',
          email: '',
          description: ''
        });
      } else {
        setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'An error occurred while sending your message.' });
    } finally {
      setLoading(false);
    }
  };

  const getSocialIcon = (name) => {
    switch ((name || "").toLowerCase()) {
      case "github": return <FaGithub size={18} className="text-slate-800 dark:text-slate-100" />;
      case "linkedin": return <FaLinkedin size={18} className="text-[#0A66C2]" />;
      case "leetcode": return <SiLeetcode size={18} className="text-[#FFA116]" />;
      case "instagram": return <FaInstagram size={18} className="text-[#E4405F]" />;
      case "twitter":
      case "x": return <FaTwitter size={18} className="text-[#1DA1F2]" />;
      case "youtube": return <FaYoutube size={18} className="text-[#FF0000]" />;
      default: return <Globe size={18} className="text-emerald-500" />;
    }
  };

  const getSocialStyle = (name) => {
    switch ((name || "").toLowerCase()) {
      case "github": return "bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border-slate-300 dark:border-white/15";
      case "linkedin": return "bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 border-blue-200 dark:border-blue-500/30";
      case "leetcode": return "bg-amber-50 hover:bg-amber-100 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 border-amber-200 dark:border-amber-500/30";
      case "instagram": return "bg-pink-50 hover:bg-pink-100 dark:bg-pink-500/10 dark:hover:bg-pink-500/20 border-pink-200 dark:border-pink-500/30";
      case "twitter":
      case "x": return "bg-sky-50 hover:bg-sky-100 dark:bg-sky-500/10 dark:hover:bg-sky-500/20 border-sky-200 dark:border-sky-500/30";
      case "youtube": return "bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 border-red-200 dark:border-red-500/30";
      default: return "bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 border-emerald-200 dark:border-emerald-500/30";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-8">

      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-bold shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Available for Freelance & Full-Time Opportunities</span>
        </div>

        <h1 className="fluid-hero font-extrabold tracking-tight text-black dark:text-white">
          Get In <span className="text-gradient-cyan">Touch</span>
        </h1>
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 sm:p-10 space-y-8 border border-slate-200/80 dark:border-white/10 relative overflow-hidden shadow-xl">

        {/* Status Message Notification */}
        {status.message && (
          <div className={`p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-3 transition-all ${status.type === 'success'
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30'
            : 'bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/30'
            }`}>
            {status.type === 'success' && <CheckCircle size={18} className="shrink-0 text-emerald-500" />}
            <span>{status.message}</span>
          </div>
        )}

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 pt-4">

          {/* First Name Input */}
          <div className="relative group pt-4">
            <div className="flex items-center gap-3 border-b-2 border-slate-300 dark:border-white/20 focus-within:border-cyan-500 pb-2 transition-all duration-300">
              <User size={18} className="text-cyan-600 dark:text-cyan-400 shrink-0 group-focus-within:scale-110 transition-transform" />

              <div className="relative flex-1">
                <input
                  type="text"
                  id="firstName"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  placeholder=" "
                  className="peer w-full bg-transparent text-black dark:text-white text-sm sm:text-base font-semibold focus:outline-none placeholder-transparent"
                  required
                />
                <label
                  htmlFor="firstName"
                  className="absolute left-0 top-0 text-slate-400 dark:text-slate-400 text-sm font-medium transition-all duration-200 pointer-events-none peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-cyan-600 dark:peer-focus:text-cyan-400 peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-bold peer-not-placeholder-shown:text-black dark:peer-not-placeholder-shown:text-white"
                >
                  First Name <span className="text-rose-500">*</span>
                </label>
              </div>
            </div>
          </div>

          {/* Last Name  Input */}
          <div className="relative group pt-4">
            <div className="flex items-center gap-3 border-b-2 border-slate-300 dark:border-white/20 focus-within:border-indigo-500 pb-2 transition-all duration-300">
              <User size={18} className="text-indigo-600 dark:text-indigo-400 shrink-0 group-focus-within:scale-110 transition-transform" />

              <div className="relative flex-1">
                <input
                  type="text"
                  id="lastName"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  placeholder=" "
                  className="peer w-full bg-transparent text-black dark:text-white text-sm sm:text-base font-semibold focus:outline-none placeholder-transparent"
                />
                <label
                  htmlFor="lastName"
                  className="absolute left-0 top-0 text-slate-400 dark:text-slate-400 text-sm font-medium transition-all duration-200 pointer-events-none peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400 peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-bold peer-not-placeholder-shown:text-black dark:peer-not-placeholder-shown:text-white"
                >
                  Last Name
                </label>
              </div>
            </div>
          </div>

          {/* Mobile Number Floating Label Input */}
          <div className="relative group pt-4">
            <div className="flex items-center gap-3 border-b-2 border-slate-300 dark:border-white/20 focus-within:border-emerald-500 pb-2 transition-all duration-300">
              <Phone size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 group-focus-within:scale-110 transition-transform" />

              <div className="relative flex-1">
                <input
                  type="tel"
                  id="mobileNumber"
                  inputMode="numeric"
                  maxLength={10}
                  value={form.mobileNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setForm({ ...form, mobileNumber: value });
                  }}
                  placeholder=" "
                  className="peer w-full bg-transparent text-black dark:text-white text-sm sm:text-base font-semibold focus:outline-none placeholder-transparent"
                />
                <label
                  htmlFor="mobileNumber"
                  className="absolute left-0 top-0 text-slate-400 dark:text-slate-400 text-sm font-medium transition-all duration-200 pointer-events-none peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400 peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-bold peer-not-placeholder-shown:text-black dark:peer-not-placeholder-shown:text-white"
                >
                  Mobile Number
                </label>
              </div>
            </div>
          </div>

          {/* Email Address Input */}
          <div className="relative group pt-4">
            <div className="flex items-center gap-3 border-b-2 border-slate-300 dark:border-white/20 focus-within:border-amber-500 pb-2 transition-all duration-300">
              <Mail size={18} className="text-amber-600 dark:text-amber-400 shrink-0 group-focus-within:scale-110 transition-transform" />

              <div className="relative flex-1">
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder=" "
                  className="peer w-full bg-transparent text-black dark:text-white text-sm sm:text-base font-semibold focus:outline-none placeholder-transparent"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-0 text-slate-400 dark:text-slate-400 text-sm font-medium transition-all duration-200 pointer-events-none peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-amber-600 dark:peer-focus:text-amber-400 peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:font-bold peer-not-placeholder-shown:text-black dark:peer-not-placeholder-shown:text-white"
                >
                  Email Address <span className="text-rose-500">*</span>
                </label>
              </div>
            </div>
          </div>

        </div>

        {/* Description Box  */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-black dark:text-white flex items-center gap-1.5">
              <span>Project Details / Message</span>
              <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400 font-medium">{form.description.length} characters</span>
          </div>

          <div className="relative flex items-start bg-transparent border border-slate-300 dark:border-white/10 rounded-2xl focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all p-3.5 group">
            <MessageSquare size={18} className="text-purple-600 dark:text-purple-400 shrink-0 pt-0.5 mr-2.5 group-focus-within:scale-110 transition-transform" />
            <textarea
              rows={5}
              placeholder="Tell me about your project scope, goals, timeline, or requirement..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-transparent text-black dark:text-white text-xs sm:text-sm font-normal focus:outline-none placeholder-slate-400 leading-relaxed resize-none"
              required
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-black dark:text-slate-400 font-medium">
            🔒 Direct transmission to Datta's workspace inbox.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-linear-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
          >
            <Send size={16} className={`${loading ? 'animate-bounce' : ''}`} />
            <span>{loading ? "Sending Message..." : "Send Message"}</span>
          </button>
        </div>
      </form>

      {/* Bottom Quick Contact & Social Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Direct Email Card */}
        <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400">
              <Mail size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-black dark:text-slate-400">Direct Email</h4>
              <a
                href={`mailto:${profile?.email || "dattadhongade@gmail.com"}`}
                className="fluid-sm font-semibold text-black dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors block truncate"
              >
                {profile?.email || "dattadhongade@gmail.com"}
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-cyan-50 dark:hover:bg-cyan-500/20 border border-slate-200 dark:border-white/10 text-black dark:text-white transition-all cursor-pointer"
            title="Copy Email"
          >
            {copiedEmail ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
          </button>
        </div>

        {/* Social Channels Ribbon Card - Centered Single Line Layout */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 flex flex-col items-center justify-center text-center gap-3">
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Connect Elsewhere</span>
            <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">·</span>
            <span className="text-xs font-extrabold text-black dark:text-white">Social & Code Profiles</span>
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            {(profile.socialLinks || []).map((social) => {
              const formattedHref = social.href ? (social.href.startsWith('http') ? social.href : `https://${social.href}`) : '#';
              const customStyle = getSocialStyle(social.name);
              return (
                <a
                  key={social.name}
                  href={formattedHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:scale-110 shadow-xs ${customStyle}`}
                  title={social.name}
                >
                  {getSocialIcon(social.name)}
                </a>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
