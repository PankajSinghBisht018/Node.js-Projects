import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import AddBlog from './pages/AddBlog';
import EditBlog from './pages/EditBlog';
import Footer from './components/Footer';

const App = () => {
  const token = localStorage.getItem('token');
  
  console.log("Token from localStorage:", token); 

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/add-blog" element={token ? <AddBlog /> : <Navigate to="/auth" />} />
        <Route path="/edit-blog/:id" element={token ? <EditBlog /> : <Navigate to="/auth" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
