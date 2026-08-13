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
  SiSocketdotio,
  // 📊 DATA ANALYTICS & SCIENCE VERIFIED REACT ICONS
  SiPandas,
  SiNumpy,
  SiScipy,
  SiScikitlearn,
  SiTensorflow,
  SiPytorch,
  SiKeras,
  SiOpencv,
  SiJupyter,
  SiR,
  SiPlotly,
  SiApachespark,
  SiApachekafka,
  SiApacheairflow,
  SiApachehadoop,
  SiApacheflink,
  SiApachecassandra,
  SiSnowflake,
  SiDatabricks,
  SiGooglebigquery,
  SiGoogleanalytics,
  SiLooker,
  SiMetabase,
  SiGrafana,
  SiPrometheus,
  SiElasticsearch,
  SiKibana,
  SiClickhouse,
  SiDuckdb,
  SiSupabase,
  SiNeo4J,
  SiStreamlit,
  SiPolars,
  SiQlik
} from 'react-icons/si';
import { FaJava, FaAws, FaCss3Alt } from 'react-icons/fa';
import {
  Code2, Server, Database, ShieldCheck, Cpu, Globe, Terminal,
  Layers, Bot, Radio, Plug, Gauge, ShieldAlert, Lock, KeyRound, Sliders,
  BarChart, BarChart2, BarChart3, LineChart, PieChart, TrendingUp, ScatterChart,
  Binary, FileSpreadsheet, Activity, BrainCircuit, Sparkles
} from 'lucide-react';

