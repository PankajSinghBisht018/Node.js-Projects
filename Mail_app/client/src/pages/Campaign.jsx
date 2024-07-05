import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

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

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-black to-purple-900 text-white p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Our Campaign</h1>
        <p className="text-lg mb-8">
          Our Campaign To Donate the Money to the needy ones and help to improve their life. Your small contribution will help them fulfill their needs.
        </p>
        <button onClick={() => setVisible(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Start a Campaign
        </button>
      </div>
      <Sidebar visible={visible} onHide={() => setVisible(false)} className="p-sidebar-md">
        <ul className="p-list-unstyled">
          <li>
            <Button label="Create Campaign" icon="pi pi-plus" onClick={handleCreateCampaign} className="p-button-text p-button-link" />
          </li>
          <li>
            <Button label="Campaigns" icon="pi pi-list" onClick={handleViewCampaigns} className="p-button-text p-button-link" />
          </li>
        </ul>
      </Sidebar>
    </div>
  );
};

export default Campaign;
