package com.college.management.controller;

import com.college.management.model.Student;
import com.college.management.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Student> getAll() {
        return service.findAll();
    }

    @GetMapping("/{rollNo}")
    public Student getOne(@PathVariable Integer rollNo) {
        return service.findById(rollNo);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Student create(@Valid @RequestBody Student student) {
        return service.create(student);
    }

    @PutMapping("/{rollNo}")
    public Student update(@PathVariable Integer rollNo, @Valid @RequestBody Student student) {
        return service.update(rollNo, student);
    }

    @DeleteMapping("/{rollNo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer rollNo) {
        service.delete(rollNo);
    }
}
