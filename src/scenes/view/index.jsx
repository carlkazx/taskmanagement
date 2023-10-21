import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { mockTask } from "../../data/mockData";
import { DataGrid } from '@mui/x-data-grid'; // Import the DataGrid component

const ViewTasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [filters, setFilters] = useState({
        priority: 'all',
        status: 'all',
    });
    const [searchTerm, setSearchTerm] = useState('');

    // Use mockTask as the initial task data
    useEffect(() => {
        setTasks(mockTask);
    }, []);

    // Function to handle selecting a task
    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    // Function to handle filtering tasks
    const handleFilterChange = (filterName, value) => {
        setFilters({ ...filters, [filterName]: value });
    };

    // Function to handle searching tasks
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    // Transform task data for DataGrid
    const rows = tasks.map((task, index) => ({
        id: index + 1,
        txId: task.txId,
        assignedTo: task.assignedTo,
        date: task.date,
        status: task.status,
        priority: task.priority,
    }));

    // Define columns for DataGrid
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'txId', headerName: 'Transaction ID', width: 200 },
        { field: 'assignedTo', headerName: 'Assigned To', width: 150 },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'priority', headerName: 'Priority', width: 150 },
    ];

    // Filtering and searching logic
    const filteredTasks = tasks
        .filter((task) => filters.priority === 'all' || task.priority === filters.priority)
        .filter((task) => filters.status === 'all' || task.status === filters.status)
        .filter((task) => searchTerm === '' ||
            task.txId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <h1>View Tasks</h1>

            {/* Task Filters */}
            <div>
                <TextField
                    select
                    label="Priority"
                    value={filters.priority}
                    onChange={(e) => handleFilterChange('priority', e.target.value)}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                </TextField>
            </div>

            <div>
                <TextField
                    select
                    label="Status"
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    {/* Add other status options here */}
                </TextField>
            </div>

            {/* Task Search */}
            <div>
                <TextField
                    label="Search tasks"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>

            {/* Task List using DataGrid */}
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    checkboxSelection
                    rows={filteredTasks.map((task, index) => ({ ...task, id: index + 1 }))}
                    columns={columns}
                    onRowClick={(params) => handleTaskClick(params.row)}
                />
            </div>

            {/* Task Details */}
            {selectedTask && (
                <div className="task-details">
                    <h2>{selectedTask.txId}</h2>
                    <p>Assigned To: {selectedTask.assignedTo}</p>
                    <p>Date: {selectedTask.date}</p>
                    <p>Status: {selectedTask.status}</p>
                </div>
            )}
        </div>
    );
};

export default ViewTasksPage;
