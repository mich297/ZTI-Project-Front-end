import { userDataContext } from "./userDataContext.js";
import { useEffect, useState } from "react";
import "../../styles/css/Default.css";
import "../../styles/css/Upcoming.css";
import "../../styles/css/ManageConferences.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useHistory } from "react-router";

const ManageConference = () => {
  const [loading, setLoading] = useState(true);
  const [conferences, setConferences] = useState([]);
  let history = useHistory();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3333/conferences")
      .then((res) => res.json())
      .then((data) => {
        setConferences(data);
      });
  }, []);

  const userContent = <div id="userGrid"></div>;

  const creatorContent = (
    <div id="adminGrid">
      <div className="singleElementBox">
        <h1>Your Conferences</h1>
      </div>
      <div className="conferences">
        {conferences.map((single) => (
          <div className="singleRowContainer">
            <div className="singleElementBox">{single.name}</div>
            <div className="button">Modify</div>
          </div>
        ))}
      </div>
      <div id="addConference" onClick={() => history.push("/make")}>
        <AddCircleOutlineIcon></AddCircleOutlineIcon>
      </div>
    </div>
  );

  const content = creatorContent;

  return <div id="managementGrid">{content}</div>;
};

export default ManageConference;