// Custom SVG Icons for BI tools
export const PowerBiIcon = ({ className = "text-[#D97706] dark:text-[#F2C811]", size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <rect x="2" y="12" width="5" height="9" rx="1.5" />
    <rect x="9.5" y="7" width="5" height="14" rx="1.5" />
    <rect x="17" y="3" width="5" height="18" rx="1.5" />
  </svg>
);

export const TableauIcon = ({ className = "text-[#2563EB] dark:text-[#E97627]", size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}>
    <path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" strokeWidth="2" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
  </svg>
);

export const ExcelIcon = ({ className = "text-[#16A34A] dark:text-[#217346]", size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M8 13l4 4m0-4l-4 4" strokeWidth="2.5" />
  </svg>
);

export const DbtIcon = ({ className = "text-[#EA580C] dark:text-[#FF694B]", size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L2 12l10 10 10-10L12 2zm0 4.5l5.5 5.5-5.5 5.5-5.5-5.5L12 6.5z" />
  </svg>
);

export const AlteryxIcon = ({ className = "text-[#0284C7] dark:text-[#004B87]", size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L3 21h18L12 2zm0 5.5l5.2 11H6.8L12 7.5z" />
  </svg>
);

export const TECH_ICON_REGISTRY = [
  // ─── 📊 DATA ANALYTICS, BI & VISUALIZATION ───
  { key: 'powerbi', label: 'Power BI', icon: PowerBiIcon, color: 'text-[#D97706] dark:text-[#F2C811]' },
  { key: 'tableau', label: 'Tableau', icon: TableauIcon, color: 'text-[#2563EB] dark:text-[#E97627]' },
  { key: 'excel', label: 'MS Excel (Spreadsheets)', icon: ExcelIcon, color: 'text-[#16A34A] dark:text-[#217346]' },
  { key: 'dataanalytics', label: 'Data Analytics & KPI', icon: BarChart3, color: 'text-[#0284C7] dark:text-[#38BDF8]' },
  { key: 'datavisualization', label: 'Data Visualization', icon: LineChart, color: 'text-[#9333EA] dark:text-[#C084FC]' },
  { key: 'bi', label: 'Business Intelligence (BI)', icon: PieChart, color: 'text-[#EA580C] dark:text-[#FB923C]' },
  { key: 'statistics', label: 'Statistical Analysis / EDA', icon: ScatterChart, color: 'text-[#059669] dark:text-[#34D399]' },
  { key: 'forecasting', label: 'Predictive Forecasting', icon: TrendingUp, color: 'text-[#16A34A] dark:text-[#4ADE80]' },
  { key: 'googleanalytics', label: 'Google Analytics (GA4)', icon: SiGoogleanalytics, color: 'text-[#EA580C] dark:text-[#E37400]' },
  { key: 'looker', label: 'Looker / Looker Studio', icon: SiLooker, color: 'text-[#2563EB] dark:text-[#4285F4]' },
  { key: 'metabase', label: 'Metabase BI', icon: SiMetabase, color: 'text-[#0284C7] dark:text-[#509EE3]' },
  { key: 'qlik', label: 'Qlik Sense / QlikView', icon: SiQlik, color: 'text-[#16A34A] dark:text-[#009845]' },
  { key: 'alteryx', label: 'Alteryx', icon: AlteryxIcon, color: 'text-[#0284C7] dark:text-[#004B87]' },
  { key: 'grafana', label: 'Grafana Dashboards', icon: SiGrafana, color: 'text-[#EA580C] dark:text-[#F46800]' },
  { key: 'plotly', label: 'Plotly / Dash', icon: SiPlotly, color: 'text-[#4F46E5] dark:text-[#3F4F75]' },
  { key: 'streamlit', label: 'Streamlit Data Apps', icon: SiStreamlit, color: 'text-[#DC2626] dark:text-[#FF4B4B]' },

  // ─── 🧬 DATA SCIENCE & PYTHON LIBRARIES ───
  { key: 'pandas', label: 'Pandas (DataFrames)', icon: SiPandas, color: 'text-[#4338CA] dark:text-[#150458]' },
  { key: 'numpy', label: 'NumPy', icon: SiNumpy, color: 'text-[#0284C7] dark:text-[#4DABCF]' },
  { key: 'scipy', label: 'SciPy', icon: SiScipy, color: 'text-[#1D4ED8] dark:text-[#0054A6]' },
  { key: 'scikit', label: 'Scikit-Learn (ML)', icon: SiScikitlearn, color: 'text-[#EA580C] dark:text-[#F7931E]' },
  { key: 'polars', label: 'Polars (Fast DataFrames)', icon: SiPolars, color: 'text-[#0284C7] dark:text-[#CD792C]' },
  { key: 'jupyter', label: 'Jupyter Notebooks', icon: SiJupyter, color: 'text-[#EA580C] dark:text-[#F37626]' },
  { key: 'rlang', label: 'R (Data Analytics)', icon: SiR, color: 'text-[#1D4ED8] dark:text-[#276DC3]' },

  // ─── 🤖 MACHINE LEARNING & AI ───
  { key: 'tensorflow', label: 'TensorFlow', icon: SiTensorflow, color: 'text-[#EA580C] dark:text-[#FF6F00]' },
  { key: 'pytorch', label: 'PyTorch', icon: SiPytorch, color: 'text-[#DC2626] dark:text-[#EE4C2C]' },
  { key: 'keras', label: 'Keras', icon: SiKeras, color: 'text-[#B91C1C] dark:text-[#D00000]' },
  { key: 'opencv', label: 'OpenCV (Vision)', icon: SiOpencv, color: 'text-[#16A34A] dark:text-[#5C3EE8]' },
  { key: 'deeplearning', label: 'Deep Learning / Neural Nets', icon: BrainCircuit, color: 'text-[#7C3AED] dark:text-[#A78BFA]' },
  { key: 'ai', label: 'AI & Machine Learning', icon: Bot, color: 'text-[#059669] dark:text-[#10A37F]' },

  // ─── ⚡ BIG DATA & DATA WAREHOUSING ───
  { key: 'spark', label: 'Apache Spark / PySpark', icon: SiApachespark, color: 'text-[#EA580C] dark:text-[#E25A1C]' },
  { key: 'kafka', label: 'Apache Kafka', icon: SiApachekafka, color: 'text-slate-900 dark:text-white' },
  { key: 'airflow', label: 'Apache Airflow (ETL/Pipelines)', icon: SiApacheairflow, color: 'text-[#0D9488] dark:text-[#017CEE]' },
  { key: 'hadoop', label: 'Apache Hadoop', icon: SiApachehadoop, color: 'text-[#D97706] dark:text-[#FF6600]' },
  { key: 'flink', label: 'Apache Flink', icon: SiApacheflink, color: 'text-[#DC2626] dark:text-[#E6526F]' },
  { key: 'dbt', label: 'dbt (Data Build Tool)', icon: DbtIcon, color: 'text-[#EA580C] dark:text-[#FF694B]' },
  { key: 'snowflake', label: 'Snowflake (Data Warehouse)', icon: SiSnowflake, color: 'text-[#0284C7] dark:text-[#29B5E8]' },
  { key: 'databricks', label: 'Databricks (Lakehouse)', icon: SiDatabricks, color: 'text-[#DC2626] dark:text-[#FF3621]' },
  { key: 'bigquery', label: 'Google BigQuery', icon: SiGooglebigquery, color: 'text-[#2563EB] dark:text-[#669DF6]' },
  { key: 'clickhouse', label: 'ClickHouse (OLAP)', icon: SiClickhouse, color: 'text-[#D97706] dark:text-[#FFCC01]' },
  { key: 'duckdb', label: 'DuckDB', icon: SiDuckdb, color: 'text-[#D97706] dark:text-[#FFF000]' },
  { key: 'elasticsearch', label: 'Elasticsearch (ELK)', icon: SiElasticsearch, color: 'text-[#059669] dark:text-[#005571]' },
  { key: 'kibana', label: 'Kibana', icon: SiKibana, color: 'text-[#DB2777] dark:text-[#F04E98]' },
  { key: 'cassandra', label: 'Apache Cassandra', icon: SiApachecassandra, color: 'text-[#0284C7] dark:text-[#1287B1]' },
  { key: 'neo4j', label: 'Neo4j (Graph Data)', icon: SiNeo4J, color: 'text-[#0284C7] dark:text-[#008CC1]' },
  { key: 'prometheus', label: 'Prometheus', icon: SiPrometheus, color: 'text-[#EA580C] dark:text-[#E6522C]' },
  { key: 'supabase', label: 'Supabase', icon: SiSupabase, color: 'text-[#059669] dark:text-[#3ECF8E]' },

  // ─── 💻 FRONTEND & UI ───
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
  { key: 'angular', label: 'Angular', icon: SiAngular, color: 'text-[#DC2626] dark:text-[#DD0031]' },
  { key: 'svelte', label: 'Svelte', icon: SiSvelte, color: 'text-[#EA580C] dark:text-[#FF3E00]' },

  // ─── 📡 REALTIME & MESSAGING ───
  { key: 'socketio', label: 'Socket.IO', icon: SiSocketdotio, color: 'text-slate-900 dark:text-white' },
  { key: 'websocket', label: 'WebSockets (WS)', icon: Radio, color: 'text-[#0284C7] dark:text-[#38BDF8]' },
  { key: 'rabbitmq', label: 'RabbitMQ', icon: SiRabbitmq, color: 'text-[#EA580C] dark:text-[#FF6600]' },

  // ─── ⚙️ BACKEND & CORE ───
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

  // ─── 🗄️ DATABASES & ORM ───
  { key: 'mongodb', label: 'MongoDB', icon: SiMongodb, color: 'text-[#15803D] dark:text-[#47A248]' },
  { key: 'postgresql', label: 'PostgreSQL', icon: SiPostgresql, color: 'text-[#1D4ED8] dark:text-[#4169E1]' },
  { key: 'mysql', label: 'MySQL', icon: SiMysql, color: 'text-[#1E40AF] dark:text-[#4479A1]' },
  { key: 'redis', label: 'Redis / Caching', icon: SiRedis, color: 'text-[#DC2626] dark:text-[#DC382D]' },
  { key: 'prisma', label: 'Prisma ORM', icon: SiPrisma, color: 'text-slate-900 dark:text-white' },

  // ─── 🚀 DEVOPS & CLOUD ───
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

  // ─── 🛡️ SECURITY & TESTING ───
  { key: 'ratelimit', label: 'Rate Limiting', icon: Gauge, color: 'text-[#D97706] dark:text-[#F59E0B]' },
  { key: 'jwt', label: 'JWT (JSON Web Token)', icon: SiJsonwebtokens, color: 'text-[#9333EA] dark:text-[#D63AF9]' },
  { key: 'auth0', label: 'OAuth / Passkey / Auth', icon: SiAuth0, color: 'text-[#EA580C] dark:text-[#EB5424]' },
  { key: 'security', label: 'Security & OWASP', icon: ShieldAlert, color: 'text-[#DC2626] dark:text-[#EF4444]' },
  { key: 'encryption', label: 'Encryption & Hashing', icon: Lock, color: 'text-[#7C3AED] dark:text-[#8B5CF6]' },
  { key: 'cors', label: 'CORS & Middleware', icon: Sliders, color: 'text-[#0284C7] dark:text-[#06B6D4]' },
  { key: 'jest', label: 'Jest Unit Testing', icon: SiJest, color: 'text-[#B91C1C] dark:text-[#C21325]' },
  { key: 'testinglibrary', label: 'React Testing Library', icon: SiTestinglibrary, color: 'text-[#DC2626] dark:text-[#E33332]' },
  { key: 'systemdesign', label: 'System Design', icon: Layers, color: 'text-[#0284C7] dark:text-[#38BDF8]' }
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

  // 3. Strict Keyword Match
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

  // ─── Data Analytics & BI Keyword Fallbacks ───
  if (normalized.includes('powerbi') || normalized.includes('pbi')) return <SiPowerbi className="text-[#D97706] dark:text-[#F2C811]" size={18} />;
  if (normalized.includes('tableau')) return <SiTableau className="text-[#2563EB] dark:text-[#E97627]" size={18} />;
  if (normalized.includes('excel') || normalized.includes('spreadsheet')) return <SiMicrosoftexcel className="text-[#16A34A] dark:text-[#217346]" size={18} />;
  if (normalized.includes('pandas')) return <SiPandas className="text-[#4338CA] dark:text-[#150458]" size={18} />;
  if (normalized.includes('numpy')) return <SiNumpy className="text-[#0284C7] dark:text-[#4DABCF]" size={18} />;
  if (normalized.includes('scikit') || normalized.includes('sklearn')) return <SiScikitlearn className="text-[#EA580C] dark:text-[#F7931E]" size={18} />;
  if (normalized.includes('spark') || normalized.includes('pyspark')) return <SiApachespark className="text-[#EA580C] dark:text-[#E25A1C]" size={18} />;
  if (normalized.includes('kafka')) return <SiApachekafka className="text-slate-900 dark:text-white" size={18} />;
  if (normalized.includes('airflow')) return <SiApacheairflow className="text-[#0D9488] dark:text-[#017CEE]" size={18} />;
  if (normalized.includes('hadoop')) return <SiApachehadoop className="text-[#D97706] dark:text-[#FF6600]" size={18} />;
  if (normalized.includes('snowflake')) return <SiSnowflake className="text-[#0284C7] dark:text-[#29B5E8]" size={18} />;
  if (normalized.includes('databricks')) return <SiDatabricks className="text-[#DC2626] dark:text-[#FF3621]" size={18} />;
  if (normalized.includes('bigquery')) return <SiGooglebigquery className="text-[#2563EB] dark:text-[#669DF6]" size={18} />;
  if (normalized.includes('dbt')) return <SiDbt className="text-[#EA580C] dark:text-[#FF694B]" size={18} />;
  if (normalized.includes('looker')) return <SiLooker className="text-[#2563EB] dark:text-[#4285F4]" size={18} />;
  if (normalized.includes('metabase')) return <SiMetabase className="text-[#0284C7] dark:text-[#509EE3]" size={18} />;
  if (normalized.includes('jupyter')) return <SiJupyter className="text-[#EA580C] dark:text-[#F37626]" size={18} />;
  if (normalized.includes('plotly') || normalized.includes('dash')) return <SiPlotly className="text-[#4F46E5] dark:text-[#3F4F75]" size={18} />;
  if (normalized.includes('streamlit')) return <SiStreamlit className="text-[#DC2626] dark:text-[#FF4B4B]" size={18} />;
  if (normalized.includes('polars')) return <SiPolars className="text-[#0284C7] dark:text-[#CD792C]" size={18} />;
  if (normalized.includes('tensorflow') || normalized.includes('tf')) return <SiTensorflow className="text-[#EA580C] dark:text-[#FF6F00]" size={18} />;
  if (normalized.includes('pytorch')) return <SiPytorch className="text-[#DC2626] dark:text-[#EE4C2C]" size={18} />;
  if (normalized.includes('keras')) return <SiKeras className="text-[#B91C1C] dark:text-[#D00000]" size={18} />;
  if (normalized.includes('opencv')) return <SiOpencv className="text-[#16A34A] dark:text-[#5C3EE8]" size={18} />;
  if (normalized.includes('clickhouse')) return <SiClickhouse className="text-[#D97706] dark:text-[#FFCC01]" size={18} />;
  if (normalized.includes('duckdb')) return <SiDuckdb className="text-[#D97706] dark:text-[#FFF000]" size={18} />;
  if (normalized.includes('elasticsearch') || normalized.includes('elk')) return <SiElasticsearch className="text-[#059669] dark:text-[#005571]" size={18} />;
  if (normalized.includes('grafana')) return <SiGrafana className="text-[#EA580C] dark:text-[#F46800]" size={18} />;
  if (normalized.includes('analytics') || normalized.includes('metric')) return <BarChart3 className="text-[#0284C7] dark:text-[#38BDF8]" size={18} />;
  if (normalized.includes('visualization') || normalized.includes('chart')) return <LineChart className="text-[#9333EA] dark:text-[#C084FC]" size={18} />;
  if (normalized.includes('statistics') || normalized.includes('eda')) return <ScatterChart className="text-[#059669] dark:text-[#34D399]" size={18} />;
  if (normalized.includes('bi') || normalized.includes('intelligence')) return <PieChart className="text-[#EA580C] dark:text-[#FB923C]" size={18} />;

  // General Web & Backend Fallbacks
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
