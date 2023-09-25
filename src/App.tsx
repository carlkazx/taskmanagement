// src/App.tsx

import React from 'react';
import './App.css';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Employee Task Management System</h1>
            </header>
            <main>
                <EmployeeForm />
                <EmployeeList />
            </main>
        </div>
    );
}

export default App;
