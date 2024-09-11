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
import * as yup from "yup";

const validationSchema = yup.object({
  documents: yup.array().of(
    yup.string().required("File path is required")
  ),
});


const Documents = ({user1}) => {
  const { employee } = user1 || {};
  const initialValues = {
    documents: employee?.documents || ["", ""],
  };
  const handleSubmit = (values) => {
    console.log("Submitted values:", values.documents);
  };

  return (
    <Box m="20px">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
                              const filePath = file ? file.name : "";
                              setFieldValue(`documents.${index}`, filePath);
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
                    onClick={() => push("")} // Add an empty string to the array
                  >
                    Add Document
                  </Button>
                </Box>
              )}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Documents;
