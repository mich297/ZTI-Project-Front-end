import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../styles/css/Default.css";
import "../../styles/css/Upcoming.css";
import Calendar from "./Calendar.js";

const displayDate = (date) => {
  let displayDate = "";
  if (date !== undefined) {
    displayDate = `${date[0]}\t\t${
      date[1] < 10 ? date[1].toString().padStart(2, "0") : date[1]
    }\t\t${date[2]}`;
  }
  return displayDate;
};

const UpcomingOptionDisplay = (props) => {
  return (
    <div className={props.dispClass}>
      <header>{props.objectProp.name}</header>
      <div>{props.objectProp.banner}</div>
      <div>
        <div className="singleElementBox">
          {displayDate(props.objectProp.date)}
        </div>
        <div className="singleElementBox">
          Starts: {props.objectProp.begins}
        </div>
        <div className="singleElementBox">Ends: {props.objectProp.ends}</div>
      </div>
      <div className="lowerOptionBox">
        <div className="description">{props.objectProp.description}</div>
        <div className="optionButtons">
          <button
            className="button"
            onClick={() => props.conferencePanel(props.objectProp)}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingOptionDisplay;
