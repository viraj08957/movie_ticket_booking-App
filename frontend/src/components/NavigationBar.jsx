import React from 'react';
import { Link } from 'react-router-dom'; // For navigation

const NavigationBar = () => {
  return (
    <nav className="bg-gray-900 text-gray-200 p-4 fixed w-full top-0 left-0 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="https://image.freepik.com/vecteurs-libre/modele-conception-logo-cinema_92405-24.jpg" 
            alt="Logo"
            className="h-12 w-auto object-contain" // Adjust height and ensure correct scaling
          />
          <span className="text-xl font-bold">i Cinema</span>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
          <Link to="/login" className="hover:text-blue-500">Login</Link>
          
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;



