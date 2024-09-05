import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowDetailsPage = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/shows/get-all-shows');
        setShows(response.data);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchShows();
  }, []);

  return (
    <div
      className="container mx-auto px-4 py-8 min-h-screen bg-cover bg-center bg-gray-900 bg-opacity-80"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <h1 className="text-4xl font-bold mb-8 text-white">Show Details</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700 bg-opacity-90">
              <th className="p-4 text-left text-gray-200">Show Id</th>
              <th className="p-4 text-left text-gray-200">Movie Title</th>
              <th className="p-4 text-left text-gray-200">Ticket Price</th>
              <th className="p-4 text-left text-gray-200">Time</th>
              <th className="p-4 text-left text-gray-200">Available Seats</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((show) => (
              <tr key={show._id} className="border-b border-gray-700 hover:bg-gray-700 bg-opacity-90">
                <td className="p-4 text-gray-300">{show._id}</td>
                <td className="p-4 text-gray-300">{show.movieId.title}</td>
                <td className="p-4 text-gray-300">{show.ticketPrice}</td>
                <td className="p-4 text-gray-300">{show.time}</td>
                <td className="p-4 text-gray-300">{show.availableSeats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowDetailsPage;
