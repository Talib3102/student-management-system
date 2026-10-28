package com.college.management.controller;

import com.college.management.model.EnrollmentStatus;
import com.college.management.repository.CourseRepository;
import com.college.management.repository.EnrollmentRepository;
import com.college.management.repository.StudentRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final StudentRepository students;
    private final CourseRepository courses;
    private final EnrollmentRepository enrollments;

    public DashboardController(StudentRepository students, CourseRepository courses,
                               EnrollmentRepository enrollments) {
        this.students = students;
        this.courses = courses;
        this.enrollments = enrollments;
    }

    @GetMapping("/stats")
    public Map<String, Long> stats() {
        Map<String, Long> result = new LinkedHashMap<String, Long>();
        result.put("totalStudents", students.count());
        result.put("totalCourses", courses.count());
        result.put("totalEnrollments", enrollments.count());
        result.put("activeEnrollments", enrollments.countByEnrollmentStatus(EnrollmentStatus.enrolled));
        return result;
    }
}
