import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const LeaveRequestSchema = Yup.object().shape({
  typeOfLeave: Yup.string().required("Required"),
  reason: Yup.string().required("Required"),
  startDate: Yup.date().required("Required"),
  endDate: Yup.date().required("Required"),
});

const LeaveRequestForm = () => {
  return (
    <Box bg="white" p={6} borderRadius="8px" boxShadow="md" width="50vw">
      <Formik
        initialValues={{
          typeOfLeave: "",
          reason: "",
          startDate: "",
          endDate: "",
        }}
        validationSchema={LeaveRequestSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm()
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <FormControl mb={4}>
              <FormLabel>Type of Leave</FormLabel>
              <Field as={Select} name="typeOfLeave">
                <option value="">Select type</option>
                <option value="sick">Sick Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="earned">Earned Leave</option>
              </Field>
              <ErrorMessage
                name="typeOfLeave"
                component="div"
                style={{ color: "red" }}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Reason</FormLabel>
              <Field as={Textarea} name="reason" placeholder="Reason" />
              <ErrorMessage
                name="reason"
                component="div"
                style={{ color: "red" }}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Days</FormLabel>
              <Stack direction="row" spacing={4}>
                <Field as={Input} type="date" name="startDate" />
                <Field as={Input} type="date" name="endDate" />
              </Stack>
              <ErrorMessage
                name="startDate"
                component="div"
                style={{ color: "red" }}
              />
              <ErrorMessage
                name="endDate"
                component="div"
                style={{ color: "red" }}
              />
            </FormControl>

            <Button type="submit" colorScheme="teal" width="full">
              Apply for Leave
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LeaveRequestForm;
