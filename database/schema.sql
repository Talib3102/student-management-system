CREATE DATABASE IF NOT EXISTS student;
USE student;

CREATE TABLE IF NOT EXISTS stde (
    roll_no INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    phone_no VARCHAR(15) NOT NULL UNIQUE,
    state VARCHAR(50) DEFAULT 'Maharashtra',
    country VARCHAR(50) DEFAULT 'India'
);

CREATE TABLE IF NOT EXISTS course (
    course_id VARCHAR(50) PRIMARY KEY,
    course_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS student_course (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    roll_no INT NOT NULL,
    course_id VARCHAR(50) NOT NULL,
    semester INT NOT NULL,
    enrollment_date DATE DEFAULT (CURRENT_DATE),
    marks DECIMAL(5,2),
    enrollment_status ENUM('enrolled', 'completed', 'dropped') DEFAULT 'enrolled',
    CONSTRAINT fk_student FOREIGN KEY (roll_no) REFERENCES stde(roll_no),
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES course(course_id),
    CONSTRAINT unique_student_course UNIQUE (roll_no, course_id, semester),
    CONSTRAINT chk_marks CHECK (marks IS NULL OR (marks >= 0 AND marks <= 100))
);

-- Optional sample data; uncomment if you want sample records.
-- INSERT INTO stde (roll_no, name, phone_no) VALUES (1, 'Talib Ansari', '8976229033');
-- INSERT INTO course (course_id, course_name) VALUES ('JAVA101', 'Java'), ('DB101', 'MySQL');
