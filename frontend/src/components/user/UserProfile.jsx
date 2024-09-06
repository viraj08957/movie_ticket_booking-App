import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Adjust the path if needed

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/auth/user'); // Replace with your API endpoint
                setUser(response.data);
                setFormData({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    username: response.data.username,
                    email: response.data.email,
                    phoneNumber: response.data.phoneNumber,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleEditToggle = () => {
        setEditing(!editing);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:8000/api/auth/update-user', formData); // Replace with your API endpoint
            setUser(formData);
            setEditing(false);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-200">
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                {editing ? (
                    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded shadow-lg">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="border rounded p-2 w-full dark:bg-gray-700 dark:text-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="border rounded p-2 w-full dark:bg-gray-700 dark:text-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="border rounded p-2 w-full dark:bg-gray-700 dark:text-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="border rounded p-2 w-full dark:bg-gray-700 dark:text-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="border rounded p-2 w-full dark:bg-gray-700 dark:text-gray-200"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded dark:bg-blue-400">
                            Save Changes
                        </button>
                    </form>
                ) : (
                    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg">
                        <p><strong>First Name:</strong> {user.firstName}</p>
                        <p><strong>Last Name:</strong> {user.lastName}</p>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                        <button
                            onClick={handleEditToggle}
                            className="bg-green-500 text-white px-4 py-2 rounded mt-4 dark:bg-green-400"
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;