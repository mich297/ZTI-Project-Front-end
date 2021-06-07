import React, { useState } from "react";
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
  const regex = /^[0-9]/;
  const regex2 = /^[1-9]/;

  const checkData = () => {
    if (
      title.length <= 30 &&
      startY.match(regex) &&
      endY.match(regex) &&
      startM.match(regex2) &&
      endM.match(regex2) &&
      startD.match(regex2) &&
      endD.match(regex2) &&
      startY.length === 4 &&
      endY.length === 4 &&
      startM > 0 &&
      startM <= 12 &&
      endM > 0 &&
      endM <= 12 &&
      startD <= 30 &&
      startD > 0 &&
      endD <= 30 &&
      endD > 0 &&
      startHour.match(regex) &&
      endHour.match(regex) &&
      startMinute.match(regex) &&
      endMinute.match(regex) &&
      startHour <= 23 &&
      endHour <= 23 &&
      startHour >= 0 &&
      endHour >= 0 &&
      startMinute >= 0 &&
      endMinute >= 0 &&
      endMinute < 60 &&
      startMinute < 60
    )
      return true;
    else return false;
  };

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
    if (checkData()) {
      let authorization = "Bearer " + localStorage.getItem("token");
      let myHeaders = new Headers();
      myHeaders.append("authorization", authorization);
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        description: `${title}`,
        start: `${startY}-${startM < 10 ? "0" + startM : startM}-${
          startD < 10 ? "0" + startD : startD
        }T${startHour < 10 ? "0" + startHour : startHour}:${
          startMinute < 10 ? "0" + startMinute : startMinute
        }:00.000`,
        end: `${endY}-${endM < 10 ? "0" + endM : endM}-${
          endD < 10 ? "0" + endD : endD
        }T${endHour < 10 ? "0" + endHour : endHour}:${
          endMinute < 10 ? "0" + endMinute : endMinute
        }:00.000`,
        link: `${link}`,
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
    }
  };

  return (
    <div className="panelCreationGrid">
      <div className="titleBack"></div>
      <h1>Stwórz konferencję</h1>
      <div className="basicData">
        <div className="innerWin">
          <div className="singleRowContainer">
            <h3>Tytuł:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="< 30 liter"
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
            <h3>Rok rozpoczęcia:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="rrrr"
              value={startY}
              onChange={(e) => {
                setEndY(e.currentTarget.value);
                setStartY(e.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>Miesiąc rozpoczęcia:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="m lub mm"
              value={startM}
              onChange={(e) => {
                setEndM(e.currentTarget.value);
                setStartM(e.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>Dzień rozpoczęcia:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="d lub dd"
              value={startD}
              onChange={(e) => {
                setEndD(e.currentTarget.value);
                setStartD(e.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>Godzina rozpoczęcia:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="0-23"
              value={startHour}
              onChange={(e) => setStartHour(e.currentTarget.value)}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>Minuta rozpoczęcia:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="0-59"
              value={startMinute}
              onChange={(e) => setStartMinute(e.currentTarget.value)}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>Rok końca:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="rrrr"
              value={endY}
              onChange={(e) => {
                setEndY(e.currentTarget.value);
                setStartY(e.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>Miesiąc końca:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="m lub mm"
              value={endM}
              onChange={(e) => {
                setEndM(e.currentTarget.value);
                setStartM(e.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>Dzień końca:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="d lub dd"
              value={endD}
              onChange={(e) => {
                setEndD(e.currentTarget.value);
                setStartD(e.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>Godzina końca:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="0-23"
              value={endHour}
              onChange={(e) => setEndHour(e.currentTarget.value)}
            ></input>
          </div>
          <div className="singleRowContainer">
            <h3>Minuta końca:</h3>
            <input
              className="inputForm"
              type="textarea"
              placeholder="0-59"
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
          <h3>Dodaj panel</h3>
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
          <h3>Usuń panel</h3>
        </div>
      </div>
      <nav className="singleRowContainer">
        <button className="button" onClick={() => submitConference()}>
          Utwórz
        </button>
        <button className="button" onClick={() => history.push("/main")}>
          Cofnij
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
