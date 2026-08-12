import React, { useState } from "react";
import {
  Code2,
  Server,
  BrainCircuit,
  TerminalSquare,
  ShieldCheck,
  Database,
  TestTube2,
  Wrench,
  GraduationCap,
  Award,
  Download,
  CheckCircle,
  Layers
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const getCategoryIcon = (category) => {
  switch (category) {
    case "Frontend": return <Code2 className="text-cyan-600 dark:text-cyan-400" size={16} />;
    case "Backend": return <Server className="text-indigo-600 dark:text-indigo-400" size={16} />;
    case "AI / ML": return <BrainCircuit className="text-emerald-600 dark:text-emerald-400" size={16} />;
    case "Languages": return <TerminalSquare className="text-amber-600 dark:text-amber-400" size={16} />;
    case "DevOps & Tools": return <Wrench className="text-blue-600 dark:text-blue-400" size={16} />;
    case "Auth & Security": return <ShieldCheck className="text-purple-600 dark:text-purple-400" size={16} />;
    case "Infra / Architecture": return <Database className="text-teal-600 dark:text-teal-400" size={16} />;
    case "Testing / Quality": return <TestTube2 className="text-rose-600 dark:text-rose-400" size={16} />;
    default: return <Code2 className="text-cyan-600 dark:text-cyan-400" size={16} />;
  }
};

const Resume = () => {
  const { educations, education, skills, certifications, profile } = usePortfolio();

  const educationList = educations && educations.length > 0 ? educations : (education ? [education] : []);
  const skillCategories = Object.keys(skills || {});
  const [activeCategory, setActiveCategory] = useState(skillCategories[0] || "Frontend");

  const currentCategoryKey = skills[activeCategory] ? activeCategory : skillCategories[0] || "Frontend";
  const activeSkillsList = skills[currentCategoryKey] || [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">

      {/* Education */}
      <div className="space-y-4">
        {/* Badge */}
        <div className="flex justify-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-400 text-xs font-bold shadow-2xs">
            <GraduationCap size={15} />
            <span>Academic Background &amp; Qualifications</span>
          </div>
        </div>

        {/* Timeline list */}
        <div className="space-y-0 border-l-2 border-indigo-200 dark:border-indigo-500/30 pl-5 sm:pl-6 ml-2">
          {educationList.map((edu, idx) => (
            <div
              key={edu.id || edu.degree}
              className={`relative pb-6 sm:pb-7 ${idx === educationList.length - 1 ? "pb-0" : ""}`}
            >
              {/* Timeline dot */}
              <span className="absolute left-[-1.65rem] top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500 dark:bg-indigo-400 ring-4 ring-white dark:ring-[#080b14] shadow-xs z-10" />

              {/* Degree + CGPA */}
              <div className="flex flex-wrap justify-between items-start gap-1.5 mb-1">
                <h3 className="text-sm sm:text-base md:text-lg font-bold sm:font-extrabold text-black dark:text-white tracking-tight leading-snug">
                  {edu.degree}
                </h3>
                {edu.cgpa && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-500/20 text-black dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40 text-[10px] sm:text-[11px] font-bold shrink-0">
                    CGPA: {edu.cgpa}
                  </span>
                )}
              </div>

              {/* Institution & Duration */}
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-xs sm:text-sm mb-1.5">
                <span className="text-cyan-700 dark:text-cyan-400 font-bold">{edu.institution}</span>
                <span className="text-slate-500 dark:text-slate-400 font-medium shrink-0">{edu.duration}</span>
              </div>

              {/* Description */}
              {edu.description && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Category Selection Bar*/}
      <div className="space-y-3">
        <div className="text-center">
          <h1 className="fluid-hero font-extrabold tracking-tight text-black dark:text-white">
           Technical <span className="text-gradient-cyan">Skills</span>
          </h1>

        </div>

        {/* Category Tabs  */}
        <div className="p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-1.5 sm:gap-2">
          {skillCategories.map((category) => {
            const isActive = currentCategoryKey === category;
            const count = (skills[category] || []).length;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-2 sm:px-3.5 sm:py-1.5 rounded-xl text-xs sm:text-sm font-semibold sm:font-medium transition-all duration-200 cursor-pointer flex items-center justify-between sm:justify-start gap-1.5 w-full sm:w-auto ${isActive
                    ? "bg-white dark:bg-cyan-500/25 text-black dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 shadow-xs font-bold"
                    : "text-black dark:text-slate-400 hover:text-cyan-600 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5 border border-transparent"
                  }`}
              >
                <span className="truncate">{category}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ${isActive ? 'bg-cyan-100 dark:bg-white/20 text-black dark:text-white font-bold' : 'bg-slate-200 dark:bg-white/10 text-black dark:text-slate-400 font-medium'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Skills Grid with Solid Black Text */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeSkillsList.map((skill, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  {getCategoryIcon(currentCategoryKey)}
                </div>
                <h4 className="fluid-h3 font-semibold text-black dark:text-white">
                  {skill.name}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-white/10 text-black dark:text-slate-200 border border-slate-200 dark:border-white/10">
                  {skill.level}
                </span>
                <span className="fluid-sm font-bold text-cyan-700 dark:text-cyan-300 min-w-9 text-right">
                  {skill.progress}%
                </span>
              </div>
            </div>

            {/* Dual gradient progress bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden p-0.5 border border-slate-200/60 dark:border-transparent">
              <div
                className="h-full rounded-full bg-linear-to-r from-cyan-600 via-indigo-600 to-fuchsia-600 transition-all duration-700 ease-out"
                style={{ width: `${skill.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Certifications & Focus Areas (Only rendered if certifications exist) */}
      {certifications && certifications.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="fluid-h2 font-semibold text-black dark:text-white tracking-tight flex items-center gap-2">
            <Award size={18} className="text-cyan-600 dark:text-cyan-400" />
            <span>Certifications & Focus Areas</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="glass-card rounded-xl p-4 border border-slate-200/80 dark:border-white/10 space-y-1 hover:-translate-y-0.5 transition-transform"
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className="fluid-sm font-semibold text-black dark:text-white leading-snug">
                    {cert.title}
                  </h4>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-black dark:text-cyan-300 font-bold border border-cyan-200 dark:border-cyan-500/30">
                    {cert.year}
                  </span>
                </div>
                <p className="fluid-xs text-black dark:text-slate-400 font-medium">
                  {cert.issuer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Resume;
