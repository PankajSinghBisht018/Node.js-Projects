import React from 'react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import EmailForm from './components/EmailForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <SignedIn>
        <EmailForm />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <Footer/>
    </div>
  );
}

export default App;
