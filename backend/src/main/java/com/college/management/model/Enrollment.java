package com.college.management.model;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "student_course")
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enrollment_id")
    private Integer enrollmentId;

    @NotNull
    @Column(name = "roll_no", nullable = false)
    private Integer rollNo;

    @NotNull
    @Column(name = "course_id", nullable = false, length = 50)
    private String courseId;

    @NotNull
    @Min(1)
    @Max(12)
    @Column(name = "semester", nullable = false)
    private Integer semester;

    @Column(name = "enrollment_date")
    private LocalDate enrollmentDate;

    @Min(0)
    @Max(100)
    @Column(name = "marks", precision = 5, scale = 2)
    private BigDecimal marks;

    // Add JPA annotations to map the enum
    @Enumerated(EnumType.STRING)
    @Column(name = "enrollment_status", columnDefinition = "enum('enrolled', 'completed', 'dropped')")
    private EnrollmentStatus enrollmentStatus = EnrollmentStatus.enrolled;
    public Enrollment() { }

    public Integer getEnrollmentId() { return enrollmentId; }
    public void setEnrollmentId(Integer enrollmentId) { this.enrollmentId = enrollmentId; }
    public Integer getRollNo() { return rollNo; }
    public void setRollNo(Integer rollNo) { this.rollNo = rollNo; }
    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }
    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }
    public LocalDate getEnrollmentDate() { return enrollmentDate; }
    public void setEnrollmentDate(LocalDate enrollmentDate) { this.enrollmentDate = enrollmentDate; }
    public BigDecimal getMarks() { return marks; }
    public void setMarks(BigDecimal marks) { this.marks = marks; }
    // Getter and Setter
    public EnrollmentStatus getEnrollmentStatus() {
        return enrollmentStatus;
    }
    public void setEnrollmentStatus(EnrollmentStatus enrollmentStatus) {
        this.enrollmentStatus = enrollmentStatus;
    }
}
