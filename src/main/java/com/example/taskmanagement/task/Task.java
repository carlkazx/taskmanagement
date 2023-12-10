package com.example.taskmanagement.task;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Long id;
    private String title; // Changed to only include task title

    public Task() {
    }

    public Task(String title) {
        this.title = title;
    }

    // Getters and setters for id and title only
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    // Removed other getters and setters

    // You may add equals(), hashCode(), and toString() methods as needed
}
