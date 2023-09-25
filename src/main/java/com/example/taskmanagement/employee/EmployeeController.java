package com.example.taskmanagement.employee;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000") // Replace with your frontend's URL
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeSSEController employeeSSEController;

    // Endpoint to create a new employee
    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        System.out.println("Received data from frontend: " + employee.getFirstName() + employee.getLastName() + employee.getEmail()+ employee.getDepartment());
        try{
            Employee savedEmployee = employeeRepository.save(employee);
            employeeSSEController.sendEmployeeUpdate(savedEmployee); // Send SSE update
            return savedEmployee;
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return employeeRepository.save(employee);
    }






    // Endpoint to retrieve all employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        System.out.println("Number of employees retrieved: " + employees.size());
        return employees;
    }


    // Endpoint to retrieve an employee by ID
    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));
    }

    // Endpoint to update an existing employee by ID
// Endpoint to update an existing employee by ID
    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
        return employeeRepository.findById(id)
                .map(employee -> {
                    employee.setFirstName(updatedEmployee.getFirstName());
                    employee.setLastName(updatedEmployee.getLastName());
                    // Update other attributes as needed
                    return employeeRepository.save(employee);
                })
                .orElseThrow(() -> new EmployeeNotFoundException(id));
    }


    // Endpoint to delete an employee by ID
    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new EmployeeNotFoundException(id);
        }
        employeeRepository.deleteById(id);
    }
}
