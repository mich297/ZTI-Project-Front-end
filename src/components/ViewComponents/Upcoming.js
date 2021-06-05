import React, { useState, useEffect, useContext } from "react";
import "../../styles/css/Default.css";
import "../../styles/css/Upcoming.css";
import Calendar from "./Calendar.js";
import { actualDate } from "../Functions.js";
import UpcomingOptionDisplay from "./UpcomingOptionDisplay.js";
import { userDataComtext, handleContextUpdate } from "./userDataContext.js";

const Upcoming = (props) => {
  const [displayClass, setDispClass] = useState("conferenceDisp-inv");
  const [displayed, setDisplayed] = useState({});
  const [upcomingConferences, setUpcomingConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateChange, setDateChange] = useState([
    actualDate()[1],
    actualDate()[2],
  ]);

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
        let filteredData = [];
        for (let i = 0; i < data.length; i++) {
          if (conferencesThisMonth(data[i])) filteredData.push(data[i]);
        }
        setUpcomingConferences(filteredData);
        setLoading(false);
      })
      .catch((error) => console.log(error));

    // setLoading(true);
    // fetch("http://localhost:8080/conferences")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     let filteredData = [];
    //     for (let i = 0; i < data.length; i++) {
    //       if (conferencesThisMonth(data[i])) filteredData.push(data[i]);
    //     }
    //     setUpcomingConferences(filteredData);
    //     setLoading(false);
    //   });
  }, [dateChange]);

  const showDetails = (object) => {
    let compClass = `conferenceDisp-${object.id}`;
    const invClass = "conferenceDisp-inv";
    displayClass === invClass
      ? setDispClass(compClass)
      : displayClass === compClass
      ? setDispClass(invClass)
      : setDispClass(compClass);
    setDisplayed(object);
  };

  const conferencesThisMonth = (single) => {
    const thisMonthYear = dateChange;
    if (
      single.start[1] === thisMonthYear[0] &&
      single.start[0] === thisMonthYear[1]
    )
      return true;
    else if (
      single.end[1] === thisMonthYear[0] &&
      single.end[0] === thisMonthYear[1]
    )
      return true;
    else return false;
  };

  return (
    <div className="mainContainer">
      <Calendar
        upcoming={upcomingConferences}
        changeDisplay={(month, year) => setDateChange([month, year])}
      />
      <UpcomingOptionDisplay
        conferencePanel={(confObject) => props.conferencePanel(confObject)}
        objectProp={displayed}
        dispClass={displayClass}
      />
      <div className="conferenceDisp">
        {loading ? (
          <div>Loading...</div>
        ) : (
          upcomingConferences.map((single) => (
            <div
              key={single.id}
              className="upcomingSingle"
              onClick={() => showDetails(single)}
            >
              {single.description}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Upcoming;
