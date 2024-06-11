import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  Stack,
  Box,
  Collapse,
  useColorModeValue,
  VStack,
  HStack,
  Text,
  Avatar,
} from "@chakra-ui/react";
import {
  ViewIcon,
  EditIcon,
  DeleteIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PhoneIcon,
  CalendarIcon,
} from "@chakra-ui/icons";

const employeeData = [
  {
    id: "1",
    name: "Rony Smith",
    email: "rony@example.com",
    role: "Web Designer",
    phone: "+1-202-555-0149",
    joiningDate: "Oct 20, 2019",
    dob: "Jan 15, 1990",
    techStack: ["HTML", "CSS", "JavaScript"],
    pan: "ABCDE1234F",
    aadhaar: "1234 5678 9101",
    group: ["group1"],
    currentlyWorking: true,
    avatar: "https://bit.ly/ryan-florence",
    fathersName: "John Smith",
    mothersName: "Jane Smith",
    address: "123 Main St, Anytown, USA",
  },
  {
    id: "2",
    name: "Alex William",
    email: "alex@example.com",
    role: "Front-end Engineer",
    phone: "+1-202-555-0191",
    joiningDate: "Oct 18, 2019",
    dob: "Feb 20, 1988",
    techStack: ["React", "Redux"],
    pan: "ABCDE5678G",
    aadhaar: "2345 6789 0123",
    group: ["group2"],
    currentlyWorking: true,
    avatar: "https://bit.ly/sage-adebayo",
    fathersName: "Michael William",
    mothersName: "Anna William",
    address: "456 Elm St, Anytown, USA",
  },
  {
    id: "3",
    name: "William John",
    email: "william@example.com",
    role: "Project Manager",
    phone: "+1-202-555-0111",
    joiningDate: "Oct 15, 2019",
    dob: "Mar 10, 1985",
    techStack: ["Project Management"],
    pan: "ABCDE9101H",
    aadhaar: "3456 7890 1234",
    group: ["group1", "group2"],
    currentlyWorking: false,
    avatar: "https://bit.ly/dan-abramov",
    fathersName: "Robert John",
    mothersName: "Emily John",
    address: "789 Oak St, Anytown, USA",
  },
];

const EmployeeTable = ({ searchQuery }) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const history = useHistory();

  const handleToggle = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  const handleEdit = (employee) => {
    history.push({
      pathname: "/admin/profile",
      state: { employee },
    });
  };

  const filteredData = employeeData.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const bgColor = useColorModeValue("gray.50", "gray.700");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const cardBorderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Role</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {filteredData.map((employee) => (
          <React.Fragment key={employee.id}>
            <Tr>
              <Td>{employee.id}</Td>
              <Td>
                <HStack spacing={3}>
                  <Avatar size="sm" src={employee.avatar} />
                  <Text>{employee.name}</Text>
                </HStack>
              </Td>
              <Td>{employee.email}</Td>
              <Td>{employee.role}</Td>
              <Td>
                <Stack direction="row" spacing={2}>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    leftIcon={<ViewIcon />}
                    onClick={() => handleToggle(employee.id)}
                  >
                    View
                  </Button>
                  <IconButton
                    size="sm"
                    colorScheme="teal"
                    icon={<EditIcon />}
                    onClick={() => handleEdit(employee)}
                  />
                  <IconButton
                    size="sm"
                    colorScheme="red"
                    icon={<DeleteIcon />}
                  />
                  <IconButton
                    size="sm"
                    colorScheme="gray"
                    icon={
                      expandedRows.includes(employee.id) ? (
                        <ChevronUpIcon />
                      ) : (
                        <ChevronDownIcon />
                      )
                    }
                  />
                </Stack>
              </Td>
            </Tr>
            <Tr>
              <Td colSpan="5" p={0}>
                <Collapse
                  in={expandedRows.includes(employee.id)}
                  animateOpacity
                >
                  <Box
                    p={4}
                    bg={cardBgColor}
                    border="1px"
                    borderColor={cardBorderColor}
                    borderRadius="md"
                    m={2}
                    shadow="sm"
                  >
                    <VStack spacing={3} align="start">
                      <HStack>
                        <PhoneIcon />
                        <Text>
                          <strong>Phone:</strong> {employee.phone}
                        </Text>
                      </HStack>
                      <HStack>
                        <CalendarIcon />
                        <Text>
                          <strong>Joining Date:</strong> {employee.joiningDate}
                        </Text>
                      </HStack>
                      <HStack>
                        <CalendarIcon />
                        <Text>
                          <strong>Date of Birth:</strong> {employee.dob}
                        </Text>
                      </HStack>
                      <Box>
                        <Text>
                          <strong>Tech Stack:</strong>{" "}
                          {employee.techStack.join(", ")}
                        </Text>
                      </Box>
                      <Box>
                        <Text>
                          <strong>PAN:</strong> {employee.pan}
                        </Text>
                      </Box>
                      <Box>
                        <Text>
                          <strong>Aadhaar:</strong> {employee.aadhaar}
                        </Text>
                      </Box>
                      <Box>
                        <Text>
                          <strong>Group:</strong> {employee.group.join(", ")}
                        </Text>
                      </Box>
                      <Box>
                        <Text>
                          <strong>Currently Working:</strong>{" "}
                          {employee.currentlyWorking ? "Yes" : "No"}
                        </Text>
                      </Box>
                      <Box>
                        <Text>
                          <strong>Father's Name:</strong> {employee.fathersName}
                        </Text>
                      </Box>
                      <Box>
                        <Text>
                          <strong>Mother's Name:</strong> {employee.mothersName}
                        </Text>
                      </Box>
                      <Box>
                        <Text>
                          <strong>Address:</strong> {employee.address}
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                </Collapse>
              </Td>
            </Tr>
          </React.Fragment>
        ))}
      </Tbody>
    </Table>
  );
};

export default EmployeeTable;
