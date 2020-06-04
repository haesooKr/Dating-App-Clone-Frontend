import React, { useState, useContext } from "react";
import AuthService from "../Services/AuthService";
import Alert from "./Alert";
import { AuthContext } from "../Context/AuthContext";
import './scss/Login.scss';

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [alert, setAlert] = useState(null);
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
        setAlert(message);
      }
    })
  }


  return (
    <div className="login">
      <form onSubmit={onSubmit}>
        <img src="logo.png" alt="logo" />
        <h4>Enter your credentials to login</h4>
        <div>
          <input
            type="text"
            name="username"
            onChange={onChange}
            placeholder="Enter Username"
          ></input>
        </div>
        <div>
          <input
            type="password"
            name="password"
            onChange={onChange}
            placeholder="Enter Password"
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>
      { alert ? <Alert alert={alert} /> : null }
    </div>
  )
}

export default Login
