import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import { AuthContext } from '../Context/AuthContext'
import './scss/Home.scss';

const Home = () => {
  const { user, isAuthenticated, imageURL } = useContext(AuthContext);

  const profile = () => {
    const { username, firstName, lastName, essay } = user;
    return (
      <>
        <div className="fullName">Welcome! {firstName} {lastName}</div>
        { imageURL !== "" ? <img src={imageURL} alt="profile"/> : <ImageUpload />}
        <div className="essay">{ essay }</div>
        <div className="links">
          <Link to="/profile">Manage Profile</Link>
          <Link to="/delete">Delete Account</Link>
        </div>
      </>
    )
  }

  return (
    <div className="home">
      { isAuthenticated ? profile() : <img className="logo" src="logo.png" alt="logo"></img>}
    </div>
  )
}

export default Home
