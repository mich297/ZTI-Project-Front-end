import React, { useState, useEffect, useContext } from "react";
import "../styles/css/Default.css";
import "../styles/css/Panel.css";

const SinglePanel = (props) => {
  const [title, setTitle] = useState(props.name);

  return (
    <div className="panelGrid">
      <h1 className="newPanel">New panel</h1>
      <div className="singleRowContainer">
        <h3>Title:</h3>
        <input
          className="inputForm"
          type="textarea"
          // value={title}
          placeholder="panel name"
          onChange={(e) => {
            props.updatePanel(props.id, e.currentTarget.value);
            // setTitle(e.currentTarget.value);
          }}
        ></input>
      </div>
    </div>
  );
};

export default SinglePanel;
