import React, { useState, useEffect } from "react";
import "../../styles/css/Default.css";
import "../../styles/css/Upcoming.css";
import "../../styles/css/SignedConferences.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ScheduleIcon from "@material-ui/icons/Schedule";
import EventIcon from "@material-ui/icons/Event";
import { useHistory } from "react-router-dom";
import { textDate, dayDisplay, isRegistered } from "../Functions.js";

const ConferencePreview = (props) => {
  const [height, setHeight] = useState("0px");
  const [expand, setExpand] = useState(true);
  const [button, setButton] = useState("");

  useEffect(() => {
    let isReg = isRegistered(props.object);
    if (isReg === true) setButton("Unregister");
    else setButton("Register");
  }, []);

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
        <EventIcon></EventIcon>
        <ScheduleIcon></ScheduleIcon>
        <p>
          {props.object.start[0]} {textDate(props.object.start[1])}{" "}
          {dayDisplay(props.object.start[2])} {props.object.start[3]}:
          {props.object.start[4]}
        </p>
        <p>
          {props.object.end[0]} {textDate(props.object.end[1])}{" "}
          {dayDisplay(props.object.end[2])} {props.object.end[3]}:
          {props.object.end[4]}
        </p>
        {expand ? (
          <ExpandMoreIcon onClick={() => slidePreview()}></ExpandMoreIcon>
        ) : (
          <ExpandLessIcon onClick={() => slidePreview()}></ExpandLessIcon>
        )}
      </div>
      <div style={{ height: `${height}` }}>
        <div className="slideContent">
          <h3>{props.object.description}</h3>
          <div className="singleRowContainer">
            <button className="button" onClick={() => registerYourself()}>
              {button}
            </button>
            <button
              className="button"
              onClick={() => props.conferencePanel(props.object)}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferencePreview;
