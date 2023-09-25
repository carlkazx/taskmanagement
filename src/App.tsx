// src/App.tsx

import React from 'react';
import './App.css';
import EmployeeSSEListener from './components/EmployeeSSEListener';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';


const App: React.FC = () => {
    return (
        <div>
            <EmployeeSSEListener />
            <h1>Employee Task Management</h1>
            <EmployeeForm />
            <EmployeeList />
        </div>
    );
};


export default App;
