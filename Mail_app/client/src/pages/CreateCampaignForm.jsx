import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCampaignStore from '../store/useCampaignStore';

const CreateCampaignForm = () => {
  const [campaignName, setCampaignName] = useState('');
  const navigate = useNavigate();
  const addCampaign = useCampaignStore(state => state.addCampaign);

  const handleSubmit = (e) => {
    e.preventDefault();
    addCampaign({ name: campaignName, from: '', to: '', subject: '' });
    navigate(`/campaign-details/${campaignName}`);
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-black to-purple-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Create Campaign</h1>
      <form onSubmit={handleSubmit} className="text-center">
        <div className="mb-4">
          <label htmlFor="campaignName" className="block text-lg mb-2">Campaign Name</label>
          <input
            type="text"
            id="campaignName"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            className="px-4 py-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default CreateCampaignForm;
