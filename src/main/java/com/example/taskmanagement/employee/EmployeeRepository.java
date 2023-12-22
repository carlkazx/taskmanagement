package com.example.taskmanagement.employee;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmployeeId(Long employeeId);

    boolean existsByEmployeeId(Long employeeId);

    void deleteByEmployeeId(Long employeeId);
}
