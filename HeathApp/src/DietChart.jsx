import React from 'react';
import { useSelector } from 'react-redux';

function DietChart() {
  const { user } = useSelector((state) => state.auth);
  const diet = user?.prakriti?.diet;
  const dosha = user?.prakriti?.primaryDosha;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Diet Chart</h2>

      {dosha ? (
        <>
          <p className="mb-4 text-lg">
            Here is your personalized diet chart for your <span className="font-semibold">{dosha}</span> Prakriti.
          </p>
          <ul className="space-y-2">
            {diet ? (
              Object.entries(diet).map(([meal, desc]) => (
                <li key={meal} className="p-2 bg-green-100 rounded">
                  <strong>{meal}</strong>: {desc}
                </li>
              ))
            ) : (
              <p>No diet data found in your profile. Please complete your Prakriti Analysis.</p>
            )}
          </ul>
        </>
      ) : (
        <p className="text-gray-600">
          You haven't completed your <strong>Prakriti Analysis</strong>. Please do it first from{' '}
          <span className="text-blue-500 underline">
            <a href="/prakriti">here</a>
          </span>.
        </p>
      )}
    </div>
  );
}

export default DietChart;
