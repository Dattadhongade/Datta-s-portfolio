import React, { useState } from "react";
import {
  Code2, Server, BrainCircuit, TerminalSquare,
  ShieldCheck, Database, TestTube2, Wrench, Award,
  BarChart3
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import TechIcon from "../components/TechIcon";
import { SkillsSkeleton } from "../components/SkeletonLoader";


const getCategoryIcon = (category) => {
  const norm = (category || "").toLowerCase();
  if (norm.includes("data") || norm.includes("analytic") || norm.includes("bi") || norm.includes("insight")) {
    return <BarChart3 className="text-amber-600 dark:text-amber-400" size={16} />;
  }
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

const Skills = () => {
  const { skills, certifications, dataLoaded } = usePortfolio();

  if (!dataLoaded) {
    return <SkillsSkeleton />;
  }

  const skillCategories = Object.keys(skills || {});
  const [activeCategory, setActiveCategory] = useState(skillCategories[0] || "Frontend");
  const currentCategoryKey = skills[activeCategory] ? activeCategory : skillCategories[0] || "Frontend";
  const activeSkillsList = skills[currentCategoryKey] || [];


  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">

      {/* Header */}
      <div className="text-center">
        <h1 className="fluid-hero font-extrabold tracking-tight text-black dark:text-white">
          Technical <span className="text-gradient-cyan">Skills</span>
        </h1>
      </div>

      {/* Category Tabs - Equal 2 Column Grid on Mobile */}
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
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ${isActive ? "bg-cyan-100 dark:bg-white/20 text-black dark:text-white font-bold" : "bg-slate-200 dark:bg-white/10 text-black dark:text-slate-400 font-medium"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {activeSkillsList.map((skill, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-white dark:bg-white/10 border border-slate-200/90 dark:border-white/10 shadow-xs flex items-center justify-center">
                  <TechIcon name={skill.icon || skill.name} size={20} />
                </div>
                <h4 className="fluid-h3 font-semibold text-black dark:text-white">{skill.name}</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="fluid-sm font-bold text-cyan-700 dark:text-cyan-300 min-w-9 text-right">
                  {skill.progress}%
                </span>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden p-0.5 border border-slate-200/60 dark:border-transparent">
              <div
                className="h-full rounded-full bg-linear-to-r from-cyan-600 via-indigo-600 to-fuchsia-600 transition-all duration-700 ease-out"
                style={{ width: `${skill.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Certifications (Only rendered if certifications exist) */}
      {certifications && certifications.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="fluid-h2 font-semibold text-black dark:text-white tracking-tight flex items-center gap-2">
            <Award size={18} className="text-cyan-600 dark:text-cyan-400" />
            <span>Certifications &amp; Focus Areas</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="glass-card rounded-xl p-4 border border-slate-200/80 dark:border-white/10 space-y-1 hover:-translate-y-0.5 transition-transform"
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className="fluid-sm font-semibold text-black dark:text-white leading-snug">{cert.title}</h4>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-black dark:text-cyan-300 font-bold border border-cyan-200 dark:border-cyan-500/30">
                    {cert.year}
                  </span>
                </div>
                <p className="fluid-xs text-black dark:text-slate-400 font-medium">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Skills;
