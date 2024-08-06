import { TextField, Typography } from "@mui/material";
import React from "react";

function EmergencyContact({
  handleBlur,
  handleChange,
  values,
  touched,
  errors,
}) {
  return (
    <>
      <Typography variant="h3" sx={{ gridColumn: "span 4" }}>
        Emergency Contact
      </Typography>
      <TextField
        fullWidth
        type="text"
        label="Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.contact_information.emergency_contact.name}
        name="contact_information.emergency_contact.name"
        error={
          !!touched.contact_information?.emergency_contact?.name &&
          !!errors.contact_information?.emergency_contact?.name
        }
        helperText={
          touched.contact_information?.emergency_contact?.name &&
          errors.contact_information?.emergency_contact?.name
            ? errors.contact_information.emergency_contact.name
            : ""
        }
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Relationship"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.contact_information.emergency_contact.relationship}
        name="contact_information.emergency_contact.relationship"
        error={
          !!touched.contact_information?.emergency_contact?.relationship &&
          !!errors.contact_information?.emergency_contact?.relationship
        }
        helperText={
          touched.contact_information?.emergency_contact?.relationship &&
          errors.contact_information?.emergency_contact?.relationship
            ? errors.contact_information.emergency_contact.relationship
            : ""
        }
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        type="tel"
        label="Phone Number"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.contact_information.emergency_contact.phone_number}
        name="contact_information.emergency_contact.phone_number"
        error={
          !!touched.contact_information?.emergency_contact?.phone_number &&
          !!errors.contact_information?.emergency_contact?.phone_number
        }
        helperText={
          touched.contact_information?.emergency_contact?.phone_number &&
          errors.contact_information?.emergency_contact?.phone_number
            ? errors.contact_information.emergency_contact.phone_number
            : ""
        }
        sx={{ gridColumn: "span 1" }}
      />
    </>
  );
}

export default EmergencyContact;
