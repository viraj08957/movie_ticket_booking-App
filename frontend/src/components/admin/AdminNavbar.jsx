import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    <Link to="/admin-dashboard">Admin Dashboard</Link>
                </div>
                <div className="space-x-4">
                    <Link to="/admin-movies" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                        Movies
                    </Link>
                    <Link to="/admin-users" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                        Users
                    </Link>
                    <Link to="/admin-reports" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                        Reports
                    </Link>
                </div>
                <div>
                    <Link to="/logout" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                        Logout
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
