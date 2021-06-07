import React, { useState, useEffect } from "react";
import "../../styles/css/Default.css";
import "../../styles/css/Upcoming.css";
import "../../styles/css/SignedConferences.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { textDate, dayDisplay, isRegistered } from "../Functions.js";

const ConferencePreview = (props) => {
  const [height, setHeight] = useState("0px");
  const [expand, setExpand] = useState(true);
  const [button, setButton] = useState("");

  useEffect(() => {
    let isReg = isRegistered(props.object);
    if (isReg === true) setButton("Wypisz");
    else setButton("Zapisz");
  }, []);

  const actualDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    return [dd, mm, yyyy];
  };

  const isAfterTime = () => {
    if (props.object.start[0] >= actualDate()[2]) {
      if (props.object.start[1] >= actualDate()[1]) {
        if (props.object.start[2] >= actualDate()[0]) return true;
      }
    }
  };
  const registerYourself = () => {
    let authorization = "Bearer " + localStorage.getItem("token");
    let myHeaders = new Headers();
    myHeaders.append("authorization", authorization);
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      login: `${localStorage.getItem("user")}`,
    });

    let requestOptions = {
      method: "POST",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
    };
    if (isRegistered(props.object)) {
      fetch(`/conferences/${props.object.id}/deleteParticipant`, requestOptions)
        .then((res) => {
          if (res.status !== 200) throw Error(res.statusText);
          props.renSwitch();
          return res.json();
        })
        .catch((error) => console.log(error));
    } else {
      fetch(`/conferences/${props.object.id}/addParticipant`, requestOptions)
        .then((res) => {
          if (res.status !== 200) throw Error(res.statusText);
          props.renSwitch();
          return res.json();
        })
        .catch((error) => console.log(error));
    }
  };

  const slidePreview = () => {
    expand === true ? setExpand(false) : setExpand(true);
    height === "0px" ? setHeight("fit-content") : setHeight("0px");
  };

  return (
    <div className="singleColumnContainer">
      <div>
        <p>{props.object.description}</p>
        <ScheduleIcon></ScheduleIcon>
        <p>
          {props.object.start[0]} {textDate(props.object.start[1])}{" "}
          {dayDisplay(props.object.start[2])}{" "}
          {props.object.start[3] < 10
            ? `0${props.object.start[3]}`
            : props.object.start[3]}
          :
          {props.object.start[4] < 10
            ? `0${props.object.start[4]}`
            : props.object.start[4]}
        </p>
        <p>-</p>
        <p>
          {props.object.end[0]} {textDate(props.object.end[1])}{" "}
          {dayDisplay(props.object.end[2])}{" "}
          {props.object.end[3] < 10
            ? `0${props.object.end[3]}`
            : props.object.end[3]}
          :
          {props.object.end[4] < 10
            ? `0${props.object.end[4]}`
            : props.object.end[4]}
        </p>
        {expand ? (
          <ExpandMoreIcon onClick={() => slidePreview()}></ExpandMoreIcon>
        ) : (
          <ExpandLessIcon onClick={() => slidePreview()}></ExpandLessIcon>
        )}
      </div>
      <div className="slideSubElement" style={{ height: `${height}` }}>
        <div className="slideContent">
          <h3>{props.object.description}</h3>
          <div className="singleRowContainer">
            {isAfterTime() && (
              <button className="button" onClick={() => registerYourself()}>
                {button}
              </button>
            )}
            {props.mode === "sign" && (
              <button
                className="button"
                onClick={() => props.conferencePanel(props.object)}
              >
                Szczegóły
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferencePreview;
