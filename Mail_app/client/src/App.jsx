import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Donate from './pages/DonateUs';
import Contact from './pages/Contact';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Cart from './components/Cart';
import Campaign from './pages/campaign/Campaign';
import CreateCampaignForm from './pages/campaign/CreateCampaignForm';
import CampaignDetails from './pages/campaign/CampaignDetails';
import CampaignsList from './pages/campaign/CampaignList';
import EmailTemplateCreator from './pages/campaign/EmailTemplateCreator';
import SelectTemplate from './pages/campaign/SelectTemplate';
import Analytics from './pages/Analytics';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/create" element={<CreateCampaignForm />} />
          <Route path="/campaign-details/:campaignName" element={<CampaignDetails />} />
          <Route path="/all-campaigns" element={<CampaignsList />} />
          <Route path="/create-template" element={<EmailTemplateCreator />} />
          <Route path="/select-template" element={<SelectTemplate />} />
          <Route path="/analytics"  element={<Analytics/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
