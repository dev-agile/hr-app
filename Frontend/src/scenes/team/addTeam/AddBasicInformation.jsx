import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { basicInfoSchema } from "../../../utils/schema";
import { basicInfoInitialValues } from "../../../utils/formInitialValues";
import EmergencyContact from "./components/EmergencyContact";
import CurrentAddress from "./components/CurrentAddress";
import ContactInformation from "./components/ContactInformation";

const AddBasicInformation = ({user1}) => {
  const { user, employee } = user1 || {};
  const [avatarURL, setAvatarURL] = React.useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const fileUploadRef = React.useRef();

  const handleFormSubmit = (values) => {
    console.log({
      ...values,
      photo: avatarURL,
    });
  };

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };

  const uploadImageDisplay = () => {
    try {
      const uploadedFile = fileUploadRef.current.files[0];
      if (!uploadedFile) {
        throw new Error("No file selected");
      }

      const cachedURL = URL.createObjectURL(uploadedFile);
      setAvatarURL(cachedURL);
    } catch (error) {
      console.error(error);
      setAvatarURL("");
    }
  };
  const initialValues = {
    ...basicInfoInitialValues,
    first_name: employee?.first_name || "",
    last_name: employee?.last_name || "",
    email_address: user?.email_address || "",
    father_name: employee?.father_name || "",
    mother_name: employee?.mother_name || "",
    date_of_birth: employee?.date_of_birth ? new Date(employee.date_of_birth).toISOString().split('T')[0] : "",
    gender: employee?.gender || "",
    marital_status: employee?.marital_status || "",
    nationality: employee?.nationality || "",
    designation: employee?.designation || "",
    joining_date: employee?.joining_date ? new Date(employee.joining_date).toISOString().split('T')[0] : "",
    ending_date: employee?.ending_date ? new Date(employee.ending_date).toISOString().split('T')[0] : "",
    phone_number: employee?.contact_information?.phone_number || "",
    emergency_contact: {
      name: employee?.contact_information?.emergency_contact?.name || "",
      relationship: employee?.contact_information?.emergency_contact?.relationship || "",
      phone_number: employee?.contact_information?.emergency_contact?.phone_number || "",
    },
    current_address: {
      street: employee?.contact_information?.address?.current?.street || "",
      city: employee?.contact_information?.address?.current?.city || "",
      state: employee?.contact_information?.address?.current?.state || "",
      zip_code: employee?.contact_information?.address?.current?.zip_code || "",
      country: employee?.contact_information?.address?.current?.country || "",
    },
  };
  console.log("AddBasicInformation",user);

  return (
    <Box m="20px">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={basicInfoSchema}
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
            <input
              type="file"
              accept="image/*"
              id="file"
              ref={fileUploadRef}
              onChange={uploadImageDisplay}
              hidden
            />
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Box
                sx={{
                  gridColumn: "span 4",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <img
                  src={avatarURL || "https://avatar.iran.liara.run/public/38"}
                  alt="user profile"
                  style={{
                    height: 200,
                    width: 200,
                    objectFit: "cover",
                    backgroundColor: avatarURL ? "transparent" : "grey",
                    borderRadius: "100%",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleImageUpload}
                >
                  Upload Image
                </Button>
              </Box>
              <TextField
                fullWidth
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                type="text"
                label="Designation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.designation}
                name="designation"
                error={!!touched.designation && !!errors.designation}
                helperText={touched.designation && errors.designation}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                type="text"
                label="Father's Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.father_name}
                name="father_name"
                error={!!touched.father_name && !!errors.father_name}
                helperText={touched.father_name && errors.father_name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                type="text"
                label="Mother's name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mother_name}
                name="mother_name"
                error={!!touched.mother_name && !!errors.mother_name}
                helperText={touched.mother_name && errors.mother_name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                type="date"
                label="Joining Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.joining_date}
                name="joining_date"
                error={!!touched.joining_date && !!errors.joining_date}
                helperText={touched.joining_date && errors.joining_date}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                type="date"
                label="Ending Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ending_date}
                name="ending_date"
                error={!!touched.ending_date && !!errors.ending_date}
                helperText={touched.ending_date && errors.ending_date}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                type="date"
                label="Date of birth"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dob}
                name="dob"
                error={!!touched.dob && !!errors.dob}
                helperText={touched.dob && errors.dob}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                type="text"
                label="Gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                name="gender"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                type="text"
                label="Nationality"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nationality}
                name="nationality"
                error={!!touched.nationality && !!errors.nationality}
                helperText={touched.nationality && errors.nationality}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                type="text"
                label="Maritial Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.marital_status}
                name="marital_status"
                error={!!touched.marital_status && !!errors.marital_status}
                helperText={touched.marital_status && errors.marital_status}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                type="text"
                label="Tech Stack"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tech_stack}
                name="tech_stack"
                error={!!touched.tech_stack && !!errors.tech_stack}
                helperText={touched.tech_stack && errors.tech_stack}
                sx={{ gridColumn: "span 4" }}
              />

              <ContactInformation
                values={values}
                touched={touched}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
              <CurrentAddress
                values={values}
                touched={touched}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
              <EmergencyContact
                values={values}
                touched={touched}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
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

export default AddBasicInformation;
