package com.college.management.repository;

import com.college.management.model.Enrollment;
import com.college.management.model.EnrollmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
    // Change parameter from String to EnrollmentStatus
    long countByEnrollmentStatus(EnrollmentStatus enrollmentStatus);
}
