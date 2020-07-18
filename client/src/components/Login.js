import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';


export default function Login(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  };

  const login = e => {
    e.preventDefault();
    // make post request and send credentials object
    axiosWithAuth()
      .post("/login", credentials)
      .then(res => {
        console.log(res);
        window.localStorage.setItem("token", res.data.payload);
        props.history.push("/colors")
      })
      .catch(err => {
        console.log("Error loggin in", err);
      });
  };

  return (
    <div className="login">
      <form onSubmit={login}>
        <label htmlFor="username">
          UserName: </label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </div>
  )
};


