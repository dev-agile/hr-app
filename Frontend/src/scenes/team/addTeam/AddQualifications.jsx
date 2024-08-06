import { Box, Button, TextField, Typography } from "@mui/material";
import { Field, Form, FieldArray, Formik } from "formik";
import React from "react";
import { addQualificationValidationSchema } from "../../../utils/schema";
import { addQualificationsInitialValues } from "../../../utils/formInitialValues";

const AddQualifications = () => {
  const handleSubmit = (values) => {
    console.log("Submitted values:", values);
  };

  return (
    <Box m="20px">
      <Typography variant="h3" sx={{ gridColumn: "span 4" }}>
        Educational Background
      </Typography>
      <Formik
        initialValues={addQualificationsInitialValues}
        validationSchema={addQualificationValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <FieldArray
              name="educationalBackground"
              render={({ push, remove }) => (
                <Box>
                  {values?.educationalBackground?.map((background, index) => (
                    <Box
                      key={index}
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      marginBlock={2}
                    >
                      <Field
                        name={`educationalBackground[${index}].degree`}
                        as={TextField}
                        label="Degree"
                        type="text"
                        sx={{ gridColumn: "span 1" }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={background.degree}
                        error={
                          touched.educationalBackground?.[index]?.degree &&
                          Boolean(errors.educationalBackground?.[index]?.degree)
                        }
                        helperText={
                          touched.educationalBackground?.[index]?.degree &&
                          errors.educationalBackground?.[index]?.degree
                        }
                      />
                      <Field
                        name={`educationalBackground[${index}].graduation_date`}
                        as={TextField}
                        label="Graduation Date"
                        type="date"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={background.graduation_date}
                        error={
                          touched.educationalBackground?.[index]
                            ?.graduation_date &&
                          Boolean(
                            errors.educationalBackground?.[index]
                              ?.graduation_date
                          )
                        }
                        helperText={
                          touched.educationalBackground?.[index]
                            ?.graduation_date &&
                          errors.educationalBackground?.[index]?.graduation_date
                        }
                      />
                      <Field
                        name={`educationalBackground[${index}].institution`}
                        as={TextField}
                        label="Institution"
                        type="text"
                        sx={{ gridColumn: "span 1" }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={background.institution}
                        error={
                          touched.educationalBackground?.[index]?.institution &&
                          Boolean(
                            errors.educationalBackground?.[index]?.institution
                          )
                        }
                        helperText={
                          touched.educationalBackground?.[index]?.institution &&
                          errors.educationalBackground?.[index]?.institution
                        }
                      />
                      <Button
                        type="button"
                        color="error"
                        variant="contained"
                        disabled={
                          (values?.educationalBackground?.length ?? 0) < 2
                        }
                        onClick={() => remove(index)}
                        sx={{
                          mt: 2,
                          width: 80,
                          height: 35,
                          gridColumn: "span 1",
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}
                  <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() =>
                      push({
                        degree: "",
                        institution: "",
                        graduation_date: "",
                      })
                    }
                  >
                    Add Educational Background
                  </Button>
                </Box>
              )}
            />
            <Typography variant="h3" sx={{ gridColumn: "span 4", mt: 4 }}>
              Certifications
            </Typography>
            <FieldArray
              name="certifications"
              render={({ push, remove }) => (
                <Box>
                  {values?.certifications?.map((cert, index) => (
                    <Box
                      key={index}
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      marginBlock={2}
                    >
                      <Field
                        name={`certifications[${index}].name`}
                        as={TextField}
                        label="Certification Name"
                        type="text"
                        sx={{ gridColumn: "span 1" }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={cert.name}
                        error={
                          touched.certifications?.[index]?.name &&
                          Boolean(errors.certifications?.[index]?.name)
                        }
                        helperText={
                          touched.certifications?.[index]?.name &&
                          errors.certifications?.[index]?.name
                        }
                      />
                      <Field
                        name={`certifications[${index}].institution`}
                        as={TextField}
                        label="Institution"
                        type="text"
                        sx={{ gridColumn: "span 1" }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={cert.institution}
                        error={
                          touched.certifications?.[index]?.institution &&
                          Boolean(errors.certifications?.[index]?.institution)
                        }
                        helperText={
                          touched.certifications?.[index]?.institution &&
                          errors.certifications?.[index]?.institution
                        }
                      />
                      <Field
                        name={`certifications[${index}].date_obtained`}
                        as={TextField}
                        label="Date Obtained"
                        type="date"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={cert.date_obtained}
                        error={
                          touched.certifications?.[index]?.date_obtained &&
                          Boolean(errors.certifications?.[index]?.date_obtained)
                        }
                        helperText={
                          touched.certifications?.[index]?.date_obtained &&
                          errors.certifications?.[index]?.date_obtained
                        }
                      />
                      <Button
                        type="button"
                        color="error"
                        variant="contained"
                        disabled={(values?.certifications?.length ?? 0) < 2}
                        onClick={() => remove(index)}
                        sx={{
                          mt: 2,
                          width: 80,
                          height: 35,
                          gridColumn: "span 1",
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}
                  <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() =>
                      push({
                        name: "",
                        institution: "",
                        date_obtained: "",
                      })
                    }
                  >
                    Add Certification
                  </Button>
                </Box>
              )}
            />
            <Typography variant="h3" sx={{ gridColumn: "span 4", mt: 4 }}>
              Skills
            </Typography>
            <FieldArray
              name="skills"
              render={({ push, remove }) => (
                <Box>
                  {values?.skills?.map((skill, index) => (
                    <Box
                      key={index}
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      marginBlock={2}
                    >
                      <Field
                        name={`skills[${index}]`}
                        as={TextField}
                        label="Skill"
                        type="text"
                        sx={{ gridColumn: "span 2" }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={skill}
                        error={
                          touched.skills?.[index] &&
                          Boolean(errors.skills?.[index])
                        }
                        helperText={
                          touched.skills?.[index] && errors.skills?.[index]
                        }
                      />
                      <Button
                        type="button"
                        color="error"
                        variant="contained"
                        disabled={(values?.skills?.length ?? 0) < 2}
                        onClick={() => remove(index)}
                        sx={{ mt: 2, width: 80, gridColumn: "span 1" }}
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}
                  <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => push("")}
                  >
                    Add Skill
                  </Button>
                </Box>
              )}
            />
            <Typography variant="h3" sx={{ gridColumn: "span 4", mt: 4 }}>
              Languages Spoken
            </Typography>
            <FieldArray
              name="languages_spoken"
              render={({ push, remove }) => (
                <Box>
                  {values?.languages_spoken?.map((languageSpoken, index) => (
                    <Box
                      key={index}
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      marginBlock={2}
                    >
                      <Field
                        name={`languages_spoken[${index}]`}
                        as={TextField}
                        label="Languages Spoken"
                        type="text"
                        sx={{ gridColumn: "span 2" }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={languageSpoken}
                        error={
                          touched.languages_spoken?.[index] &&
                          Boolean(errors.languages_spoken?.[index])
                        }
                        helperText={
                          touched.languages_spoken?.[index] &&
                          errors.languages_spoken?.[index]
                        }
                      />
                      <Button
                        type="button"
                        color="error"
                        variant="contained"
                        disabled={(values?.languages_spoken?.length ?? 0) < 2}
                        onClick={() => remove(index)}
                        sx={{ mt: 2, width: 80, gridColumn: "span 1" }}
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}
                  <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => push("")}
                  >
                    Add Skill
                  </Button>
                </Box>
              )}
            />
            <Typography variant="h3" sx={{ gridColumn: "span 4", mt: 4 }}>
              Work Experience
            </Typography>
            <FieldArray
              name="work_experience"
              render={({ push, remove }) => (
                <Box>
                  {values?.work_experience?.map((work, index) => (
                    <Box
                      key={index}
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      marginBlock={2}
                    >
                      <Field
                        name={`work_experience[${index}].employer`}
                        as={TextField}
                        label="Employer"
                        type="text"
                        sx={{ gridColumn: "span 2" }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={work.employer}
                        error={
                          touched.work_experience?.[index]?.employer &&
                          Boolean(errors.work_experience?.[index]?.employer)
                        }
                        helperText={
                          touched.work_experience?.[index]?.employer &&
                          errors.work_experience?.[index]?.employer
                        }
                      />
                      <Field
                        name={`work_experience[${index}].job_title`}
                        as={TextField}
                        label="Job Title"
                        type="text"
                        sx={{ gridColumn: "span 2" }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={work.job_title}
                        error={
                          touched.work_experience?.[index]?.job_title &&
                          Boolean(errors.work_experience?.[index]?.job_title)
                        }
                        helperText={
                          touched.work_experience?.[index]?.job_title &&
                          errors.work_experience?.[index]?.job_title
                        }
                      />
                      <Field
                        name={`work_experience[${index}].start_date`}
                        as={TextField}
                        label="Start Date"
                        type="date"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={work.start_date}
                        error={
                          touched.work_experience?.[index]?.start_date &&
                          Boolean(errors.work_experience?.[index]?.start_date)
                        }
                        helperText={
                          touched.work_experience?.[index]?.start_date &&
                          errors.work_experience?.[index]?.start_date
                        }
                      />
                      <Field
                        name={`work_experience[${index}].end_date`}
                        as={TextField}
                        label="End Date"
                        type="date"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={work.end_date}
                        error={
                          touched.work_experience?.[index]?.end_date &&
                          Boolean(errors.work_experience?.[index]?.end_date)
                        }
                        helperText={
                          touched.work_experience?.[index]?.end_date &&
                          errors.work_experience?.[index]?.end_date
                        }
                      />
                      <Button
                        type="button"
                        color="error"
                        variant="contained"
                        disabled={(values?.work_experience?.length ?? 0) < 2}
                        onClick={() => remove(index)}
                        sx={{ mt: 2, width: 80, gridColumn: "span 1" }}
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}
                  <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() =>
                      push({
                        employer: "",
                        job_title: "",
                        start_date: "",
                        end_date: "",
                      })
                    }
                  >
                    Add Work Experience
                  </Button>
                </Box>
              )}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
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

export default AddQualifications;
