import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { api, API_BASE_URL, aboutApi, projectsApi, skillsApi, experienceApi, contactApi } from '../services';

const PortfolioContext = createContext();

export const upgradeHttpUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') && !trimmed.includes('localhost') && !trimmed.includes('127.0.0.1')) {
    return trimmed.replace(/^http:\/\//i, 'https://');
  }
  return trimmed;
};

export const sanitizePortfolioUrls = (data) => {
  if (!data || typeof data !== 'object') return data;
  const clone = { ...data };
  if (clone.profile) {
    clone.profile = {
      ...clone.profile,
      resumeDownloadUrl: upgradeHttpUrl(clone.profile.resumeDownloadUrl),
      avatarLight: upgradeHttpUrl(clone.profile.avatarLight),
      avatarDark: upgradeHttpUrl(clone.profile.avatarDark)
    };
  }
  if (Array.isArray(clone.projects)) {
    clone.projects = clone.projects.map(p => ({
      ...p,
      image: upgradeHttpUrl(p.image),
      demo: upgradeHttpUrl(p.demo),
      github: upgradeHttpUrl(p.github)
    }));
  }
  return clone;
};

const initialDefaultData = {
  profile: {
    name: "Datta Dhongade",
    role: "Full Stack Developer",
    location: "Nashik, India",
    email: "dattadhongade@gmail.com",
    bioParagraph1: "Hello! I'm Datta Dhongade, a Full Stack Software Engineer based in Nashik, India. I specialize in building robust, performant web applications with clean frontend user interfaces and scalable backend architectures using React.js, Node.js, Express.js, MongoDB, and MySQL.",
    bioParagraph2: "Currently working at Integral Development Corp., I have contributed to production-level features including Passkey / WebAuthn authentication, GraphQL APIs, background cron workflows, and system monitoring telemetry.",
    available: true,
    avatarLight: "",
    avatarDark: "",
    resumeDownloadUrl: "#download",
    socialLinks: [
      { name: "GitHub", href: "https://github.com", color: "hover:text-cyan-500" },
      { name: "LinkedIn", href: "https://linkedin.com", color: "hover:text-blue-500" },
      { name: "LeetCode", href: "https://leetcode.com", color: "hover:text-amber-500" },
      { name: "Instagram", href: "https://instagram.com", color: "hover:text-pink-500" }
    ]
  },
  stats: [
    { id: 1, label: "Years Coding", value: "2+", color: "text-cyan-500 dark:text-cyan-400", border: "border-cyan-500/20" },
    { id: 2, label: "Built Projects", value: "7+", color: "text-indigo-500 dark:text-indigo-400", border: "border-indigo-500/20" },
    { id: 3, label: "Master's CGPA", value: "8.34", color: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/20" },
    { id: 4, label: "Production Delivery", value: "100%", color: "text-purple-600 dark:text-purple-400", border: "border-purple-500/20" }
  ],
  techPills: [
    "React.js", "Node.js", "TypeScript", "Express.js", "Tailwind CSS",
    "GraphQL", "MongoDB", "MySQL", "Docker", "RabbitMQ", "Passkey / WebAuthn", "Git"
  ],
  capabilities: [
    {
      id: 1,
      iconName: "Code2",
      title: "Front-End Architecture",
      tagline: "Fluid, Responsive & Accessible",
      description: "Crafting pixel-perfect, accessible web applications using React.js, TypeScript, Next.js, and modern CSS architectures with intuitive user experience.",
      accent: "hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.12)]",
      glow: "bg-cyan-500/10",
      iconColor: "text-cyan-600 dark:text-cyan-400"
    },
    {
      id: 2,
      iconName: "Server",
      title: "Back-End & Microservices",
      tagline: "Scalable APIs & Systems",
      description: "Designing reliable RESTful & GraphQL backend services with Node.js, Express, and RabbitMQ, engineered for speed, concurrency, and uptime.",
      accent: "hover:border-indigo-500/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.12)]",
      glow: "bg-indigo-500/10",
      iconColor: "text-indigo-600 dark:text-indigo-400"
    },
    {
      id: 3,
      iconName: "Database",
      title: "Database Engineering",
      tagline: "Relational & NoSQL Datastores",
      description: "Optimizing schemas, indexing, and complex transactional queries across PostgreSQL, MySQL, and MongoDB with Redis caching strategies.",
      accent: "hover:border-teal-500/40 hover:shadow-[0_0_20px_rgba(20,184,166,0.12)]",
      glow: "bg-teal-500/10",
      iconColor: "text-teal-600 dark:text-teal-400"
    },
    {
      id: 4,
      iconName: "ShieldCheck",
      title: "Auth, Security & DevOps",
      tagline: "Passkey, Docker & CI/CD",
      description: "Implementing passwordless Passkey/WebAuthn login, JWT authentication, containerization with Docker, Alertmanager monitoring, and automated pipelines.",
      accent: "hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.12)]",
      glow: "bg-purple-500/10",
      iconColor: "text-purple-600 dark:text-purple-400"
    }
  ],
  lifestyle: [
    { id: 1, iconName: "Dumbbell", title: "Fitness & Gym", subtitle: "Consistency & strength", iconColor: "text-amber-600 dark:text-amber-400", glow: "bg-amber-500/10" },
    { id: 2, iconName: "Mountain", title: "Sahyadri Trekking", subtitle: "Nature hikes & exploration", iconColor: "text-emerald-600 dark:text-emerald-400", glow: "bg-emerald-500/10" },
    { id: 3, iconName: "Film", title: "Cinema Enthusiast", subtitle: "Storytelling & sci-fi films", iconColor: "text-purple-600 dark:text-purple-400", glow: "bg-purple-500/10" }
  ],
  projectCategories: ["All", "Full Stack", "AI / SaaS", "Frontend", "Extensions"],
  projects: [
    {
      id: 1,
      title: "PDF-Chat SaaS Platform",
      category: "AI / SaaS",
      description: "AI-driven document intelligence platform allowing users to upload multi-page PDFs and converse with them in real-time via vector embeddings & streaming responses.",
      tags: ["React", "TypeScript", "LangChain", "OpenAI", "Node.js", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1629654291663-b91ad427698f?q=80&w=800&auto=format&fit=crop",
      github: "https://github.com",
      demo: "https://demo.com",
      highlights: [
        "Vector embeddings and similarity search for instant document queries",
        "Streaming SSE responses with markdown math & syntax rendering",
        "Tiered subscription paywall and document usage quotas"
      ],
      status: "Published"
    },
    {
      id: 2,
      title: "Realtime Video Conferencing",
      category: "Full Stack",
      description: "High-performance multi-peer video calling room built with WebRTC, Socket.io, and Node.js featuring screen sharing, chat, and room encryption.",
      tags: ["React", "WebRTC", "Socket.io", "Node.js", "Express", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1515549832467-8783363e19b6?q=80&w=800&auto=format&fit=crop",
      github: "https://github.com",
      demo: "https://demo.com",
      highlights: [
        "Peer-to-peer low latency mesh architecture with SFU fallback",
        "Integrated live in-call text chat, emoji reactions, and screen cast",
        "Audio/Video track toggle with background blur canvas filter"
      ],
      status: "Published"
    },
    {
      id: 3,
      title: "High-Speed Search Engine Clone",
      category: "Frontend",
      description: "Responsive Google search engine replica with live autocomplete, search history, voice query simulation, and Google Search API integration.",
      tags: ["React.js", "Tailwind CSS", "Context API", "Search API", "Vite"],
      image: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=800&auto=format&fit=crop",
      github: "https://github.com",
      demo: "https://demo.com",
      highlights: [
        "Instant debounced search suggestions with keyboard traversal",
        "Image, News, Video, and Web search tab filters",
        "Full dark & light theme persistence with responsive layout"
      ],
      status: "Published"
    },
    {
      id: 4,
      title: "Full-Stack E-Commerce Hub",
      category: "Full Stack",
      description: "Modern MERN e-commerce application with product filtering, cart state management, Stripe payment checkout, and full admin order CRM.",
      tags: ["MongoDB", "Express.js", "React.js", "Node.js", "Stripe API", "Redux"],
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop",
      github: "https://github.com",
      demo: "https://demo.com",
      highlights: [
        "JWT authentication with role-based access control (Buyer vs Admin)",
        "Dynamic price calculation, discount codes, and order lifecycle tracking",
        "Stripe payment intent integration with webhook listeners"
      ],
      status: "Published"
    },
    {
      id: 5,
      title: "Enterprise Analytics Dashboard",
      category: "Frontend",
      description: "Comprehensive SaaS metrics analytics dashboard displaying financial KPIs, user retention charts, heatmaps, and customizable data widgets.",
      tags: ["React", "Chart.js", "Tailwind CSS", "TypeScript", "Lucide Icons"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      github: "https://github.com",
      demo: "https://demo.com",
      highlights: [
        "Interactive time-range filters (7D, 30D, 1Y) with animated transitions",
        "CSV & PDF metrics export utilities with client-side report generator",
        "Granular data tables with sorting, pagination, and search filters"
      ],
      status: "Published"
    },
    {
      id: 6,
      title: "On-Demand Food Ordering Web App",
      category: "Full Stack",
      description: "Feature-rich food ordering platform featuring restaurant discovery, menu customization, cart checkout, and real-time simulated order status tracking.",
      tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop",
      github: "https://github.com",
      demo: "https://demo.com",
      highlights: [
        "Location-based restaurant listing with cuisine filtering",
        "Interactive dish customizer (addons, spice level, special notes)",
        "Live order progression step timeline"
      ],
      status: "Published"
    },
    {
      id: 7,
      title: "Smart Tab Saver Extension",
      category: "Extensions",
      description: "Browser productivity extension designed to save open tab sessions into organized workspaces, reducing memory consumption by up to 80%.",
      tags: ["JavaScript", "Chrome Extensions API", "Tailwind CSS", "Storage API"],
      image: "https://images.unsplash.com/photo-1614064641913-6b110b106297?q=80&w=800&auto=format&fit=crop",
      github: "https://github.com",
      demo: "https://demo.com",
      highlights: [
        "One-click save current window session with custom workspace tags",
        "Export & import tab collections in JSON format for sync across machines",
        "Searchable tab history with instant restore controls"
      ],
      status: "Published"
    }
  ],
  educations: [
    {
      id: 1,
      degree: "Master of Business Administration (Information Technology)",
      institution: "MVP's IMRT, Nashik",
      duration: "2024 - 2026",
      cgpa: "8.34",
      description: "Focused on enterprise software engineering, full-stack web architectures, distributed systems, and AI-assisted workflows. Applied research with production internships and rigorous project deliveries."
    },
    {
      id: 2,
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Savitribai Phule Pune University",
      duration: "2021 - 2024",
      cgpa: "8.50",
      description: "Core computer science fundamentals, data structures, algorithms, database management systems, and object-oriented programming."
    }
  ],
  skills: {
    Frontend: [
      { name: "React.js", progress: 92, level: "Expert" },
      { name: "TypeScript", progress: 88, level: "Advanced" },
      { name: "JavaScript (ES6+)", progress: 95, level: "Mastery" },
      { name: "Tailwind CSS", progress: 94, level: "Expert" },
      { name: "Next.js", progress: 82, level: "Advanced" },
      { name: "Material UI / Shadcn", progress: 85, level: "Advanced" },
    ],
    Backend: [
      { name: "Node.js", progress: 90, level: "Expert" },
      { name: "Express.js", progress: 92, level: "Expert" },
      { name: "GraphQL APIs", progress: 84, level: "Advanced" },
      { name: "RESTful Architecture", progress: 95, level: "Mastery" },
      { name: "WebSockets / Socket.io", progress: 80, level: "Proficient" },
    ],
    "AI / ML": [
      { name: "OpenAI API Integration", progress: 88, level: "Advanced" },
      { name: "LangChain", progress: 80, level: "Proficient" },
      { name: "Vector Embeddings & RAG", progress: 82, level: "Advanced" },
      { name: "Prompt Engineering", progress: 90, level: "Expert" },
    ],
    Languages: [
      { name: "JavaScript", progress: 95, level: "Mastery" },
      { name: "TypeScript", progress: 88, level: "Advanced" },
      { name: "SQL", progress: 86, level: "Advanced" },
      { name: "Python (Basics)", progress: 75, level: "Proficient" },
      { name: "C++", progress: 78, level: "Proficient" },
    ],
    "Data Analytics & BI": [
      { name: "Power BI", progress: 90, level: "Expert" },
      { name: "Tableau", progress: 85, level: "Advanced" },
      { name: "Pandas & NumPy", progress: 88, level: "Advanced" },
      { name: "MS Excel (Advanced Analytics)", progress: 92, level: "Expert" },
      { name: "Apache Spark / PySpark", progress: 80, level: "Proficient" },
      { name: "Google Analytics & KPI", progress: 86, level: "Advanced" },
    ],
    "DevOps & Tools": [
      { name: "Docker & Containers", progress: 82, level: "Advanced" },
      { name: "Git & GitHub Workflows", progress: 94, level: "Mastery" },
      { name: "GitHub Actions (CI/CD)", progress: 80, level: "Proficient" },
      { name: "Postman & API Testing", progress: 92, level: "Expert" },
      { name: "Vite / Build Tooling", progress: 90, level: "Expert" },
    ],
    "Auth & Security": [
      { name: "Passkey / WebAuthn", progress: 88, level: "Advanced" },
      { name: "JWT & OAuth 2.0", progress: 92, level: "Expert" },
      { name: "Helmet & XSS Mitigation", progress: 85, level: "Advanced" },
      { name: "Rate Limiting & HPP", progress: 88, level: "Advanced" },
    ],
    "Infra / Architecture": [
      { name: "MongoDB & Mongoose", progress: 90, level: "Expert" },
      { name: "MySQL Database", progress: 86, level: "Advanced" },
      { name: "RabbitMQ Message Queues", progress: 80, level: "Proficient" },
      { name: "Alertmanager & Cronicle", progress: 82, level: "Advanced" },
    ],
    "Testing / Quality": [
      { name: "API Unit & Integration Tests", progress: 85, level: "Advanced" },
      { name: "React Testing Library", progress: 80, level: "Proficient" },
      { name: "Oxlint / ESLint Rules", progress: 90, level: "Expert" },
    ]
  },
  certifications: [
    { id: 1, title: "Full Stack Web Development", issuer: "Enterprise Project Immersion", year: "2025" },
    { id: 2, title: "Advanced React & State Architecture", issuer: "Modern Frontend Standards", year: "2024" },
    { id: 3, title: "Database Systems & Schema Optimization", issuer: "IMRT Nashik Academics", year: "2024" },
  ],
  experiences: [
    {
      id: 1,
      company: "Integral Development Corp.",
      location: "Nashik, India (Hybrid)",
      duration: "Apr 2025 - Present",
      badge: "Current Employer",
      badgeColor: "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30",
      roles: [
        {
          title: "Software Engineer",
          type: "Full-time",
          duration: "Jul 2025 - Present",
          description: "Leading development of full-stack modules, microservices integration, and scalable UI architectures for production web applications.",
          achievements: [
            "Engineered resilient React component architectures integrated with backend GraphQL schemas",
            "Optimized API query latency by implementing Redis key-value caching layers",
            "Collaborated in agile sprints with cross-functional product and DevOps teams"
          ],
          technologies: ["React.js", "TypeScript", "Node.js", "GraphQL", "Docker", "Redis"]
        },
        {
          title: "Full-Stack Developer Intern",
          type: "Internship",
          duration: "Apr 2025 - Jul 2025 · 4 mos",
          description: "Contributed to core authentication security and automated system operations across enterprise web applications.",
          achievements: [
            "Implemented passwordless Passkey / WebAuthn authentication flow with cryptographic validation",
            "Engineered GraphQL APIs and integrated backend endpoints with Express & MySQL",
            "Configured system monitoring alerts with Alertmanager and Cronicle for automated jobs"
          ],
          technologies: ["React", "Express", "MySQL", "Passkey / WebAuthn", "Alertmanager", "Cronicle"]
        }
      ]
    },
    {
      id: 2,
      company: "Sociante",
      location: "Nashik, India",
      duration: "Oct 2024 - Mar 2025 · 6 mos",
      badge: "Completed",
      badgeColor: "bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30",
      roles: [
        {
          title: "Project Intern (Backend & Architecture Lead)",
          type: "Internship",
          duration: "Oct 2024 - Mar 2025 · 6 mos",
          description: "Spearheaded backend architecture and distributed asynchronous event processing for smart city and parking solutions.",
          achievements: [
            "Architected user authentication, access permission matrix, and transaction logging modules",
            "Integrated RabbitMQ message brokers for decoupled, high-throughput asynchronous operations",
            "Designed normalized database models in MySQL ensuring ACID compliance for payments"
          ],
          technologies: ["Node.js", "Express.js", "RabbitMQ", "MySQL", "JWT Auth", "Git"]
        }
      ]
    }
  ],
  messages: [
    {
      id: 1,
      firstName: "Aarav",
      lastName: "Sharma",
      mobileNumber: "+91 9876543210",
      email: "aarav.sharma@techcorp.io",
      subject: "Full-Stack Engineer Opportunity",
      description: "Hi Datta, we reviewed your SaaS projects and were very impressed with your WebRTC and GraphQL work. We'd love to schedule an introductory call.",
      time: "2 hours ago",
      unread: true
    }
  ]
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(initialDefaultData);
  const [backendConnected, setBackendConnected] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('admin_token'));
  });
  const [adminUser, setAdminUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Verify Admin JWT token session on mount
  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        setIsAdminAuthenticated(false);
        setAdminUser(null);
        setIsCheckingAuth(false);
        return;
      }

      try {
        const res = await api.get('/auth/me');
        if (res.success && res.user) {
          setIsAdminAuthenticated(true);
          setAdminUser(res.user);
        } else {
          localStorage.removeItem('admin_token');
          setIsAdminAuthenticated(false);
          setAdminUser(null);
        }
      } catch (err) {
        if (!localStorage.getItem('admin_token')) {
          setIsAdminAuthenticated(false);
          setAdminUser(null);
        }
      } finally {
        setIsCheckingAuth(false);
      }
    };

    verifySession();
  }, []);



  const loginAdmin = (token, user) => {
    if (token) localStorage.setItem('admin_token', token);
    setIsAdminAuthenticated(true);
    if (user) setAdminUser(user);
  };

  const logoutAdmin = () => {
    localStorage.removeItem('admin_token');
    setIsAdminAuthenticated(false);
    setAdminUser(null);
  };

  // Fetch initial data from backend API on mount — backend ALWAYS wins over localStorage
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/portfolio`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && Object.keys(json.data).length > 0) {
            const backendData = sanitizePortfolioUrls(json.data);

            // Normalize skills: if any category values are strings/corrupt, fall back to initialDefaultData skills
            let skills = backendData.skills || {};
            const hasValidSkills = Object.values(skills).some(v => Array.isArray(v) && v.length > 0);
            if (!hasValidSkills) {
              skills = initialDefaultData.skills;
            }

            setData({
              ...initialDefaultData,
              ...backendData,
              skills,
              educations: (backendData.educations?.length > 0) ? backendData.educations : initialDefaultData.educations,
              experiences: (backendData.experiences?.length > 0) ? backendData.experiences : initialDefaultData.experiences,
            });
            setBackendConnected(true);
            // Clear stale localStorage so we always use fresh backend data
            localStorage.removeItem('portfolio_master_data_v3');
          }
        } else {
          // Backend failed — try localStorage fallback
          try {
            const saved = localStorage.getItem('portfolio_master_data_v3');
            if (saved) setData(sanitizePortfolioUrls(JSON.parse(saved)));
          } catch (e) { /* ignore */ }
        }
      } catch (err) {
        console.warn('Backend API not reachable, running in offline/localStorage mode', err);
        try {
          const saved = localStorage.getItem('portfolio_master_data_v3');
          if (saved) setData(sanitizePortfolioUrls(JSON.parse(saved)));
        } catch (e) { /* ignore */ }
      } finally {
        setDataLoaded(true);
      }
    };
    fetchBackendData();
  }, []);

  // Sync state changes with localStorage and Backend API (only after initial backend data has loaded)
  useEffect(() => {
    if (!dataLoaded) return;

    try {
      localStorage.setItem("portfolio_master_data_v3", JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save portfolio data to localStorage", e);
    }

    const token = localStorage.getItem('admin_token');
    if (!token) return;

    // Debounced sync to backend API
    const timeout = setTimeout(() => {
      fetch(`${API_BASE_URL}/portfolio`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          if (res.ok) {
            setBackendConnected(prev => prev ? prev : true);
          }
        })
        .catch(() => setBackendConnected(prev => !prev ? prev : false));
    }, 800);

    return () => clearTimeout(timeout);
  }, [data, dataLoaded]);

  // Image Upload Method (Direct File -> Multipart or Base64 fallback)
  const uploadImage = async (file) => {
    try {
      const token = localStorage.getItem('admin_token');
      const formData = new FormData();
      formData.append('image', file);
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers,
        body: formData
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.url) {
          return upgradeHttpUrl(json.url);
        }
      }
    } catch (err) {
      console.warn("Backend upload failed, falling back to base64", err);
    }

    // Fallback: FileReader Base64
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  // Contact Form Submission Method
  const sendContactForm = async (contactPayload) => {
    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactPayload)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setData((prev) => ({
            ...prev,
            messages: [json.data, ...(prev.messages || [])]
          }));
          return { success: true, message: json.message };
        }
      }
    } catch (err) {
      console.warn("Backend contact failed, saving locally", err);
    }

    // Local Fallback
    const localMsg = {
      id: Date.now(),
      firstName: contactPayload.firstName,
      lastName: contactPayload.lastName || '',
      mobileNumber: contactPayload.mobileNumber || '',
      email: contactPayload.email,
      subject: `Contact inquiry from ${contactPayload.firstName} ${contactPayload.lastName || ''}`.trim(),
      description: contactPayload.description,
      time: 'Just now',
      unread: true
    };
    setData((prev) => ({
      ...prev,
      messages: [localMsg, ...(prev.messages || [])]
    }));
    return { success: true, message: 'Message sent and saved!' };
  };

  // 1. Profile methods
  const updateProfile = (newProfile) => {
    setData((prev) => {
      const updatedProfile = { ...prev.profile, ...newProfile };
      const updated = {
        ...prev,
        profile: updatedProfile
      };

      try {
        localStorage.setItem("portfolio_master_data_v3", JSON.stringify(updated));
      } catch (e) { }

      const token = localStorage.getItem('admin_token');
      if (token) {
        fetch(`${API_BASE_URL}/portfolio`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updated)
        })
          .then(res => {
            if (res.ok) setBackendConnected(true);
          })
          .catch(err => console.error("Profile sync failed:", err));
      }

      return updated;
    });
  };

  // 2. Stats methods
  const addStat = (stat) => {
    setData((prev) => ({
      ...prev,
      stats: [...prev.stats, { id: Date.now(), ...stat }]
    }));
  };

  const updateStat = (id, updatedStat) => {
    setData((prev) => ({
      ...prev,
      stats: prev.stats.map((s) => (s.id === id ? { ...s, ...updatedStat } : s))
    }));
  };

  const deleteStat = (id) => {
    setData((prev) => ({
      ...prev,
      stats: prev.stats.filter((s) => s.id !== id)
    }));
  };

  // 3. Tech Pills methods
  const addTechPill = (pill) => {
    if (!pill.trim()) return;
    setData((prev) => ({
      ...prev,
      techPills: prev.techPills.includes(pill.trim()) ? prev.techPills : [...prev.techPills, pill.trim()]
    }));
  };

  const deleteTechPill = (pill) => {
    setData((prev) => ({
      ...prev,
      techPills: prev.techPills.filter((p) => p !== pill)
    }));
  };

  // 4. Capabilities methods
  const addCapability = (cap) => {
    setData((prev) => ({
      ...prev,
      capabilities: [...prev.capabilities, { id: Date.now(), ...cap }]
    }));
  };

  const deleteCapability = (id) => {
    setData((prev) => ({
      ...prev,
      capabilities: prev.capabilities.filter((c) => c.id !== id)
    }));
  };

  const updateCapability = (id, updated) => {
    setData((prev) => ({
      ...prev,
      capabilities: prev.capabilities.map((c) => (c.id === id ? { ...c, ...updated } : c))
    }));
  };

  // 5. Lifestyle methods
  const addLifestyle = (item) => {
    setData((prev) => ({
      ...prev,
      lifestyle: [...prev.lifestyle, { id: Date.now(), ...item }]
    }));
  };

  const updateLifestyle = (id, updatedItem) => {
    setData((prev) => ({
      ...prev,
      lifestyle: (prev.lifestyle || []).map((l) => (l.id === id ? { ...l, ...updatedItem } : l))
    }));
  };

  const deleteLifestyle = (id) => {
    setData((prev) => ({
      ...prev,
      lifestyle: prev.lifestyle.filter((l) => l.id !== id)
    }));
  };

  // 6. Project methods (Full CRUD + Direct Image)
  const addProject = (project) => {
    setData((prev) => ({
      ...prev,
      projects: [{ id: Date.now(), status: "Published", highlights: [], tags: [], ...project }, ...prev.projects]
    }));
  };

  const updateProject = (id, updatedProject) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updatedProject } : p))
    }));
  };

  const deleteProject = (id) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
  };

  const reorderProjects = (fromIndex, toIndex) => {
    setData((prev) => {
      const list = [...(prev.projects || [])];
      if (fromIndex < 0 || toIndex < 0 || fromIndex >= list.length || toIndex >= list.length) return prev;
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { ...prev, projects: list };
    });
  };

  const moveProject = (index, direction) => {
    reorderProjects(index, index + direction);
  };

  const reorderCapabilities = (fromIndex, toIndex) => {
    setData((prev) => {
      const list = [...(prev.capabilities || [])];
      if (fromIndex < 0 || toIndex < 0 || fromIndex >= list.length || toIndex >= list.length) return prev;
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { ...prev, capabilities: list };
    });
  };

  const moveCapability = (index, direction) => {
    reorderCapabilities(index, index + direction);
  };

  const reorderLifestyle = (fromIndex, toIndex) => {
    setData((prev) => {
      const list = [...(prev.lifestyle || [])];
      if (fromIndex < 0 || toIndex < 0 || fromIndex >= list.length || toIndex >= list.length) return prev;
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { ...prev, lifestyle: list };
    });
  };

  const moveLifestyle = (index, direction) => {
    reorderLifestyle(index, index + direction);
  };

  const reorderEducations = (fromIndex, toIndex) => {
    setData((prev) => {
      const list = [...(prev.educations || [])];
      if (fromIndex < 0 || toIndex < 0 || fromIndex >= list.length || toIndex >= list.length) return prev;
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { ...prev, educations: list };
    });
  };

  const moveEducation = (index, direction) => {
    reorderEducations(index, index + direction);
  };

  const reorderExperiences = (fromIndex, toIndex) => {
    setData((prev) => {
      const list = [...(prev.experiences || [])];
      if (fromIndex < 0 || toIndex < 0 || fromIndex >= list.length || toIndex >= list.length) return prev;
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { ...prev, experiences: list };
    });
  };

  const moveExperience = (index, direction) => {
    reorderExperiences(index, index + direction);
  };

  const addProjectCategory = (category) => {
    if (!category.trim()) return;
    setData((prev) => ({
      ...prev,
      projectCategories: prev.projectCategories.includes(category.trim())
        ? prev.projectCategories
        : [...prev.projectCategories, category.trim()]
    }));
  };

  const updateProjectCategory = (oldCat, newCat) => {
    if (!newCat.trim()) return;
    setData((prev) => ({
      ...prev,
      projectCategories: prev.projectCategories.map((c) => (c === oldCat ? newCat.trim() : c)),
      projects: prev.projects.map((p) => (p.category === oldCat ? { ...p, category: newCat.trim() } : p))
    }));
  };

  const deleteProjectCategory = (category) => {
    if (category === 'All') return;
    setData((prev) => ({
      ...prev,
      projectCategories: prev.projectCategories.filter((c) => c !== category)
    }));
  };

  // 7. Educations methods (Multiple Educations Support)
  const addEducation = (edu) => {
    setData((prev) => ({
      ...prev,
      educations: [...(prev.educations || []), { id: Date.now(), ...edu }]
    }));
  };

  const updateEducation = (id, updatedEdu) => {
    setData((prev) => ({
      ...prev,
      educations: (prev.educations || []).map((e) => (e.id === id ? { ...e, ...updatedEdu } : e))
    }));
  };

  const deleteEducation = (id) => {
    setData((prev) => ({
      ...prev,
      educations: (prev.educations || []).filter((e) => e.id !== id)
    }));
  };

  // 8. Skill Matrix methods
  const addSkill = (category, skill) => {
    let targetCategory = category;
    let skillData = skill;

    if (typeof category === 'object' && category !== null && category.category) {
      targetCategory = category.category;
      skillData = { ...category };
      delete skillData.category;
    }

    if (!targetCategory) return;

    setData((prev) => {
      const currentList = prev.skills[targetCategory] || [];
      return {
        ...prev,
        skills: {
          ...prev.skills,
          [targetCategory]: [...currentList, skillData]
        }
      };
    });

    // Persist to DB
    skillsApi.addSkill(targetCategory, skillData).catch(console.error);
  };

  const deleteSkill = (category, index) => {
    setData((prev) => {
      const currentList = (prev.skills[category] || []).filter((_, idx) => idx !== index);
      return {
        ...prev,
        skills: {
          ...prev.skills,
          [category]: currentList
        }
      };
    });

    // Persist to DB
    skillsApi.deleteSkill(category, index).catch(console.error);
  };

  const updateSkill = (category, index, updatedSkill) => {
    setData((prev) => {
      const currentList = [...(prev.skills[category] || [])];
      if (index >= 0 && index < currentList.length) {
        currentList[index] = { ...currentList[index], ...updatedSkill };
      }
      return {
        ...prev,
        skills: {
          ...prev.skills,
          [category]: currentList
        }
      };
    });

    // Persist to DB
    skillsApi.updateSkill(category, index, updatedSkill).catch(console.error);
  };

  const addSkillCategory = (newCategory) => {
    if (!newCategory.trim()) return;
    setData((prev) => {
      if (prev.skills[newCategory.trim()]) return prev;
      return {
        ...prev,
        skills: {
          ...prev.skills,
          [newCategory.trim()]: []
        }
      };
    });

    // Persist to DB
    skillsApi.addSkillCategory(newCategory.trim()).catch(console.error);
  };

  // 9. Certifications methods
  const addCertification = (cert) => {
    setData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { id: Date.now(), ...cert }]
    }));
  };

  const deleteCertification = (id) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id)
    }));
  };

  // 10. Experience methods
  const addExperience = (exp) => {
    setData((prev) => ({
      ...prev,
      experiences: [
        {
          id: Date.now(),
          badge: "Current Employer",
          badgeColor: "bg-emerald-50 text-black dark:text-emerald-300 border-emerald-300",
          roles: [],
          ...exp
        },
        ...prev.experiences
      ]
    }));
  };

  const deleteExperience = (id) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id)
    }));
  };

  const updateExperience = (id, updated) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) => (e.id === id ? { ...e, ...updated } : e))
    }));
  };

  const addRoleToExperience = (companyId, role) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) => {
        if (e.id === companyId) {
          return {
            ...e,
            roles: [...e.roles, { technologies: [], achievements: [], ...role }]
          };
        }
        return e;
      })
    }));
  };

  const deleteRoleFromExperience = (companyId, roleIndex) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) => {
        if (e.id === companyId) {
          return {
            ...e,
            roles: e.roles.filter((_, idx) => idx !== roleIndex)
          };
        }
        return e;
      })
    }));
  };

  // 11. Messages methods
  const markMessageRead = (id) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.map((m) => (m.id === id ? { ...m, unread: false } : m))
    }));
  };

  const updateMessageRemark = (id, remark) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.map((m) =>
        m.id === id ? { ...m, remark, unread: remark === 'New' ? m.unread : false } : m
      )
    }));
  };

  const deleteMessage = (id) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.filter((m) => m.id !== id)
    }));
  };

  // 12. Reset to template defaults
  const resetToDefaults = () => {
    setData(initialDefaultData);
    localStorage.removeItem("portfolio_master_data_v3");
  };

  const contextValue = useMemo(() => ({
    ...data,
    backendConnected,
    isAdminAuthenticated,
    adminUser,
    isCheckingAuth,
    loginAdmin,
    logoutAdmin,
    uploadImage,
    sendContactForm,
    updateProfile,
    addStat,
    updateStat,
    deleteStat,
    addTechPill,
    deleteTechPill,
    addCapability,
    updateCapability,
    deleteCapability,
    addLifestyle,
    updateLifestyle,
    deleteLifestyle,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    moveProject,
    reorderCapabilities,
    moveCapability,
    reorderLifestyle,
    moveLifestyle,
    reorderEducations,
    moveEducation,
    reorderExperiences,
    moveExperience,
    addProjectCategory,
    updateProjectCategory,
    deleteProjectCategory,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkill,
    updateSkill,
    deleteSkill,
    addSkillCategory,
    addCertification,
    deleteCertification,
    addExperience,
    deleteExperience,
    updateExperience,
    addRoleToExperience,
    deleteRoleFromExperience,
    markMessageRead,
    updateMessageRemark,
    deleteMessage,
    resetToDefaults
  }), [data, backendConnected, isAdminAuthenticated, adminUser, isCheckingAuth]);

  return (
    <PortfolioContext.Provider value={contextValue}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
