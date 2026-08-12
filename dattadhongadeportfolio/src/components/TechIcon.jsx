import React from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiPython,
  SiDocker,
  SiGit,
  SiGithub,
  SiPostman,
  SiUbuntu,
  SiLinux,
  SiNginx,
  SiRabbitmq,
  SiGraphql,
  SiJest,
  SiCplusplus,
  SiGo,
  SiPhp,
  SiHtml5,
  SiPrisma,
  SiFastapi,
  SiDjango,
  SiFlask,
  SiRedux,
  SiMui,
  SiSpringboot,
  SiKubernetes,
  SiRedis,
  SiTestinglibrary,
  SiJsonwebtokens,
  SiVite,
  SiBootstrap,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiAuth0,
  SiGithubactions,
  SiOpenapiinitiative,
  SiSocketdotio
} from 'react-icons/si';
import { FaJava, FaAws, FaCss3Alt } from 'react-icons/fa';
import {
  Code2, Server, Database, ShieldCheck, Cpu, Globe, Terminal,
  Layers, Bot, Radio, Plug, Gauge, ShieldAlert, Lock, KeyRound, Sliders
} from 'lucide-react';

export const TECH_ICON_REGISTRY = [
  // Frontend & UI
  { key: 'react', label: 'React.js', icon: SiReact, color: 'text-[#0284C7] dark:text-[#61DAFB]' },
  { key: 'nextjs', label: 'Next.js', icon: SiNextdotjs, color: 'text-slate-900 dark:text-white' },
  { key: 'javascript', label: 'JavaScript (JS)', icon: SiJavascript, color: 'text-[#D97706] dark:text-[#F7DF1E]' },
  { key: 'typescript', label: 'TypeScript (TS)', icon: SiTypescript, color: 'text-[#2563EB] dark:text-[#3178C6]' },
  { key: 'html5', label: 'HTML5', icon: SiHtml5, color: 'text-[#DC2626] dark:text-[#E34F26]' },
  { key: 'css3', label: 'CSS3', icon: FaCss3Alt, color: 'text-[#2563EB] dark:text-[#1572B6]' },
  { key: 'tailwind', label: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-[#0284C7] dark:text-[#06B6D4]' },
  { key: 'mui', label: 'Material UI (MUI)', icon: SiMui, color: 'text-[#2563EB] dark:text-[#007FFF]' },
  { key: 'redux', label: 'Redux / Toolkit', icon: SiRedux, color: 'text-[#7C3AED] dark:text-[#764ABC]' },
  { key: 'vite', label: 'Vite', icon: SiVite, color: 'text-[#4F46E5] dark:text-[#646CFF]' },
  { key: 'bootstrap', label: 'Bootstrap', icon: SiBootstrap, color: 'text-[#7C3AED] dark:text-[#7952B3]' },
  { key: 'vue', label: 'Vue.js', icon: SiVuedotjs, color: 'text-[#059669] dark:text-[#4FC08D]' },

  // Realtime & Messaging
  { key: 'socketio', label: 'Socket.IO', icon: SiSocketdotio, color: 'text-slate-900 dark:text-white' },
  { key: 'websocket', label: 'WebSockets (WS)', icon: Radio, color: 'text-[#0284C7] dark:text-[#38BDF8]' },
  { key: 'rabbitmq', label: 'RabbitMQ', icon: SiRabbitmq, color: 'text-[#EA580C] dark:text-[#FF6600]' },

  // Backend & Core
  { key: 'nodejs', label: 'Node.js', icon: SiNodedotjs, color: 'text-[#16A34A] dark:text-[#5FA04E]' },
  { key: 'express', label: 'Express.js', icon: SiExpress, color: 'text-slate-900 dark:text-slate-100' },
  { key: 'python', label: 'Python', icon: SiPython, color: 'text-[#2563EB] dark:text-[#3776AB]' },
  { key: 'fastapi', label: 'FastAPI', icon: SiFastapi, color: 'text-[#0D9488] dark:text-[#009688]' },
  { key: 'django', label: 'Django', icon: SiDjango, color: 'text-[#047857] dark:text-[#44B78B]' },
  { key: 'flask', label: 'Flask', icon: SiFlask, color: 'text-slate-900 dark:text-slate-100' },
  { key: 'java', label: 'Java', icon: FaJava, color: 'text-[#D97706] dark:text-[#ED8B00]' },
  { key: 'springboot', label: 'Spring Boot', icon: SiSpringboot, color: 'text-[#16A34A] dark:text-[#6DB33F]' },
  { key: 'cpp', label: 'C++', icon: SiCplusplus, color: 'text-[#1D4ED8] dark:text-[#00599C]' },
  { key: 'go', label: 'Golang (Go)', icon: SiGo, color: 'text-[#0284C7] dark:text-[#00ADD8]' },
  { key: 'php', label: 'PHP', icon: SiPhp, color: 'text-[#4F46E5] dark:text-[#777BB4]' },
  { key: 'graphql', label: 'GraphQL', icon: SiGraphql, color: 'text-[#DB2777] dark:text-[#E10098]' },
  { key: 'api', label: 'API & Webhooks', icon: Globe, color: 'text-[#059669] dark:text-[#10B981]' },
  { key: 'restapi', label: 'REST API', icon: SiOpenapiinitiative, color: 'text-[#16A34A] dark:text-[#6BA539]' },
  { key: 'microservices', label: 'Microservices', icon: Cpu, color: 'text-[#4F46E5] dark:text-[#818CF8]' },

  // Databases & ORM
  { key: 'mongodb', label: 'MongoDB', icon: SiMongodb, color: 'text-[#15803D] dark:text-[#47A248]' },
  { key: 'postgresql', label: 'PostgreSQL', icon: SiPostgresql, color: 'text-[#1D4ED8] dark:text-[#4169E1]' },
  { key: 'mysql', label: 'MySQL', icon: SiMysql, color: 'text-[#1E40AF] dark:text-[#4479A1]' },
  { key: 'redis', label: 'Redis / Caching', icon: SiRedis, color: 'text-[#DC2626] dark:text-[#DC382D]' },
  { key: 'prisma', label: 'Prisma ORM', icon: SiPrisma, color: 'text-slate-900 dark:text-white' },

  // DevOps & Cloud
  { key: 'docker', label: 'Docker', icon: SiDocker, color: 'text-[#0284C7] dark:text-[#2496ED]' },
  { key: 'kubernetes', label: 'Kubernetes', icon: SiKubernetes, color: 'text-[#2563EB] dark:text-[#326CE5]' },
  { key: 'git', label: 'Git', icon: SiGit, color: 'text-[#EA580C] dark:text-[#F05032]' },
  { key: 'github', label: 'GitHub', icon: SiGithub, color: 'text-slate-900 dark:text-white' },
  { key: 'postman', label: 'Postman', icon: SiPostman, color: 'text-[#EA580C] dark:text-[#FF6C37]' },
  { key: 'ubuntu', label: 'Ubuntu Linux', icon: SiUbuntu, color: 'text-[#EA580C] dark:text-[#E95420]' },
  { key: 'linux', label: 'Linux OS', icon: SiLinux, color: 'text-[#D97706] dark:text-[#FCC624]' },
  { key: 'nginx', label: 'Nginx', icon: SiNginx, color: 'text-[#15803D] dark:text-[#009639]' },
  { key: 'aws', label: 'AWS Cloud', icon: FaAws, color: 'text-[#D97706] dark:text-[#FF9900]' },
  { key: 'cicd', label: 'CI/CD Pipelines', icon: SiGithubactions, color: 'text-[#2563EB] dark:text-[#2088FF]' },

  // Security & Testing
  { key: 'ratelimit', label: 'Rate Limiting', icon: Gauge, color: 'text-[#D97706] dark:text-[#F59E0B]' },
  { key: 'jwt', label: 'JWT (JSON Web Token)', icon: SiJsonwebtokens, color: 'text-[#9333EA] dark:text-[#D63AF9]' },
  { key: 'auth0', label: 'OAuth / Passkey / Auth', icon: SiAuth0, color: 'text-[#EA580C] dark:text-[#EB5424]' },
  { key: 'security', label: 'Security & OWASP', icon: ShieldAlert, color: 'text-[#DC2626] dark:text-[#EF4444]' },
  { key: 'encryption', label: 'Encryption & Hashing', icon: Lock, color: 'text-[#7C3AED] dark:text-[#8B5CF6]' },
  { key: 'cors', label: 'CORS & Middleware', icon: Sliders, color: 'text-[#0284C7] dark:text-[#06B6D4]' },
  { key: 'jest', label: 'Jest Unit Testing', icon: SiJest, color: 'text-[#B91C1C] dark:text-[#C21325]' },
  { key: 'testinglibrary', label: 'React Testing Library', icon: SiTestinglibrary, color: 'text-[#DC2626] dark:text-[#E33332]' },
  { key: 'systemdesign', label: 'System Design', icon: Layers, color: 'text-[#0284C7] dark:text-[#38BDF8]' },
  { key: 'ai', label: 'AI & Machine Learning', icon: Bot, color: 'text-[#059669] dark:text-[#10A37F]' }
];

export const getTechIconComponent = (techNameOrKey) => {
  if (!techNameOrKey) return null;

  const raw = techNameOrKey.trim().toLowerCase();
  const normalized = raw.replace(/[^a-z0-9]/g, '');

  // 1. Direct Key Match First
  let found = TECH_ICON_REGISTRY.find(item => item.key.toLowerCase() === normalized || item.key.toLowerCase() === raw);

  // 2. Exact Label Match Second
  if (!found) {
    found = TECH_ICON_REGISTRY.find(item => {
      const normLabel = item.label.toLowerCase().replace(/[^a-z0-9]/g, '');
      return normLabel === normalized || item.label.toLowerCase() === raw;
    });
  }

  // 3. Strict Keyword Match (only keys/labels with length > 2 to avoid substring collisions)
  if (!found) {
    found = TECH_ICON_REGISTRY.find(item => {
      const normLabel = item.label.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (normLabel.length > 2 && normalized.includes(normLabel)) return true;
      if (item.key.length > 2 && normalized.includes(item.key)) return true;
      return false;
    });
  }

  if (found) {
    const IconComp = found.icon;
    return <IconComp className={found.color} size={18} />;
  }

  // Specific Keyword Fallbacks
  if (normalized.includes('ratelimit') || normalized.includes('rate')) return <Gauge className="text-[#D97706] dark:text-[#F59E0B]" size={18} />;
  if (normalized.includes('cicd') || normalized.includes('pipeline')) return <SiGithubactions className="text-[#2563EB] dark:text-[#2088FF]" size={18} />;
  if (normalized.includes('socketio') || normalized.includes('socket')) return <SiSocketdotio className="text-slate-900 dark:text-white" size={18} />;
  if (normalized.includes('websocket') || normalized.includes('ws')) return <Radio className="text-[#0284C7] dark:text-[#38BDF8]" size={18} />;
  if (normalized.includes('react')) return <SiReact className="text-[#0284C7] dark:text-[#61DAFB]" size={18} />;
  if (normalized.includes('next')) return <SiNextdotjs className="text-slate-900 dark:text-white" size={18} />;
  if (normalized.includes('node')) return <SiNodedotjs className="text-[#16A34A] dark:text-[#5FA04E]" size={18} />;
  if (normalized.includes('express')) return <SiExpress className="text-slate-900 dark:text-slate-100" size={18} />;
  if (normalized.includes('typescript') || normalized.includes('ts')) return <SiTypescript className="text-[#2563EB] dark:text-[#3178C6]" size={18} />;
  if (normalized.includes('javascript') || normalized.includes('js')) return <SiJavascript className="text-[#D97706] dark:text-[#F7DF1E]" size={18} />;
  if (normalized.includes('python')) return <SiPython className="text-[#2563EB] dark:text-[#3776AB]" size={18} />;
  if (normalized.includes('django')) return <SiDjango className="text-[#047857] dark:text-[#44B78B]" size={18} />;
  if (normalized.includes('flask')) return <SiFlask className="text-slate-900 dark:text-slate-100" size={18} />;
  if (normalized.includes('mongo')) return <SiMongodb className="text-[#15803D] dark:text-[#47A248]" size={18} />;
  if (normalized.includes('postgres')) return <SiPostgresql className="text-[#1D4ED8] dark:text-[#4169E1]" size={18} />;
  if (normalized.includes('mysql')) return <SiMysql className="text-[#1E40AF] dark:text-[#4479A1]" size={18} />;
  if (normalized.includes('docker')) return <SiDocker className="text-[#0284C7] dark:text-[#2496ED]" size={18} />;
  if (normalized.includes('jwt')) return <SiJsonwebtokens className="text-[#9333EA] dark:text-[#D63AF9]" size={18} />;
  if (normalized.includes('jest')) return <SiJest className="text-[#B91C1C] dark:text-[#C21325]" size={18} />;

  return null;
};

export default function TechIcon({ name, size = 18, className = "" }) {
  const IconNode = getTechIconComponent(name);
  if (IconNode) return IconNode;
  return <Code2 className={`text-cyan-600 dark:text-cyan-400 ${className}`} size={size} />;
}
