package com.example.taskmanagement.employee;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Employee {

    @Id
    private Long employeeId;
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String name; // Changed from first and last name to a single name
    private String email;
    private String contactNumber; // Added contact number
    private String address; // Added address
    private String postcode; // Added postcode
    private String startDate; // Added start date
    private String birthday; // Added birthday

    public Employee() {

    }

    // Remove methods for the removed attributes (e.g., getFirstName, setLastName, getDepartment, setDepartment)
    // Add getters and setters for other attributes as needed
}
