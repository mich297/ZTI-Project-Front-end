import React, { useRef, useState, useEffect } from "react";
import { postData } from "./requests.js";
import "../styles/css/Default.css";
import "../styles/css/Login.css";
import { actualDate } from "./Functions.js";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [communicate, setCommunicate] = useState("");
  const labelRef = useRef();
  const [labelClass, setLabelClass] = useState("");
  const [toggle, setToggle] = useState(false);

  const loggedInUser = localStorage.getItem("user");
  const isStillValid = localStorage.getItem("today") === `${actualDate()[0]}`;
  if (loggedInUser && isStillValid) {
    console.log(loggedInUser);
    props.login(loggedInUser);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = postData(username, password);
    result.then((validationToken) => {
      if (validationToken === null && communicate === "") {
        setCommunicate("Nieprawidłowe dane!");
        setToggle(!toggle);
      } else if (validationToken === null) {
        setToggle(!toggle);
        setCommunicate("Nieprawidłowe dane!");
      } else {
        localStorage.setItem("user", username);
        localStorage.setItem("token", validationToken);
        localStorage.setItem("today", actualDate()[0]);
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

  return (
    <>
      <h1>Zaloguj</h1>
      <form id="loginForm" autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          className="inputForm"
          required
          placeholder="login"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <input
          type="password"
          className="inputForm"
          required
          placeholder="hasło"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <label ref={labelRef} className={labelClass} htmlFor="loginForm">
          {communicate}
        </label>
        <button className="button" type="submit">
          Zatwierdź
        </button>
      </form>
      <p onClick={() => props.handleRegister()}>Zarejestruj</p>
    </>
  );
};

export default LoginForm;
