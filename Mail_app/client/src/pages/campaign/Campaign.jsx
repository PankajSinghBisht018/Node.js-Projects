import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import DonateUs from '../DonateUs';
import { toast, ToastContainer } from 'react-toastify';

const Campaign = () => {
  const navigate = useNavigate();

  const handleCreateCampaign = () => {
    navigate('/create');
  };

  const handleViewCampaigns = () => {
    navigate('/all-campaigns');
  };

  const handleViewAnalytics = () => {
    navigate('/analytics');
  };

  const handleStart=()=>{
    toast.info("Click On Create Button")
  }
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-purple-800 to-indigo-900 text-white">
      <div className="sticky top-0 h-screen w-64 flex flex-col items-center bg-white text-black shadow-lg">
        <Button
          className="p-button-text p-button-plain p-0 m-4 text-lg font-bold"
        >
          Dashboard
        </Button>
        <ul className="p-2">
          <li className="p-4 cursor-pointer hover:bg-gray-200" onClick={handleCreateCampaign}>
            <i className="pi pi-plus text-2xl"></i>
            <span className="ml-2">Create Campaign</span>
          </li>
          <li className="p-4 cursor-pointer hover:bg-gray-200" onClick={handleViewCampaigns}>
            <i className="pi pi-list text-2xl"></i>
            <span className="ml-2">Campaigns</span>
          </li>
          <li className="p-4 cursor-pointer hover:bg-gray-200" onClick={handleViewAnalytics}>
            <i className="pi pi-chart-line text-2xl"></i>
            <span className="ml-2">Analytics</span>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-4">
        <div className="text-center mt-4">
          <h1 className="text-4xl font-bold mb-8">Our Campaign</h1>
          <p className="text-lg mb-8">
            Our Campaign To Donate the Money to the needy ones and help to improve their life. Your small contribution will help them fulfill their needs.
          </p>
          <ToastContainer position='bottom-right'/>
          <Button
            onClick={handleStart}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Start a Campaign
          </Button>
        </div>
        <br />
        <DonateUs />
      </div>
    </div>
  );
};

export default Campaign;
