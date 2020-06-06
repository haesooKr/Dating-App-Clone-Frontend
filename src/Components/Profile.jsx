import React, { useState, useContext } from "react";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import { AuthContext } from "../Context/AuthContext";
import "./scss/Profile.scss";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [essay, setEssay] = useState("");

  const onClick = (e) => {
    if (e) {
      e.preventDefault();
    }
    document.querySelector(".essay").classList.toggle("hidden");
    document.querySelector(".input-essay").classList.toggle("hidden");
  };

  const onChange = (e) => {
    setEssay(e.target.value);
  };

  async function updateEssay() {
    await axios
      .post("https://dating-app-clone.herokuapp.com/user/update", { essay }, { withCredentials: true })
      .then((data) => {
        setUser({ ...user, essay });
        setEssay("");
        onClick();
      });
  }

  const onUpdate = (e) => {
    e.preventDefault();
    updateEssay();
  };

  return (
    <div className="profile">
      <ImageUpload />
      <div className="username">{user.username}</div>
      <div className="fullName">
        {user.firstName} {user.lastName}
      </div>
      <div className="essay">
        {user.essay}{" "}
        <button onClick={onClick}>
          <i className="fas fa-undo"></i>
        </button>
      </div>
      <div className="input-essay hidden">
        <textarea
          name="essay"
          type="text"
          placeholder={user.essay}
          onChange={onChange}
          value={essay}
        />
        <div className="btns">
          <button onClick={onUpdate}>Update</button>
          <button onClick={onClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
