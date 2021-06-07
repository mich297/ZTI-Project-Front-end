import React from "react";
import "../styles/css/Default.css";
import "../styles/css/Panel.css";

const SinglePanel = (props) => {
  return (
    <div className="panelGrid">
      <h1 className="newPanel">Nowy panel</h1>
      <div className="singleRowContainer">
        <h3>Tytuł:</h3>
        <input
          className="inputForm"
          type="textarea"
          placeholder="nazwa"
          onChange={(e) => {
            props.updatePanel(props.id, e.currentTarget.value);
          }}
        ></input>
      </div>
    </div>
  );
};

export default SinglePanel;
