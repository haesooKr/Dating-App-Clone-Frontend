import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Alert from "../Components/Alert";
import './scss/Register.scss';

const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    role: "user",
    sex: "male",
    essay: "",
  });
  const [alert, setAlert] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      role: "user",
      sex: "male",
      essay: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setAlert(message);
      resetForm();
      if (!message.error) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };

  return (
    <div className="register">
      <form onSubmit={onSubmit}>
        <img src="logo.png" alt="logo" />
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={onChange}
          placeholder="Enter Username"
        ></input>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={onChange}
          placeholder="Enter Password"
        ></input>
        <div>
          <input
            type="firstName"
            name="firstName"
            value={user.firstName}
            onChange={onChange}
            placeholder="First Name"
          ></input>
          <input
            type="lastName"
            name="lastName"
            value={user.lastName}
            onChange={onChange}
            placeholder="Last Name"
          ></input>
        </div>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={onChange}
          placeholder="Enter Email"
        />
        <select name="sex" onChange={onChange} id="sex">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <textarea
          name="essay"
          onChange={onChange}
          id="essay"
          style={{ resize: "none" }}
          placeholder="Introduce Yourself"
        ></textarea>
        <button type="submit">Register</button>
      </form>
      {alert ? <Alert alert={alert} /> : null}
    </div>
  );
};

export default Register;
