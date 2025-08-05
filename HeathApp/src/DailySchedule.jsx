import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

function DailySchedule() {
  const { token } = useSelector((state) => state.auth);
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/schedule`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSchedule(response.data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };
    fetchSchedule();
  }, [token]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Daily Schedule</h2>
      <ul className="space-y-2">
        {schedule.map((item, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded">
            <strong>{item.time}</strong>: {item.activity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DailySchedule;
