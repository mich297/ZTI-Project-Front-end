import React, { useState } from "react";
import "../../styles/css/Default.css";
import "../../styles/css/Profile.css";
import { changeAccData } from "../requests.js";

const Profile = () => {
  const [name, setName] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const emailTemplate = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let form = () => (
    <div className="profileContainer">
      <div>
        <input
          type="text"
          className="inputForm"
          placeholder="Nowy login"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        ></input>
        <button
          className="button"
          onClick={() =>
            changeAccData("login", username, () => setContent("confirm"))
          }
        >
          Zmień
        </button>
      </div>
      <div>
        <input
          type="password"
          className="inputForm"
          placeholder="Nowe hasło"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        ></input>
        <button
          className="button"
          onClick={() =>
            changeAccData("password", password, () => setContent("confirm"))
          }
        >
          Zmień
        </button>
      </div>
      <div>
        <input
          type="text"
          className="inputForm"
          placeholder="Nowy mail"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        ></input>
        <button
          className="button"
          onClick={() => {
            if (email.match(emailTemplate))
              changeAccData("mail", email, () => setContent("confirm"));
          }}
        >
          Zmień
        </button>
      </div>
      <div>
        <input
          type="text"
          className="inputForm"
          placeholder="Nowe imie"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        ></input>
        <button
          className="button"
          onClick={() =>
            changeAccData("name", name, () => setContent("confirm"))
          }
        >
          Zmień
        </button>
      </div>
      <div>
        <input
          type="text"
          className="inputForm"
          placeholder="Nowe nazwisko"
          value={surname}
          onChange={(e) => setSurname(e.currentTarget.value)}
        ></input>
        <button
          className="button"
          onClick={() =>
            changeAccData("surname", surname, () => setContent("confirm"))
          }
        >
          Zmień
        </button>
      </div>
    </div>
  );

  let confirm = () => (
    <div className="profileContainer">
      <h1>Dane zmienione!</h1>
      <div>
        <button className="button" onClick={() => setContent("form")}>
          Wstecz
        </button>
      </div>
    </div>
  );

  const [content, setContent] = useState("form");

  return content === "form" ? form() : confirm();
};

export default Profile;
