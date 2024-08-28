import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const ShowsList = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/shows/get-all-shows');
        setShows(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching shows');
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  const handleDeleteShow = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/shows/delete-show/${id}`);
      setShows(shows.filter(show => show._id !== id));
    } catch (error) {
      setError('Error deleting show');
    }
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div
      className="min-h-screen bg-gray-900 text-gray-200 p-8"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className="text-3xl font-bold mb-6">Available Shows</h1>

      {shows.length === 0 ? (
        <p className="text-gray-400">No shows available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-800 border border-gray-700 rounded-lg">
            <thead className="bg-gray-700">
              <tr className="border-b border-gray-600">
                <th className="p-3 text-left text-sm font-semibold text-gray-200">Title</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-200">Date</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-200">Show Time</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-200">Available Seats</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shows.map((show) => (
                <tr key={show._id} className="border-b border-gray-600">
                  <td className="p-3 text-sm">{show.movieTitle}</td>
                  <td className="p-3 text-sm">{new Date(show.date).toLocaleDateString()}</td>
                  <td className="p-3 text-sm">{show.time}</td>
                  <td className="p-3 text-sm">{show.availableSeats}</td>
                  <td className="p-3 text-sm">
                    <button
                      onClick={() => handleDeleteShow(show._id)}
                      className="text-red-500 hover:text-red-600"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowsList;
