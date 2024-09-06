import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from '../components/NavigationBar';
import Slider from 'react-slick';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importing social media icons

// Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const sliderImages = [
  'https://assets-in.bmscdn.com/promotions/cms/creatives/1717080055549_playcardweb.jpg',
  'https://assets-in.bmscdn.com/promotions/cms/creatives/1724854257668_revisedtlpbmsbanner1240x300.jpg',
  'https://assetscdn1.paytm.com/images/catalog/view_item/2800917/1723660790217.jpg?format=webp&imwidth=1750',
];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/movies', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('API Response:', response.data); // Debugging log
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movies:', err); // More detailed error log
        setError(err);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching movies: {error.message}</p>;

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center text-gray-200"
      style={{
        backgroundImage:
          'url(https://plus.unsplash.com/premium_photo-1664303124313-126bf7456982?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      <NavigationBar />
      <main className="flex-grow mt-16">
        <div className="w-full h-80 overflow-hidden">
          <Slider {...sliderSettings} className="w-full h-full">
            {sliderImages.map((image, index) => (
              <div key={index} className="w-full h-full">
                <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </Slider>
        </div>
        <section className="mt-8 px-4 py-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Discover Your Next Adventure – Where Every Movie Is a New Journey!
          </h1>
          <p className="text-lg md:text-xl">Unleash the Magic of Movies – Experience Entertainment Like Never Before!</p>
        </section>

        <section className="mt-8 px-4 py-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Featured Movies</h2>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-800 p-4 rounded-lg shadow-xl flex flex-col items-center"
                  style={{ width: '300px', height: '450px' }} // Poster size dimensions
                >
                  <div className="relative w-full h-full mb-4">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="absolute inset-0 w-full h-full object-contain"
                      style={{ objectPosition: 'center' }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{movie.title}</h3>
                  <p className="text-gray-400 text-center">{movie.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-gray-200 py-4">
        <div className="container mx-auto flex justify-center space-x-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
        </div>
        <p className="text-center text-gray-400 mt-4">© {new Date().getFullYear()} i Cinema. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
