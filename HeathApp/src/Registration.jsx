import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch
import axios from 'axios';
import { setUser } from './features/authSlice.js'; // Import setUser

const API_URL = process.env.REACT_APP_API_BASE_URL;

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/users/register`, { name, email, password });

      // Store the user and token in Redux and local storage
      dispatch(setUser({ user: response.data.user, token: response.data.token }));
      localStorage.setItem('token', response.data.token);

      alert('Registration successful! Redirecting to dashboard.');
      navigate('/dashboard'); // Direct redirect
    } catch (error) {
      console.error('Registration failed:', error); // Log full error to see details
      const message =
        error.response?.data?.message || error.message || 'Something went wrong';
      alert('Registration failed: ' + message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
        <p>
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;