import React, { useContext } from 'react'
import ImageUpload from './ImageUpload';
import { AuthContext } from '../Context/AuthContext'

const Home = () => {
  const { user, setUser, isAuthenticated, setIsAuthenticated, imageURL } = useContext(AuthContext);

  const profile = () => {
    console.log(imageURL)
    const { username, firstName, lastName, sex, essay } = user;
    return (
      <>
        <div className="username">ID: {username}</div>
        <div className="fullName">Name: {firstName} {lastName}</div>
        { imageURL !== "" ? <img src={imageURL} alt="profile"/> : <ImageUpload />}
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
