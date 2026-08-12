import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Download, Mail, Sun, Moon, X, Code2, MapPin, Send, Shield, Globe } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { usePortfolio } from "../context/PortfolioContext";
import heroDark from "../assets/hero.png";
import heroLight from "../assets/hero.png";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, isDarkMode, toggleTheme }) => {
  const location = useLocation();
  const { profile } = usePortfolio();

  const getSocialIcon = (name) => {
    switch ((name || "").toLowerCase()) {
      case "github": return <FaGithub size={17} />;
      case "linkedin": return <FaLinkedin size={17} />;
      case "leetcode": return <SiLeetcode size={17} />;
      case "instagram": return <FaInstagram size={17} />;
      case "twitter":
      case "x": return <FaTwitter size={17} />;
      case "youtube": return <FaYoutube size={17} />;
      case "website":
      case "portfolio": return <Globe size={17} />;
      default: return <Globe size={17} />;
    }
  };

  return (
    <>
      {/* Sidebar Backdrop Overlay (Mobile & iPad) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Main Dock with tighter clean margin */}
      <aside className={`
        fixed lg:left-4 top-0 lg:top-4 bottom-0 lg:bottom-4 lg:h-[calc(100vh-32px)] z-50
        w-66.25 lg:w-65 
        glass-panel
        lg:rounded-2xl shadow-xl
        transition-all duration-300 ease-in-out flex flex-col justify-between
        overflow-y-auto no-scrollbar
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

        {/* Top Header: Animated Theme Switcher & Mobile Close */}
        <div className="flex justify-between items-center p-4 border-b border-slate-200/80 dark:border-white/5">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 p-2 px-3 rounded-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-black dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 hover:border-cyan-400/40 transition-all cursor-pointer group active:scale-95 shadow-2xs"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle visual theme"
          >
            {isDarkMode ? (
              <div key="sun" className="flex items-center gap-1.5 animate-theme-icon">
                <Sun size={15} className="text-amber-400 group-hover:rotate-90 transition-transform duration-300" />
                <span className="text-xs font-medium text-slate-300">Light</span>
              </div>
            ) : (
              <div key="moon" className="flex items-center gap-1.5 animate-theme-icon">
                <Moon size={15} className="text-indigo-600 group-hover:-rotate-12 transition-transform duration-300" />
                <span className="text-xs font-semibold text-black">Dark</span>
              </div>
            )}
          </button>

          <button
            className="lg:hidden p-2 rounded-xl text-black dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Profile Avatar & Identity with clean spacing */}
        <div className="flex flex-col items-center pt-3 px-6 text-center">
          {/* Animated Avatar Ring with Snappy Crossfade - Increased size */}
          <div className="relative w-32 h-32 lg:w-36 lg:h-36 mb-3.5 group cursor-pointer">
            <div className="absolute -inset-1 rounded-full bg-linear-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 opacity-70 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-700"></div>
            <div className="relative w-full h-full rounded-full p-1 bg-white dark:bg-[#080b14] overflow-hidden shadow-md">
              <img
                key={isDarkMode ? 'dark-photo' : 'light-photo'}
                src={isDarkMode ? (profile.avatarDark || heroDark) : (profile.avatarLight || heroLight)}
                alt={profile.name}
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-all duration-300 animate-in fade-in"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop";
                }}
              />
            </div>
          </div>

          <h2 className="fluid-h2 font-semibold text-black dark:text-white tracking-tight mb-2">
            {profile.name}
          </h2>

          <div className="flex items-center gap-1.5 text-xs text-black dark:text-slate-400 mb-3 font-medium">
            <MapPin size={13} className="text-cyan-600 dark:text-cyan-500" />
            <span>{profile.location}</span>
          </div>

          {/* Role Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/30 text-black dark:text-cyan-300 text-xs font-semibold">
            <Code2 size={12} className="text-cyan-600 dark:text-cyan-500" />
            <span>{profile.role}</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col gap-2.5 px-6 my-4 w-full">
          <Link
            to="/resume"
            onClick={() => setIsSidebarOpen(false)}
            className="w-full py-2.5 px-4 rounded-xl bg-linear-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
          >
            <Download size={15} className="group-hover:-translate-y-0.5 transition-transform" />
            <span>View Resume</span>
          </Link>

          {/* Renamed to Let's Connect */}
          <Link
            to="/contact"
            onClick={() => setIsSidebarOpen(false)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-black dark:text-slate-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 group"
          >
            <Send size={15} className="text-cyan-600 dark:text-cyan-500 group-hover:scale-110 transition-transform" />
            <span>Let's Connect</span>
          </Link>
        </div>

        {/* Social Matrix */}
        <div className="p-4 border-t border-slate-200/80 dark:border-white/5 space-y-3">
          <div className="flex justify-center gap-2">
            {(profile.socialLinks || []).map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-black dark:text-slate-300 ${social.color} transition-all duration-200 hover:-translate-y-0.5 shadow-xs`}
                title={social.name}
                aria-label={social.name}
              >
                {getSocialIcon(social.name)}
              </a>
            ))}
          </div>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;



