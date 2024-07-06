import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import useCampaignStore from '../store/useCampaignStore';

const CampaignDetails = () => {
  const { campaignName } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ from: '', to: '', subject: '' });
  const [savedText, setSavedText] = useState('');
  const campaigns = useCampaignStore((state) => state.campaigns);
  const updateCampaign = useCampaignStore((state) => state.updateCampaign);

  useEffect(() => {
    const campaign = campaigns.find((c) => c.name === campaignName);
    if (campaign) {
      setFormData(campaign);
    }
  }, [campaignName, campaigns]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCampaign({ ...formData, name: campaignName });
    setSavedText(`From: ${formData.from}, To: ${formData.to}, Subject: ${formData.subject}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setSavedText('');
  };

  const handleCreateTemplate = () => {
    navigate(`/create-template`, { state: { ...formData, campaignName } });
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-black to-purple-900 text-black p-4 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">{campaignName}</h1>
        {!savedText && (
          <form onSubmit={handleSubmit} className="text-center">
            <div className="mb-4">
              <label htmlFor="from" className="block text-lg mb-2">
                From
              </label>
              <InputText
                id="from"
                name="from"
                value={formData.from}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="to" className="block text-lg mb-2">
                To
              </label>
              <InputText
                id="to"
                name="to"
                value={formData.to}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-lg mb-2">
                Subject
              </label>
              <InputText
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-100"
                required
              />
            </div>
            <Button type="submit" label="Save" className="bg-blue-500 text-black px-4 py-2 rounded" />
          </form>
        )}
        {savedText && (
          <div className="text-center">
            <p className="text-lg mb-4">{savedText}</p>
            <Button onClick={handleEdit} label="Edit" className="bg-blue-500 text-black px-4 py-2 rounded" />
            <Button onClick={handleCreateTemplate} label="Generate Email Template" className="bg-blue-500 text-black px-4 py-2 rounded mt-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignDetails;
