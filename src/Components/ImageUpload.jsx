import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

const ImageUpload = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const { imageURL, setImageURL } = useContext(AuthContext);

  useEffect( () => {
    if(fileName !== ""){
      async function fetchData() {
        await axios.get(`/image/show/${fileName}`).then(data => setImageURL(data.config.url));
      }
      fetchData();
    }
  }, [fileName, setImageURL])


  const onChange = (e) => {
    setFile(e.target.files[0]);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("/image/upload", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
        }
      }).then(data => setFileName(data.data.filename));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="file" name="file" onChange={onChange} id="profile-image"/>
        <button type="submit">Upload</button>

        { imageURL ? <img src={imageURL} alt="profile"/> : null }
      </form>
    </>
  )
};
  

export default ImageUpload
