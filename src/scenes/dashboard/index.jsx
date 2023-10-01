import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTask } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AssignmentReturnedOutlinedIcon from '@mui/icons-material/AssignmentReturnedOutlined';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import BrowseGalleryOutlinedIcon from '@mui/icons-material/BrowseGalleryOutlined';
import TrafficIcon from "@mui/icons-material/Traffic";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";




const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box>
            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                {/* ROW 1 */}

                    <StatBox
                        title="New Task"
                        subtitle="4"

                        icon={
                            <AssignmentReturnedOutlinedIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="Urgent Task"
                        subtitle="2"
                        icon={
                            <AssignmentLateOutlinedIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="Overtime Hours"
                        subtitle="5 hours left"
                        progress="0.30"
                        icon={
                            <BrowseGalleryOutlinedIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="1,325,134"
                        subtitle="Traffic Received"
                        progress="0.80"
                        increase="+43%"
                        icon={
                            <TrafficIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* ROW 2 */}
                <Box
                    gridColumn="span 7"
                    gridRow="span 3"
                    backgroundColor={colors.primary[400]}
                >
                    <Box
                        mt="25px"
                        p="10px 40px"
                        display="flex "
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                color={colors.grey[100]}
                            >
                                Calendar
                            </Typography>
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                color={colors.greenAccent[500]}
                            >
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton>
                                <add-to-calendar-button
                                    name="Add the title of your event"
                                    startDate="2022-02-21"
                                    options="['Google']"
                                >
                                </add-to-calendar-button>
                            </IconButton>
                        </Box>
                    </Box>
                    <Box height="100px" m="10px 50px 50px 50px">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar isDashboard={true} />
                        </LocalizationProvider>
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    overflow="auto"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                        p="15px"
                    >
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            Completed Tasks
                        </Typography>
                    </Box>
                    {mockTask.map((task, i) => (
                        <Box
                            key={`${task.txId}-${i}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            p="15px"
                        >
                            <Box>
                                <Typography
                                    color={colors.greenAccent[500]}
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    {task.txId}
                                </Typography>
                                <Typography color={colors.grey[100]}>
                                    {task.assignedTo}
                                </Typography>
                            </Box>
                            <Box color={colors.grey[100]}>{task.date}</Box>
                            <Box
                                backgroundColor={colors.greenAccent[500]}
                                p="5px 10px"
                                borderRadius="4px"
                            >
                                <Typography color={colors.grey[100]}>
                                    {task.status}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

            </Box>
        </Box>
    )
};

export default Dashboard;