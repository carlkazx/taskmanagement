
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock API URL (replace with your actual backend API URL)
        const apiUrl = 'http://localhost:8080/api/employees';

        axios.get(apiUrl)
            .then((response) => {
                setEmployees(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h2>Employee List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {employees.map((employee: any) => (
                        <li key={employee.id}>{employee.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EmployeeList;
