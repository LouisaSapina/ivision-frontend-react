import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsonData from '../data/data.json';

const ImgProcessing = () => {
  const [photos, setPhotos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    // Fetch JSON data using Axios
    axios.get('../data/data.json')
      .then(function (response) {
        const data = response.data;
        setPhotos(data.photos);
        setText(data.text);
      })
      .catch(function (error) {
        console.log(error);
      });

    // Access JSON data from imported file
    setPhotos(jsonData.photos);
    setText(jsonData.text);
  }, []);

  return (
    <div>
      <ul>
        {photos.map((photo, index) => (
          <li key={index}>
            <img src={photo.url} alt={photo.caption} />
            <p>{photo.name}</p>
            <p>{photo.iin}</p>
            <p>{photo.dateOfBirth}</p>
          </li>
        ))}
      </ul>

      <h2>Text</h2>
      <p>{text}</p>
    </div>
  );
};

export default ImgProcessing;
