import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData); // Log form data

        // Check for predefined admin credentials
        if (formData.email === 'admin123@gmail.com' && formData.password === 'adminpassword123') {
            localStorage.setItem('email', formData.email);
            localStorage.setItem('token', 'dummy-token'); // Dummy token for testing
            navigate('/admin');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', formData);
            console.log('Server response:', response.data); // Log server response

            const { role, token, message } = response.data;

            // Check if email and token are defined
            if (formData.email && token) {
                localStorage.setItem('email', formData.email);
                localStorage.setItem('token', token);

                // Navigate based on user role
                if (role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/userpage');
                }
            } else {
                throw new Error('Email or token is missing in the response');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'There was an error logging in!');
            console.error('Login error:', error.response?.data || error.message);
        }
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
            }}
        >
            <form onSubmit={handleSubmit} className="bg-gray-800 bg-opacity-90 p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">Login</h2>
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
                    className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 w-full mb-4"
                >
                    Login
                </button>
                <div className="flex justify-between text-gray-400 text-sm">
                    <Link to="/signup" className="hover:underline">
                        Don't have an account? Sign Up
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
