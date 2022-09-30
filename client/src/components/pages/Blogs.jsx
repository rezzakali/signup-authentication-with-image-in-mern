import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../Card';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchedData = async () => {
      await axios
        .get(' http://localhost:5000/user/posts')
        .then((res) => {
          setPosts(res.data.result);
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
      {posts.map((post) => {
        return <Card post={post} key={post._id} />;
      })}
    </div>
  );
}

export default Home;
