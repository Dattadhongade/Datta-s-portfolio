import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { Eye, FileText, ExternalLink, Download, Mail, Sun, Moon, X, Code2, MapPin, Send, Shield, Globe, Play } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { usePortfolio } from "../context/PortfolioContext";
import ActualPdfViewer from "./ActualPdfViewer";
import heroDark from "../assets/hero.png";

import heroLight from "../assets/hero.png";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, isDarkMode, toggleTheme, onReplayIntro }) => {
  const navigate = useNavigate();
  const { profile, educations, education, skills, experiences } = usePortfolio();
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [pdfViewerUrl, setPdfViewerUrl] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowPdfViewer(false);
      }
    };
    if (showPdfViewer) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showPdfViewer]);

  const handleDownloadResume = async (e) => {
    if (e) e.preventDefault();
    const url = pdfViewerUrl || formatExternalUrl(profile?.resumeDownloadUrl);
    if (!url || url === "#download") {
      window.print();
      return;
    }

    const filename = profile?.name
      ? `${profile.name.replace(/\s+/g, "_")}_Resume.pdf`
      : "Resume.pdf";

    // Cloudinary direct download
    if (url.includes("res.cloudinary.com")) {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }


    setIsDownloading(true);
    try {
      if (url.startsWith("blob:") || url.startsWith("data:")) {
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsDownloading(false);
        return;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Direct fetch failed");
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      const link = document.createElement("a");
      link.href = url.includes("?") ? `${url}&download=true` : `${url}?download=true`;
      link.download = filename;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(false);
    }
  };


  const getSocialIcon = (name) => {
    switch ((name || "").toLowerCase()) {
      case "github": return <FaGithub size={17} className="text-slate-800 dark:text-slate-100" />;
      case "linkedin": return <FaLinkedin size={17} className="text-[#0A66C2]" />;
      case "leetcode": return <SiLeetcode size={17} className="text-[#FFA116]" />;
      case "instagram": return <FaInstagram size={17} className="text-[#E4405F]" />;
      case "twitter":
      case "x": return <FaTwitter size={17} className="text-[#1DA1F2]" />;
      case "youtube": return <FaYoutube size={17} className="text-[#FF0000]" />;
      case "website":
      case "portfolio": return <Globe size={17} className="text-emerald-500" />;
      default: return <Globe size={17} className="text-cyan-500" />;
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
      case "website":
      case "portfolio": return "bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 border-emerald-200 dark:border-emerald-500/30";
      default: return "bg-slate-100 hover:bg-cyan-50 dark:bg-slate-800/60 dark:hover:bg-cyan-500/20 border-slate-200 dark:border-slate-700/60";
    }
  };

  const formatExternalUrl = (url) => {
    if (!url) return "";
    let trimmed = String(url).trim();
    if (!trimmed || trimmed === "#") return "";
    if (trimmed.startsWith("http://") && !trimmed.includes("localhost") && !trimmed.includes("127.0.0.1")) {
      trimmed = trimmed.replace(/^http:\/\//i, "https://");
    }
    if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  const [pdfLoadError, setPdfLoadError] = useState(false);
  const [resumeViewMode, setResumeViewMode] = useState("document"); // "document" | "profile"

  const handleResumeClick = (e) => {
    if (e) e.preventDefault();
    setIsSidebarOpen(false);
    setPdfLoadError(false);
    const resumeUrl = profile?.resumeDownloadUrl;

    if (resumeUrl && resumeUrl !== "#download" && resumeUrl.trim() !== "") {
      const fullUrl = formatExternalUrl(resumeUrl);
      setPdfViewerUrl(fullUrl);
      setResumeViewMode("document");
      setShowPdfViewer(true);
    } else {
      setPdfViewerUrl("");
      setResumeViewMode("profile");
      setShowPdfViewer(true);
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

      {/* Sidebar Main */}
      <aside className={`
        fixed lg:left-4 top-0 lg:top-4 bottom-0 lg:bottom-4 lg:h-[calc(100vh-32px)] z-50
        w-66.25 lg:w-65 
        glass-panel
        lg:rounded-2xl shadow-xl
        transition-all duration-300 ease-in-out flex flex-col gap-10 sm:gap-7
        overflow-y-auto no-scrollbar
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

        {/* Top Header: Animated Theme Switcher, Intro Replay & Mobile Close */}
        <div className="flex justify-between items-center p-4 border-b border-slate-200/80 dark:border-white/5 gap-2">
          <div className="flex items-center gap-2">
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

            {onReplayIntro && (
              <button
                onClick={() => {
                  setIsSidebarOpen(false);
                  onReplayIntro();
                }}
                className="flex items-center gap-1.5 p-2 px-2.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-all cursor-pointer text-xs font-semibold shadow-2xs active:scale-95"
                title="Replay VFX CGI Intro Animation"
              >
                <Play size={11} className="text-cyan-500 fill-cyan-500/30" />
                <span className="text-[11px] font-mono">Intro</span>
              </button>
            )}
          </div>

          <button
            className="lg:hidden p-2 rounded-xl text-black dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Profile Avatar & Identity with clean, balanced spacing */}
        <div className="flex flex-col items-center pt-3 lg:pt-4 px-6 text-center">
          {/* Animated Avatar Ring with Snappy Crossfade */}
          <div className="relative w-30 h-30 sm:w-32 sm:h-32 lg:w-36 lg:h-36 mb-3 group cursor-pointer">
            <div className="absolute -inset-1 rounded-full bg-linear-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 opacity-70 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-700"></div>
            <div className="relative w-full h-full rounded-full p-1 bg-white dark:bg-[#080b14] overflow-hidden shadow-md">
              <img
                key={isDarkMode ? 'dark-photo' : 'light-photo'}
                src={isDarkMode ? (profile.avatarDark || heroDark) : (profile.avatarLight || heroLight)}
                alt={profile.name}
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-all duration-300 animate-in fade-in"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = isDarkMode ? heroDark : heroLight;
                }}
              />
            </div>
          </div>

          <h2 className="text-sm sm:text-base xl:text-xl font-bold text-black dark:text-white tracking-tight mb-1.5">
            {profile.name}
          </h2>

          <div className="flex items-center gap-1.5 text-xs text-black dark:text-slate-400 mb-2.5 font-medium">
            <MapPin size={13} className="text-cyan-600 dark:text-cyan-500" />
            <span>{profile.location}</span>
          </div>

          {/* Role Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/30 text-black dark:text-cyan-300 text-xs font-semibold">
            <Code2 size={12} className="text-cyan-600 dark:text-cyan-500" />
            <span>{profile.role}</span>
          </div>
        </div>

        {/* Action CTAs — Well-spaced */}
        <div className="flex flex-col gap-2.5 px-6 my-4 w-full">
          <button
            type="button"
            onClick={handleResumeClick}
            className="w-full py-2.5 px-4 rounded-xl bg-linear-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group cursor-pointer"
          >
            <Eye size={15} className="group-hover:scale-110 transition-transform" />
            <span>View Resume</span>
          </button>

          <Link
            to="/contact"
            onClick={() => setIsSidebarOpen(false)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-black dark:text-slate-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 group"
          >
            <Send size={15} className="text-cyan-600 dark:text-cyan-500 group-hover:scale-110 transition-transform" />
            <span>Let's Connect</span>
          </Link>
        </div>

        {/* Social Matrix — Vibrant Brand Colors */}
        <div className="p-4 border-t border-slate-200/80 dark:border-white/5 space-y-3">
          <div className="flex justify-center gap-2.5 flex-wrap">
            {(profile.socialLinks || []).map((social) => {
              const formattedHref = formatExternalUrl(social.href);
              const customStyle = getSocialStyle(social.name);
              return (
                <a
                  key={social.name}
                  href={formattedHref || "#"}
                  target={formattedHref ? "_blank" : undefined}
                  rel={formattedHref ? "noopener noreferrer" : undefined}
                  className={`p-2.5 rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:scale-110 shadow-xs ${customStyle}`}
                  title={social.name}
                  aria-label={social.name}
                >
                  {getSocialIcon(social.name)}
                </a>
              );
            })}
          </div>
        </div>

      </aside>

      {/* Fullscreen Interactive Resume Viewer Modal (Always opens on View Resume) */}
      {showPdfViewer && createPortal(
        <div 
          className="fixed inset-0 z-9999 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-2 sm:p-5 animate-in fade-in duration-200"
          onClick={() => setShowPdfViewer(false)}
        >
          <div 
            className="glass-card w-full max-w-5xl h-[94vh] sm:h-[90vh] rounded-2xl p-2.5 sm:p-5 flex flex-col border border-slate-200/80 dark:border-white/10 shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-2.5 sm:pb-3 mb-2 shrink-0 gap-2 flex-wrap">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="text-cyan-500 shrink-0" size={18} />
                <h3 className="text-xs sm:text-base font-bold text-black dark:text-white truncate">
                  {profile?.name ? `${profile.name} — Resume` : 'Resume Document'}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-wrap">
                {pdfViewerUrl && (
                  <div className="flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setResumeViewMode("document")}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        resumeViewMode === "document"
                          ? "bg-white dark:bg-cyan-500/25 text-black dark:text-cyan-300 font-bold shadow-xs"
                          : "text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => setResumeViewMode("profile")}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        resumeViewMode === "profile"
                          ? "bg-white dark:bg-cyan-500/25 text-black dark:text-cyan-300 font-bold shadow-xs"
                          : "text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      Interactive
                    </button>
                  </div>
                )}

                {pdfViewerUrl && (
                  <a
                    href={pdfViewerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-black dark:text-slate-200 transition-colors flex items-center gap-1.5 text-xs font-semibold shrink-0"
                    title="Open original PDF in new tab"
                    aria-label="Open in new window tab"
                  >
                    <ExternalLink size={14} />
                    <span className="hidden sm:inline">New Tab</span>
                  </a>
                )}
                
                <button
                  type="button"
                  onClick={handleDownloadResume}
                  disabled={isDownloading}
                  className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-75 text-white transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-xs shrink-0 cursor-pointer"
                  title="Direct download PDF file"
                  aria-label="Direct download PDF file"
                >
                  <Download size={14} className={isDownloading ? "animate-bounce" : ""} />
                  <span className="hidden sm:inline">{isDownloading ? "Downloading..." : "Download PDF"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowPdfViewer(false)}
                  className="p-1.5 sm:p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 border border-rose-200/50 dark:border-rose-500/30 transition-all cursor-pointer shrink-0 flex items-center justify-center shadow-2xs"
                  title="Close resume viewer"
                  aria-label="Close resume viewer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body: Actual Uploaded PDF Document (PDF.js) & Interactive Profile View */}
            {pdfViewerUrl && resumeViewMode === "document" ? (
              <div className="flex-1 w-full rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 relative min-h-0">
                <ActualPdfViewer pdfUrl={pdfViewerUrl} />
              </div>
            ) : (



              <div className="flex-1 w-full rounded-xl overflow-y-auto p-4 sm:p-8 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 space-y-6 text-black dark:text-white min-h-0">
                {/* Header Profile */}
                <div className="border-b border-slate-200 dark:border-white/10 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold">{profile?.name}</h2>
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 font-semibold">{profile?.role}</p>
                    <p className="text-xs text-slate-500">{profile?.location} • {profile?.email}</p>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Professional Summary</h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{profile?.bioParagraph1}</p>
                  {profile?.bioParagraph2 && <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{profile.bioParagraph2}</p>}
                </div>

                {/* Experience */}
                {experiences && experiences.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Work Experience</h4>
                    <div className="space-y-3">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1.5">
                          <div className="flex justify-between items-baseline">
                            <h5 className="text-sm font-bold">{exp.company}</h5>
                            <span className="text-xs text-cyan-500 font-semibold">{exp.duration}</span>
                          </div>
                          {(exp.roles || []).map((r, ri) => (
                            <div key={ri} className="text-xs space-y-1 pt-1">
                              <p className="font-semibold text-indigo-500 dark:text-indigo-300">{r.title} — <span className="text-slate-400 font-normal">{r.type}</span></p>
                              {r.description && <p className="text-slate-600 dark:text-slate-300">{r.description}</p>}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {((educations && educations.length > 0) || education) && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Education &amp; Qualifications</h4>
                    <div className="space-y-2">
                      {(educations?.length > 0 ? educations : [education]).map((edu, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex justify-between items-baseline">
                          <div>
                            <h5 className="text-xs sm:text-sm font-bold">{edu?.degree}</h5>
                            <p className="text-xs text-slate-500">{edu?.college || edu?.institution}</p>
                          </div>
                          <span className="text-xs text-emerald-500 font-bold">{edu?.duration} • CGPA: {edu?.cgpa}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Bottom Bar for Easy Tap to Close */}
            <div className="sm:hidden pt-2 mt-1.5 border-t border-slate-200/80 dark:border-white/10 flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowPdfViewer(false)}
                className="flex-1 py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-semibold text-xs flex items-center justify-center gap-1.5 border border-rose-200/50 dark:border-rose-500/20 transition-colors cursor-pointer"
              >
                <X size={14} />
                <span>Close Resume</span>
              </button>
              {pdfViewerUrl && (
                <button
                  type="button"
                  onClick={handleDownloadResume}
                  disabled={isDownloading}
                  className="py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Download size={13} className={isDownloading ? "animate-bounce" : ""} />
                  <span>{isDownloading ? "Downloading..." : "Download"}</span>
                </button>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Sidebar;
