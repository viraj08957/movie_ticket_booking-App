import React, { useState } from 'react';

const SeatSelectorModal = ({ isOpen, onClose, movie }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    if (!isOpen) return null;

    const handleSeatClick = (seat) => {
        setSelectedSeats((prev) =>
            prev.includes(seat)
                ? prev.filter((s) => s !== seat)
                : [...prev, seat]
        );
    };

    const renderSeats = () => {
        const totalSeats = 100;
        const seatLayout = Array.from({ length: totalSeats }, (_, index) => {
            let rowClass = '';
            if (index < 20) rowClass = 'bg-red-500'; // Prime seats
            else if (index < 50) rowClass = 'bg-yellow-500'; // Gold seats
            else rowClass = 'bg-gray-500'; // Classic seats

            const seatNumber = index + 1;
            const isSelected = selectedSeats.includes(index);

            return (
                <div
                    key={index}
                    className={`w-12 h-12 flex items-center justify-center rounded-sm cursor-pointer ${rowClass} ${
                        isSelected ? 'border-4 border-blue-700' : ''
                    }`}
                    onClick={() => handleSeatClick(index)}
                >
                    <span className={`text-xs ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                        {seatNumber}
                    </span>
                </div>
            );
        });

        return seatLayout;
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
            <div className="bg-gray-800 p-6 rounded-lg w-3/4 max-w-2xl">
                <h2 className="text-2xl font-bold mb-4 text-white">Select Seats</h2>
                {/* Movie Details */}
                {movie && (
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
                        <p className="text-gray-400 mb-2">{movie.genre}</p>
                        <p className="text-gray-300">{movie.description}</p>
                    </div>
                )}
                <div className="grid grid-cols-10 gap-2 mb-4">
                    {renderSeats()}
                </div>
                <div className="flex justify-between mt-4">
                    <button onClick={onClose} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Close</button>
                    <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default SeatSelectorModal;
