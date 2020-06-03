import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Alert from "../Components/Alert";

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
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please Register In</h3>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={onChange}
          placeholder="Enter Username"
        ></input>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={onChange}
          placeholder="Enter Password"
        ></input>
        <label htmlFor="firstName">First Name: </label>
        <input
          type="firstName"
          name="firstName"
          id="firstName"
          value={user.firstName}
          onChange={onChange}
          placeholder="Enter firstName"
        ></input>
        <label htmlFor="lastName">Last Name: </label>
        <input
          type="lastName"
          name="lastName"
          id="lastName"
          value={user.lastName}
          onChange={onChange}
          placeholder="Enter lastName"
        ></input>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={onChange}
          placeholder="Enter Email"
        />
        <label htmlFor="sex">Sex: </label>
        <select name="sex" onChange={onChange} id="sex">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label htmlFor="essay">Essay: </label>
        <textarea
          name="essay"
          onChange={onChange}
          id="essay"
          style={{ resize: "none" }}
        ></textarea>
        <button type="submit">Register</button>
      </form>
      {alert ? <Alert alert={alert} /> : null}
    </div>
  );
};

export default Register;
