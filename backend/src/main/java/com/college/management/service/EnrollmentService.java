package com.college.management.service;

import com.college.management.model.Enrollment;
import com.college.management.model.EnrollmentStatus;
import com.college.management.repository.EnrollmentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
public class EnrollmentService {
    private final EnrollmentRepository repository;

    public EnrollmentService(EnrollmentRepository repository) {
        this.repository = repository;
    }

    public List<Enrollment> findAll() {
        return repository.findAll();
    }

    public Enrollment create(Enrollment enrollment) {
        if (enrollment.getEnrollmentDate() == null) {
            enrollment.setEnrollmentDate(LocalDate.now());
        }
        if (enrollment.getEnrollmentStatus() == null) {
            enrollment.setEnrollmentStatus(EnrollmentStatus.enrolled);
        }
        return repository.save(enrollment);
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Enrollment not found");
        }
        repository.deleteById(id);
    }
}
