import React from "react";
import { Box, Grid, Text, Flex } from "@chakra-ui/react";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";

const attendanceData = [
  {
    name: "William John",
    days: [true, true, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true],
  },
  {
    name: "Rony Smith",
    days: [true, true, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true],
  },
];

const AttendanceGrid = () => {
  return (
    <Box p="6" bg="white" borderRadius="md" boxShadow="md">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Attendance - July 2019
      </Text>
      <Grid templateColumns="repeat(32, 1fr)" gap={2} alignItems="center">
        <Box fontWeight="bold">Employee</Box>
        {Array.from({ length: 31 }, (_, i) => (
          <Box key={i + 1} fontWeight="bold">
            {i + 1}
          </Box>
        ))}
        {attendanceData.map((employee, empIndex) => (
          <React.Fragment key={empIndex}>
            <Box fontWeight="bold">{employee.name}</Box>
            {employee.days.map((day, dayIndex) => (
              <Box key={dayIndex} display="flex" justifyContent="center">
                {day ? (
                  <CheckCircleIcon color="green.500" boxSize={5} />
                ) : (
                  <CloseIcon color="red.500" boxSize={4} />
                )}
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default AttendanceGrid;
