import { TextField, Typography } from "@mui/material";
import React from "react";

function CurrentAddress({ handleBlur, handleChange, values, touched, errors }) {
  return (
    <>
      <Typography variant="h3" sx={{ gridColumn: "span 4" }}>
        Current Address
      </Typography>
      <TextField
        fullWidth
        type="text"
        label="Street"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.contact_information.address.current.street}
        name="contact_information.address.current.street"
        error={
          !!touched.contact_information?.address?.current?.street &&
          !!errors.contact_information?.address?.current?.street
        }
        helperText={
          touched.contact_information?.address?.current?.street &&
          errors.contact_information?.address?.current?.street
            ? errors.contact_information.address.current.street
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
        value={values.contact_information.address.current.city}
        name="contact_information.address.current.city"
        error={
          !!touched.contact_information?.address?.current?.city &&
          !!errors.contact_information?.address?.current?.city
        }
        helperText={
          touched.contact_information?.address?.current?.city &&
          errors.contact_information?.address?.current?.city
            ? errors.contact_information.address.current?.city
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
        value={values.contact_information.address.current.state}
        name="contact_information.address.current.state"
        error={
          !!touched.contact_information?.address?.current?.state &&
          !!errors.contact_information?.address?.current?.state
        }
        helperText={
          touched.contact_information?.address?.current?.state &&
          errors.contact_information?.address?.current?.state
            ? errors.contact_information.address.current?.state
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
        value={values.contact_information.address.current.zip_code}
        name="contact_information.address.current.zip_code"
        error={
          !!touched.contact_information?.address?.current?.zip_code &&
          !!errors.contact_information?.address?.current?.zip_code
        }
        helperText={
          touched.contact_information?.address?.current?.zip_code &&
          errors.contact_information?.address?.current?.zip_code
            ? errors.contact_information.address.current?.zip_code
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
        value={values.contact_information.address.current.country}
        name="contact_information.address.current.country"
        error={
          !!touched.contact_information?.address?.current?.country &&
          !!errors.contact_information?.address?.current?.country
        }
        helperText={
          touched.contact_information?.address?.current?.country &&
          errors.contact_information?.address?.current?.country
            ? errors.contact_information.address.current?.country
            : ""
        }
        sx={{ gridColumn: "span 1" }}
      />
    </>
  );
}

export default CurrentAddress;
