// employeeRoutes.js
import express from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from '../controllers/employees.js';

const employeeRoutes = express.Router();

employeeRoutes.get('/api/employees', getAllEmployees);
employeeRoutes.get('/api/employees/:id', getEmployeeById);
employeeRoutes.post('/api/employees', addEmployee);
employeeRoutes.put('/api/employees/:id', updateEmployee);
employeeRoutes.delete('/api/employees/:id', deleteEmployee);

export default employeeRoutes;
