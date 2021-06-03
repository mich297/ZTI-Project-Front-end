import React, { useState, useEffect, useContext } from "react";
import "../styles/css/Default.css";
import "../styles/css/Panel.css";

const SinglePanel = (props) => {
  const [title, setTitle] = useState(props.name);
  const [desc, setDesc] = useState(props.description);
  const [from, setFrom] = useState(props.from);
  const [to, setTo] = useState(props.to);
  const [where, setWhere] = useState(props.where);
  const [link, setLink] = useState(props.link);

  return (
    <div className="panelGrid">
      <h1 className="newPanel">New panel</h1>
      <div className="singleRowContainer">
        <h3>Title:</h3>
        <input
          className="inputForm"
          type="textarea"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        ></input>
      </div>
      <div className="singleRowContainer">
        <h3>Description:</h3>
        <input
          className="inputForm"
          type="textarea"
          value={desc}
          rows={5}
          cols={5}
          onChange={(e) => {
            setDesc(e.currentTarget.value);
          }}
        ></input>
      </div>
      <div className="singleRowContainer">
        <h3>From:</h3>
        <input
          className="inputForm"
          type="textarea"
          value={from}
          onChange={(e) => {
            setFrom(e.currentTarget.value);
          }}
        ></input>
      </div>
      <div className="singleRowContainer">
        <h3>To:</h3>
        <input
          className="inputForm"
          type="textarea"
          value={to}
          onChange={(e) => {
            setTo(e.currentTarget.value);
          }}
        ></input>
      </div>
      <div className="singleRowContainer">
        <h3>Where:</h3>
        <input
          className="inputForm"
          type="textarea"
          value={where}
          onChange={(e) => {
            setWhere(e.currentTarget.value);
          }}
        ></input>
      </div>
      <div className="singleRowContainer">
        <h3>Link:</h3>
        <input
          className="inputForm"
          type="textarea"
          value={link}
          placeholder="ex. http://adress.com"
          onChange={(e) => {
            setLink(e.currentTarget.value);
          }}
        ></input>
      </div>
    </div>
  );
};

export default SinglePanel;
