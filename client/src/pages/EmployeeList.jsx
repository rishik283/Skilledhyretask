import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteEmployee, getEmployees } from '../api';

function EmployeeList({ showMessage }) {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      const data = Array.isArray(response.data) ? response.data : [];
      setEmployees(data);

      if (!Array.isArray(response.data)) {
        showMessage('error', 'Backend returned an invalid response');
      }
    } catch (error) {
      showMessage('error', 'Unable to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;

    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((employee) => employee._id !== id));
      showMessage('success', 'Employee deleted successfully');
    } catch (error) {
      showMessage('error', 'Failed to delete employee');
    }
  };

  const filteredEmployees = Array.isArray(employees)
    ? employees.filter((employee) =>
        employee.fullName?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="card">
      <div className="card-head">
        <h2>Employee List</h2>
        <Link to="/add" className="btn primary">Add Employee</Link>
      </div>

      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {loading ? (
        <p>Loading employees...</p>
      ) : filteredEmployees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.fullName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.department}</td>
                  <td>{employee.designation}</td>
                  <td>${employee.salary}</td>
                  <td>
                    <Link to={`/edit/${employee._id}`} className="btn secondary">Edit</Link>
                    <button onClick={() => handleDelete(employee._id)} className="btn danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
