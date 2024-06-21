import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Grid,
  GridItem,
  Select,
  Switch,
  useToast,
  FormErrorMessage,
  Icon,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ReactSelect from "react-select";
import CreatableSelect from "react-select/creatable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiUpload } from "react-icons/fi";
import employeeService from "api/services/employeeService";

const validationSchema = Yup.object({
  id: Yup.string().required("ID is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  dob: Yup.date().required("Date of Birth is required"),
  techStack: Yup.array().of(Yup.string()).required("Tech Stack is required"),
  joiningDate: Yup.date().required("Joining Date is required"),
  endingDate: Yup.date(),
  pan: Yup.mixed().required("PAN is required"),
  aadhaar: Yup.mixed().required("Aadhaar is required"),
  group: Yup.array().of(Yup.string()).required("Group is required"),
  role: Yup.string().required("Role is required"),
  fathersName: Yup.string().required("Father's Name is required"),
  mothersName: Yup.string().required("Mother's Name is required"),
  address: Yup.string().required("Address is required"),
  tenthCertificate: Yup.mixed().required("10th Certificate is required"),
  twelfthCertificate: Yup.mixed().required("12th Certificate is required"),
  graduationCertificate: Yup.mixed().required(
    "Graduation Certificate is required"
  ),
});

const options = [
  { value: "group1", label: "Group 1" },
  { value: "group2", label: "Group 2" },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "white",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "white",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "white",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "black",
  }),
};

