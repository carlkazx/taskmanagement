import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Button, Link, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import dayjs from 'dayjs';
import { tokens } from "../../theme";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';

const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const initialValues = {
        taskName: '',
        taskDetail: '',
        startDate: dayjs('2022-04-17'),
        dueDate: dayjs('2022-04-17'),
        priority: 'medium',
        status: 'open',
        assignee: '',
        collaborators: [],
        attachments: null,
        address1: '',
    };

    const checkoutSchema = yup.object({
        taskName: yup.string().required("Task name is required"),
        taskDetail: yup.string().required("Task detail is required"),
        // Add validation schema for start date, due date, address1, etc. if needed
    });

    const handleFormSubmit = (values) => {
        console.log(values);
        // Implement logic to submit the form data (e.g., API request, state update)
    };

    return (
        <Box m="20px">
            <Header title="Add Task" subtitle="Create a new task" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      handleReset,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Task Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.taskName}
                                name="taskName"
                                error={!!touched.taskName && !!errors.taskName}
                                helperText={touched.taskName && errors.taskName}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Task Detail"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.taskDetail}
                                name="taskDetail"
                                multiline
                                error={!!touched.taskDetail && !!errors.taskDetail}
                                helperText={touched.taskDetail && errors.taskDetail}
                                sx={{ gridColumn: "span 1"}}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Start Date"
                                    value={values.startDate}
                                    onChange={(date) => handleChange({ target: { name: 'startDate', value: date } })}
                                    sx={{ gridColumn: "span 1" }}
                                />
                            </LocalizationProvider>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Due Date"
                                    value={values.dueDate}
                                    onChange={(date) => handleChange({ target: { name: 'dueDate', value: date } })}
                                    sx={{ gridColumn: "span 1" }}
                                />
                            </LocalizationProvider>
                            <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 1" }}>
                                <InputLabel>Priority</InputLabel>
                                <Select
                                    name="priority"
                                    value={values.priority}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.priority && !!errors.priority}
                                >
                                    <MenuItem value="high">High</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="low">Low</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 1" }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    name="status"
                                    value={values.status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.status && !!errors.status}
                                >
                                    <MenuItem value="open">Open</MenuItem>
                                    <MenuItem value="inProgress">In Progress</MenuItem>
                                    <MenuItem value="completed">Completed</MenuItem>
                                </Select>
                            </FormControl>
                            {/* Assignee Dropdown */}
                            {/* Collaborators */}
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx,.jpg,.png"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    handleChange({ target: { name: 'attachments', value: file } });
                                }}

                            />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: colors.blueAccent[700],
                                    color: colors.grey[100],
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "10px 20px",
                                }}
                            >
                                <ArrowUpwardOutlinedIcon sx={{ mr: "10px" }} />
                                Submit
                            </Button>
                            <Button
                                type="button"
                                variant="outlined"
                                sx={{
                                    backgroundColor: colors.redAccent[500],
                                    color: colors.grey[100],
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "10px 20px",
                                }}
                            >
                                <DoDisturbOnOutlinedIcon sx={{ mr: "10px" }} />
                                Cancel
                            </Button>

                        </Box>
                    </form>
                )}
            </Formik>
            <Link to="/dashboard">Back to Dashboard</Link>
        </Box>
    );
};

export default Form;
