import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import AdminPage from './components/admin/AdminPage';
import MovieForm from './components/admin/MovieForm';
import ShowsList from './components/admin/ShowList';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import UserPage from './components/user/UserPage';
import BuyMoviePage from './components/user/BuyMoviePage';
import ShowDetailsPage from './components/user/ShowDetailsPage';
import About from './components/About';
import Contact from './components/Contact';

const App = () => {
  const [token, setToken] = useState(null);


  return (
    <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/" element={<Home/>} />
        <Route path='/admin'element={<AdminPage/>} />
        <Route path='/add-movie' element={<MovieForm/>}/>
        <Route path='/showlist' element={<ShowsList/>}/>
        <Route path='/userpage' element={<UserPage/>}/>
        <Route path='/buy-movies' element={<BuyMoviePage/>}/>
        <Route path='/show-details' element={<ShowDetailsPage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        
        
      </Routes>
    </Router>
  );
};

export default App;
