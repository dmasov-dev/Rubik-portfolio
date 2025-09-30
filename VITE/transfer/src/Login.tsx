import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

// Configure axios defaults
axios.defaults.withCredentials = true;

const API_URL = 'http://localhost:5000/api'; // Make sure your server is running on port 5000

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login with password length:', password.length);
      
      const response = await axios.post(`${API_URL}/login`, { password });
      console.log('Server response:', response.data);
      
      const { token } = response.data;
      console.log('Login successful, got token:', token);
      
      if (!token) {
        throw new Error('No token received from server');
      }
      
      // Store the token
      localStorage.setItem('authToken', token);
      
      // Set axios default header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      console.log('About to call onLoginSuccess:', typeof onLoginSuccess);
      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess();
      } else {
        console.error('onLoginSuccess is not a function:', onLoginSuccess);
        setError('Internal error: authentication callback not provided');
      }
    } catch (err: any) {
      console.error('Login error details:', {
        error: err,
        response: err.response?.data,
        status: err.response?.status,
        message: err.message
      });
      
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Login failed - please check console for details');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            disabled={loading}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="button-container">
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;