import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm: React.FC = () => {
    const [employeeName, setEmployeeName] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeName(e.target.value);
    };

    const handleAddEmployee = () => {
        if (employeeName.trim() === '') {
            console.error('Employee name cannot be empty.');
            return;
        }

        const apiUrl = 'http://localhost:8080/api/employees';

        // Create an object with the expected field names
        const newEmployee = {
            firstName: employeeName,
            lastName: '', // You can add other fields like email and department here
            email: '',
            department: '',
        };

        axios
            .post(apiUrl, newEmployee) // Send the newEmployee object
            .then((response) => {
                console.log('Employee added successfully:', response.data);
                // Reset the employeeName state to clear the input field
                setEmployeeName('');
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
                placeholder="Employee Name"
                value={employeeName}
                onChange={handleInputChange}
            />
            <button onClick={handleAddEmployee}>Add Employee</button>
        </div>
    );
};

export default EmployeeForm;
