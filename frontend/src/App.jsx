import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AdminPage from './components/admin/adminPage';
import MovieForm from './components/admin/MovieForm';
import ShowsList from './components/admin/ShowList';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
        
      </Routes>
    </Router>
  );
};

export default App;
