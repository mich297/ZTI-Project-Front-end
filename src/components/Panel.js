import React, { useState, useEffect, useContext } from "react";
import "../styles/css/Default.css";
import "../styles/css/Panel.css";
import SinglePanel from "./SinglePanel.js";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import { useHistory } from "react-router";

const Panel = () => {
  const [panels, setPanels] = useState([]);
  let history = useHistory();
  let emptyPanel = {
    name: "",
    description: "",
    from: "",
    to: "",
    where: "",
    link: "",
  };

  return (
    <div className="panelCreationGrid">
      <div className="titleBack"></div>
      <h1>Create your Conference</h1>
      <div className="basicData">
        <div className="singleRowContainer">
          <h3>Title:</h3>
          <input
            className="inputForm"
            type="textarea"
            placeholder="title"
          ></input>
        </div>
        <div className="singleRowContainer">
          <h3>Description:</h3>
          <input
            className="inputForm"
            type="textarea"
            placeholder="description"
          ></input>
        </div>
        <div className="singleRowContainer">
          <h3>Date:</h3>
          <input
            className="inputForm"
            type="textarea"
            placeholder="date"
          ></input>
        </div>
        <div className="singleRowContainer">
          <h3>Adress:</h3>
          <input
            className="inputForm"
            type="textarea"
            placeholder="adress"
          ></input>
        </div>
      </div>
      <div id="addRemove" className="singleRowContainer">
        <div
          className="singleRowContainer"
          onClick={() => {
            let tempPanel = [...panels];
            tempPanel.push(emptyPanel);
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
            setPanels([...tempPanel]);
          }}
        >
          <IndeterminateCheckBoxIcon></IndeterminateCheckBoxIcon>
          <h3>Remove panel</h3>
        </div>
      </div>
      <nav className="singleRowContainer">
        <button className="button">Create</button>
        <button className="button" onClick={() => history.push("/main")}>
          Back
        </button>
      </nav>
      <div className="panelCreator">
        {panels.map((single) => (
          <SinglePanel key={single.id} single={single} />
        ))}
      </div>
    </div>
  );
};

export default Panel;
