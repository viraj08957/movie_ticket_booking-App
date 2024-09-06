import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is installed and imported

const SeatSelectorModal = ({ isOpen, onClose, movie }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showDetails, setShowDetails] = useState(null);
    const [ticketPrice, setTicketPrice] = useState(0);
    const [userEmail, setUserEmail] = useState(''); // You might want to set this from user authentication context
    const rows = 5; // Number of rows
    const seatsPerRow = 10; // Number of seats per row

    useEffect(() => {
        if (movie) {
            // Fetch show details based on the movie title
            axios.get(`http://localhost:8000/api/shows/get-all-shows`)
                .then(response => {
                    const shows = response.data;
                    // Find the show that matches the movie title
                    const currentShow = shows.find(show => show.movieTitle === movie.title);
                    if (currentShow) {
                        setShowDetails(currentShow);
                        setTicketPrice(currentShow.ticketPrice);
                    }
                })
                .catch(error => {
                    console.error('Error fetching show details:', error.message);
                });
        }
    }, [movie]);

    if (!isOpen) return null;

    const handleSeatClick = (seat) => {
        const newSelectedSeats = [...selectedSeats];
        const seatIndex = newSelectedSeats.indexOf(seat);

        if (seatIndex > -1) {
            newSelectedSeats.splice(seatIndex, 1);
        } else {
            newSelectedSeats.push(seat);
        }

        setSelectedSeats(newSelectedSeats);
    };

    const handleBookTicket = async () => {
        if (selectedSeats.length === 0) {
            alert('No seats selected. Please select seats before booking.');
            return;
        }

        try {
            // Save ticket details regardless of payment status
            await saveTicketDetails();
            // Display Razorpay payment gateway
            initiatePayment();
        } catch (error) {
            console.error('Error booking ticket:', error.message);
        }
    };

    const saveTicketDetails = async () => {
        try {
            await axios.post('http://localhost:8000/api/tickets/add-ticket', {
                email: userEmail,
                movieTitle: movie.title,
                dateOfPurchase: new Date().toISOString(),
                timeOfShow: showDetails.time,
                ticketPrice: ticketPrice,
                seats: selectedSeats,
            });
        } catch (error) {
            console.error('Error saving ticket details:', error.message);
        }
    };

    const initiatePayment = () => {
        const options = {
            key: 'rzp_test_RulMO7WDmFkmi2', // Replace with your Razorpay Key ID
            amount: ticketPrice * selectedSeats.length * 100, // Amount in paise (e.g., 50000 paise = ₹500)
            currency: 'INR',
            name: 'iCinema',
            description: 'Movie Ticket Payment',
            handler: function (response) {
                alert(`Payment successful!\nPayment ID: ${response.razorpay_payment_id}`);
                // Additional logic for successful payment can be added here
                onClose(); // Close the modal after successful payment
            },
            prefill: {
                name: 'Viraj Raut',
                email: 'virajraut789.com',
                contact: '9130367611',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const seatClass = "bg-blue-500"; // Class for each seat

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white p-4 rounded-lg w-full max-w-2xl">
                {/* Movie Details */}
                <div className="mb-4 flex items-center">
                    <img src={movie.image} alt={movie.title} className="w-32 h-auto rounded-lg mr-4" />
                    <div>
                        <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                        <p className="text-gray-400 mb-2">{movie.description}</p>
                    </div>
                </div>

                {/* Show Details */}
                {showDetails && (
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Show Details</h3>
                        
                        <p className="mb-2"><strong>Time:</strong> {showDetails.time}</p>
                        
                        <p className="mb-2"><strong>Ticket Price:</strong> ₹{showDetails.ticketPrice}</p>
                    </div>
                )}

                {/* Seat Selection */}
                <h3 className="text-lg font-semibold mb-2">Select Seats</h3>
                <div className="grid grid-cols-12 gap-1 mb-4">
                    {/* Row Labels */}
                    <div></div> {/* Empty cell for spacing */}
                    {Array.from({ length: seatsPerRow }).map((_, seatIndex) => (
                        <div key={`header-${seatIndex}`} className="text-center text-gray-400 text-sm">
                            {seatIndex + 1}
                        </div>
                    ))}
                    {/* Seat Grid */}
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            <div className="text-center text-gray-400 text-sm">
                                {String.fromCharCode(65 + rowIndex)}
                            </div>
                            {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                                const seatNumber = `${String.fromCharCode(65 + rowIndex)}-${seatIndex + 1}`;
                                return (
                                    <div
                                        key={seatNumber}
                                        onClick={() => handleSeatClick(seatNumber)}
                                        className={`${seatClass} p-1 cursor-pointer text-center text-white rounded ${selectedSeats.includes(seatNumber) ? 'bg-blue-700' : ''}`}
                                    >
                                        {seatNumber}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>

                {/* Buttons */}
                <div className="mt-4 flex justify-between">
                    <button onClick={onClose} className="bg-gray-600 text-white px-4 py-2 rounded text-sm">Close</button>
                    <button
                        onClick={handleBookTicket}
                        className="bg-green-500 text-white px-4 py-2 rounded text-sm"
                    >
                        Book Ticket
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatSelectorModal;
