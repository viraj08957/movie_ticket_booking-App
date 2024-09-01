import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BuyMoviePage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // State to hold search term

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/movies');
                setMovies(response.data);
            } catch (err) {
                setError('Failed to fetch movies');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="text-center py-4 text-gray-400">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

    return (
        <div className="p-4 bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-white text-center">Buy Movie Tickets</h1>
            
            {/* Search Input */}
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    placeholder="Search movies by name..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-2 w-full max-w-md bg-gray-800 text-white border-none outline-none rounded-lg placeholder-gray-400 text-center"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                        <div key={movie._id} className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-md flex flex-col justify-between h-full">
                            <div className="relative h-72"> 
                                <img
                                    src={movie.image}
                                    alt={movie.title}
                                    className="absolute inset-0 w-full h-full object-contain"
                                />
                            </div>
                            <div className="p-4 flex flex-col items-center">
                                <h2 className="text-xl font-semibold mb-2 text-center">{movie.title}</h2>
                                <p className="text-gray-400 mb-4 text-center">{movie.description}</p>
                                <Link
                                    to={`/buy/${movie._id}`}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out text-center"
                                >
                                    Buy Ticket
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-400 col-span-full">No movies found</div>
                )}
            </div>
        </div>
    );
};

export default BuyMoviePage;
