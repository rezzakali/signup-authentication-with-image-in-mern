import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const auth1 = useContext(AuthContext);

  const navigate = useNavigate();

  let name, value;
  const changeHandler = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (email && password !== '') {
      try {
        const result = await fetch('http://localhost:5000/user/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const res = await result.json();

        localStorage.setItem('jwt_token', res.tokens[0].token);

        if (result.status === 400 || result.status === 401 || !result) {
          window.alert('Invalid user details');
        } else {
          window.alert('Logged in successfully');
          setTimeout(() => {
            window.location.reload();
          }, 5);
          navigate('/about');
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      window.alert('Every blank field must be required');
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      {!auth1 ? (
        <div className="row">
          <div className="col">
            <form
              action="http://localhost:5000/user/login"
              method="post"
              className="p-4"
            >
              <h1>Don't share your login details</h1>
              <br />
              <br />
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={changeHandler}
                  value={user.email}
                  placeholder="name@example.com"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={changeHandler}
                  value={user.password}
                  placeholder="password"
                />
              </div>
              <button
                type="button"
                className="btn btn-success w-100"
                onClick={handleSubmit}
                id="button"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>{navigate('/')}</>
      )}
    </>
  );
}

export default Login;
