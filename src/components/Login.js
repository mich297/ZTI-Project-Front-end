import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/css/Default.css";
import "../styles/css/Login.css";
import LoginForm from "./LoginForm.js";

const Login = (props) => {
  let history = useHistory();

  function useLogin() {
    history.push("/main");
  }

  function handleRegister() {
    history.push("/register");
  }

  return (
    <div id="loginContainer">
      <div className="loginRegisterForm">
        <LoginForm login={useLogin} handleRegister={() => handleRegister()} />
      </div>
    </div>
  );
};

export default Login;
