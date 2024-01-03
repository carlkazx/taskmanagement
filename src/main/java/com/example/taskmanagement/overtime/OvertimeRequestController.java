package com.example.taskmanagement.overtime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/overtime-requests")
public class OvertimeRequestController {

    @Autowired
    private OvertimeRequestService overtimeRequestService;

    @PostMapping
    public ResponseEntity<OvertimeRequest> submitOvertimeRequest(@RequestBody OvertimeRequest overtimeRequest) {
        OvertimeRequest savedRequest = overtimeRequestService.saveOvertimeRequest(overtimeRequest);
        return ResponseEntity.status(201).body(savedRequest);
    }

    @GetMapping
    public ResponseEntity<List<OvertimeRequest>> getAllOvertimeRequests() {
        List<OvertimeRequest> overtimeRequests = overtimeRequestService.getAllOvertimeRequests();
        return ResponseEntity.ok(overtimeRequests);
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<List<OvertimeRequest>> getOvertimeRequestsByEmployeeId(@PathVariable Long employeeId) {
        List<OvertimeRequest> overtimeRequests = overtimeRequestService.getOvertimeRequestsByEmployeeId(employeeId);
        return ResponseEntity.ok(overtimeRequests);
    }
}
