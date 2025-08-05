import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from './features/authSlice'; // Adjust the path as needed


const API_URL = process.env.REACT_APP_API_BASE_URL;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  console.log('Login button clicked'); // ✅ Add this
  console.log('Email:', email, 'Password:', password); // ✅ Add this

  try {
    const response = await axios.post(`${API_URL}/api/users/login`, {
      email,
      password,
    });
    console.log('Login success:', response.data); // ✅ Add this

      
      dispatch(setUser({ user: response.data.user, token: response.data.token }));
      localStorage.setItem('token', response.data.token);
      navigate(response.data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
    console.error('Login failed:', error); // ✅ Add this
    alert('Login failed: ' + error.response?.data?.message || error.message);
  }
};
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div className="space-y-4">
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
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p>
          Don't have an account? <Link to="/register" className="text-white-500">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;