import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';

function App() {
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const clearMessage = () => {
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    clearMessage();
  };

  const handleLogout = () => {
    navigate('/');
    showMessage('success', 'Welcome back!');
  };

  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="brand">Employee Management</div>
        <div className="nav-links">
          <Link to="/">Employees</Link>
          <Link to="/add">Add Employee</Link>
          <button onClick={handleLogout} className="nav-btn">Home</button>
        </div>
      </nav>

      {message.text && (
        <div className={`alert ${message.type}`}>{message.text}</div>
      )}

      <Routes>
        <Route path="/" element={<EmployeeList showMessage={showMessage} />} />
        <Route path="/add" element={<AddEmployee showMessage={showMessage} />} />
        <Route path="/edit/:id" element={<EditEmployee showMessage={showMessage} />} />
      </Routes>
    </div>
  );
}

export default App;
