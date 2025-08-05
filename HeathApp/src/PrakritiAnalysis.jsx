import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { setUser } from './features/authSlice'; // Correctly import setUser action

const API_URL = process.env.REACT_APP_API_BASE_URL;

function PrakritiAnalysis() {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch(); // Correctly import and initialize the useDispatch hook
  const navigate = useNavigate(); // Initialize useNavigate
  const [answers, setAnswers] = useState({
    skin: '', bodyBuild: '', hair: '', mindset: '', memory: '', emotions: '',
    diet: '', sleep: '', energy: '', weather: '', stress: ''
  });
  const [result, setResult] = useState(null);

  const questions = [
    { key: 'skin', question: 'What is your skin type?', options: ['Dry', 'Oily', 'Balanced'] },
    { key: 'bodyBuild', question: 'What is your body frame?', options: ['Thin', 'Muscular', 'Heavier'] },
    { key: 'hair', question: 'What is your hair type?', options: ['Dry, thin', 'Oily, thinning', 'Thick, oily'] },
    { key: 'mindset', question: 'What is your general mindset?', options: ['Restless', 'Intense', 'Calm'] },
    { key: 'memory', question: 'How is your memory?', options: ['Forgetful', 'Sharp', 'Slow but long-term'] },
    { key: 'emotions', question: 'What are your emotional tendencies?', options: ['Anxious', 'Angry', 'Content'] },
    { key: 'diet', question: 'What foods do you prefer?', options: ['Warm, dry', 'Cold, spicy', 'Light, sweet'] },
    { key: 'sleep', question: 'How is your sleep?', options: ['Light', 'Moderate', 'Deep'] },
    { key: 'energy', question: 'How are your energy levels?', options: ['Variable', 'High, bursts', 'Steady'] },
    { key: 'weather', question: 'Which climate do you prefer?', options: ['Warm', 'Cool', 'Warm and dry'] },
    { key: 'stress', question: 'How do you respond to stress?', options: ['Anxious', 'Irritable', 'Calm'] }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const analysisResponse = await axios.post(
        `${API_URL}/prakriti/analyze`,
        answers,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { primaryDosha, secondaryDosha, description, routine, diet, followUps } = analysisResponse.data;
      const newPrakriti = { primaryDosha, secondaryDosha, description, routine, diet, followUps };

      // Send the new prakriti data to the backend to update the user profile
      const updateResponse = await axios.put(
        `${API_URL}/users/profile`,
        { prakriti: newPrakriti },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update Redux state and local storage with the new user data
      dispatch(setUser({ user: updateResponse.data, token }));
      setResult(newPrakriti);
      alert('Prakriti analysis and suggestions saved! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard'); // Now navigate is defined
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      alert('Analysis failed: ' + (error?.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Prakriti Analysis</h2>
      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q.key}>
            <label className="block font-medium">{q.question}</label>
            <select
              value={answers[q.key]}
              onChange={(e) => setAnswers({ ...answers, [q.key]: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              {q.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Analyze Prakriti
        </button>
        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="text-xl font-bold">Your Prakriti: {result.primaryDosha} ({result.secondaryDosha})</h3>
            <p>{result.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PrakritiAnalysis;