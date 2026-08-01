import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployee, updateEmployee } from '../api';

function EditEmployee({ showMessage }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    salary: '',
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployee(id);
        setFormData({ ...response.data, salary: response.data.salary });
      } catch (error) {
        showMessage('error', 'Failed to load employee');
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(id, { ...formData, salary: Number(formData.salary) });
      showMessage('success', 'Employee updated successfully');
      navigate('/');
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Failed to update employee');
    }
  };

  return (
    <div className="card form-card">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid">
          <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
          <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
          <input name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} required />
          <input name="salary" type="number" min="0" placeholder="Salary" value={formData.salary} onChange={handleChange} required />
        </div>
        <button className="btn primary" type="submit">Update Employee</button>
      </form>
    </div>
  );
}

export default EditEmployee;
