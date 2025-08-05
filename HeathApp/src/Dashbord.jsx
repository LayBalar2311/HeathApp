// Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const userDosha = user?.prakriti?.primaryDosha;
  const prakriti = user?.prakriti;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <h3 className="text-xl mb-2">Welcome, {user?.name}!</h3>

      {userDosha ? (
        <p className="text-lg mb-4">
          Your Prakriti is <span className="font-semibold">{prakriti.primaryDosha}</span> 
          {prakriti.secondaryDosha ? ` (${prakriti.secondaryDosha})` : ''}.
        </p>
      ) : (
        <p className="text-lg mb-4 text-gray-600">
          Please complete your <Link to="/prakriti" className="text-blue-500 hover:underline">Prakriti Analysis</Link> to get personalized recommendations.
        </p>
      )}

     
     

      {/* Dashboard links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Link to="/profile" className="p-4 bg-blue-100 rounded hover:bg-blue-200">User Profile</Link>
        <Link to="/prakriti" className="p-4 bg-blue-100 rounded hover:bg-blue-200">Prakriti Analysis</Link>
        <Link to="/diet" className="p-4 bg-blue-100 rounded hover:bg-blue-200">Diet Chart</Link>
        <Link to="/schedule" className="p-4 bg-blue-100 rounded hover:bg-blue-200">Daily Schedule</Link>
        <Link to="/followups" className="p-4 bg-blue-100 rounded hover:bg-blue-200">Follow-ups</Link>
      </div>
    </div>
  );
}

export default Dashboard;
