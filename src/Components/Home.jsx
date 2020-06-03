import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import { AuthContext } from '../Context/AuthContext'

const Home = () => {
  const { user, isAuthenticated, imageURL } = useContext(AuthContext);

  const profile = () => {
    const { username, firstName, lastName, essay } = user;
    return (
      <>
        <div className="username">ID: {username}</div>
        <div className="fullName">Name: {firstName} {lastName}</div>
        { imageURL !== "" ? <img src={imageURL} alt="profile"/> : <ImageUpload />}
        <div className="essay">{ essay }</div>
        <Link to="/profile">Manage Profile</Link>
      </>
    )
  }

  return (
    <div>
      <h1>Dating App</h1>
      { isAuthenticated ? profile() : null}
    </div>
  )
}

export default Home
