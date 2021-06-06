import React, { useState, useEffect } from "react";
import "../../styles/css/Default.css";
import "../../styles/css/Profile.css";
import { changeAccData } from "../requests.js";

const Profile = (props) => {
  const [name, setName] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  const setParameters = (content) => {
    setContent(content);
  };

  let form = () => (
    <div className="profileContainer">
      <div>
        <input
          type="text"
          className="inputForm"
          placeholder="New username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        ></input>
        <button
          className="button"
          onClick={() =>
            changeAccData("login", username, () => setContent("confirm"))
          }
        >
          Change
        </button>
      </div>
      <div>
        <input
          type="password"
          className="inputForm"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        ></input>
        <button
          className="button"
          onClick={() =>
            changeAccData("password", password, () => setContent("confirm"))
          }
        >
          Change
        </button>
      </div>
      <div>
        <input
          type="text"
          className="inputForm"
          placeholder="New email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        ></input>
        <button
          className="button"
          onClick={() =>
            changeAccData("mail", email, () => setContent("confirm"))
          }
        >
          Change
        </button>
      </div>
      <div>
        <input
          type="text"
          className="inputForm"
          placeholder="New name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        ></input>
        <button
          className="button"
          onClick={() =>
            changeAccData("name", name, () => setContent("confirm"))
          }
        >
          Change
        </button>
      </div>
      <div>
        <input
          type="text"
          className="inputForm"
          placeholder="New surname"
          value={surname}
          onChange={(e) => setSurname(e.currentTarget.value)}
        ></input>
        <button
          className="button"
          onClick={() =>
            changeAccData("surname", surname, () => setContent("confirm"))
          }
        >
          Change
        </button>
      </div>
    </div>
  );

  let confirm = () => (
    <div className="profileContainer">
      <h1>Data Changed!</h1>
      <div>
        <button className="button" onClick={() => setContent("form")}>
          Got it
        </button>
      </div>
    </div>
  );

  //   const sendSettings = async (changed, oldPassword) => {
  //     fetch("http://localhost:3333/checkPass", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(oldPassword),
  //     }).then((response) => {
  //       if (response === true) {
  //         return fetch("http://localhost:3333/change", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(changed),
  //         }).then((response) => {
  //           if (response === true) {
  //             setContent("confirm");
  //           }
  //         });
  //       }
  //     });
  //   };

  const [content, setContent] = useState("form");

  return content === "form" ? form() : confirm();
};

export default Profile;
