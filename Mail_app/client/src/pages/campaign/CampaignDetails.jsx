import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import useCampaignStore from '../../store/useCampaignStore';

const CampaignDetails = () => {
  const { campaignName } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ from: '', to: '', subject: '' });
  const [savedText, setSavedText] = useState('');
  const [isDialogVisible, setDialogVisible] = useState(false);
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
    setSavedText(`From: ${formData.from}\nTo: ${formData.to}\nSubject: ${formData.subject}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setSavedText('');
  };

  const handleCreateTemplate = () => {
    setDialogVisible(true);
  };

  const handleNewTemplate = () => {
    navigate(`/create-template`, { state: { ...formData, campaignName, design: null } });
  };

  const handleUseCustomTemplate = () => {
    navigate(`/select-template`, { state: { ...formData, campaignName } });
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-black to-purple-900 text-white p-4 flex flex-col justify-center items-center">
      <div className="text-white rounded-lg shadow-lg p-6 w-full max-w-md flex flex-col justify-center items-center my-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Your Details</h1>
      </div>

      <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">{campaignName}</h1>
        {!savedText && (
          <form onSubmit={handleSubmit} className="text-center space-y-4">
            <div>
              <TextField
                id="from"
                name="from"
                label="From"
                variant="outlined"
                fullWidth
                value={formData.from}
                onChange={handleChange}
                required
                className="mb-4"
              />
            </div>
            <div>
              <TextField
                id="to"
                name="to"
                label="To"
                variant="outlined"
                fullWidth
                value={formData.to}
                onChange={handleChange}
                required
                className="mb-4"
              />
            </div>
            <div>
              <TextField
                id="subject"
                name="subject"
                label="Subject"
                variant="outlined"
                fullWidth
                value={formData.subject}
                onChange={handleChange}
                required
                className="mb-4"
              />
            </div>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save
            </Button>
          </form>
        )}
        {savedText && (
          <div className="text-center space-y-4   space-x-4">
            <p className="text-lg mb-4">{savedText.split('\n').map((line, index) => (
              <span key={index}>
                <span className="font-bold">{line.split(':')[0]}:</span> {line.split(':')[1]}<br />
              </span>
            ))}</p>
            <Button variant="contained" color="primary" onClick={handleEdit} className="mb-4">
              Edit
            </Button>
            <Button variant="contained" color="primary" onClick={handleCreateTemplate}>
              Generate Email Template
            </Button>
          </div>
        )}
        <Dialog open={isDialogVisible} onClose={() => setDialogVisible(false)}>
          <DialogTitle>Choose Template Option</DialogTitle>
          <DialogContent className="space-y-4">
            <Button variant="contained" color="primary" onClick={handleNewTemplate} fullWidth>
              Create Own Template
            </Button>
            <Button variant="contained" color="primary" onClick={handleUseCustomTemplate} fullWidth>
              Use Custom Template
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogVisible(false)} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default CampaignDetails;
