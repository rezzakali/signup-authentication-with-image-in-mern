import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/card.css';

function Card({ post }) {
  return (
    <div id="card">
      <Link
        to={`/post/${post._id}`}
        className="card mt-5"
        style={{
          display: 'flex',
          alignContent: 'space-around',
          justifyContent: 'center',
          width: '60%',
          margin: 'auto',
        }}
      >
        <img
          src={`http://localhost:5000/${post.image}`}
          className="card-img-top"
          alt="images"
        />
        <hr />
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.description}</p>
          <Link className="btn btn-primary" to={`/post/${post._id}`}>
            Read More
          </Link>
        </div>
        <p
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: '5px',
          }}
        >
          {moment(`${post.date}`).format('LLL')}
        </p>
      </Link>
    </div>
  );
}

export default Card;
