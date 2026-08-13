import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Qualifications from "./pages/Qualifications";
import Skills from "./pages/Skills";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import VfxIntro from "./components/VfxIntro";
import { Experience } from "./pages/Experience";
import { PortfolioProvider, usePortfolio } from "./context/PortfolioContext";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-page-entrance">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/qualifications" element={<Qualifications />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/resume" element={<Navigate to="/qualifications" replace />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/datta's_control_panel" element={<Admin />} />
        <Route path="/dattas_control_panel" element={<Admin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function PortfolioApp() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const { profile } = usePortfolio();

  // Initialize theme: default to Light mode unless 'dark' is saved
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    // Block all transitions momentarily to prevent lag on theme switch
    document.documentElement.classList.add("no-transition");

    setIsDarkMode((prev) => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newTheme;
    });

    // Re-enable transitions after the browser has painted the new theme
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove("no-transition");
      });
    });
  };

  return (
    <Router>
      {/* High-Tech VFX CGI Intro Animation Overlay */}
      {showIntro && (
        <VfxIntro
          onComplete={() => setShowIntro(false)}
          profileName={profile?.name || "Datta Dhongade"}
          profileRole={profile?.role || "Full Stack Software Engineer"}
        />
      )}

      {/* Global Canvas with Ambient Radial Mesh & Theme Transitions */}
      <div className="flex h-screen overflow-hidden dark:bg-[#080b14] text-black dark:text-slate-100 font-sans transition-colors duration-300 relative ambient-mesh">

        {/* Subtle ambient glow orbs in background with GPU acceleration */}
        <div className="pointer-events-none fixed -top-40 -left-40 w-96 h-96 bg-indigo-500/15 dark:bg-indigo-500/15 rounded-full blur-2xl animate-ambient-float transform-gpu" />
        <div className="pointer-events-none fixed top-1/3 -right-32 w-80 h-80 bg-fuchsia-500/10 dark:bg-fuchsia-500/10 rounded-full blur-2xl animate-ambient-float [animation-delay:3s] transform-gpu" />
        <div className="pointer-events-none fixed -bottom-32 left-1/3 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-2xl animate-ambient-float [animation-delay:6s] transform-gpu" />

        {/* Global Sidebar Dock */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          onReplayIntro={() => setShowIntro(true)}
        />

        {/* Main Content Area with snug, tighter margin & smooth animation */}
        <main className="flex-1 rounded-none lg:rounded-2xl p-4 sm:p-6 md:p-7 ml-0 lg:ml-68.75 xl:ml-72.5 m-0 lg:my-4 lg:mr-4 glass-panel overflow-y-auto no-scrollbar w-full transition-all duration-300 shadow-xl relative z-10">
          <Header setIsSidebarOpen={setIsSidebarOpen} isDarkMode={isDarkMode} />

          <div className="mt-2 pb-6">
            <AnimatedRoutes />
          </div>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}

export default App;
