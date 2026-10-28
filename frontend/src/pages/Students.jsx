import { useEffect, useState } from "react";
import { Plus, Search, Trash2, Pencil, X } from "lucide-react";
import api from "../api";

const emptyForm = {
  rollNo: "",
  name: "",
  phoneNo: "",
  state: "Maharashtra",
  country: "India",
};

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  async function load() {
    try {
      const response = await api.get("/students");
      setStudents(response.data);
      setError("");
    } catch {
      setError("Unable to load students. Check the backend and database.");
    }
  }
  useEffect(() => {
    load();
  }, []);

  function openAdd() {
    setForm(emptyForm);
    setEditing(false);
    setShowForm(true);
    setError("");
  }
  function openEdit(student) {
    setForm({
      rollNo: student.rollNo,
      name: student.name,
      phoneNo: student.phoneNo,
      state: student.state || "",
      country: student.country || "",
    });
    setEditing(true);
    setShowForm(true);
    setError("");
  }
  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    const payload = { ...form, rollNo: Number(form.rollNo) };
    try {
      if (editing) await api.put(`/students/${form.rollNo}`, payload);
      else await api.post("/students", payload);
      setShowForm(false);
      setForm(emptyForm);
      await load();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not save student. Check that roll number and phone number are unique.",
      );
    }
  }

  async function remove(rollNo) {
    if (!window.confirm(`Delete student #${rollNo}?`)) return;
    try {
      await api.delete(`/students/${rollNo}`);
      await load();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not delete student. They may have course enrollments.",
      );
    }
  }

  const filtered = students.filter((s) =>
    `${s.rollNo} ${s.name} ${s.phoneNo}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="page-stack">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">RECORDS</span>
          <h2>Students</h2>
          <p className="muted">
            Manage student profiles and contact information.
          </p>
        </div>
        <button className="primary-button" onClick={openAdd}>
          <Plus size={17} /> Add student
        </button>
      </div>
      {error && <div className="error-banner">{error}</div>}
      {showForm && (
        <form className="form-panel" onSubmit={submit}>
          <div className="form-heading">
            <div>
              <h3>{editing ? "Edit student" : "Add a student"}</h3>
              <p className="muted">Fields marked * are required.</p>
            </div>
            <button
              type="button"
              className="icon-button"
              onClick={() => setShowForm(false)}
            >
              <X size={18} />
            </button>
          </div>
          <div className="form-grid">
            <label>
              Roll number *
              <input
                name="rollNo"
                type="number"
                min="1"
                value={form.rollNo}
                onChange={updateField}
                disabled={editing}
                required
              />
            </label>
            <label>
              Full name *
              <input
                name="name"
                maxLength="50"
                value={form.name}
                onChange={updateField}
                required
              />
            </label>
            <label>
              Phone number *
              <input
                name="phoneNo"
                maxLength="15"
                value={form.phoneNo}
                onChange={updateField}
                required
              />
            </label>
            <label>
              State
              <input
                name="state"
                maxLength="50"
                value={form.state}
                onChange={updateField}
              />
            </label>
            <label>
              Country
              <input
                name="country"
                maxLength="50"
                value={form.country}
                onChange={updateField}
              />
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
            <button className="primary-button">
              {editing ? "Save changes" : "Create student"}
            </button>
          </div>
        </form>
      )}
      <section className="table-panel">
        <div className="table-toolbar">
          <div>
            <h3>
              All students <span className="count-pill">{filtered.length}</span>
            </h3>
            <p className="muted">A list of registered students.</p>
          </div>
          <div className="search-box">
            <Search size={17} />
            <input
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ROLL NO.</th>
                <th>STUDENT</th>
                <th>PHONE</th>
                <th>LOCATION</th>
                <th className="align-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student.rollNo}>
                  <td>
                    <span className="id-tag">#{student.rollNo}</span>
                  </td>
                  <td>
                    <div className="person-cell">
                      <span className="person-avatar">
                        {student.name?.charAt(0)?.toUpperCase()}
                      </span>
                      <strong>{student.name}</strong>
                    </div>
                  </td>
                  <td>{student.phoneNo}</td>
                  <td>
                    {[student.state, student.country]
                      .filter(Boolean)
                      .join(", ") || "—"}
                  </td>
                  <td className="align-right">
                    <button
                      className="table-action"
                      title="Edit"
                      onClick={() => openEdit(student)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="table-action danger"
                      title="Delete"
                      onClick={() => remove(student.rollNo)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No students found. Add a student to get started.
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
