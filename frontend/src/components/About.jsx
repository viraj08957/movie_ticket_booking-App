import React from 'react';
import NavigationBar from '../components/NavigationBar';

const About = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center text-gray-200"
      style={{ backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1664303124313-126bf7456982?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}
    >
      <NavigationBar />
      <main className="flex-grow mt-16 px-4 py-8">
        <section className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-xl text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-lg md:text-xl mb-4">
            Welcome to i Cinema, where we celebrate the magic of cinema. Our mission is to bring you the best
            in entertainment, from the latest blockbuster hits to timeless classics. We believe that movies have the
            power to inspire, entertain, and bring people together, and we are dedicated to making your movie-watching
            experience unforgettable.
          </p>
          <p className="text-lg md:text-xl mb-4">
            Our platform is designed to be user-friendly and accessible, offering a wide selection of movies for all
            tastes and preferences. Whether you're in the mood for action, comedy, drama, or romance, we have something
            for everyone.
          </p>
          <p className="text-lg md:text-xl">
            Thank you for choosing iCinema. We look forward to being your go-to source for all things
            cinema. Enjoy the show!
          </p>
        </section>
      </main>
      <footer className="bg-gray-900 text-gray-200 py-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 mt-4">
            © {new Date().getFullYear()} i Cinema. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
