import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../api';

function AddEmployee({ showMessage }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    salary: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee({ ...formData, salary: Number(formData.salary) });
      showMessage('success', 'Employee added successfully');
      navigate('/');
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Failed to add employee');
    }
  };

  return (
    <div className="card form-card">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid">
          <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
          <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
          <input name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} required />
          <input name="salary" type="number" min="0" placeholder="Salary" value={formData.salary} onChange={handleChange} required />
        </div>
        <button className="btn primary" type="submit">Save Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;
