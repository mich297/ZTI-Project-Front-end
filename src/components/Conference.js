import React, { useState } from "react";
import { markPanel } from "./requests.js";
import "../styles//css/Default.css";
import "../styles/css/Main.css";
import "../styles/css/Conference.css";

const Conference = (props) => {
  const [inputVal, setInputVal] = useState();
  const [communicate, setCommunicate] = useState();
  const regex = /^[1-9]|10/;

  const actualDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    return [dd, mm, yyyy];
  };

  const isBeforeTime = () => {
    if (props.conference.start[0] <= actualDate()[2]) {
      if (props.conference.start[1] <= actualDate()[1]) {
        if (props.conference.start[2] <= actualDate()[0]) return true;
      }
    }
  };

  return (
    <div className="conferenceGrid">
      <h1>{props.conference.description}</h1>
      <div className="conferenceInfo">
        Start konferencji:
        <mark>
          {props.conference.start[0]}-
          {props.conference.start[1] < 10
            ? `0${props.conference.start[1]}`
            : props.conference.start[1]}
          -
          {props.conference.start[2] < 10
            ? `0${props.conference.start[2]}`
            : props.conference.start[2]}
          {"\t"}
          {props.conference.start[3] < 10
            ? `0${props.conference.start[3]}`
            : props.conference.start[3]}
          :
          {props.conference.start[4] < 10
            ? `0${props.conference.start[4]}`
            : props.conference.start[4]}
        </mark>
      </div>
      <div className="conferenceInfo">
        Koniec konferencji:
        <mark>
          {props.conference.end[0]}-
          {props.conference.end[1] < 10
            ? `0${props.conference.end[1]}`
            : props.conference.end[1]}
          -
          {props.conference.end[2] < 10
            ? `0${props.conference.end[2]}`
            : props.conference.end[2]}
          {"\t"}
          {props.conference.end[3] < 10
            ? `0${props.conference.end[3]}`
            : props.conference.end[3]}
          :
          {props.conference.end[4] < 10
            ? `0${props.conference.end[4]}`
            : props.conference.end[4]}
        </mark>
      </div>
      <div className="conferenceInfo">
        Link do konferencji:
        <mark>{props.conference.link}</mark>
      </div>
      <div className="conferenceInfo">
        <button className="button" onClick={() => props.back()}>
          Wstecz
        </button>
      </div>
      <h1>Harmonogram</h1>
      <input
        type="text"
        placeholder="0/10"
        className="inputForm"
        value={inputVal}
        onChange={(e) => setInputVal(e.currentTarget.value)}
      ></input>
      <div id="comm">{communicate}</div>
      <div className="panelContainer">
        {props.conference.program.map((panel) => (
          <div className="singleRowContainer">
            <div>{panel.description}</div>
            <div className="singleRowContainer">
              {isBeforeTime() && (
                <button
                  className="button"
                  onClick={() => {
                    if (
                      inputVal.match(regex) &&
                      inputVal <= 10 &&
                      inputVal > 0
                    ) {
                      markPanel(inputVal, panel.id);
                      setCommunicate("Oceniono!");
                    } else {
                      setCommunicate("Wpisz liczbę od 1 do 10!");
                    }
                  }}
                >
                  Oceń
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>{props.conference.desc}</div>
    </div>
  );
};

export default Conference;
