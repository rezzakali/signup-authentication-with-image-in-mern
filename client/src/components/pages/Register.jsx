import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const auth1 = useContext(AuthContext);

  const navigate = useNavigate();

  const [avatar, setAvatar] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('avatar', avatar);
    formData.append('phone', user.phone);
    formData.append('password', user.password);

    axios
      .post('http://localhost:5000/user/register', formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <br />
      <br />
      <br />
      {!auth1 ? (
        <div className="row">
          <form
            action="http://localhost:5000/user/register"
            method="post"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                required={true}
                id="post"
                placeholder="name"
                value={user.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="mt-2">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="email"
                value={user.email}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="mt-2">
                Phone
              </label>
              <input
                type="phone"
                className="form-control"
                name="phone"
                id="phone"
                placeholder="phone"
                value={user.phone}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="mt-2">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="password"
                value={user.password}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="file">Avatar</label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                className="form-control"
                required={true}
                onChange={handleFile}
              />
            </div>
            <input
              type="submit"
              value="Submit"
              className="btn btn-success w-100"
            />
          </form>
        </div>
      ) : (
        <>{navigate('/')}</>
      )}
    </>
  );
}

export default Register;
