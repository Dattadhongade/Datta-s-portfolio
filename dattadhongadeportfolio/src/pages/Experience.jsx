import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const Experience = () => {
  const { experiences } = usePortfolio();

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 animate-in fade-in duration-500">

      {/* Card container with bg — compact padding on mobile */}
      <div className="glass-card rounded-2xl p-4 sm:p-8 border border-slate-200/80 dark:border-white/10">

        {/* Subtitle */}
        <p className="fluid-xs text-slate-500 dark:text-slate-400 font-medium mb-4 sm:mb-6 italic">
          Hands-on software engineering experience in enterprise and project environments
        </p>

        {/* Single vertical timeline with 100% dead-centered dots and zero text overlap */}
        <div className="relative pl-7 sm:pl-9">
          {/* One vertical line */}
          <div className="absolute left-3.5 sm:left-4 top-0 bottom-0 w-0.5 bg-cyan-200 dark:bg-cyan-500/25 -translate-x-1/2" />

          <div className="space-y-6 sm:space-y-10">
            {(experiences || []).map((exp) => (
              <div key={exp.id} className="relative pl-5 sm:pl-6">

                {/* Company-level dot — 100% dead-centered on the vertical line */}
                <span className="absolute -left-5 sm:-left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-cyan-500 dark:bg-cyan-400 ring-4 ring-white dark:ring-[#080b14] shadow-xs z-10" />

                {/* ── MAIN POINT: Company name (bigger, bolder) ── */}
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-0.5">
                  <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">{exp.company}</span>
                  <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">{exp.duration}</span>
                </div>

                {/* Location — muted beneath company */}
                {exp.location && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 font-medium">
                    {exp.location}
                  </p>
                )}

                {/* ── SUB POINTS: Roles (indented, smaller) ── */}
                <div className="space-y-4 sm:space-y-5">
                  {(exp.roles || []).map((role, rIdx) => (
                    <div key={rIdx} className="flex gap-3">

                      {/* Distinct Role Bullet Dot — Vibrant Indigo color */}
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 ring-2 ring-indigo-500/20 shrink-0" />

                      <div className="space-y-1 min-w-0">

                        {/* Role title + type — clearly secondary to company */}
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <span className="text-sm font-bold italic text-slate-800 dark:text-slate-100">{role.title}</span>
                          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">{role.type}</span>
                        </div>

                        {/* Duration */}
                        <p className="text-xs text-slate-400 dark:text-slate-500">{role.duration}</p>

                        {/* Description */}
                        {role.description && (
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-0.5">
                            {role.description}
                          </p>
                        )}

                        {/* Achievements */}
                        {role.achievements && role.achievements.length > 0 && (
                          <ul className="pt-1 space-y-1 pl-3.5">
                            {role.achievements.map((ach, aIdx) => (
                              <li key={aIdx} className="text-xs text-slate-600 dark:text-slate-400 list-disc leading-relaxed">
                                {ach}
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Tech tags */}
                        {role.technologies && role.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {role.technologies.map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[10px] px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-semibold"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
