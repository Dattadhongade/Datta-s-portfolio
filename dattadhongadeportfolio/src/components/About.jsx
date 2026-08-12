import React from 'react';
import {
  Code2,
  Server,
  Database,
  ShieldCheck,
  Cpu,
  Layers,
  TerminalSquare,
  Dumbbell,
  Mountain,
  Film,
  ArrowUpRight,
  Zap,
  Globe,
  Layout,
  Smartphone
} from "lucide-react";
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const getCapabilityIcon = (iconName, colorClass) => {
  switch (iconName) {
    case "Code2": return <Code2 className={colorClass} size={24} />;
    case "Server": return <Server className={colorClass} size={24} />;
    case "Database": return <Database className={colorClass} size={24} />;
    case "ShieldCheck": return <ShieldCheck className={colorClass} size={24} />;
    case "Cpu": return <Cpu className={colorClass} size={24} />;
    case "Layers": return <Layers className={colorClass} size={24} />;
    case "Globe": return <Globe className={colorClass} size={24} />;
    case "Layout": return <Layout className={colorClass} size={24} />;
    default: return <Code2 className={colorClass} size={24} />;
  }
};

const getLifestyleIcon = (iconName) => {
  switch (iconName) {
    case "Dumbbell": return <Dumbbell size={18} />;
    case "Mountain": return <Mountain size={18} />;
    case "Film": return <Film size={18} />;
    default: return <Zap size={18} />;
  }
};

const About = () => {
  const { profile, stats, capabilities, lifestyle } = usePortfolio();

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-page-entrance">

      {/* Clean Description Banner - Glass Panel with subtle hover elevation */}
      <section className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="space-y-4">
          <p className="fluid-body text-black dark:text-slate-300 leading-relaxed font-normal">
            {profile.bioParagraph1}
          </p>

          {profile.bioParagraph2 && (
            <p className="fluid-body text-black dark:text-slate-400 leading-relaxed font-normal">
              {profile.bioParagraph2}
            </p>
          )}
        </div>
      </section>

      {/* High-Impact Stat Metrics with Staggered Entrance & Interactive Hover */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {stats.map((stat, idx) => (
          <div
            key={stat.id}
            className={`glass-card rounded-xl p-4 text-center border ${stat.border || 'border-cyan-500/20'} hover:-translate-y-1 hover:shadow-md transition-all duration-300 group`}
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className={`fluid-h1 font-semibold ${stat.color} tracking-tight mb-0.5 group-hover:scale-105 transition-transform duration-300`}>
              {stat.value}
            </div>
            <div className="fluid-xs font-semibold text-black dark:text-slate-400">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* What I Do Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="fluid-h2 font-semibold text-black dark:text-white tracking-tight flex items-center gap-2">
              <span>🚀</span> What I Do
            </h3>

          </div>
          <Link
            to="/projects"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline transition-colors"
          >
            <span>See live projects</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {capabilities.map((item) => (
            <div
              key={item.id}
              className={`glass-card rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 group border border-slate-200/80 dark:border-white/10 ${item.accent || ''}`}
            >
              <div>
                <div className="flex items-center gap-3 mb-2.5">
                  <div className={`p-2.5 rounded-xl ${item.glow || 'bg-cyan-500/10'} border border-slate-200/80 dark:border-white/10 group-hover:scale-105 transition-transform`}>
                    {getCapabilityIcon(item.iconName, item.iconColor || "text-cyan-600 dark:text-cyan-400")}
                  </div>
                  <div>
                    <h4 className="fluid-h3 font-semibold text-black dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h4>
                    <span className="fluid-xs font-medium text-cyan-700 dark:text-cyan-400/80">
                      {item.tagline}
                    </span>
                  </div>
                </div>

                <p className="fluid-sm text-black dark:text-slate-300 leading-relaxed font-normal mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interests & Lifestyle */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
        {lifestyle.map((item) => (
          <div key={item.id} className="glass-card rounded-xl p-3.5 flex items-center gap-3 border border-slate-200/80 dark:border-white/10">
            <div className={`p-2 rounded-lg ${item.glow || 'bg-amber-500/10'} ${item.iconColor || 'text-amber-600 dark:text-amber-400'} shrink-0`}>
              {getLifestyleIcon(item.iconName)}
            </div>
            <div>
              <h5 className="fluid-sm font-semibold text-black dark:text-white">{item.title}</h5>
              <p className="fluid-xs text-black dark:text-slate-400 font-medium">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
};

export default About;


