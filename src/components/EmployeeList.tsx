import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Employee {
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    // Add other fields here
}

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        // Fetch the list of employees from the backend
        axios
            .get<Employee[]>('http://localhost:8080/api/employees')
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error('Error fetching employees:', error);
            });
    }, []); // The empty array means this effect runs once on component mount

    return (
        <div>
            <h2>Employee List</h2>
            <ul>
                {employees.map((employee, index) => (
                    <li key={index}>
                        <strong>First Name:</strong> {employee.firstName}<br />
                        <strong>Last Name:</strong> {employee.lastName}<br />
                        <strong>Email:</strong> {employee.email}<br />
                        <strong>Department:</strong> {employee.department}<br />
                        {/* Add additional fields here */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
