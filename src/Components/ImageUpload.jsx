import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

const ImageUpload = () => {
  const [file, setFile] = useState();
  const [upload, setUpload] = useState("Image Upload");
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
    document.querySelector('#btn-upload').classList.remove('hidden');
    setUpload(e.target.files[0].name);
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
        <label for="file-upload" class="custom-file-upload">
          <i class="fas fa-camera"></i><span>{upload}</span>
        </label>
        <input id="file-upload" type="file" name="file" onChange={onChange}/>
        <button type="submit" id="btn-upload" className="hidden"><i class="fas fa-arrow-up"></i> UPLOAD</button>

        { imageURL ? <img src={imageURL} alt="profile"/> : null }
      </form>
    </>
  )
};
  

export default ImageUpload
