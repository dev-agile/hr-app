import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { name: 'Jan', attendance: 50 },
  { name: 'Feb', attendance: 72 },
  { name: 'Mar', attendance: 21 },
  { name: 'Apr', attendance: 50 },
  { name: 'May', attendance: 17 },
  { name: 'Jun', attendance: 89 },
  { name: 'Jul', attendance: 47 },
  { name: 'Aug', attendance: 62 },
  { name: 'Sep', attendance: 50 },
  { name: 'Oct', attendance: 140 },
  { name: 'Nov', attendance: 125 },
  { name: 'Dec', attendance: 72 },
];

const YearlyAttendanceReport = () => {
  return (
    <Box p="6" bg="white" borderRadius="md" boxShadow="md">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Yearly Attendance Report
      </Text>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="attendance" fill="#8884d8" />
      </BarChart>
    </Box>
  );
};

export default YearlyAttendanceReport;
