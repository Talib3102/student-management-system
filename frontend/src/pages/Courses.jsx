import { useEffect, useState } from "react";
import { BookOpen, Plus, Trash2 } from "lucide-react";
import api from "../api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    try {
      const response = await api.get("/courses");
      setCourses(response.data);
    } catch {
      setError("Unable to load courses. Check the backend and database.");
    }
  }
  useEffect(() => {
    load();
  }, []);

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      await api.post("/courses", {
        courseId: courseId.trim(),
        courseName: courseName.trim(),
      });
      setCourseId("");
      setCourseName("");
      setShowForm(false);
      await load();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not create course. Check that the course ID is unique.",
      );
    }
  }

  async function remove(id) {
    if (!window.confirm(`Delete course ${id}?`)) return;
    try {
      await api.delete(`/courses/${encodeURIComponent(id)}`);
      await load();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not delete course. It may be used by existing enrollments.",
      );
    }
  }

  return (
    <div className="page-stack">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">ACADEMICS</span>
          <h2>Courses</h2>
          <p className="muted">Maintain the courses offered by your college.</p>
        </div>
        <button
          className="primary-button"
          onClick={() => {
            setShowForm(!showForm);
            setError("");
          }}
        >
          <Plus size={17} /> Add course
        </button>
      </div>
      {error && <div className="error-banner">{error}</div>}
      {showForm && (
        <form className="form-panel" onSubmit={submit}>
          <div className="form-heading">
            <div>
              <h3>Add a course</h3>
              <p className="muted">Enter a unique course ID and course name.</p>
            </div>
          </div>
          <div className="form-grid two-cols">
            <label>
              Course ID *
              <input
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                maxLength="50"
                required
              />
            </label>
            <label>
              Course name *
              <input
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                maxLength="50"
                required
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
            <button className="primary-button">Create course</button>
          </div>
        </form>
      )}
      <div className="section-heading">
        <div>
          <h2>Course catalogue</h2>
          <p className="muted">{courses.length} courses registered</p>
        </div>
      </div>
      <section className="course-grid">
        {courses.map((course, index) => (
          <article className="course-card" key={course.courseId}>
            <div className={`course-icon course-tone-${index % 4}`}>
              <BookOpen size={22} />
            </div>
            <div className="course-card-top">
              <span className="eyebrow">COURSE</span>
              <span className="id-tag">{course.courseId}</span>
            </div>
            <h3>{course.courseName}</h3>
            <p className="muted">Course catalogue entry</p>
            <div className="course-card-bottom">
              <span>Course ID: {course.courseId}</span>
              <button
                className="table-action danger"
                title="Delete course"
                onClick={() => remove(course.courseId)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </article>
        ))}
        {courses.length === 0 && (
          <div className="empty-card">
            No courses yet. Use “Add course” to create your first course.
          </div>
        )}
      </section>
    </div>
  );
}
