import React, { useState, useContext } from "react";
import AuthService from "../Services/AuthService";
import Message from "./Message";
import { AuthContext } from "../Context/AuthContext";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then(data => {
      const { isAuthenticated, user, message } = data;
      if(isAuthenticated){
        authContext.setUser(user);
        authContext.setImageURL(user.picture ? `/image/show/${user.picture}` : '');
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push('/');
      } else {
        setMessage(message);
      }
    })
  }


  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please Log In</h3>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          onChange={onChange}
          placeholder="Enter Username"
        ></input>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          onChange={onChange}
          placeholder="Enter Password"
        ></input>
        <button type="submit">Log In</button>
      </form>
      { message ? <Message message={message} /> : null }
    </div>
  )
}

export default Login
