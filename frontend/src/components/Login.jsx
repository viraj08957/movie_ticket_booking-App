import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', formData);
            const { role, email } = response.data;

            // Store email and password in localStorage (note: storing passwords is not recommended)
            localStorage.setItem('email', formData.email);
            localStorage.setItem('password', formData.password); // Not recommended for security reasons

            // Log to console to verify
            console.log('Stored email:', localStorage.getItem('userEmail'));
            console.log('Stored password:', localStorage.getItem('userPassword')); // Be cautious with this

            // Navigate based on user role
            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/userpage');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'There was an error logging in!');
            console.error('Login error:', error.response?.data || error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-200">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mb-4 p-3 w-full border border-gray-700 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mb-6 p-3 w-full border border-gray-700 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 w-full"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
