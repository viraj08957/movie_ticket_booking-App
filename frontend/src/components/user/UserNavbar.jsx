
import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaFilm } from 'react-icons/fa';

const UserNavbar = () => {
    return (
        <nav className="bg-gray-900 text-white p-4 flex items-center justify-between dark:bg-gray-800 dark:text-gray-200">
            <div className="flex items-center">
                <Link to="/" className="text-xl font-bold flex items-center">
                <img
                    src='https://image.freepik.com/vecteurs-libre/modele-conception-logo-cinema_92405-24.jpg' 
                    alt="Logo"
                    className="h-8 w-auto mr-4 cursor-pointer"
                    onClick={() => history.push('/')} 
                />
                    i Cinema
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <form className="flex items-center bg-gray-700 rounded-full overflow-hidden dark:bg-gray-600">
                    <input
                        type="text"
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
                <Link to="/profile" className="flex items-center">
                    <FaUser className="text-xl" />
                </Link>
            </div>
        </nav>
    );
};

export default UserNavbar;
