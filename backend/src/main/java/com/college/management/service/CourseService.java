package com.college.management.service;

import com.college.management.model.Course;
import com.college.management.repository.CourseRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository repository;

    public CourseService(CourseRepository repository) {
        this.repository = repository;
    }

    public List<Course> findAll() {
        return repository.findAll();
    }

    public Course create(Course course) {
        if (repository.existsById(course.getCourseId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Course ID already exists");
        }
        return repository.save(course);
    }

    public void delete(String courseId) {
        if (!repository.existsById(Integer.valueOf(courseId))) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found");
        }
        repository.deleteById(Integer.valueOf(courseId));
    }
}
