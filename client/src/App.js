import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import GotoTop from './components/GotoTop';
import Navbar from './components/Navbar';
import Notfound from './components/Notfound';
import About from './components/pages/About';
import Blogs from './components/pages/Blogs';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import Post from './components/pages/Post';
import PostDetails from './components/pages/PostDetails';
import Register from './components/pages/Register';

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
    <div>
      <div className="container">
        <Navbar auth={auth} />
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route element={<Notfound />} />
        </Routes>
        {auth ? <></> : ''}
        <GotoTop />
      </div>
    </div>
  );
}

export default App;
