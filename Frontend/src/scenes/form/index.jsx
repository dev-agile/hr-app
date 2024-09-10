import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import useUserStore from "../../store/userStore";
import toastr from 'toastr'; // Import toastr
import 'toastr/build/toastr.min.css'; // Import toastr CSS

// Configure toastr (you can adjust these options as needed)
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 3000
};

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const addUser = useUserStore((state) => state.addUser);

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response=await addUser(values);
      console.log(response);
      if(response.data.message.userCreated) 
      
      toastr.success(response.data.data);

    else
    {
      toastr.error(response.data);
    }
      resetForm();
    } catch (error) {
      console.error("Error creating user:", error);
      toastr.error(error.response.data.data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

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
          isSubmitting,
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
                label="Email Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email_address}
                name="email_address"
                error={!!touched.email_address && !!errors.email_address}
                helperText={touched.email_address && errors.email_address}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                select
                label="Role"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roleName}
                name="roleName"
                error={!!touched.roleName && !!errors.roleName}
                helperText={touched.roleName && errors.roleName}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="hr">HR</MenuItem>
              </TextField>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button 
                type="submit" 
                color="secondary" 
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create New User"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  email_address: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
  roleName: yup.string().oneOf(["employee", "admin", "hr"], "Invalid roleName").required("Required"),
});

const initialValues = {
  email_address: "",
  password: "",
  roleName: "",
};

export default Form;