const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employees', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employee', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, department, designation, salary } = req.body;

    if (!fullName || !email || !phone || !department || !designation || salary === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(409).json({ message: 'Employee with that email already exists' });
    }

    const employee = new Employee({ fullName, email, phone, department, designation, salary });
    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create employee', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { fullName, email, phone, department, designation, salary } = req.body;

    if (!fullName || !email || !phone || !department || !designation || salary === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingEmployee = await Employee.findOne({ email, _id: { $ne: req.params.id } });
    if (existingEmployee) {
      return res.status(409).json({ message: 'Employee with that email already exists' });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { fullName, email, phone, department, designation, salary },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update employee', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete employee', error: error.message });
  }
});

module.exports = router;
