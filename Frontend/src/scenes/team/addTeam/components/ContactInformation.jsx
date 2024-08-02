import { TextField, Typography } from "@mui/material";
import React from "react";

function ContactInformation({
  handleBlur,
  handleChange,
  values,
  touched,
  errors,
}) {
  return (
    <>
      <Typography variant="h3" sx={{ gridColumn: "span 4" }}>
        Contact Information
      </Typography>
      <TextField
        fullWidth
        type="email"
        label="Email"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.contact_information.email}
        name="contact_information.email"
        error={
          !!touched.contact_information &&
          !!touched.contact_information.email &&
          !!errors.contact_information &&
          !!errors.contact_information.email
        }
        helperText={
          touched.contact_information &&
          touched.contact_information.email &&
          errors.contact_information &&
          errors.contact_information.email
        }
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="tel"
        label="Phone Number"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.contact_information.phone_number}
        name="contact_information.phone_number"
        error={
          !!touched.contact_information &&
          !!touched.contact_information.phone_number &&
          !!errors.contact_information &&
          !!errors.contact_information.phone_number
        }
        helperText={
          touched.contact_information &&
          touched.contact_information.phone_number &&
          errors.contact_information &&
          errors.contact_information.phone_number
        }
        sx={{ gridColumn: "span 2" }}
      />
      <Typography variant="h3" sx={{ gridColumn: "span 4" }}>
        Permanent Address
      </Typography>
      <TextField
        fullWidth
        type="text"
        label="Street"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.contact_information.address.permanent.street}
        name="contact_information.address.permanent.street"
        error={
          !!touched.contact_information?.address?.permanent?.street &&
          !!errors.contact_information?.address?.permanent?.street
        }
        helperText={
          touched.contact_information?.address?.permanent?.street &&
          errors.contact_information?.address?.permanent?.street
            ? errors.contact_information.address.permanent.street
            : ""
        }
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        fullWidth
        type="text"
        label="City"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.contact_information.address.permanent.city}
        name="contact_information.address.permanent.city"
        error={
          !!touched.contact_information?.address?.permanent?.city &&
          !!errors.contact_information?.address?.permanent?.city
        }
        helperText={
          touched.contact_information?.address?.permanent?.city &&
          errors.contact_information?.address?.permanent?.city
            ? errors.contact_information.address.permanent?.city
            : ""
        }
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        type="text"
        label="State"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.contact_information.address.permanent.state}
        name="contact_information.address.permanent.state"
        error={
          !!touched.contact_information?.address?.permanent?.state &&
          !!errors.contact_information?.address?.permanent?.state
        }
        helperText={
          touched.contact_information?.address?.permanent?.state &&
          errors.contact_information?.address?.permanent?.state
            ? errors.contact_information.address.permanent?.state
            : ""
        }
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Zip Code"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.contact_information.address.permanent.zip_code}
        name="contact_information.address.permanent.zip_code"
        error={
          !!touched.contact_information?.address?.permanent?.zip_code &&
          !!errors.contact_information?.address?.permanent?.zip_code
        }
        helperText={
          touched.contact_information?.address?.permanent?.zip_code &&
          errors.contact_information?.address?.permanent?.zip_code
            ? errors.contact_information.address.permanent?.zip_code
            : ""
        }
        sx={{ gridColumn: "span 1" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Country"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.contact_information.address.permanent.country}
        name="contact_information.address.permanent.country"
        error={
          !!touched.contact_information?.address?.permanent?.country &&
          !!errors.contact_information?.address?.permanent?.country
        }
        helperText={
          touched.contact_information?.address?.permanent?.country &&
          errors.contact_information?.address?.permanent?.country
            ? errors.contact_information.address.permanent?.country
            : ""
        }
        sx={{ gridColumn: "span 1" }}
      />
    </>
  );
}

export default ContactInformation;
