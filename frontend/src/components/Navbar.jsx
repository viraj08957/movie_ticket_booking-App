import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to="/">MyApp</Link>
        </div>
        <div className="space-x-4">
          <Link
            to="/login"
            className="text-gray-200 hover:bg-gray-700 px-3 py-2 rounded"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
