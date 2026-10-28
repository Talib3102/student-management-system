import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Users,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/dashboard/stats")
      .then((response) => setStats(response.data))
      .catch(() => setError("Could not load dashboard statistics."));
  }, []);

  const cards = [
    {
      label: "Total students",
      value: stats?.totalStudents,
      icon: Users,
      tone: "blue",
      note: "Registered students",
    },
    {
      label: "Available courses",
      value: stats?.totalCourses,
      icon: BookOpen,
      tone: "violet",
      note: "Courses in catalogue",
    },
    {
      label: "Total enrollments",
      value: stats?.totalEnrollments,
      icon: GraduationCap,
      tone: "orange",
      note: "Course registrations",
    },
    {
      label: "Active enrollments",
      value: stats?.activeEnrollments,
      icon: UserCheck,
      tone: "green",
      note: "Currently enrolled",
    },
  ];

  return (
    <div className="page-stack">
      <section className="welcome-panel">
        <div>
          <span className="eyebrow light">YOUR CAMPUS AT A GLANCE</span>
          <h2>
            Good to see you, Admin <span>✦</span>
          </h2>
          <p>Here’s what’s happening across your college today.</p>
        </div>
        <div className="welcome-art">
          <div className="art-ring ring-a" />
          <div className="art-ring ring-b" />
          <GraduationCap size={70} strokeWidth={1.2} />
        </div>
      </section>
      <div className="section-heading">
        <div>
          <h2>Overview</h2>
          <p className="muted">A quick summary of your college records.</p>
        </div>
        <span className="live-label">
          <span className="status-dot" /> Live data
        </span>
      </div>
      {error && <div className="error-banner">{error}</div>}
      <section className="stats-grid">
        {cards.map(({ label, value, icon: Icon, tone, note }) => (
          <article className="stat-card" key={label}>
            <div className={`stat-icon ${tone}`}>
              <Icon size={21} />
            </div>
            <span className="stat-label">{label}</span>
            <strong className="stat-value">
              {value === undefined ? "—" : value}
            </strong>
            <span className="stat-note">{note}</span>
          </article>
        ))}
      </section>
      <section className="section-heading">
        <div>
          <h2>Quick actions</h2>
          <p className="muted">Jump straight into common tasks.</p>
        </div>
      </section>
      <section className="quick-grid">
        <Link to="/students" className="quick-card">
          <div className="quick-icon blue">
            <Users size={20} />
          </div>
          <div>
            <strong>Manage students</strong>
            <p>Add, update or view student records.</p>
          </div>
          <ArrowUpRight size={18} className="quick-arrow" />
        </Link>
        <Link to="/courses" className="quick-card">
          <div className="quick-icon violet">
            <BookOpen size={20} />
          </div>
          <div>
            <strong>Manage courses</strong>
            <p>Maintain your course catalogue.</p>
          </div>
          <ArrowUpRight size={18} className="quick-arrow" />
        </Link>
        <Link to="/enrollments" className="quick-card">
          <div className="quick-icon green">
            <GraduationCap size={20} />
          </div>
          <div>
            <strong>Student enrollments</strong>
            <p>Connect students with courses.</p>
          </div>
          <ArrowUpRight size={18} className="quick-arrow" />
        </Link>
      </section>
      <p className="page-footnote">
        CampusDesk <span>•</span> College Student Management System
      </p>
    </div>
  );
}
