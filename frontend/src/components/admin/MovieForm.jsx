import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieForm = ({ onClose, movie }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    releaseDate: '',
    image: '',
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        description: movie.description,
        genre: movie.genre,
        releaseDate: new Date(movie.releaseDate).toISOString().split('T')[0],
        image: movie.image,
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (movie) {
        // Update movie
        await axios.put(`http://localhost:8000/api/movies/update-movie/${movie._id}`, formData);
      } else {
        // Add new movie
        await axios.post('http://localhost:8000/api/movies/add-movie', formData);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">{movie ? 'Update Movie' : 'Add Movie'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-200 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-200 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="genre">Genre</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-200 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="releaseDate">Release Date</label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-200 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
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
              {movie ? 'Update Movie' : 'Add Movie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
