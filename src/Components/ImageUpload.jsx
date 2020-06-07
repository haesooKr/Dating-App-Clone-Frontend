import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import "./scss/ImageUpload.scss";

const ImageUpload = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const { imageURL, setImageURL } = useContext(AuthContext);

  useEffect(() => {
    if (fileName !== "") {
      async function fetchData() {
        await axios
          .get(`https://dating-app-clone.herokuapp.com/image/show/${fileName}`, { withCredentials: true })
          .then((data) => setImageURL(data.config.url));
      }
      fetchData();
    }
  }, [fileName, setImageURL]);

  const onChange = (e) => {
    document.querySelector("#btn-upload").classList.remove("hidden");
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios
        .post("https://dating-app-clone.herokuapp.com/image/upload", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => setFileName(data.data.filename));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="form-upload" onSubmit={onSubmit}>
        <input id="file-upload" type="file" name="file" onChange={onChange} />
        <label htmlFor="file-upload">
          {imageURL ? (
            <img src={imageURL} alt="profile" />
          ) : (
            <img className="standard" src="logo.png" alt="profile" />
          )}
        </label>
        <button type="submit" id="btn-upload" className="hidden">
          <i className="fas fa-arrow-up"></i> UPLOAD
        </button>
      </form>
    </>
  );
};

export default ImageUpload;
