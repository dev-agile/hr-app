import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: 'Absent', value: 20 },
  { name: 'Present', value: 80 },
  { name: 'WFH', value: 50 },
];

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56'];

const AttendanceStatus = () => {
  return (
    <Box p="6" bg="white" borderRadius="md" boxShadow="md">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Today's Attendance Status
      </Text>
      <PieChart width={400} height={250}>
        <Pie
          data={data}
          cx={200}
          cy={110}
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
      <Text mt="4" fontSize="2xl" fontWeight="bold">150 Total Employees</Text>
    </Box>
  );
};

export default AttendanceStatus;
