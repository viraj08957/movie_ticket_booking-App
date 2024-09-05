import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaFilm, FaSignOutAlt, FaTimes } from 'react-icons/fa'; // Import close icon
import axios from 'axios';

const UserNavbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            setUserEmail(email);
        }
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
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
            setSearchResult(null);
            setShowSearchResult(false);
        }
    };

    const handleCloseSearchResult = () => {
        setShowSearchResult(false);
        setSearchResult(null);
    };

    const handleProfileClick = () => {
        setShowProfileDropdown(!showProfileDropdown);
    };

    const handleLogout = () => {
        // Remove email and password from localStorage
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        // Redirect to the home page
        navigate('/login');
    };

    // Helper function to format the release date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <>
            <nav className="bg-gray-900 text-white p-4 flex items-center justify-between dark:bg-gray-800 dark:text-gray-200">
                <div className="flex items-center">
                    <Link to="/" className="text-xl font-bold flex items-center">
                        <img
                            src='https://image.freepik.com/vecteurs-libre/modele-conception-logo-cinema_92405-24.jpg'
                            alt="Logo"
                            className="h-8 w-auto mr-4 cursor-pointer"
                        />
                        i Cinema
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <form onSubmit={handleSearch} className="flex items-center bg-gray-700 rounded-full overflow-hidden dark:bg-gray-600">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search movies..."
                            className="p-2 bg-gray-800 text-white border-none outline-none dark:bg-gray-700 dark:text-gray-200"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            <FaSearch />
                        </button>
                    </form>
                    <Link to="/buy-movies" className="flex items-center">
                        <FaFilm className="text-xl" />
                        <span className="ml-2">Book Ticket</span>
                    </Link>

                    <Link to="/show-details" className="flex items-center">
                        <FaFilm className="text-xl" />
                        <span className="ml-2">Show Details</span>
                    </Link>
                    
                    <div className="relative">
                        <button onClick={handleProfileClick} className="flex items-center">
                            <FaUser className="text-xl" />
                        </button>
                        {showProfileDropdown && userEmail && (
                            <div className="absolute right-0 top-full mt-2 bg-gray-800 text-gray-200 p-4 rounded shadow-lg w-48 z-50">
                                <p><strong>Welcome</strong> {userEmail}</p>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center mt-4 bg-red-600 text-gray-200 py-2 px-4 rounded hover:bg-red-700"
                                >
                                    <FaSignOutAlt className="mr-2" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {showSearchResult && searchResult && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-8 rounded-lg w-11/12 max-w-4xl relative">
                        <button 
                            onClick={handleCloseSearchResult}
                            className="absolute top-2 right-2 text-gray-200 hover:text-gray-400"
                        >
                            <FaTimes className="text-2xl" />
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-gray-200">Search Result</h2>
                        <div className="flex flex-col md:flex-row">
                            <div className="flex-shrink-0 w-full md:w-1/2">
                                <img 
                                    src={searchResult.image} 
                                    alt={searchResult.title} 
                                    className="w-full h-auto object-cover rounded"
                                />
                            </div>
                            <div className="md:ml-8 mt-4 md:mt-0 text-gray-200">
                                <p><strong>Title:</strong> {searchResult.title}</p>
                                <p><strong>Description:</strong> {searchResult.description}</p>
                                <p><strong>Genre:</strong> {searchResult.genre}</p>
                                <p><strong>Release Date:</strong> {formatDate(searchResult.releaseDate)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserNavbar;
