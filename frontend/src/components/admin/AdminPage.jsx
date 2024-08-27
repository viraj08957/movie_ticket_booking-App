import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import MovieForm from './MovieForm';

const AdminPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

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
    setCurrentMovie(null);
    setShowForm(true);
  };

  const handleEditClick = (movie) => {
    setCurrentMovie(movie);
    setShowForm(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/movies/delete-movie/${id}`);
      setMovies(movies.filter(movie => movie._id !== id));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    fetchMovies();
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/movies/search-by-name`, {
        params: { name: searchTerm }
      });
      if (response.data.length > 0) {
        setSearchResult(response.data[0]);
        setShowSearchResult(true);
      } else {
        setSearchResult(null);
        setShowSearchResult(false);
      }
    } catch (error) {
      console.error('Error searching movie:', error);
    }
  };

  const handleCloseSearchResult = () => {
    setShowSearchResult(false);
    setSearchResult(null);
  };

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
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-4">Welcome to the admin dashboard. Here you can manage various aspects of the application.</p>

      <div className="relative mb-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAddMovieClick}
            className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700"
          >
            Add Movie
          </button>
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title..."
            className="p-2 rounded border border-gray-600 text-gray-900 mr-2"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center"
          >
            <FaSearch className="mr-2" />
            Search
          </button>
        </div>

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
                  <th className="p-3 text-left text-sm font-semibold text-gray-200">Actions</th>
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
                    <td className="p-3">
                      <button
                        onClick={() => handleEditClick(movie)}
                        className="text-yellow-500 hover:text-yellow-600 mr-2"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(movie._id)}
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
      </div>

      {showForm && (
        <MovieForm onClose={handleCloseForm} movie={currentMovie} />
      )}

      {showSearchResult && searchResult && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 text-gray-200 p-4 rounded-lg w-1/3 max-w-sm relative">
            <button
              onClick={handleCloseSearchResult}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-300"
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-2">{searchResult.title}</h2>
            <img src={searchResult.image} alt={searchResult.title} className="w-full h-auto rounded mb-2" />
            <p className="mb-2"><strong>Description:</strong> {searchResult.description}</p>
            <p className="mb-2"><strong>Genre:</strong> {searchResult.genre}</p>
            <p><strong>Release Date:</strong> {new Date(searchResult.releaseDate).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
