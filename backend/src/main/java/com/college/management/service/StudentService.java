package com.college.management.service;

import com.college.management.model.Student;
import com.college.management.repository.StudentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> findAll() {
        return repository.findAll();
    }

    public Student findById(Integer rollNo) {
        return repository.findById(rollNo)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));
    }

    public Student create(Student student) {
        if (repository.existsById(student.getRollNo())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Roll number already exists");
        }
        return repository.save(student);
    }

    public Student update(Integer rollNo, Student input) {
        Student existing = findById(rollNo);
        existing.setName(input.getName());
        existing.setPhoneNo(input.getPhoneNo());
        existing.setState(input.getState());
        existing.setCountry(input.getCountry());
        return repository.save(existing);
    }

    public void delete(Integer rollNo) {
        if (!repository.existsById(rollNo)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found");
        }
        repository.deleteById(rollNo);
    }
}
