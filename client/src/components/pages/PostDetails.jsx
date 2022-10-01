import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PostDetails() {
  const [post, setPost] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const fetchedData = async () => {
      await axios
        .get(`http://localhost:5000/user/posts/${id}`)
        .then((res) => {
          setPost(res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchedData();
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      {post ? (
        <div className="border rounded">
          <h1 className="m-5 text-center">{post.title}</h1>

          <img
            src={`http://localhost:5000/${post.image}`}
            alt="postImageSingle"
            style={{ width: '100%' }}
          />
          <p className="m-5">{post.description}</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default PostDetails;
