import React from 'react';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-pink-500  to-purple-600 p-4 flex justify-between items-center shadow-lg">
      <div className="text-white text-2xl font-bold">Mail App</div>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-white text-blue-500 hover:bg-gray-100  px-4 py-2 rounded shadow">Login</button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
