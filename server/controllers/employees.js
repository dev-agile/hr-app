import fs from 'fs/promises';
import path from 'path';



let employees = [];

// Read the JSON file
const dataFilePath = new URL('../database/employees.json', import.meta.url);

// Read the JSON file
async function readEmployeesData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    employees = JSON.parse(data);
  } catch (error) {
    console.error('Error reading employees data:', error);
    throw new Error('Failed to read employees data');
  }
}

readEmployeesData();

// Controller function to get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const totalEmployees = employees.length;
    const start = Number(req.query._start) || 0;
    const end = Number(req.query._end) || totalEmployees;
    
    const slicedEmployees = employees.slice(start, end);
    
    res.setHeader('Content-Range', `employees ${start}-${end - 1}/${totalEmployees}`);
    res.json(slicedEmployees);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get an employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const employee = employees.find(emp => emp.id === id);
    
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to add a new employee
export const addEmployee = async (req, res) => {
  try {
    const newEmployee = req.body;
    newEmployee.id = employees.length ? employees[employees.length - 1].id + 1 : 1;
    employees.push(newEmployee);
    await saveEmployees();
    res.json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update an existing employee
export const updateEmployee = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedEmployee = req.body;

    employees = employees.map(employee => {
      if (employee.id === id) {
        return { ...employee, ...updatedEmployee };
      }
      return employee;
    });

    await saveEmployees();
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to delete an employee
export const deleteEmployee = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    employees = employees.filter(employee => employee.id !== id);
    await saveEmployees();
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to save employees data to the JSON file
const saveEmployees = async () => {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(employees, null, 2));
  } catch (error) {
    console.error('Error saving employees data:', error);
    throw new Error('Failed to save employees data');
  }
};
