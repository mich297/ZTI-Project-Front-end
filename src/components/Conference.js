import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles//css/Default.css";
import "../styles/css/Main.css";

const Conference = (props) => {
  return (
    <div className="conferenceGrid">
      <h1>{props.conference.name}</h1>
      <div>Date of the Conference: {props.conference.date}</div>
      <div className="singleRowContainer">
        <div>
          Hours: {props.conference.begins} - {props.conference.ends}
        </div>
      </div>
      <div>{props.conference.desc}</div>
    </div>
  );
};

export default Conference;
