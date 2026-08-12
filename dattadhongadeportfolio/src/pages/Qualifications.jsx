import React from "react";
import { GraduationCap } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const Qualifications = () => {
  const { educations, education } = usePortfolio();
  const educationList =
    educations && educations.length > 0
      ? educations
      : education
      ? [education]
      : [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-3 sm:space-y-4 animate-in fade-in duration-500">

      {/* Badge - Centered */}
      <div className="flex justify-center w-full">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-400 text-xs font-bold shadow-2xs">
          <GraduationCap size={15} />
          <span>Academic Background &amp; Qualifications</span>
        </div>
      </div>

      {/* Card container with bg — compact padding on mobile */}
      <div className="glass-card rounded-2xl p-4 sm:p-8 border border-slate-200/80 dark:border-white/10">

        {/* Single vertical timeline with 100% dead-centered dots and zero text overlap */}
        <div className="relative pl-6 sm:pl-8">
          {/* One vertical line */}
          <div className="absolute left-2.5 sm:left-3 top-0 bottom-0 w-0.5 bg-indigo-200 dark:bg-indigo-500/30" />

          <div className="space-y-5 sm:space-y-8">
            {educationList.map((edu) => (
              <div key={edu.id || edu.degree} className="relative pl-4 sm:pl-5">

                {/* Dot — 100% dead-centered on line */}
                <span className="absolute left-[-1.15rem] sm:left-[-1.4rem] top-1.5 w-3 h-3 rounded-full bg-indigo-500 dark:bg-indigo-400 ring-4 ring-white dark:ring-[#080b14] shadow-xs z-10" />

                {/* ── MAIN POINT: Degree (compact text size on mobile) ── */}
                <div className="flex flex-wrap justify-between items-start gap-1.5 mb-1">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold sm:font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                    {edu.degree}
                  </h3>
                  {edu.cgpa && (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40 text-[10px] sm:text-[11px] font-bold shrink-0">
                      CGPA: {edu.cgpa}
                    </span>
                  )}
                </div>

                {/* ── SUB POINT: Institution & Duration ── */}
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-xs sm:text-sm mb-1.5">
                  <span className="font-bold text-cyan-700 dark:text-cyan-400">{edu.institution}</span>
                  <span className="text-slate-500 dark:text-slate-400 font-medium shrink-0">{edu.duration}</span>
                </div>

                {/* Description — muted body text */}
                {edu.description && (
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {edu.description}
                  </p>
                )}

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Qualifications;
