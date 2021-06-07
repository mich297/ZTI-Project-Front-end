import React, { useState, useEffect } from "react";
import "../../styles/css/Default.css";
import "../../styles/css/Upcoming.css";
import "../../styles/css/SignedConferences.css";
import ConferencePreview from "./ConferencePreview.js";

const SignedConferences = (props) => {
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

  return (
    <div class="signedConferences">
      <div id="titleDiv">
        <h1>Twoja konferencja</h1>
      </div>
      {loading ? (
        <div className="loader">Ładuję...</div>
      ) : (
        upcomingConferences.map((single) => (
          <ConferencePreview
            conferencePanel={(confObject) => props.conferencePanel(confObject)}
            object={single}
            mode={"sign"}
            key={single.id}
            renSwitch={() => setSwitch(!renSwitch)}
          />
        ))
      )}
    </div>
  );
};

export default SignedConferences;
