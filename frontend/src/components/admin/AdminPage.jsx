import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import React Icons
import MovieForm from './MovieForm'; // Import MovieForm component

const AdminPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [currentMovie, setCurrentMovie] = useState(null); // State to store current movie for update
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
    setCurrentMovie(null); // Clear current movie for adding new movie
    setShowForm(true); // Show the MovieForm when Add Movie is clicked
  };

  const handleEditClick = (movie) => {
    setCurrentMovie(movie); // Set the current movie to be edited
    setShowForm(true); // Show the MovieForm for editing
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/movies/delete-movie/${id}`);
      setMovies(movies.filter(movie => movie._id !== id)); // Remove the deleted movie from the list
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false); // Hide the MovieForm when Cancel is clicked
    fetchMovies(); // Refresh movie list
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

      {/* Container for table and button */}
      <div className="relative">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAddMovieClick}
            className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700"
          >
            Add Movie
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
                  <th className="p-3 text-left text-sm font-semibold text-gray-200">Actions</th> {/* New header for actions */}
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

      {/* MovieForm component */}
      {showForm && (
        <MovieForm onClose={handleCloseForm} movie={currentMovie} />
      )}
    </div>
  );
};

export default AdminPage;
