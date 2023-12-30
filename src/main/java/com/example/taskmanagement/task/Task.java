package com.example.taskmanagement.task;

import jakarta.persistence.*;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id; // Rename to id to match the database column

    @Column(name = "employee_id")
    private Long employeeId;

    private String title;

    private String issues;

    public Task() {
    }

    public Task(Long employeeId, String title, String issues) {
        this.employeeId = employeeId;
        this.title = title;
        this.issues = issues;
    }

    // Getters and setters for all fields

    public Long getid() {
        return id;
    }

    public void setid(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIssues() {
        return issues;
    }

    public void setIssues(String issues) {
        this.issues = issues;
    }

    // You may add equals(), hashCode(), and toString() methods as needed
}
