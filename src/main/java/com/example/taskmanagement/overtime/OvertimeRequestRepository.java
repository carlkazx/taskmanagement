package com.example.taskmanagement.overtime;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OvertimeRequestRepository extends JpaRepository<OvertimeRequest, Long> {
    List<OvertimeRequest> findByEmployeeId(Long employeeId);
}
