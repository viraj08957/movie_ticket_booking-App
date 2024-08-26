// src/pages/MovieForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MovieForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/movies/add-movie', {
        title,
        description,
        genre,
        releaseDate,
        image,
      });
      alert('Movie added successfully!');
      navigate('/admin-dashboard'); // Navigate back to the admin dashboard
    } catch (error) {
      alert('Failed to add movie');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-8">
      <h1 className="text-3xl font-bold mb-6">Add Movie</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg mb-1" htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>
        <div>
          <label className="block text-lg mb-1" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>
        <div>
          <label className="block text-lg mb-1" htmlFor="genre">Genre</label>
          <input
            id="genre"
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>
        <div>
          <label className="block text-lg mb-1" htmlFor="releaseDate">Release Date</label>
          <input
            id="releaseDate"
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>
        <div>
          <label className="block text-lg mb-1" htmlFor="image">Image URL</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            placeholder="https://example.com/path/to/image.jpg"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
