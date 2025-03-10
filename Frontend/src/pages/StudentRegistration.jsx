import { useState } from 'react';
import axios from 'axios';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    abcID: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/studentRegister', formData);
      setMessage({ type: 'success', text: response.data.message });
      setFormData({ studentName: '', abcID: '', email: '', password: '' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Registration failed.' });
    }
    
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f3f3' }}>
      <div style={{ width: '400px', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', backgroundColor: 'white', borderRadius: '5px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Student Registration</h2>
        {message && (
          <div style={{ padding: '10px', textAlign: 'center', color: 'white', borderRadius: '5px', backgroundColor: message.type === 'success' ? 'green' : 'red' }}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Student Name</label>
            <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>ABC ID</label>
            <input type="text" name="abcID" value={formData.abcID} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;
