import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    availableSeats: '',
    ticketPrice: '', // Add ticketPrice field
  });
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');

  useEffect(() => {
    // Fetch list of movies
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/movies'); // Endpoint to fetch movies
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMovieChange = (e) => {
    setSelectedMovie(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/shows/add-show', {
        movieTitle: selectedMovie,
        ...formData,
      });
      onClose(); // Close the form after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Add Show</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="movieTitle">
              Movie Title
            </label>
            <select
              id="movieTitle"
              name="movieTitle"
              value={selectedMovie}
              onChange={handleMovieChange}
              className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-200 rounded"
              required
            >
              <option value="" disabled>Select a movie</option>
              {movies.map((movie) => (
                <option key={movie._id} value={movie.title}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-200 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="time">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-200 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="availableSeats">
              Available Seats
            </label>
            <input
              type="number"
              id="availableSeats"
              name="availableSeats"
              value={formData.availableSeats}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-200 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="ticketPrice">
              Ticket Price (in INR)
            </label>
            <input
              type="number"
              id="ticketPrice"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-200 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-gray-200 py-2 px-4 rounded mr-2 hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-gray-100 py-2 px-4 rounded hover:bg-blue-700"
            >
              Add Show
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowForm;
