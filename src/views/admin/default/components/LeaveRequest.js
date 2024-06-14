import React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Textarea,
} from "@chakra-ui/react";

export const LeaveRequestCard = ({ name, role, reason, duration, type }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      mb="4"
      bg="white"
    >
      <HStack justifyContent="space-between">
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            {name} - {role}
          </Text>
          <Text color="gray.500">
            {" "}
            <strong>Reason:</strong> {reason}
          </Text>
          <Text color="gray.500">
            {" "}
            <strong>Applied Duration:</strong> {duration}
          </Text>
          <Text color="gray.500">
            <strong>Type of Leave:</strong> {type}
          </Text>
        </Box>
        <Text color="yellow.500" fontWeight="bold">
          Pending
        </Text>
      </HStack>
      <VStack align="start" mt="4">
        <Textarea placeholder="Add a comment..." />
        <HStack>
          <Button colorScheme="green">Accept</Button>
          <Button colorScheme="red">Reject</Button>
        </HStack>
      </VStack>
    </Box>
  );
};
