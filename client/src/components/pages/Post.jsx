import Axios from 'axios';
import React, { useState } from 'react';
import '../styles/registerlogin.css';

function Contact() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postImage, setPostImage] = useState('');

  const handleFile = (e) => {
    setPostImage(e.target.files[0]);
  };
  const formData = new FormData();

  formData.append('title', title);
  formData.append('description', description);
  formData.append('postImage', postImage);

  async function handleSubmit(e) {
    Axios.post('http://localhost:5000/user/post', {
      formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <br />
      <br />
      <br />
      <br />

      <div className="row">
        <h1 className="text-center m-4">Write a new article</h1>
        <form
          action="http://localhost:5000/user/post"
          method="post"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="mb-3">
            <label htmlFor="postTitle">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              required={true}
              id="post"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="mt-2">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              name="description"
              id="description"
              placeholder="description"
              value={description}
              required={true}
              rows="5"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="file">Post image</label>
            <input
              type="file"
              name="postImage"
              id="postImage"
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
    </>
  );
}

export default Contact;
