import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/" element={<Home/>} />
        
      </Routes>
    </Router>
  );
};

export default App;
