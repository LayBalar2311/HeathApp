import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

function FollowUps() {
  const { token } = useSelector((state) => state.auth);
  const [followUps, setFollowUps] = useState([]);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFollowUps = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/followups`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFollowUps(response.data);
      } catch (error) {
        console.error('Error fetching follow-ups:', error);
      }
    };
    fetchFollowUps();
  }, [token]);

  const handleFeedback = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/api/followups/feedback`,
        { feedback },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Feedback submitted successfully!');
      setFeedback('');
    } catch (error) {
      alert('Feedback submission failed: ' + error.response.data.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Follow-ups</h2>
      <ul className="space-y-2">
        {followUps.map((item, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded">
            <strong>{item.date}</strong>: {item.message}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleFeedback}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-2"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}

export default FollowUps;