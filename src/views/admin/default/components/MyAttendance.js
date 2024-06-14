// src/MarkAttendance.js
import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Heading,
  HStack,
  Icon,
  Link,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { FaUserCheck } from "react-icons/fa";

const MarkAttendance = () => {
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");

  const handleMarkAttendance = () => {
    alert(`Attendance marked from ${timeIn} to ${timeOut}`);
  };

  const currentDate = format(new Date(), "dd MMMM, yyyy");
  const currentDay = format(new Date(), "EEEE");

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      width="25vw"
      backgroundColor="white"
    >
      <VStack spacing={4} align="stretch">
        <HStack justifyContent="center" alignItems="center" spacing={2}>
          <Icon as={FaUserCheck} w={6} h={6} />
          <Heading size="md">MARK ATTENDANCE</Heading>
        </HStack>
        <Box textAlign="center" p={4} bg="gray.50" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">
            {currentDate}
          </Text>
          <Text fontSize="md" color="gray.500">
            {currentDay}
          </Text>
        </Box>
        <VStack spacing={4}>
          <Input
            placeholder="Time In"
            value={timeIn}
            onChange={(e) => setTimeIn(e.target.value)}
            type="time"
          />
          <Input
            placeholder="Time Out"
            value={timeOut}
            onChange={(e) => setTimeOut(e.target.value)}
            type="time"
          />
        </VStack>
        <Button colorScheme="teal" onClick={handleMarkAttendance}>
          Mark Attendance
        </Button>
        <Link color="teal.500" textAlign="center" fontSize="12px" fontWeight="500">
          Notify for work from home
        </Link>
      </VStack>
    </Box>
  );
};

export default MarkAttendance;
