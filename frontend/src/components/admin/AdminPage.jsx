import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSearch, FaEye, FaSignOutAlt } from 'react-icons/fa';
import MovieForm from './MovieForm';
import ShowForm from './ShowForm';
import CinemaHallForm from './CinemaHallForm';

const AdminPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(6); // Changed to 6
  const [showForm, setShowForm] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [showFormType, setShowFormType] = useState(null);
  const [showCinemaHallForm, setShowCinemaHallForm] = useState(false);
  const [showShowForm, setShowShowForm] = useState(false);
  const [cinemaHalls, setCinemaHalls] = useState([]);
  const [showCinemaHalls, setShowCinemaHalls] = useState(false);
  const [selectedCinemaHall, setSelectedCinemaHall] = useState(null);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchCinemaHalls = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/cinema-halls');
      setCinemaHalls(response.data);
    } catch (error) {
      console.error('Error fetching cinema halls:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchCinemaHalls();
  }, []);

  // Calculate pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddMovieClick = () => {
    setCurrentMovie(null);
    setShowFormType('movie');
    setShowForm(true);
  };

  const handleAddShowClick = () => {
    setShowFormType('show');
    setShowShowForm(true);
  };

  const handleAddCinemaHallClick = () => {
    setShowCinemaHallForm(true);
  };

  const handleEditClick = (movie) => {
    setCurrentMovie(movie);
    setShowFormType('movie');
    setShowForm(true);
  };

  const handleDeleteMovieClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/movies/delete-movie/${id}`);
      setMovies(movies.filter(movie => movie._id !== id));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleDeleteCinemaHallClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/cinema-halls/${id}`);
      setCinemaHalls(cinemaHalls.filter(cinemaHall => cinemaHall._id !== id));
    } catch (error) {
      console.error('Error deleting cinema hall:', error);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowShowForm(false);
    setShowCinemaHallForm(false);
    setShowCinemaHalls(false);
    setSelectedCinemaHall(null); // Reset selected cinema hall
    fetchMovies();
    fetchCinemaHalls(); // Refresh cinema halls data
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/movies/search-by-name', {
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

  const handleViewCinemaHallDetails = (cinemaHall) => {
    setSelectedCinemaHall(cinemaHall);
  };

  const handleCloseCinemaHallDetails = () => {
    setSelectedCinemaHall(null);
  };

  const handleLogout = () => {
    // Clear authentication tokens or session data here
    localStorage.removeItem('authToken');
    // Redirect to login page
    window.location.href = '/login';
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 flex items-center"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
      <p className="mb-4">Welcome to the admin dashboard. Here you can manage various aspects of the application.</p>
      <div className="relative mb-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAddMovieClick}
            className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 mr-2"
          >
            Add Movie
          </button>
          <button
            onClick={handleAddShowClick}
            className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 mr-2"
          >
            Add Show
          </button>
          <button
            onClick={handleAddCinemaHallClick}
            className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 mr-2"
          >
            Add Cinema Hall
          </button>
          <button
            onClick={() => window.location.href = '/showlist'}
            className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 ml-2"
          >
            Show List
          </button>
          <button
            onClick={() => setShowCinemaHalls(!showCinemaHalls)}
            className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 ml-2"
          >
            {showCinemaHalls ? 'Hide Cinema Halls' : 'Show Cinema Halls'}
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
                  <th className="p-3 text-left text-sm font-semibold text-gray-200">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentMovies.map((movie) => (
                  <tr key={movie._id} className="border-b border-gray-600">
                    <td className="p-3 text-sm text-gray-200">{movie.title}</td>
                    <td className="p-3 text-sm text-gray-200">{movie.description}</td>
                    <td className="p-3 text-sm text-gray-200">{movie.genre}</td>
                    <td className="p-3 text-sm text-gray-200">{movie.releaseDate}</td>
                    <td className="p-3 text-sm text-gray-200">
                      <img src={movie.image} alt={movie.title} className="w-16 h-16 object-cover" />
                    </td>
                    <td className="p-3 text-sm text-gray-200">
                      <button
                        onClick={() => handleEditClick(movie)}
                        className="text-green-600 hover:text-green-800 mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteMovieClick(movie._id)}
                        className="text-red-600 hover:text-red-800"
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

        {showCinemaHalls && (
          <div className="overflow-x-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Cinema Halls</h2>
            {cinemaHalls.length === 0 ? (
              <p className="text-gray-400">No cinema halls available</p>
            ) : (
              <table className="w-full bg-gray-800 border border-gray-700 rounded-lg">
                <thead className="bg-gray-700">
                  <tr className="border-b border-gray-600">
                    <th className="p-3 text-left text-sm font-semibold text-gray-200">Hall ID</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-200">Film name</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-200">Total seats</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-200">Sold tickets</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-200">Price of show</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-200">Date</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-200">Time</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-200">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cinemaHalls.map((cinemaHall) => (
                    <tr key={cinemaHall._id} className="border-b border-gray-600">
                      <td className="p-3 text-sm text-gray-200">{cinemaHall.hallNumber}</td>
                      <td className="p-3 text-sm text-gray-200">{cinemaHall.filmName}</td>
                      <td className="p-3 text-sm text-gray-200">{cinemaHall.numberOfSeats}</td>
                      <td className="p-3 text-sm text-gray-200">{cinemaHall.numberOfSoldTickets}</td>
                      <td className="p-3 text-sm text-gray-200">{cinemaHall.priceOfShow}</td>
                      <td className="p-3 text-sm text-gray-200">{cinemaHall.date}</td>
                      <td className="p-3 text-sm text-gray-200">{cinemaHall.time}</td>
                      <td className="p-3 text-sm text-gray-200">
                        <button
                          onClick={() => handleViewCinemaHallDetails(cinemaHall)}
                          className="text-blue-600 hover:text-blue-800 mr-2"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDeleteCinemaHallClick(cinemaHall._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Movie Form */}
      {showForm && <MovieForm movie={currentMovie} onClose={handleCloseForm} />}

      {/* Show Form */}
      {showShowForm && <ShowForm onClose={handleCloseForm} />}

      {/* Cinema Hall Form */}
      {showCinemaHallForm && <CinemaHallForm onClose={handleCloseForm} />}

      {/* Search Result */}
      {showSearchResult && searchResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg w-1/2 max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-200">Search Result</h2>
            <div className="mb-4">
              <img src={searchResult.image} alt={searchResult.title} className="w-full h-48 object-cover mb-4" />
              <p className="text-gray-200"><strong>Title:</strong> {searchResult.title}</p>
              <p className="text-gray-200"><strong>Description:</strong> {searchResult.description}</p>
              <p className="text-gray-200"><strong>Genre:</strong> {searchResult.genre}</p>
              <p className="text-gray-200"><strong>Release Date:</strong> {searchResult.releaseDate}</p>
            </div>
            <button
              onClick={handleCloseSearchResult}
              className="bg-gray-600 text-gray-200 py-2 px-4 rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Cinema Hall Details */}
      {selectedCinemaHall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg w-1/2 max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-200">Cinema Hall Details</h2>
            <p className="text-gray-200"><strong>Hall Id:</strong> {selectedCinemaHall.hallNumber}</p>
            <p className="text-gray-200"><strong>Film:</strong> {selectedCinemaHall.filmName}</p>
            <p className="text-gray-200"><strong>Price:</strong> {selectedCinemaHall.priceOfShow}</p>
            <button
              onClick={handleCloseCinemaHallDetails}
              className="bg-gray-600 text-gray-200 py-2 px-4 rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2"
        >
          Previous
        </button>
        <span className="text-gray-200">Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastMovie >= movies.length}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
