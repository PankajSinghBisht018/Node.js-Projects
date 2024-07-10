import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import templatesData from './savefile.json';
import Template1Image from '../../images/template1.png';
import Template2Image from '../../images/template2.png';

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

  const getImagePath = (imageName) => {
    switch (imageName) {
      case 'template1.png':
        return Template1Image;
      case 'template2.png':
        return Template2Image;
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-black to-purple-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Select a Template</h1>
      <div className="flex flex-col-2 space-x-10">
        {templatesData.map((template, index) => (
          <div
            key={index}
            className="bg-white text-black rounded shadow cursor-pointer"
            style={{ minHeight: 'auto', maxWidth:'30vw' }} 
            onClick={() => handleSelectTemplate(template)}
          >
            <div className="p-4 flex flex-col justify-between flex-1">
              <div className="mb-4 flex-col">
                {template.imageName && (
                  <img
                    src={getImagePath(template.imageName)}
                    alt={template.name}
                    className="mb-4 w-full h-auto object-contain"
                    style={{ maxWidth: '100%', height: 'auto' }} 
                  />
                )}
                <h2 className="text-xl font-bold">{template.name}</h2>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-auto" 
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
