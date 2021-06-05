import React, { useState, useEffect, useContext } from "react";
import "../styles/css/Default.css";
import "../styles/css/Panel.css";
import SinglePanel from "./SinglePanel.js";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import { useHistory } from "react-router";

const Panel = () => {
  const [panels, setPanels] = useState([]);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [startY, setStartY] = useState("");
  const [startM, setStartM] = useState("");
  const [startD, setStartD] = useState("");
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [endY, setEndY] = useState("");
  const [endM, setEndM] = useState("");
  const [endD, setEndD] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
  const [panelID, setPanelID] = useState(0);

  let history = useHistory();
  let emptyPanel = {
    id: "",
    name: "",
  };

  const updatePanels = (id, value) => {
    let arr = [...panels];
    arr[id].name = value;
    setPanels([...arr]);
  };

  const submitConference = () => {
    let authorization = "Bearer " + localStorage.getItem("token");
    let myHeaders = new Headers();
    myHeaders.append("authorization", authorization);
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      description: `${title}`,
      start: `${startY}-${startM}-${startD}T${startHour}:${startMinute}:00.000`,
      end: `${endY}-${endM}-${endD}T${endHour}:${endMinute}:00.000`,
      founder: {
        login: `${localStorage.getItem("user")}`,
      },
    });

    let requestOptions = {
      method: "POST",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("/conferences", requestOptions)
      .then((res) => {
        if (res.status !== 200 && res.status !== 201)
          throw Error(res.statusText);
        let result = res.json();
        return result;
      })
      .then((data) => {
        panels.forEach((panel) => {
          fetch(`/conferences/${data.id}`, {
            method: "POST",
            body: JSON.stringify({
              description: panel.name,
            }),
            headers: myHeaders,
            redirect: "follow",
          });
        });
        history.push("/main");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="panelCreationGrid">
      <div className="titleBack"></div>
      <h1>Create your Conference</h1>
      <div className="basicData">
        <div className="innerWin">
          <div className="singleRowContainer">
            <h3>Title:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>Link:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="link"
              value={link}
              onChange={(e) => setLink(e.currentTarget.value)}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>Start Year:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="Start year"
              value={startY}
              onChange={(e) => setStartY(e.currentTarget.value)}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>Start Month:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="Start month"
              value={startM}
              onChange={(e) => setStartM(e.currentTarget.value)}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>Start Day:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="Start day"
              value={startD}
              onChange={(e) => setStartD(e.currentTarget.value)}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>Start hour:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="Start hour"
              value={startHour}
              onChange={(e) => setStartHour(e.currentTarget.value)}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>Start minute:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="Start minutes"
              value={startMinute}
              onChange={(e) => setStartMinute(e.currentTarget.value)}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>End Year:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="End year"
              value={endY}
              onChange={(e) => setEndY(e.currentTarget.value)}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>End Month:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="End month"
              value={endM}
              onChange={(e) => setEndM(e.currentTarget.value)}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>End Day:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="End day"
              value={endD}
              onChange={(e) => setEndD(e.currentTarget.value)}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>End hour:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="End hour"
              value={endHour}
              onChange={(e) => setEndHour(e.currentTarget.value)}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>End Day:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="End minutes"
              value={endMinute}
              onChange={(e) => setEndMinute(e.currentTarget.value)}
            ></input>
          </div>
        </div>
      </div>
      <div id="addRemove" className="singleRowContainer">
        <div
          className="singleRowContainer"
          onClick={() => {
            let tempPanel = [...panels];
            emptyPanel.id = panelID;
            tempPanel.push(emptyPanel);
            setPanelID(panelID + 1);
            setPanels([...tempPanel]);
          }}
        >
          <AddBoxIcon></AddBoxIcon>
          <h3>Add panel</h3>
        </div>
        <div
          className="singleRowContainer"
          onClick={() => {
            let tempPanel = [...panels];
            tempPanel.pop();
            setPanelID(panelID - 1);
            setPanels([...tempPanel]);
          }}
        >
          <IndeterminateCheckBoxIcon></IndeterminateCheckBoxIcon>
          <h3>Remove panel</h3>
        </div>
      </div>
      <nav className="singleRowContainer">
        <button className="button" onClick={() => submitConference()}>
          Create
        </button>
        <button className="button" onClick={() => history.push("/main")}>
          Back
        </button>
      </nav>
      <div className="panelCreator">
        {panels.map((single) => (
          <SinglePanel
            id={single.id}
            key={single.id}
            updatePanel={(id, value) => updatePanels(id, value)}
            single={single}
          />
        ))}
      </div>
    </div>
  );
};

export default Panel;
