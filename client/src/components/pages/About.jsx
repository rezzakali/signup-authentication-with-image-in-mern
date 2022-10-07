import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';

function About() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await Axios.get('http://localhost:5000/user/userinfo');
        setUser(users.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');

    if (token) {
      const user = jwt_decode(token);
      // if (!user) {
      //   localStorage.removeItem('token');
      //   navigate('/login');
      // } else {
      //   navigate('/');
      // }
      console.log(user);
    }
  }, []);
  return (
    <div className="text-center">
      <br />
      <br />
      <br />
      <br />
      <h1>About Author</h1>
      <hr />
      {user.map((usr) => (
        <div key={usr._id}>
          <img
            src={`http://localhost:5000/${usr.avatar}`}
            alt="users"
            style={{ borderRadius: '50%' }}
          />
          <h4>{usr.name}</h4>
          <h4>{usr.email}</h4>
          <h4>{usr.phone}</h4>
        </div>
      ))}
    </div>
  );
}

export default About;
