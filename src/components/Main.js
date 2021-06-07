import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles//css/Default.css";
import "../styles/css/Main.css";
import SignedConferences from "./ViewComponents/SignedConferences";
import Upcoming from "./ViewComponents/Upcoming";
import Profile from "./ViewComponents/Profile";
import AllConferences from "./ViewComponents/AllConferences";
import ManageConference from "./ViewComponents/ManageConference";
import SlidingMenu from "./SlidingMenuComponents/SlidingMenu";
import Conference from "./Conference.js";
import Statistics from "./Statistics.js";

const Main = () => {
  const [content, setContent] = useState("upcoming");
  const [conf, setConf] = useState();
  let history = useHistory();

  const actualDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    return [dd, mm, yyyy];
  };

  const loggedInUser = localStorage.getItem("user");
  const isStillValid = localStorage.getItem("today") === `${actualDate()[0]}`;

  if (!loggedInUser || !isStillValid) {
    history.push("/");
  }

  const conference = (confObject) => {
    setConf(confObject);
    setContent("conference");
  };

  const confStats = (confObject) => {
    setConf(confObject);
    setContent("statistics");
  };

  const backFromConference = () => {
    setContent("upcoming");
  };
  let visibleContent =
    content === "signed" ? (
      <SignedConferences
        conferencePanel={(confObject) => conference(confObject)}
      />
    ) : content === "settings" ? (
      <Profile />
    ) : content === "all" ? (
      <AllConferences
        conferencePanel={(confObject) => conference(confObject)}
      />
    ) : content === "manage" ? (
      <ManageConference showStats={(confObject) => confStats(confObject)} />
    ) : content === "conference" ? (
      <Conference conference={conf} back={() => backFromConference()} />
    ) : content === "statistics" ? (
      <Statistics conference={conf} />
    ) : (
      <Upcoming conferencePanel={(confObject) => conference(confObject)} />
    );

  return (
    <div className="menuGrid">
      <div className="title">
        <div className="title">
          <h1 onClick={() => setContent("upcoming")}>
            Aplikacja Konferencyjna
          </h1>
        </div>
      </div>
      <SlidingMenu viewChange={(contentOption) => setContent(contentOption)} />
      {visibleContent}
    </div>
  );
};

export default Main;
