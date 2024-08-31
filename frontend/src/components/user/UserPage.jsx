import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import UserNavbar from './UserNavbar';

const UserPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [showSearchResult, setShowSearchResult] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/movies/search-by-name', {
        params: { name: searchTerm }
      });
      if (response.data.length > 0) {
        setSearchResult(response.data[0]);
        setShowSearchResult(true);
      } else {
        setSearchResult(null);
        setShowSearchResult(false);
      }
    } catch (error) {
      console.error('Error searching movie:', error);
    }
  };

  const handleCloseSearchResult = () => {
    setShowSearchResult(false);
    setSearchResult(null);
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Your custom image links
  const sliderImages = [
    'https://assets-in.bmscdn.com/promotions/cms/creatives/1725020910681_mirajwebbanner.jpg',
    'https://assetscdn1.paytm.com/images/catalog/view_item/2800824/1723644537557.jpg?format=webp&imwidth=1750',
    'https://assetscdn1.paytm.com/images/catalog/view_item/2804654/1723640106667.jpg?format=webp&imwidth=1750',
  ];

  return (
    <div
      className="min-h-screen bg-gray-900 text-gray-200"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <UserNavbar/>

      <div className="p-8 bg-black bg-opacity-50 text-center">
        <h1 className="text-3xl font-bold mb-6">
          Get lost in the magic of the movies. Your seat is waiting, and the show is about to begin.
        </h1>

        <div className="mb-8">
          <Slider {...sliderSettings}>
            {sliderImages.map((image, index) => (
              <div key={index} className="w-full h-64">
                <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </Slider>
        </div>

        <div className="flex justify-center mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title..."
            className="p-2 rounded border border-gray-600 text-gray-900 mr-2"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center"
          >
            <FaSearch className="mr-2" />
            Search
          </button>
        </div>

        {showSearchResult && searchResult && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg w-1/2 max-w-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-200">Search Result</h2>
              <div className="mb-4">
                <img src={searchResult.image} alt={searchResult.title} className="w-full h-48 object-cover mb-4" />
                <p className="text-gray-200"><strong>Title:</strong> {searchResult.title}</p>
                <p className="text-gray-200"><strong>Description:</strong> {searchResult.description}</p>
                <p className="text-gray-200"><strong>Genre:</strong> {searchResult.genre}</p>
                <p className="text-gray-200"><strong>Release Date:</strong> {searchResult.releaseDate}</p>
              </div>
              <button
                onClick={handleCloseSearchResult}
                className="bg-gray-600 text-gray-200 py-2 px-4 rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
