package com.example.taskmanagement.employee;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


import java.io.IOException;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping("/api/sse/employees")
@CrossOrigin
public class EmployeeSSEController {

    private final CopyOnWriteArrayList<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    @GetMapping(value = "/events", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter employeeEvents() {
        SseEmitter emitter = new SseEmitter();
        emitters.add(emitter);
        emitter.onCompletion(() -> emitters.remove(emitter));
        return emitter;
    }

    public void sendEmployeeUpdate(Employee employee) {
        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter.event()
                        .data(employee)
                        .name("employee-update"));
            } catch (IOException e) {
                emitter.complete();
            }
        });
    }
}
