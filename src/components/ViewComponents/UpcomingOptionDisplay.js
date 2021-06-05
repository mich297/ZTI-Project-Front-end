import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../styles/css/Default.css";
import "../../styles/css/Upcoming.css";
import Calendar from "./Calendar.js";
import { textDate, dayDisplay, isRegistered } from "../Functions.js";

// const displayDate = (date) => {
//   let displayDate = "";
//   if (date !== undefined) {
//     displayDate = `${date[0]}\t\t${
//       date[1] < 10 ? date[1].toString().padStart(2, "0") : date[1]
//     }\t\t${date[2]}`;
//   }
//   return displayDate;
// };

const displayDateFunction = (objectProp) => {
  if (objectProp.start === undefined) {
    return (
      <>
        <div className="singleElementBox">Starts: </div>
        <div className="singleElementBox">Ends:</div>
      </>
    );
  } else {
    return (
      <>
        <div className="singleElementBox">
          Starts: {objectProp.start[0]} {textDate(objectProp.start[1])}{" "}
          {dayDisplay(objectProp.start[2])} {objectProp.start[3]}:
          {objectProp.start[4]}
        </div>
        <div className="singleElementBox">
          Ends: {objectProp.end[0]} {textDate(objectProp.end[1])}{" "}
          {dayDisplay(objectProp.end[2])} {objectProp.end[3]}:
          {objectProp.end[4]}
        </div>
      </>
    );
  }
};

const UpcomingOptionDisplay = (props) => {
  return (
    <div className={props.dispClass}>
      <header>{props.objectProp.description}</header>
      <div>{displayDateFunction(props.objectProp)}</div>
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
