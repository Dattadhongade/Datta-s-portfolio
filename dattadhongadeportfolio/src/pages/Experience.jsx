import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ExperienceSkeleton } from '../components/SkeletonLoader';

export const Experience = () => {
  const { experiences, dataLoaded } = usePortfolio();

  if (!dataLoaded) {
    return <ExperienceSkeleton />;
  }

  return (

    <div className="w-full max-w-5xl mx-auto space-y-4 animate-in fade-in duration-500">
      {/* total experience badge */}
      <div className="flex justify-center w-full">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-bold shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Total Work Experience: 0.7 Years (including internship)</span>
        </div>
      </div>

      {/* experience list */}
      <div className="space-y-4 sm:space-y-6">
        {(experiences || []).map((exp) => (
          <div key={exp.id} className="glass-card rounded-2xl p-5 sm:p-7 border border-slate-200/80 dark:border-white/10 space-y-4">
            {/* company info */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-base sm:text-lg font-bold italic tracking-tight text-slate-900 dark:text-white">
                {exp.company}
              </h3>
              {exp.duration && (
                <span className="text-xs sm:text-sm font-semibold italic text-cyan-600 dark:text-cyan-400">
                  {exp.duration}
                </span>
              )}
              {exp.location && (
                <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">
                  ({exp.location})
                </span>
              )}
            </div>

            {/* timeline container */}
            <div className="relative ml-3 sm:ml-5 pl-6 space-y-6 pt-1">
              {/* timeline line */}
              <div className="absolute left-1.5 top-2.5 bottom-2 w-0.5 bg-cyan-400/35 dark:bg-cyan-500/35 -translate-x-1/2" />

              {(exp.roles || []).map((role, rIdx) => {
                const rawDesc = role.description || (Array.isArray(role.achievements) ? role.achievements.join('\n') : (role.achievements || ''));
                const descLines = rawDesc
                  ? rawDesc.split('\n').map((l) => l.trim()).filter(Boolean)
                  : [];
                const isBulletList = descLines.length > 1 || descLines.some((l) => l.startsWith('•') || l.startsWith('-') || l.startsWith('*'));

                const rawTech = role.technologies || [];
                const techList = Array.isArray(rawTech)
                  ? rawTech
                  : typeof rawTech === 'string'
                  ? rawTech.split(',').map((s) => s.trim()).filter(Boolean)
                  : [];

                return (
                  <div key={rIdx} className="relative space-y-1.5">
                    {/* timeline dot */}
                    <span className="absolute -left-4.5 top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 dark:bg-cyan-400 ring-2 ring-white dark:ring-[#080b14] shadow-xs z-10 -translate-x-1/2" />

                    {/* role and type */}
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold italic text-slate-900 dark:text-white">
                        {role.title}
                      </h4>
                      {role.type && (
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 text-[10px] sm:text-xs font-semibold border border-purple-500/20">
                          {role.type}
                        </span>
                      )}
                    </div>

                    {/* duration */}
                    {role.duration && (
                      <p className="text-xs italic text-cyan-600/90 dark:text-cyan-400/90 font-medium">
                        {role.duration}
                      </p>
                    )}

                    {/* description */}
                    {descLines.length > 0 && (
                      <div className="space-y-1 pt-0.5">
                        {descLines.map((line, lIdx) => {
                          const cleanText = line.replace(/^[•\-\*]\s*/, '');
                          return (
                            <p key={lIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                              {isBulletList && <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />}
                              <span>{cleanText}</span>
                            </p>
                          );
                        })}
                      </div>
                    )}

                    {/* tech stack */}
                    {techList.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {techList.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
