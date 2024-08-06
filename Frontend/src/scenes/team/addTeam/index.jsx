import { Box, Step, StepLabel, Stepper } from "@mui/material";
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

const InformationScreen = ({ activeStep, setActiveStep, handleBack }) => {
  switch (activeStep) {
    case 0:
      return <AddBasicInformation setActiveStep={setActiveStep} />;
    case 1:
      return (
        <AddQualifications
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          handleBack={handleBack}
        />
      );
    case 2:
      return (
        <Documents
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          handleBack={handleBack}
        />
      );
    default:
      return <div>Invalid step: {activeStep}</div>;
  }
};

const AddTeam = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        <InformationScreen
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          handleBack={handleBack}
        />
      </React.Fragment>
    </Box>
  );
};

export default AddTeam;
