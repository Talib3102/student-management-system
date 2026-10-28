# CampusDesk - College Student Management System

A full-stack academic management platform designed to streamline student registration, course administration, and semester enrollments across a modular 3-tier architecture.

---

## 🚀 Features

- **Admin Dashboard**: Live aggregated campus metrics (total students, total courses, total enrollments, active registrations) via `/api/dashboard/stats`.
- **Student Management**: Full CRUD operations for student records with client-side real-time multi-attribute search (by roll number, name, or phone).
- **Course Catalog**: Course creation and management with unique course identification.
- **Enrollment System**: Student-to-course registration supporting semester tracking, grade/marks entry (0–100), and status updates (`enrolled`, `completed`, `dropped`).
- **Data Integrity & Validation**:
  - Bean validation (`@Valid`, `@NotNull`, `@NotBlank`, `@Size`, `@Min`, `@Max`).
  - Database-level constraints: Foreign keys, CHECK constraints on marks, and a composite `UNIQUE(roll_no, course_id, semester)` preventing duplicate term enrollments.
- **Global Error Handling**: `@RestControllerAdvice` centralizes API exceptions into clean HTTP status codes (`400`, `404`, `409 Conflict`).
- **Security & Authorization**: Role-based access control (`ROLE_ADMIN`) with Spring Security, BCrypt password hashing, and Axios request interceptors.

---

## 🛠️ Tech Stack

- **Backend**: Java 8, Spring Boot 2.7.18, Spring Security 5.7, Spring Data JPA, Hibernate, Maven
- **Database**: MySQL 8
- **Frontend**: React 18, Vite 6, Axios, React Router v6, Lucide React, Plain CSS

---

## 📡 REST API Endpoints

| Controller | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Dashboard** | `GET` | `/api/dashboard/stats` | Aggregated campus statistics |
| **Students** | `GET` | `/api/students` | Get all students |
| | `GET` | `/api/students/{rollNo}` | Get student by roll number |
| | `POST` | `/api/students` | Create new student record |
| | `PUT` | `/api/students/{rollNo}` | Update student information |
| | `DELETE` | `/api/students/{rollNo}` | Delete student record |
| **Courses** | `GET` | `/api/courses` | List all available courses |
| | `POST` | `/api/courses` | Add a new course |
| | `DELETE` | `/api/courses/{courseId}` | Remove a course |
| **Enrollments** | `GET` | `/api/enrollments` | List all course enrollments |
| | `POST` | `/api/enrollments` | Register student into a course |
| | `DELETE` | `/api/enrollments/{id}` | Delete an enrollment record |

---

## 🗄️ Database Setup

1. Open MySQL and run the schema script located at `database/schema.sql`:
   ```sql
   CREATE DATABASE IF NOT EXISTS student;
   USE student;
   ```
2. The database contains three interrelated tables:
   - `stde` (Student records: roll number, name, phone number, state, country)
   - `course` (Course catalog: course ID, course name)
   - `student_course` (Enrollments: foreign keys to student and course, semester, date, marks, status)

---

## ⚙️ Backend Configuration & Run

1. Configure database credentials in `backend/src/main/resources/application.properties` or set environment variables:
   - `DB_URL` (default: `jdbc:mysql://localhost:3306/student`)
   - `DB_USERNAME` (default: `root`)
   - `DB_PASSWORD` (default: `root`)

2. Run the Spring Boot backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   Backend runs at: `http://localhost:8080`

3. Default Admin Credentials:
   - **Username**: `admin`
   - **Password**: `Admin@123`

---

## 💻 Frontend Configuration & Run

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Frontend runs at: `http://localhost:5173`
