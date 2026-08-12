import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, User, FileText, Briefcase, Award, Shield, Send, LogOut } from "lucide-react";

export default function Header({ setIsSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine the title & icon based on current route
  const getHeaderInfo = () => {
    switch (location.pathname) {
      case "/":
        return { title: "About Me", icon: <User size={20} className="text-cyan-600 dark:text-cyan-500" /> };
      case "/projects":
        return { title: "Projects", icon: <Briefcase size={20} className="text-indigo-600 dark:text-indigo-500" /> };
      case "/qualifications":
      case "/resume":
        return { title: "Qualifications", icon: <FileText size={20} className="text-teal-600 dark:text-teal-500" /> };
      case "/skills":
        return { title: "Skills", icon: <Award size={20} className="text-amber-600 dark:text-amber-500" /> };
      case "/experience":
        return { title: "Work Experience", icon: <Award size={20} className="text-purple-600 dark:text-purple-500" /> };
      case "/contact":
        return { title: "Contact", icon: <Send size={20} className="text-pink-600 dark:text-pink-500" /> };
      case "/datta's_control_panel":
      case "/dattas_control_panel":
      case "/admin":
        return { title: "Datta's Control Panel", subtitle: "Comprehensive Portfolio Configuration Suite", icon: <Shield size={20} className="text-amber-600 dark:text-amber-500" /> };
      default:
        return { title: "Portfolio", subtitle: "Datta Dhongade", icon: <User size={20} className="text-cyan-600 dark:text-cyan-500" /> };
    }
  };

  const navItems = [
    { path: "/", label: "About", icon: <User size={14} /> },
    { path: "/qualifications", label: "Qualifications", icon: <FileText size={14} /> },
    { path: "/skills", label: "Skills", icon: <Award size={14} /> },
    { path: "/projects", label: "Projects", icon: <Briefcase size={14} /> },
    { path: "/experience", label: "Experience", icon: <Award size={14} /> },
    { path: "/contact", label: "Connect", icon: <Send size={14} /> },
  ];

  const headerInfo = getHeaderInfo();
  const isAdminRoute =
    location.pathname === "/datta's_control_panel" ||
    location.pathname === "/dattas_control_panel" ||
    location.pathname === "/admin";

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/");
    // Reload to reset Admin auth state
    window.location.reload();
  };

  return (
    <header className="flex flex-col lg:flex-row justify-between items-center pb-3.5 mb-5 border-b border-slate-200/80 dark:border-white/5 w-full gap-3.5 relative">
      {/* Left side: Hamburger (mobile) + Page title */}
      <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
        <button
          className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-black dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-all cursor-pointer shrink-0"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open sidebar navigation"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-3 flex-1 lg:flex-initial justify-center lg:justify-start">
          <div className="hidden sm:flex p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            {headerInfo.icon}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="fluid-h2 font-semibold tracking-tight text-black dark:text-white whitespace-nowrap">
              {headerInfo.title}
            </h1>
            <hr className="w-full border-green-400 h-1 dark:border-green-400" />
          </div>
        </div>

        {/* Spacer on mobile to keep title centered when hamburger is on left */}
        {!isAdminRoute && <div className="w-9 lg:hidden" />}

        {/* Logout button inline on mobile (admin only) */}
        {isAdminRoute && (
          <button
            onClick={handleLogout}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 text-xs font-semibold transition-all cursor-pointer shrink-0"
          >
            <LogOut size={14} />
            <span>Log Out</span>
          </button>
        )}
      </div>

      {/* Right side: nav tabs OR logout button */}
      {isAdminRoute ? (
        <button
          onClick={handleLogout}
          className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 text-sm font-semibold transition-all cursor-pointer shadow-xs hover:border-rose-500/40"
        >
          <LogOut size={15} />
          <span>Log Out</span>
        </button>
      ) : (
        <nav className="w-full lg:w-auto overflow-x-auto no-scrollbar py-0.5 max-w-full min-w-0 flex justify-start sm:justify-center">
          <ul className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl sm:rounded-2xl bg-slate-100/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shrink-0">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold sm:font-medium transition-all duration-200 whitespace-nowrap ${isActive
                        ? 'bg-white dark:bg-cyan-500/20 text-black dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 shadow-xs font-bold'
                        : 'text-black dark:text-slate-400 hover:text-cyan-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/5 border border-transparent'
                      }`}
                  >
                    <span className={isActive ? 'text-cyan-600 dark:text-cyan-300' : 'text-slate-500 dark:text-slate-400'}>{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
