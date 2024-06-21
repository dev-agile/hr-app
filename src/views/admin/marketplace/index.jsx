import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import EmployeeTable from "./components/EmployeeTable";
import { useHistory } from "react-router-dom";
import { LeaveRequestCard } from "../default/components/LeaveRequest";
import { leaveRequests } from "utils/mockData";


export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const history = useHistory();

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "1fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Flex
            flexDirection="column"
            gridArea={{ xl: 1 }}
            backgroundColor={"white"}
            mt={10}
          >
            <Box p={5}>
              <Box
                mb={5}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                onClick={()=>{
                  history.push("/admin/profile"); 
                }}
              >
                <Text fontSize="2xl" fontWeight="bold">
                  EMPLOYEES LIST
                </Text>
                <Button colorScheme="teal">Add New Employee</Button>
              </Box>

              <Box mb={5}>
                <Input
                  placeholder="Search Employee"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Box>

              <EmployeeTable searchQuery={searchQuery} />
            </Box>
          </Flex>
        </Flex>
      </Grid>

      <Box p="5" bg="white" minH="100vh">
            <Text fontSize="2xl" fontWeight="bold" m={2}>
                  Leave Requests
                  
                </Text>
          {leaveRequests.map((request, index) => (
            <LeaveRequestCard key={index} {...request} />
          ))}
        </Box>
    </Box>
  );
}
