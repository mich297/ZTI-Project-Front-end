import "../styles/css/Default.css";
import "../styles/css/Upcoming.css";
import "../styles/css/Statistics.css";
import "../styles/css/ManageConferences.css";
import React, { useState, useEffect } from "react";

const Statistics = (props) => {
  const [participants, setParticipants] = useState([]);
  const [averagePanel, setAveragePanel] = useState(0);
  const [enrolledVoted, setEnrolledVoted] = useState(0);
  const [removed, setRemoved] = useState(true);

  let authorization = "Bearer " + localStorage.getItem("token");
  let myHeaders = new Headers();
  myHeaders.append("authorization", authorization);
  myHeaders.append("Content-Type", "application/json");
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(
      `/conferences/${props.conference.id}/summary/enrolledParticipants`,
      requestOptions
    )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.text();
        } else {
          throw Error(res.statusText);
        }
      })
      .then((data) => setParticipants(data))
      .catch((error) => console.log(error));

    fetch(
      `/conferences/${props.conference.id}/summary/averageOfConference`,
      requestOptions
    )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.text();
        } else {
          throw Error(res.statusText);
        }
      })
      .then((data) => setAveragePanel(data))
      .catch((error) => console.log(error));
    fetch(
      `/conferences/${props.conference.id}/summary/participantsWhoRated`,
      requestOptions
    )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.text();
        } else {
          throw Error(res.statusText);
        }
      })
      .then((data) => setEnrolledVoted(data))
      .catch((error) => console.log(error));
  }, [removed]);

  return (
    <div className="statGrid">
      <div className="charts">
        <div>
          <div>Number of participants: </div>
          <h1>{participants}</h1>
        </div>
        <div>
          <div>Average mark: </div>
          <h1>{averagePanel}</h1>
        </div>
      </div>
      <div className="charts">
        <div>marks left by participants</div>
        <h1>{enrolledVoted * 100}%</h1>
        <div>participants</div>
      </div>
      <div className="registered">
        <div className="colLabel">Participants:</div>
        {props.conference.participants.map((participant) => (
          <div key={participant.id} className="singleRowContainer">
            <div>ID:{participant.id}</div>
            <div>{participant.person.name}</div>
            <div>{participant.person.surname}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
