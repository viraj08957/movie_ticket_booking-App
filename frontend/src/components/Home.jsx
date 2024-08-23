import React from 'react';

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-200">
      <div className="bg-gray-800 p-8 rounded shadow-md text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome to the Home Page!</h2>
        <p className="text-gray-400">You are successfully logged in.</p>
      </div>
    </div>
  );
};

export default Home;