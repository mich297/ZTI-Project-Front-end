import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../styles/css/Default.css";
import "../../styles/css/Upcoming.css";
import "../../styles/css/SignedConferences.css";
import ConferencePreview from "./ConferencePreview.js";
import Calendar from "./Calendar.js";
import UpcomingOptionDisplay from "./UpcomingOptionDisplay.js";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ScheduleIcon from "@material-ui/icons/Schedule";
import EventIcon from "@material-ui/icons/Event";

const SignedConferences = (props) => {
  const [displayClass, setDispClass] = useState("conferenceDisp-inv");
  const [displayed, setDisplayed] = useState({});
  const [upcomingConferences, setUpcomingConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [renSwitch, setSwitch] = useState(true);

  useEffect(() => {
    setLoading(true);
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

    fetch("/conferences/byUser", requestOptions)
      .then((res) => {
        if (res.status !== 200) throw Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        setUpcomingConferences(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [renSwitch]);

  // const showDetails = (object) => {
  //   let compClass = `conferenceDisp-${object.id}`;
  //   const invClass = "conferenceDisp-inv";
  //   displayClass === invClass
  //     ? setDispClass(compClass)
  //     : displayClass === compClass
  //     ? setDispClass(invClass)
  //     : setDispClass(compClass);
  //   setDisplayed(object);
  // };

  return (
    <div class="signedConferences">
      <div id="titleDiv">
        <h1>Your Conferences</h1>
      </div>
      {loading ? (
        <div>Loading</div>
      ) : (
        upcomingConferences.map((single) => (
          <ConferencePreview
            conferencePanel={(confObject) => props.conferencePanel(confObject)}
            object={single}
            renSwitch={() => setSwitch(!renSwitch)}
          />
        ))
      )}
    </div>
  );
};

export default SignedConferences;
