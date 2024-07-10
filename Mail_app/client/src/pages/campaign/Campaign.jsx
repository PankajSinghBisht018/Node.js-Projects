import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import DonateUs from '../DonateUs';

const Campaign = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const handleCreateCampaign = () => {
    setVisible(false);
    navigate('/create');
  };

  const handleViewCampaigns = () => {
    setVisible(false);
    navigate('/all-campaigns');
  };

  const handleViewAnalytics = () => {
    setVisible(false);
    navigate('/analytics');
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-black to-purple-900 text-white">
      <div className="flex">
        <div className="fixed left-0 h-screen flex flex-col items-center bg-black text-white shadow-lg">
          <Button
            icon="pi pi-bars"
            className="p-button-text p-button-plain p-0 m-4"
            onClick={() => setVisible(!visible)}
          />
          <ul className="p-2">
            <li className="p-4 cursor-pointer hover:bg-gray-700" onClick={handleCreateCampaign}>
              <i className="pi pi-plus text-2xl"></i>
              {visible && <span className="ml-2">Create Campaign</span>}
            </li>
            <li className="p-4 cursor-pointer hover:bg-gray-700" onClick={handleViewCampaigns}>
              <i className="pi pi-list text-2xl"></i>
              {visible && <span className="ml-2">Campaigns</span>}
            </li>
            <li className="p-4 cursor-pointer hover:bg-gray-700" onClick={handleViewAnalytics}>
              <i className="pi pi-chart-line text-2xl"></i>
              {visible && <span className="ml-2">Analytics</span>}
            </li>
          </ul>
        </div>
        <div className="flex-1 ml-64 p-4">
          <div className="text-center mt-4">
            <h1 className="text-4xl font-bold mb-8">Our Campaign</h1>
            <p className="text-lg mb-8">
              Our Campaign To Donate the Money to the needy ones and help to improve their life. Your small contribution will help them fulfill their needs.
            </p>
            <Button
              onClick={() => setVisible(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Start a Campaign
            </Button>
          </div>
        </div>
      </div>
      <DonateUs/>
    </div>
  );
};

export default Campaign;
