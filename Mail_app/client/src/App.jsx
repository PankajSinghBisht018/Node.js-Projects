import React from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Campaign from './pages/Campaign';
import Contact from './pages/Contact';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Cart from './components/Cart';

const App = () => {
  return (
    <Router>
      <div >
      <Navbar />
        <SignedIn>
          
        </SignedIn>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <SignedOut>
        </SignedOut>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
