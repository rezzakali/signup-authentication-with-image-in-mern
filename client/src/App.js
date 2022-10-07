/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import Register from './components/pages/Register';

export const AuthContext = createContext();

function App() {
  const [auth, setAuth] = useState(false);

  const navigate = useNavigate();

  const isLoggedIn = async () => {
    try {
      const result = await fetch('http://localhost:5000/user/auth', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (result.status === 200) {
        setAuth(true);
      }
      if (result.status === 401) {
        setAuth(false);
        navigate('/login');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      <div className="container">
        <Navbar auth={auth} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
