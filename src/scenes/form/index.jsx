import {Box, Button, styled, TextField, useTheme} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {tokens} from "../../theme";


const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleFormSubmit = (values) => {
        console.log(values);
    };

    const CustomDatePicker = styled(DatePicker)({
        '& .MuiInputLabel-root': {
            color: colors.grey["300"], // Change this to the desired text color
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: colors.grey["300"], // Change this to the desired text color when focused
        },
    });

    return (
        <Box m="20px">
            <Header title="CREATE USER"/>

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
                                label="Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 1" }}
                                InputLabelProps={{
                                    style: {color: values.name ? 'white' : 'grey'}
                                }}
                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <CustomDatePicker
                                    label="Start Date"
                                    value={values.startDate}
                                    onChange={(date) => handleChange({ target: { name: 'startDate', value: date } })}
                                    sx={{ gridColumn: "span 1" }}
                                />
                            </LocalizationProvider>

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 1" }}
                                InputLabelProps={{
                                    style: {color: values.email ? 'white' : 'grey'}
                                }}
                            />
                            <Box
                                gridColumn="span 1"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Contact Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.contact}
                                name="contact"
                                error={!!touched.contact && !!errors.contact}
                                helperText={touched.contact && errors.contact}
                                sx={{ gridColumn: "span 1" }}
                                InputLabelProps={{
                                    style: {color: values.contact ? 'white' : 'grey'}
                                }}
                            />
                            </Box>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address1}
                                name="address"
                                error={!!touched.address && !!errors.address}
                                helperText={touched.address && errors.address}
                                sx={{ gridColumn: "span 1" }}
                                InputLabelProps={{
                                    style: {color: values.address ? 'white' : 'grey'}
                                }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="City"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.city}
                                name="city"
                                error={!!touched.city && !!errors.city}
                                helperText={touched.city && errors.city}
                                sx={{ gridColumn: "span 1" }}
                                InputLabelProps={{
                                    style: {color: values.taskName ? 'white' : 'grey'}
                                }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Zipcode"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.zipcode}
                                name="zipcode"
                                error={!!touched.zipcode && !!errors.zipcode}
                                helperText={touched.zipcode && errors.zipcode}
                                sx={{ gridColumn: "span 1" }}
                                InputLabelProps={{
                                    style: {color: values.zipcode ? 'white' : 'grey'}
                                }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create New User
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
    address1: yup.string().required("required"),
    address2: yup.string().required("required"),
});
const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
};

export default Form;
 
