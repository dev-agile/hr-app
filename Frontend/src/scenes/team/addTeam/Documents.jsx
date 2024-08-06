import React from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { Form, FieldArray, Formik } from "formik";
import { documentValidationSchema } from "../../../utils/schema";
import axiosInstance from "../../../utils/axiosInstance";
import { useToast } from "../../../components/ToastNotification";

const initialValues = {
  documents: ["", ""],
};

const Documents = ({ activeStep, handleBack }) => {
  const { showSuccess } = useToast();
  const addTeamDetails = JSON.parse(localStorage.getItem("addTeamDetails"));

  const handleSubmit = async (values) => {
    const payload = {
      ...addTeamDetails,
      ...values,
    };

    const form = new FormData();
    for (const key in payload) {
      if (Array.isArray(payload[key])) {
        payload[key].forEach((item, index) => {
          if (key === "documents") {
            form.append(key, JSON.stringify(payload[key]));
          } else {
            if (item instanceof File) {
              form.append(`${key}[${index}]`, item);
            } else if (typeof item === "string" && item.startsWith("blob:")) {
              form.append(`${key}[${index}]`, item);
            }
          }
        });
      } else if (
        key === "contact_information" ||
        key === "skills_and_qualifications"
      ) {
        form.append(key, JSON.stringify(payload[key]));
      } else {
        form.append(key, payload[key]);
      }
    }
    try {
      const response = await axiosInstance.post(
        "/admin/employees/upsert",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      showSuccess(response.data.message);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box m="20px">
      <Formik
        initialValues={initialValues}
        validationSchema={documentValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <FieldArray
              name="documents"
              render={({ push, remove }) => (
                <Box>
                  {values.documents.map((filePath, index) => (
                    <Box key={index}>
                      <Typography variant="h4">
                        {index === 0
                          ? "Upload Aadhar"
                          : index === 1
                          ? "Upload PAN Card"
                          : `Upload Document ${index + 1}`}
                      </Typography>
                      <Box
                        display="flex"
                        alignItems="center"
                        gap="10px"
                        sx={{ marginBlock: 2 }}
                      >
                        <FormControl fullWidth>
                          <OutlinedInput
                            id={`documents.${index}`}
                            type="file"
                            inputProps={{ accept: ".pdf,.jpg,.png" }}
                            onChange={(event) => {
                              const file = event.currentTarget.files[0];
                              const cachedURL = URL.createObjectURL(file);

                              setFieldValue(`documents.${index}`, cachedURL);
                            }}
                          />
                          <FormHelperText
                            error={Boolean(
                              touched.documents?.[index] &&
                                errors.documents?.[index]
                            )}
                          >
                            {touched.documents?.[index] &&
                              errors.documents?.[index]}
                          </FormHelperText>
                        </FormControl>
                        <Button
                          type="button"
                          variant="contained"
                          color="error"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  ))}
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={() => push("")}
                  >
                    Add Document
                  </Button>
                </Box>
              )}
            />

            <Box sx={{ display: "flex", flexDirection: "row", py: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mt: 2 }}
                color="inherit"
                variant="contained"
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Documents;
