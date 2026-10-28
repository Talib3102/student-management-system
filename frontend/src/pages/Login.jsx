import { useState } from "react";
import { GraduationCap, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api, { saveCredentials } from "../api";

export default function Login() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    saveCredentials(username, password);
    try {
      await api.get("/dashboard/stats");
      navigate("/");
    } catch (err) {
      sessionStorage.removeItem("adminCredentials");
      setError(
        err.response?.status === 401 || err.response?.status === 403
          ? "Incorrect username or password."
          : "Cannot connect to the backend. Check that Spring Boot is running.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-decoration">
        <div className="decor-circle circle-one" />
        <div className="decor-circle circle-two" />
        <div className="login-brand">
          <span className="brand-mark">
            <GraduationCap size={24} />
          </span>{" "}
          CampusDesk
        </div>
        <div className="login-message">
          <span className="eyebrow light">ONE PLACE FOR YOUR CAMPUS</span>
          <h1>
            Manage your college.
            <br />
            <em>Simply.</em>
          </h1>
          <p>
            A clear view of students, courses and enrollments — all in one
            workspace.
          </p>
          <div className="login-mini-stats">
            <div>
              <strong>01</strong>
              <span>Students</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Courses</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Enrollments</span>
            </div>
          </div>
        </div>
        <p className="login-footer">CAMPUSDESK · ADMINISTRATION</p>
      </div>
      <div className="login-form-side">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-icon">
            <LockKeyhole size={21} />
          </div>
          <span className="eyebrow">ADMIN PORTAL</span>
          <h2>Welcome back</h2>
          <p className="muted">Sign in to manage your college records.</p>
          {error && <div className="error-banner">{error}</div>}
          <label>
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          <button className="primary-button full-button" disabled={busy}>
            {busy ? "Signing in…" : "Sign in to dashboard"}
          </button>
          <p className="login-hint">
            Demo account: <strong>admin</strong> / <strong>Admin@123</strong>
          </p>
        </form>
      </div>
    </div>
  );
}
