// EmployeeTable.js
import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, IconButton, Stack } from '@chakra-ui/react';
import { ViewIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const employeeData = [
  { name: 'Rony Smith', email: 'example@email.com', role: 'Web Designer', phone: '+1-202-555-0149', joiningDate: 'Oct 20, 2019' },
  { name: 'Alex William', email: 'example@email.com', role: 'Front-end Engr', phone: '+1-202-555-0191', joiningDate: 'Oct 18, 2019' },
  { name: 'William John', email: 'example@email.com', role: 'Project Manager', phone: '+1-202-555-0111', joiningDate: 'Oct 15, 2019' },
  // Add more employee data here
];

const EmployeeTable = () => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Role</Th>
          <Th>Phone No</Th>
          <Th>Joining Date</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {employeeData.map((employee, index) => (
          <Tr key={index}>
            <Td>{employee.name}</Td>
            <Td>{employee.email}</Td>
            <Td>{employee.role}</Td>
            <Td>{employee.phone}</Td>
            <Td>{employee.joiningDate}</Td>
            <Td>
              <Stack direction="row" spacing={2}>
                <Button size="sm" colorScheme="blue" leftIcon={<ViewIcon />}>View Details</Button>
                <IconButton size="sm" colorScheme="teal" icon={<EditIcon />} />
                <IconButton size="sm" colorScheme="red" icon={<DeleteIcon />} />
              </Stack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default EmployeeTable;
