import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles//css/Default.css";
import "../styles/css/Main.css";
import "../styles/css/Conference.css";

const Conference = (props) => {
  return (
    <div className="conferenceGrid">
      <h1>{props.conference.description}</h1>
      <div className="conferenceInfo">
        Start konferencji:
        <mark>
          {props.conference.start[0]}-{props.conference.start[1]}-
          {props.conference.start[2]}
          {"\t"}
          {props.conference.start[3]}:{props.conference.start[4]}
        </mark>
      </div>
      <div className="conferenceInfo">
        Koniec konferencji:
        <mark>
          {props.conference.end[0]}-{props.conference.end[1]}-
          {props.conference.end[2]}
          {"\t"}
          {props.conference.end[3]}:{props.conference.end[4]}
        </mark>
      </div>
      <div className="conferenceInfo">
        Link do konferencji:
        <mark>
          {props.conference.end[0]}-{props.conference.end[1]}-
          {props.conference.end[2]}
          {"\t"}
          {props.conference.end[3]}:{props.conference.end[4]}
        </mark>
      </div>
      <div className="conferenceInfo">
        <button className="button">Wypisz</button>
      </div>
      <h1>Harmonogram</h1>
      <div className="panelContainer">
        {props.conference.program.map((panel) => (
          <div className="singleRowContainer">
            <div>{panel.description}</div>
            <div className="singleRowContainer">
              <div className="point"></div>
              <div className="point"></div>
              <div className="point"></div>
              <div className="point"></div>
              <div className="point"></div>
            </div>
          </div>
        ))}
      </div>
      <div>{props.conference.desc}</div>
    </div>
  );
};

export default Conference;
