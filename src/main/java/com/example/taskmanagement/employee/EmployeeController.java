package com.example.taskmanagement.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5173") // Replace with your frontend's URL
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeSSEController employeeSSEController;

    // Endpoint to create a new employee with a specific employeeId
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        Long providedEmployeeId = employee.getEmployeeId();

        // Check if the employeeId already exists in the database
        if (employeeRepository.existsByEmployeeId(providedEmployeeId)) {
            // Return a conflict response if the employeeId already exists
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

        try {
            // Set the provided employeeId
            employee.setEmployeeId(providedEmployeeId);

            // Save the employee to the database
            Employee savedEmployee = employeeRepository.save(employee);

            // Send SSE update
            employeeSSEController.sendEmployeeUpdate(savedEmployee);

            // Return a success response with the created employee
            return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployee);
        } catch (Exception e) {
            e.printStackTrace();
            // Handle other exceptions appropriately
            // For simplicity, returning a generic error response here
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Endpoint to retrieve all employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        System.out.println("Number of employees retrieved: " + employees.size());
        return employees;
    }

    // Endpoint to retrieve an employee by ID
    @GetMapping("/{employeeId}")
    public Employee getEmployeeById(@PathVariable Long employeeId) {
        return employeeRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new EmployeeNotFoundException(employeeId));
    }

    // Endpoint to update an existing employee by ID
    @PutMapping("/{employeeId}")
    public Employee updateEmployee(@PathVariable Long employeeId, @RequestBody Employee updatedEmployee) {
        return employeeRepository.findByEmployeeId(employeeId)
                .map(employee -> {
                    employee.setName(updatedEmployee.getName());
                    // Update other attributes as needed
                    employee.setEmail(updatedEmployee.getEmail());
                    employee.setContactNumber(updatedEmployee.getContactNumber());
                    employee.setAddress(updatedEmployee.getAddress());
                    // Add updates for other attributes
                    return employeeRepository.save(employee);
                })
                .orElseThrow(() -> new EmployeeNotFoundException(employeeId));
    }

    // Endpoint to delete an employee by ID
    @DeleteMapping("/{employeeId}")
    public void deleteEmployee(@PathVariable Long employeeId) {
        if (!employeeRepository.existsByEmployeeId(employeeId)) {
            throw new EmployeeNotFoundException(employeeId);
        }
        employeeRepository.deleteByEmployeeId(employeeId);
    }
}
