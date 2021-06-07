import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "../styles/css/Default.css";
import "../styles/css/Login.css";
import { actualDate } from "./Functions.js";
const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [passStr, setStr] = useState("none");
  const [communicate, setCommunicate] = useState("");
  const [matchLabel, setMatchlabel] = useState(null);
  const [userInvalid, setInvalid] = useState("");
  let history = useHistory();

  const emailTemplate = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passTemplateHard = /^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  const passTemplateMedium =
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  const passTemplateLow = /^(?=.*[a-z])(?=.{6,})/;

  useEffect(() => {
    handleVerifyEmail();
    handleBar();
    handleConfirmPass();
  }, [password, confirm, email]);

  const fetchData = async (data) => {
    return fetch("http://localhost:8080/registration", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        if (!data.ok) throw Error(data.statusText);
        else return data.text();
      })
      .then((result) => {
        return result;
      })
      .catch(() => setInvalid("Wpisane dane są zajęcte!"));
  };

  const handleSubmit = async (
    username,
    password,
    email,
    confirm,
    name,
    surname
  ) => {
    if (
      username === "" ||
      password !== confirm ||
      passStr === "none" ||
      email.match(emailTemplate) === false ||
      email === ""
    )
      return;
    let data = {
      login: username,
      password: password,
      mail: email,
      person: {
        name: name,
        surname: surname,
      },
    };
    if (password === confirm) {
      const response = fetchData(data);
      response.then((token) => {
        localStorage.setItem("user", username);
        localStorage.setItem("today", actualDate()[0]);
        localStorage.setItem("token", token);
        history.push("/main");
      });
    }
  };

  function handleBar() {
    if (password.match(passTemplateHard)) {
      setStr("strong");
    } else if (password.match(passTemplateMedium)) {
      setStr("medium");
    } else if (password.match(passTemplateLow)) {
      setStr("low");
    } else {
      setStr("none");
    }
  }

  function handleConfirmPass() {
    if (password === "" && confirm === "") setMatchlabel(null);
    else if (password === confirm) setMatchlabel(true);
    else setMatchlabel(false);
  }

  function handleVerifyEmail() {
    let condition = email.match(emailTemplate);
    if (email === "") setCommunicate("");
    else if (condition) setCommunicate("Email jest poprawny!");
    else setCommunicate("Nieprawidłowy email!");
  }

  return (
    <div id="loginContainer">
      <div className="loginRegisterForm">
        <h1>Rejestracja</h1>
        <div
          id="loginForm"
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="textarea"
            className="inputForm"
            placeholder="login"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <input
            type="textarea"
            className="inputForm"
            placeholder="imie"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <input
            type="textarea"
            className="inputForm"
            placeholder="nazwisko"
            value={surname}
            onChange={(e) => setSurname(e.currentTarget.value)}
          />
          <input
            type="password"
            className="inputForm"
            placeholder="hasło"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <label htmlFor="progressBar" className="progressLabel">
            Siła hasła:{" "}
            <mark className={passStr}>
              {passStr === "strong"
                ? "silne"
                : passStr === "medium"
                ? "średnie"
                : passStr === "low"
                ? "słabe"
                : "żadna"}
            </mark>
          </label>
          <div className="progressBar">
            <div
              className={`colorBar${
                passStr === "low" ||
                passStr === "medium" ||
                passStr === "strong"
                  ? "B"
                  : ""
              }`}
            ></div>
            <div
              className={`colorBar${
                passStr === "medium" || passStr === "strong" ? "B" : ""
              }`}
            ></div>
            <div className={`colorBar${passStr === "strong" ? "B" : ""}`}></div>
          </div>
          <input
            type="password"
            id="confirmPass"
            className="inputForm"
            placeholder="potwierdź hasło"
            value={confirm}
            onChange={(e) => setConfirm(e.currentTarget.value)}
          ></input>
          <label htmlFor="confirmPass" className="warningLabel">
            {matchLabel === null
              ? ""
              : matchLabel === false
              ? "Hasła się nie zgadzają!"
              : "Hasła się zgadzają"}
          </label>
          <input
            type="email"
            id="mailField"
            className="inputForm"
            placeholder="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          ></input>
          <label htmlFor="mailField" className="warningLabel">
            {communicate}
          </label>
          <button
            className="button"
            onClick={() =>
              handleSubmit(username, password, email, confirm, name, surname)
            }
          >
            Rejestruj
          </button>
        </div>
        <p>{userInvalid}</p>
        <p
          onClick={() => {
            history.push("/");
          }}
        >
          Cofnij
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
