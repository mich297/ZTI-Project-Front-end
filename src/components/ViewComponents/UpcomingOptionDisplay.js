import React from "react";
import "../../styles/css/Default.css";
import "../../styles/css/Upcoming.css";
import { textDate, dayDisplay } from "../Functions.js";

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
        <div className="optionButtons">
          <button
            className="button"
            onClick={() => props.conferencePanel(props.objectProp)}
          >
            Szczegóły
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingOptionDisplay;
