
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10); 
  const navigate = useNavigate();


  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);


  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  const handleAddMovieClick = () => {
    navigate('/add-movie');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-4">Welcome to the admin dashboard. Here you can manage various aspects of the application.</p>
      
    
      <h2 className="text-2xl font-bold mb-4">Uploaded Movies</h2>
      {movies.length === 0 ? (
        <p className="text-gray-400">No movies available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-800 border border-gray-700 rounded-lg">
            <thead className="bg-gray-700">
              <tr className="border-b border-gray-600">
                <th className="p-3 text-left text-sm font-semibold text-gray-200">Title</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-200">Description</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-200">Genre</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-200">Release Date</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-200">Image</th>
              </tr>
            </thead>
            <tbody>
              {currentMovies.map((movie) => (
                <tr key={movie._id} className="border-b border-gray-600">
                  <td className="p-3 text-sm">{movie.title}</td>
                  <td className="p-3 text-sm">{movie.description}</td>
                  <td className="p-3 text-sm">{movie.genre}</td>
                  <td className="p-3 text-sm">{new Date(movie.releaseDate).toLocaleDateString()}</td>
                  <td className="p-3">
                    <img src={movie.image} alt={movie.title} className="w-24 h-auto rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-600"
        >
          Previous
        </button>
        <span className="text-gray-400">Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastMovie >= movies.length}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-600"
        >
          Next
        </button>
      </div>
      
      <button
        onClick={handleAddMovieClick}
        className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 mt-6"
      >
        Add Movie
      </button>
    </div>
  );
};

export default AdminPage;
