import React, { useState } from 'react';
import axios from 'axios';

const CinemaHallForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    hallNumber: '',
    filmName: '',
    numberOfSeats: '',
    numberOfSoldTickets: '',
    priceOfShow: '',
    date: '',
    time: ''
  });

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
      await axios.post('http://localhost:8000/api/cinema-halls/add-cinema-hall', formData);
      onClose(); // Close the form on successful submission
    } catch (error) {
      console.error('Error adding cinema hall:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 text-gray-200 p-6 rounded-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-500 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6">Add Cinema Hall</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="hallNumber" className="mb-1 font-semibold">Hall Number:</label>
            <input
              id="hallNumber"
              type="number"
              name="hallNumber"
              value={formData.hallNumber}
              onChange={handleChange}
              required
              className="p-3 rounded border border-gray-600 bg-gray-900 text-gray-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="filmName" className="mb-1 font-semibold">Film Name:</label>
            <input
              id="filmName"
              type="text"
              name="filmName"
              value={formData.filmName}
              onChange={handleChange}
              required
              className="p-3 rounded border border-gray-600 bg-gray-900 text-gray-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="numberOfSeats" className="mb-1 font-semibold">Number of Seats:</label>
            <input
              id="numberOfSeats"
              type="number"
              name="numberOfSeats"
              value={formData.numberOfSeats}
              onChange={handleChange}
              required
              className="p-3 rounded border border-gray-600 bg-gray-900 text-gray-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="numberOfSoldTickets" className="mb-1 font-semibold">Number of Sold Tickets:</label>
            <input
              id="numberOfSoldTickets"
              type="number"
              name="numberOfSoldTickets"
              value={formData.numberOfSoldTickets}
              onChange={handleChange}
              required
              className="p-3 rounded border border-gray-600 bg-gray-900 text-gray-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="priceOfShow" className="mb-1 font-semibold">Price of Show:</label>
            <input
              id="priceOfShow"
              type="number"
              name="priceOfShow"
              value={formData.priceOfShow}
              onChange={handleChange}
              required
              step="0.01"
              className="p-3 rounded border border-gray-600 bg-gray-900 text-gray-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="date" className="mb-1 font-semibold">Date:</label>
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="p-3 rounded border border-gray-600 bg-gray-900 text-gray-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="time" className="mb-1 font-semibold">Time:</label>
            <input
              id="time"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="p-3 rounded border border-gray-600 bg-gray-900 text-gray-200"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Add Cinema Hall
          </button>
        </form>
      </div>
    </div>
  );
};

export default CinemaHallForm;
