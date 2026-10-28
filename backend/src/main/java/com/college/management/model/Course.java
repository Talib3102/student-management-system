package com.college.management.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "course")
public class Course {
    @Id
    @NotNull
    @Min(1)
    @Column(name = "course_id", nullable = false)
    private Integer courseId;

    @NotBlank
    @Size(max = 50)
    @Column(name = "course_name", nullable = false, length = 50)
    private String courseName;

    public Course() { }

    public Integer getCourseId() { return courseId; }
    public void setCourseId(Integer courseId) { this.courseId = courseId; }
    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }
}
