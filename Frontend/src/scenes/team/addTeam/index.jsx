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
import useUserStore from "../../../store/userStore";
import { useLocation } from 'react-router-dom';
const steps = [
  "Add Basic Information",
  "Add Education Information",
  "Add Documents",
];


const AddTeam = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('user_id');
  const getUser = useUserStore((state) => state.getUser);
  const currentUser = useUserStore((state)=>state.currentUser);
  console.log("Current user: " + JSON.stringify(currentUser));
  React.useEffect(() => {
    if (userId) {
      // Fetch user data using the userId
      console.log("Editing user with ID:", userId);
      const getUserData=async()=>
      {
        const response=await getUser(userId);
        console.log("User data:", response);
      }
      getUserData();
     
      // You can call a function here to fetch the user data
      // and set it in the component state
    }
  }, [userId]);
  const InformationScreen = ({ activeStep }) => {
    switch (activeStep) {
      case 0:
        return <AddBasicInformation user1={currentUser} />;
      case 1:
        return <AddQualifications user1={currentUser} />;
      case 2:
        return <Documents user1={currentUser} />;
      default:
        return <div>Invalid step: {activeStep}</div>;
    }
  };
  

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
