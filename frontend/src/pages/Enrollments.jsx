import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import api from "../api";

const initial = {
  rollNo: "",
  courseId: "",
  semester: "1",
  marks: "",
  enrollmentStatus: "enrolled",
};

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    try {
      const [e, s, c] = await Promise.all([
        api.get("/enrollments"),
        api.get("/students"),
        api.get("/courses"),
      ]);
      setEnrollments(e.data);
      setStudents(s.data);
      setCourses(c.data);
    } catch {
      setError("Unable to load enrollments. Check the backend and database.");
    }
  }
  useEffect(() => {
    load();
  }, []);

  async function submit(event) {
    event.preventDefault();
    setError("");
    const payload = {
      rollNo: Number(form.rollNo),
      courseId: form.courseId,
      semester: Number(form.semester),
      enrollmentStatus: form.enrollmentStatus,
      marks: form.marks === "" ? null : Number(form.marks),
    };
    try {
      await api.post("/enrollments", payload);
      setForm(initial);
      setShowForm(false);
      await load();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not create enrollment. Confirm the student and course exist, and avoid duplicate enrollments.",
      );
    }
  }

  async function remove(id) {
    if (!window.confirm(`Delete enrollment #${id}?`)) return;
    try {
      await api.delete(`/enrollments/${id}`);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete enrollment.");
    }
  }

  const studentName = (rollNo) =>
    students.find((s) => s.rollNo === rollNo)?.name || "Unknown student";
  const courseName = (id) =>
    courses.find((c) => c.courseId === id)?.courseName || id;

  return (
    <div className="page-stack">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">ACADEMICS</span>
          <h2>Enrollments</h2>
          <p className="muted">
            Connect students to courses and track their status.
          </p>
        </div>
        <button
          className="primary-button"
          onClick={() => {
            setShowForm(!showForm);
            setError("");
          }}
        >
          <Plus size={17} /> New enrollment
        </button>
      </div>
      {error && <div className="error-banner">{error}</div>}
      {showForm && (
        <form className="form-panel" onSubmit={submit}>
          <div className="form-heading">
            <div>
              <h3>Create enrollment</h3>
              <p className="muted">Select an existing student and course.</p>
            </div>
          </div>
          <div className="form-grid">
            <label>
              Student *
              <select
                value={form.rollNo}
                onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
                required
              >
                <option value="">Choose student</option>
                {students.map((s) => (
                  <option key={s.rollNo} value={s.rollNo}>
                    {s.rollNo} — {s.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Course *
              <select
                value={form.courseId}
                onChange={(e) => setForm({ ...form, courseId: e.target.value })}
                required
              >
                <option value="">Choose course</option>
                {courses.map((c) => (
                  <option key={c.courseId} value={c.courseId}>
                    {c.courseId} — {c.courseName}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Semester *
              <select
                value={form.semester}
                onChange={(e) => setForm({ ...form, semester: e.target.value })}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Marks (0–100)
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={form.marks}
                onChange={(e) => setForm({ ...form, marks: e.target.value })}
              />
            </label>
            <label>
              Status
              <select
                value={form.enrollmentStatus}
                onChange={(e) =>
                  setForm({ ...form, enrollmentStatus: e.target.value })
                }
              >
                <option value="enrolled">Enrolled</option>
                <option value="completed">Completed</option>
                <option value="dropped">Dropped</option>
              </select>
            </label>
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button className="primary-button">Save enrollment</button>
          </div>
        </form>
      )}
      <section className="table-panel">
        <div className="table-toolbar">
          <div>
            <h3>
              All enrollments{" "}
              <span className="count-pill">{enrollments.length}</span>
            </h3>
            <p className="muted">Student-to-course registrations.</p>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ENROLLMENT</th>
                <th>STUDENT</th>
                <th>COURSE</th>
                <th>SEMESTER</th>
                <th>MARKS</th>
                <th>STATUS</th>
                <th className="align-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((e) => (
                <tr key={e.enrollmentId}>
                  <td>
                    <span className="id-tag">#{e.enrollmentId}</span>
                  </td>
                  <td>
                    <strong>{studentName(e.rollNo)}</strong>
                    <div className="table-subtext">Roll no. {e.rollNo}</div>
                  </td>
                  <td>{courseName(e.courseId)}</td>
                  <td>{e.semester}</td>
                  <td>{e.marks ?? "—"}</td>
                  <td>
                    <span className={`status-pill ${e.enrollmentStatus}`}>
                      {e.enrollmentStatus}
                    </span>
                  </td>
                  <td className="align-right">
                    <button
                      className="table-action danger"
                      title="Delete enrollment"
                      onClick={() => remove(e.enrollmentId)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {enrollments.length === 0 && (
                <tr>
                  <td colSpan="7" className="empty-state">
                    No enrollments found. Create one after adding students and
                    courses.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
