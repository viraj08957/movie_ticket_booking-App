import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', formData);
      alert(response.data.message);
      setShowOtpModal(true);
    } catch (error) {
      console.error('Error creating the account!', error);
      alert('Error creating the account!');
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async () => {
    try {
      console.log('Submitting OTP:', otp);
      const response = await axios.post('https://icinema-huv8.onrender.com/api/auth/verify-otp', { email: formData.email, otp });
      console.log('Response:', response.data);
  
      if (response.data.success) {
        alert('OTP verified successfully!');
        console.log('Navigating to /userpage');
        navigate('/userpage'); // Ensure this line is executed
      } else {
        setVerificationError(response.data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      const errorMessage = error.response?.data?.message || 'Error verifying the OTP. Please try again.';
      setVerificationError(errorMessage);
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
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">Sign Up</h2>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          className="mb-4 p-3 w-full border border-gray-700 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          className="mb-4 p-3 w-full border border-gray-700 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="mb-4 p-3 w-full border border-gray-700 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
          className="mb-4 p-3 w-full border border-gray-700 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="mb-4 p-3 w-full border border-gray-700 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="mb-6 p-3 w-full border border-gray-700 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 w-full"
        >
          Sign Up
        </button>
      </form>

      
      {showOtpModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded shadow-md max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-200">OTP Verification</h2>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter OTP"
              className="mb-4 p-3 w-full border border-gray-700 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {verificationError && <p className="text-red-500 mb-4">{verificationError}</p>}
            <button
              onClick={handleOtpSubmit}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
            >
              Verify OTP
            </button>
            <hr></hr>
            <hr></hr>
            <button
              onClick={()=>{navigate("/login")}}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
            >
              Now Login You Can Login
            </button>

            
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
