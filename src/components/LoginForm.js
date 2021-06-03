import React, { useRef, useState, useEffect } from "react";
import { postData } from "./requests.js";
import "../styles/css/Default.css";
import "../styles/css/Login.css";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [communicate, setCommunicate] = useState("");
  const labelRef = useRef();
  const [labelClass, setLabelClass] = useState("");
  const [toggle, setToggle] = useState(false);
  const url = "http://localhost:8080/login";
  const [user, setUser] = useState(null);

  const loggedInUser = localStorage.getItem("user");
  if (loggedInUser) {
    console.log(loggedInUser);
    props.login(loggedInUser);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = postData(username, password);
    result.then((validationToken) => {
      if (validationToken === null && communicate === "") {
        setCommunicate("Invaild password or/and username");
        setToggle(!toggle);
      } else if (validationToken === null) {
        setToggle(!toggle);
        setCommunicate("Invaild password or/and username");
      } else {
        localStorage.setItem("user", username);
        localStorage.setItem("token", validationToken);
        localStorage.setItem("permissions", "admin");
        props.login();
      }
    });
  };

  useEffect(() => {
    communicate === ""
      ? setLabelClass("label-noanim")
      : setLabelClass("label-anim");
    setTimeout(() => {
      setLabelClass("label-noanim");
    }, 300);
  }, [toggle]);

  let userData = {
    username: username,
    password: password,
  };

  return (
    <>
      <h1>Sign in</h1>
      <form id="loginForm" autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          className="inputForm"
          required
          placeholder="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <input
          type="password"
          className="inputForm"
          required
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <label ref={labelRef} className={labelClass} htmlFor="loginForm">
          {communicate}
        </label>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
      <p onClick={() => props.handleRegister()}>Sign up</p>
    </>
  );
};

export default LoginForm;
