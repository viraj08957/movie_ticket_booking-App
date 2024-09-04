import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import UserNavbar from './UserNavbar';

const UserPage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if no token
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/movies', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        // Optionally handle error, e.g., redirect to login if there's a 401 error
      }
    };

    fetchMovies();
  }, [navigate]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
      <UserNavbar />

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

        <h2 className="text-2xl font-bold mb-4">Newly Arrived Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.slice(0, 4).map((movie) => (
            <div key={movie._id} className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-96"> {/* Increased height */}
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="absolute inset-0 w-full h-full object-contain" // Changed to object-contain
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                <p className="text-gray-400 mb-4">{movie.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
