import React from 'react';
import { useNavigate } from 'react-router-dom';

const Campaign = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-black to-purple-900 text-white p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Our Campaign</h1>
        <p className="text-lg mb-8">
          Our Campaign To Donate the Money to the needy ones and help to improve their life. Your small contribution will help them fulfill their needs.
        </p>
        <button onClick={() => navigate('/start-campaign')} className="bg-blue-500 text-white px-4 py-2 rounded">
          Start a Campaign
        </button>
      </div>
    </div>
  );
};

export default Campaign;
