package com.example.taskmanagement.overtime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OvertimeRequestService {

    private static final long MAX_OVERTIME_HOURS = 5;

    @Autowired
    private OvertimeRequestRepository overtimeRequestRepository;

    public OvertimeRequest saveOvertimeRequest(OvertimeRequest overtimeRequest) {
        LocalDateTime startTime = overtimeRequest.getStartTime();
        LocalDateTime endTime = overtimeRequest.getEndTime();
        Duration duration = Duration.between(startTime, endTime);

        if (duration.toHours() > MAX_OVERTIME_HOURS) {
            endTime = startTime.plusHours(MAX_OVERTIME_HOURS);
            overtimeRequest.setEndTime(endTime);
        }

        return overtimeRequestRepository.save(overtimeRequest);
    }

    public List<OvertimeRequest> getAllOvertimeRequests() {
        return overtimeRequestRepository.findAll();
    }

    public List<OvertimeRequest> getOvertimeRequestsByEmployeeId(Long employeeId) {
        return overtimeRequestRepository.findByEmployeeId(employeeId);
    }
}
