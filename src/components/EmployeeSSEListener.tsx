import React, { useEffect, useState } from 'react';

// Define a type for Employee
interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    // Add other fields as needed
}

const EmployeeSSEListener: React.FC = () => {
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);

    useEffect(() => {
        console.log('EmployeeSSEListener component mounted.');

        const eventSource = new EventSource('http://localhost:8080/api/sse/employees/events');

        eventSource.addEventListener('employee-update', (event) => {
            const employee: Employee = JSON.parse(event.data);
            console.log('Received SSE update for employee:', employee);

            // Update the employee list by adding the new employee
            setEmployeeList((prevEmployeeList) => [...prevEmployeeList, employee]);
        });

        return () => {
            eventSource.close();
            console.log('EmployeeSSEListener component unmounted.');
        };
    }, []);

    return (
        <div>
            <h2>Employee List</h2>
            <ul>
                {employeeList.map((employee) => (
                    <li key={employee.id}>{employee.firstName} {employee.lastName}</li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeSSEListener;