const CreateUserForm = () => {
  const toast = useToast();
  const location = useLocation();
  const { employee } = location.state || {};
  const initialValues = employee || {
    id: "",
    name: "",
    email: "",
    password: "",
    dob: "",
    techStack: [],
    joiningDate: "",
    endingDate: "",
    pan: null,
    aadhaar: null,
    group: [],
    role: "",
    avatar: null,
    currentlyWorking: true,
    fathersName: "",
    mothersName: "",
    address: "",
    tenthCertificate: null,
    twelfthCertificate: null,
    graduationCertificate: null,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        const payload = {
          id: values.id,
          first_name: values.name.split(" ")[0],
          last_name: values.name.split(" ")[1] || "",
          email: values.email,
          password: values.password,
          dob: values.dob,
          techStack: values.techStack,
          joiningDate: values.joiningDate,
          endingDate: values.endingDate,
          pan: values.pan,
          aadhaar: values.aadhaar,
          group: values.group,
          role: values.role,
          fathersName: values.fathersName,
          mothersName: values.mothersName,
          address: values.address,
          tenthCertificate: values.tenthCertificate,
          twelfthCertificate: values.twelfthCertificate,
          graduationCertificate: values.graduationCertificate,
          currentlyWorking: values.currentlyWorking,
        };

        const formData = new FormData();
        Object.keys(payload).forEach((key) => {
          if (Array.isArray(payload[key])) {
            payload[key].forEach((item) => formData.append(key, item));
          } else {
            formData.append(key, payload[key]);
          }
        });

        employeeService
          .createOrUpdateEmployee(formData)
          .then((response) => {
            toast({
              title: "User updated.",
              description: "The user details have been updated successfully.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            actions.resetForm();
          })
          .catch((error) => {
            toast({
              title: "An error occurred.",
              description: error.response
                ? error.response.data.message
                : error.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          });
      }}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form>
          <Box p="8" mt={20} borderWidth="1px" borderRadius="lg" bg="white">
            <VStack spacing="6" align="start">
              <Grid templateColumns="repeat(2, 1fr)" gap="6" w="100%">
                <GridItem>
                  <FormControl isInvalid={!!errors.id && touched.id}>
                    <FormLabel htmlFor="id">ID</FormLabel>
                    <Field
                      as={Input}
                      id="id"
                      name="id"
                      placeholder="ID"
                      bg="white"
                    />
                    <FormErrorMessage>{errors.id}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isInvalid={!!errors.name && touched.name}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Field
                      as={Input}
                      id="name"
                      name="name"
                      placeholder="Name"
                      bg="white"
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      placeholder="Email"
                      bg="white"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      bg="white"
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isInvalid={!!errors.dob && touched.dob}>
                    <FormLabel htmlFor="dob">Date of Birth</FormLabel>
                    <Field name="dob">
                      {({ field }) => (
                        <DatePicker
                          id="dob"
                          {...field}
                          selected={field.value}
                          onChange={(val) => setFieldValue("dob", val)}
                          placeholderText="Select Date of Birth"
                          dateFormat="yyyy-MM-dd"
                          className="chakra-input css-1c6u5d2"
                        />
                      )}
                    </Field>
                    <FormErrorMessage>{errors.dob}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl
                    isInvalid={!!errors.techStack && touched.techStack}
                  >
                    <FormLabel htmlFor="techStack">Tech Stack</FormLabel>
                    <CreatableSelect
                      isMulti
                      id="techStack"
                      name="techStack"
                      placeholder="Select or type tech stack"
                      styles={customStyles}
                      onChange={(selectedOptions) =>
                        setFieldValue(
                          "techStack",
                          selectedOptions
                            ? selectedOptions.map((option) => option.value)
                            : []
                        )
                      }
                      value={values.techStack.map((tech) => ({
                        value: tech,
                        label: tech,
                      }))}
                    />
                    <FormErrorMessage>{errors.techStack}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl
                    isInvalid={!!errors.joiningDate && touched.joiningDate}
                  >
                    <FormLabel htmlFor="joiningDate">Joining Date</FormLabel>
                    <Field name="joiningDate">
                      {({ field }) => (
                        <DatePicker
                          id="joiningDate"
                          {...field}
                          selected={field.value}
                          onChange={(val) => setFieldValue("joiningDate", val)}
                          placeholderText="Select Joining Date"
                          dateFormat="yyyy-MM-dd"
                          className="chakra-input css-1c6u5d2"
                        />
                      )}
                    </Field>
                    <FormErrorMessage>{errors.joiningDate}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl
                    isInvalid={!!errors.endingDate && touched.endingDate}
                  >
                    <FormLabel htmlFor="endingDate">Ending Date</FormLabel>
                    <Field name="endingDate">
                      {({ field }) => (
                        <DatePicker
                          id="endingDate"
                          {...field}
                          selected={field.value}
                          onChange={(val) => setFieldValue("endingDate", val)}
                          placeholderText="Select Ending Date"
                          dateFormat="yyyy-MM-dd"
                          className="chakra-input css-1c6u5d2"
                          disabled={values.currentlyWorking}
                        />
                      )}
                    </Field>
                    <FormErrorMessage>{errors.endingDate}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isInvalid={!!errors.group && touched.group}>
                    <FormLabel htmlFor="group">Group (multiselect)</FormLabel>
                    <ReactSelect
                      id="group"
                      name="group"
                      options={options}
                      isMulti
                      styles={customStyles}
                      onChange={(selectedOptions) =>
                        setFieldValue(
                          "group",
                          selectedOptions
                            ? selectedOptions.map((option) => option.value)
                            : []
                        )
                      }
                      value={values.group.map((group) => ({
                        value: group,
                        label: group,
                      }))}
                    />
                    <FormErrorMessage>{errors.group}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isInvalid={!!errors.role && touched.role}>
                    <FormLabel htmlFor="role">Role</FormLabel>
                    <Select
                      id="role"
                      name="role"
                      placeholder="Choose Role"
                      bg="white"
                      onChange={(e) => setFieldValue("role", e.target.value)}
                      value={values.role}
                    >
                      <option value="Frontend">Front End Developer</option>
                      <option value="Backend">Back End Developer</option>
                      <option value="Tester">Tester</option>
                    </Select>
                    <FormErrorMessage>{errors.role}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl
                    isInvalid={!!errors.fathersName && touched.fathersName}
                  >
                    <FormLabel htmlFor="fathersName">Father's Name</FormLabel>
                    <Field
                      as={Input}
                      id="fathersName"
                      name="fathersName"
                      placeholder="Father's Name"
                      bg="white"
                    />
                    <FormErrorMessage>{errors.fathersName}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl
                    isInvalid={!!errors.mothersName && touched.mothersName}
                  >
                    <FormLabel htmlFor="mothersName">Mother's Name</FormLabel>
                    <Field
                      as={Input}
                      id="mothersName"
                      name="mothersName"
                      placeholder="Mother's Name"
                      bg="white"
                    />
                    <FormErrorMessage>{errors.mothersName}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isInvalid={!!errors.address && touched.address}>
                    <FormLabel htmlFor="address">Address</FormLabel>
                    <Field
                      as={Input}
                      id="address"
                      name="address"
                      placeholder="Address"
                      bg="white"
                    />
                    <FormErrorMessage>{errors.address}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isInvalid={!!errors.pan && touched.pan}>
                    <FormLabel htmlFor="pan">PAN</FormLabel>
                    <Button
                      colorScheme="purple"
                      onClick={() => document.getElementById("pan").click()}
                    >
                      Upload PAN
                      <Icon as={FiUpload} m={2} />
                    </Button>
                    <input
                      id="pan"
                      name="pan"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(event) => {
                        setFieldValue("pan", event.currentTarget.files[0]);
                      }}
                    />
                    <FormErrorMessage>{errors.pan}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isInvalid={!!errors.aadhaar && touched.aadhaar}>
                    <FormLabel htmlFor="aadhaar">Aadhaar</FormLabel>
                    <Button
                      colorScheme="purple"
                      onClick={() => document.getElementById("aadhaar").click()}
                    >
                      Upload Aadhaar
                      <Icon as={FiUpload} m={2} />
                    </Button>
                    <input
                      id="aadhaar"
                      name="aadhaar"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(event) => {
                        setFieldValue("aadhaar", event.currentTarget.files[0]);
                      }}
                    />
                    <FormErrorMessage>{errors.aadhaar}</FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl
                    isInvalid={
                      !!errors.tenthCertificate && touched.tenthCertificate
                    }
                  >
                    <FormLabel htmlFor="tenthCertificate">
                      10th Certificate
                    </FormLabel>
                    <Button
                      colorScheme="purple"
                      onClick={() =>
                        document.getElementById("tenthCertificate").click()
                      }
                    >
                      Upload 10th Certificate
                      <Icon as={FiUpload} m={2} />
                    </Button>
                    <input
                      id="tenthCertificate"
                      name="tenthCertificate"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(event) => {
                        setFieldValue(
                          "tenthCertificate",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                    <FormErrorMessage>
                      {errors.tenthCertificate}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl
                    isInvalid={
                      !!errors.twelfthCertificate && touched.twelfthCertificate
                    }
                  >
                    <FormLabel htmlFor="twelfthCertificate">
                      12th Certificate
                    </FormLabel>
                    <Button
                      colorScheme="purple"
                      onClick={() =>
                        document.getElementById("twelfthCertificate").click()
                      }
                    >
                      Upload 12th Certificate
                      <Icon as={FiUpload} m={2} />
                    </Button>
                    <input
                      id="twelfthCertificate"
                      name="twelfthCertificate"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(event) => {
                        setFieldValue(
                          "twelfthCertificate",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                    <FormErrorMessage>
                      {errors.twelfthCertificate}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl
                    isInvalid={
                      !!errors.graduationCertificate &&
                      touched.graduationCertificate
                    }
                  >
                    <FormLabel htmlFor="graduationCertificate">
                      Graduation Certificate
                    </FormLabel>
                    <Button
                      colorScheme="purple"
                      onClick={() =>
                        document.getElementById("graduationCertificate").click()
                      }
                    >
                      Upload Graduation Certificate
                      <Icon as={FiUpload} m={2} />
                    </Button>
                    <input
                      id="graduationCertificate"
                      name="graduationCertificate"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(event) => {
                        setFieldValue(
                          "graduationCertificate",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                    <FormErrorMessage>
                      {errors.graduationCertificate}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
              </Grid>
              <FormControl>
                <FormLabel htmlFor="avatar">Profile Pic</FormLabel>
                <Button
                  colorScheme="purple"
                  onClick={() => document.getElementById("avatar").click()}
                >
                  Upload Recent Photo
                  <Icon as={FiUpload} m={2} />
                </Button>
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    setFieldValue("avatar", event.currentTarget.files[0]);
                  }}
                />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="currentlyWorking" mb="0">
                  Currently Working?
                </FormLabel>
                <Field
                  as={Switch}
                  id="currentlyWorking"
                  name="currentlyWorking"
                  isChecked={values.currentlyWorking}
                  onChange={(e) => {
                    setFieldValue("currentlyWorking", e.target.checked);
                    if (e.target.checked) {
                      setFieldValue("endingDate", "");
                    } else {
                      setFieldValue("endingDate", new Date());
                    }
                  }}
                />
              </FormControl>
              <Box alignSelf="end">
                <Button type="submit" colorScheme="blue">
                  Submit
                </Button>
              </Box>
            </VStack>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CreateUserForm;
