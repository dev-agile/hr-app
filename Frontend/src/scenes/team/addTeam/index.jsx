import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Header from "../../../components/Header";
import React from "react";
import AddBasicInformation from "./AddBasicInformation";
import AddQualifications from "./AddQualifications";
import Documents from "./Documents";

const steps = [
  "Add Basic Information",
  "Add Education Information",
  "Add Documents",
];

const InformationScreen = ({ activeStep }) => {
  switch (activeStep) {
    case 0:
      return <AddBasicInformation />;
    case 1:
      return <AddQualifications />;
    case 2:
      return <Documents />;
    default:
      return <div>Invalid step: {activeStep}</div>;
  }
};

const AddTeam = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box m="20px" sx={{ height: "calc(100vh - 100px)", overflowY: "auto" }}>
      <Header
        title="Add a Team Member"
        subtitle="Add a new Team Member Profile"
      />
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <InformationScreen activeStep={activeStep} />
          <Box sx={{ display: "flex", flexDirection: "row", py: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              color="inherit"
              variant="contained"
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext} color="secondary" variant="contained">
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default AddTeam;
