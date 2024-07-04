import React, { useState } from 'react';
import { motion } from 'framer-motion';
import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';

const StartCampaign = () => {
  const [campaignName, setCampaignName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [displayText, setDisplayText] = useState('');

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
  };

  const handleChangeCampaignName = (e) => {
    setCampaignName(e.target.value);
  };

  const handleSetCampaignName = () => {
    if (campaignName.trim() === '') {
      alert('Please enter a campaign name!');
    } else {
      setDisplayText(campaignName);
    }
  };

  const cardVariants = {
    hover: { scale: 1.1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Start a Campaign</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Name of Campaign</label>
          {!displayText && (
            <input
              type="text"
              value={campaignName}
              onChange={handleChangeCampaignName}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter campaign name..."
              required
            />
          )}
          {displayText && (
            <p className="text-xl font-semibold mb-2">{displayText}</p>
          )}
        </div>
        {!displayText && (
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSetCampaignName}>
            Set Campaign Name
          </button>
        )}
      </form>

      {displayText && (
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-4">Choose Template</h2>
          <div className="flex space-x-4">
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className={`w-1/3 p-2 border border-gray-300 rounded cursor-pointer ${selectedTemplate === 'template1' && 'border-blue-500'}`}
              onClick={() => handleSelectTemplate('template1')}
            >
              <img src={image1} alt="Template 1" className="w-full h-auto" />
              <p className="text-center mt-2">Template 1</p>
            </motion.div>
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className={`w-1/3 p-2 border border-gray-300 rounded cursor-pointer ${selectedTemplate === 'template2' && 'border-blue-500'}`}
              onClick={() => handleSelectTemplate('template2')}
            >
              <img src={image2} alt="Template 2" className="w-full h-auto" />
              <p className="text-center mt-2">Template 2</p>
            </motion.div>
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className={`w-1/3 p-2 border border-gray-300 rounded cursor-pointer ${selectedTemplate === 'template3' && 'border-blue-500'}`}
              onClick={() => handleSelectTemplate('template3')}
            >
              <img src={image3} alt="Template 3" className="w-full h-auto" />
              <p className="text-center mt-2">Template 3</p>
            </motion.div>
          </div>
          {selectedTemplate && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Selected Template</h2>
              <div className="border border-gray-300 p-4 rounded">
                <p className="text-center">Template {selectedTemplate}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StartCampaign;
