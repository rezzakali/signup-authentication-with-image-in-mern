import React from 'react';

function Card({ post }) {
  console.log(post.image);
  return (
    <div>
      <div className="card" style={{ width: '18rem' }}>
        <img src={post.image} className="card-img-top" alt="images" />
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.description}</p>
          <button className="btn btn-primary">Go somewhere</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
