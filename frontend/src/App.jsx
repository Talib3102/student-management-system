import { useState } from "react";
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
} from "lucide-react";
import { clearCredentials } from "./api";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Enrollments from "./pages/Enrollments";

function ProtectedLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const links = [
    { to: "/", label: "Overview", icon: LayoutDashboard, end: true },
    { to: "/students", label: "Students", icon: Users },
    { to: "/courses", label: "Courses", icon: BookOpen },
    { to: "/enrollments", label: "Enrollments", icon: GraduationCap },
  ];

  if (!sessionStorage.getItem("adminCredentials"))
    return <Navigate to="/login" replace />;

  function logout() {
    clearCredentials();
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <span className="brand-mark">
            <GraduationCap size={22} />
          </span>
          <span>
            CampusDesk<small>COLLEGE PORTAL</small>
          </span>
        </div>
        <p className="nav-caption">WORKSPACE</p>
        <nav>
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="admin-avatar">A</div>
          <div className="admin-info">
            <strong>Administrator</strong>
            <small>System admin</small>
          </div>
          <button
            className="icon-button logout-button"
            title="Log out"
            onClick={logout}
          >
            <LogOut size={17} />
          </button>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <button
            className="icon-button mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={20} />
          </button>
          <div>
            <span className="eyebrow">COLLEGE MANAGEMENT</span>
            <h1>Admin workspace</h1>
          </div>
          <div className="topbar-right">
            <span className="status-dot" /> System online{" "}
            <div className="top-avatar">A</div>
          </div>
        </header>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/enrollments" element={<Enrollments />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  );
}
