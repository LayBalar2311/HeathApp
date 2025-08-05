import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Import your Redux actions (assuming they are in a file named authSlice)
import { setUser, logout } from './features/authSlice.js';

// Import your other components
import Login from './Login.jsx';
import Register from './Registration.jsx';
import UserProfile from './UserProfile.jsx';
import PrakritiAnalysis from './PrakritiAnalysis.jsx';
import DietChart from './DietChart.jsx';
import DailySchedule from './DailySchedule.jsx';
import FollowUps from './FollowUps.jsx';
import Dashboard from './Dashbord.jsx'; // Corrected spelling

const API_URL = process.env.REACT_APP_API_BASE_URL;

function App() {
  // Initialize the navigate hook to use the navigate function
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      axios.get(`${API_URL}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      }).then(response => {
        // Dispatch the imported setUser action
        dispatch(setUser({ user: response.data.user, token: storedToken }));
      }).catch(() => {
        localStorage.removeItem('token');
        // Dispatch the imported logout action
        dispatch(logout());
      });
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Dispatch the imported logout action
    dispatch(logout());
    // Use the initialized navigate function
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-500 text-white p-4">
        <div className="max-w-4xl mx-auto flex justify-between">
          <Link to="/" className="text-xl font-bold">Prakriti Wellness by Lay Balar(270)</Link>
          <div>
            {token ? (
              <>
                <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="mr-4">
                  {user?.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                </Link>
                <button onClick={handleLogout} className="hover:underline">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="mr-4">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        {/*
          Both the root path and /dashboard will now render the Dashboard component,
          which resolves the "No routes matched" warning.
        */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/prakriti" element={<PrakritiAnalysis />} />
        <Route path="/diet" element={<DietChart />} />
        <Route path="/schedule" element={<DailySchedule />} />
        <Route path="/followups" element={<FollowUps />} />
      </Routes>
    </div>
  );
}

export default App;
