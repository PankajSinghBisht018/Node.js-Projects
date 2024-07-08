import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import templatesData from './savefile.json'; 

const SelectTemplate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from, to, subject, campaignName } = location.state || {};

  const handleSelectTemplate = (template) => {
    navigate('/create-template', {
      state: {
        design: template.design,
        from,
        to,
        subject,
        campaignName,
      },
    });
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-black to-purple-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Select a Template</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templatesData.map((template, index) => (
          <div
            key={index}
            className="bg-white text-black rounded shadow cursor-pointer"
            style={{ minHeight: '200px' }} 
            onClick={() => handleSelectTemplate(template)}
          >
            <div className="p-4 h-full flex flex-col justify-between">
              <h2 className="text-xl font-bold mb-2">{template.name}</h2>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleSelectTemplate(template)}
              >
                Select Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectTemplate;
