import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm: React.FC = () => {
    const [employeeFirstName, setEmployeeFirstName] = useState('');
    const [employeeLastName, setEmployeeLastName] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeeDepartment, setEmployeeDepartment] = useState('');

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeFirstName(e.target.value);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeLastName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeEmail(e.target.value);
    };

    const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeDepartment(e.target.value);
    };

    const handleAddEmployee = () => {
        // Perform validation for required fields here
        if (employeeFirstName.trim() === '' || employeeLastName.trim() === '') {
            console.error('Employee name cannot be empty.');
            return;
        }

        const apiUrl = 'http://localhost:8080/api/employees';

        // Create an object with the expected field names
        const newEmployee = {
            firstName: employeeFirstName,
            lastName: employeeLastName,
            email: employeeEmail,
            department: employeeDepartment,
        };

        axios
            .post(apiUrl, newEmployee)
            .then((response) => {
                console.log('Employee added successfully:', response.data);
                // Reset the input fields
                setEmployeeFirstName('');
                setEmployeeLastName('');
                setEmployeeEmail('');
                setEmployeeDepartment('');
            })
            .catch((error) => {
                console.error('Error adding employee:', error);
            });
    };

    return (
        <div>
            <h2>Add Employee</h2>
            <input
                type="text"
                placeholder="Employee First Name"
                value={employeeFirstName}
                onChange={handleFirstNameChange}
            />
            <input
                type="text"
                placeholder="Employee Last Name"
                value={employeeLastName}
                onChange={handleLastNameChange}
            />
            <input
                type="text"
                placeholder="Employee Email"
                value={employeeEmail}
                onChange={handleEmailChange}
            />
            <input
                type="text"
                placeholder="Employee Department"
                value={employeeDepartment}
                onChange={handleDepartmentChange}
            />
            <button onClick={handleAddEmployee}>Add Employee</button>
        </div>
    );
};

export default EmployeeForm;
