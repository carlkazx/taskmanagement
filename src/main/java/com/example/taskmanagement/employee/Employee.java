package com.example.taskmanagement.employee;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId; // If this is not the primary key, remove the @Id annotation
    private String name;
    private String email;
    private String contactNumber;
    private String address;
    private String postcode;
    private String startDate;
    private String birthday;

    public Employee() {

    }

    // Remove methods for the removed attributes (e.g., getFirstName, setLastName, getDepartment, setDepartment)
    // Add getters and setters for other attributes as needed
}



