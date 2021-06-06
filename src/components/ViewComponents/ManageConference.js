import { userDataContext } from "./userDataContext.js";
import { useEffect, useState } from "react";
import "../../styles/css/Default.css";
import "../../styles/css/Upcoming.css";
import "../../styles/css/ManageConferences.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useHistory } from "react-router";
import DeleteIcon from "@material-ui/icons/Delete";
import EqualizerIcon from "@material-ui/icons/Equalizer";

const ManageConference = (props) => {
  const [loading, setLoading] = useState(true);
  const [conferences, setConferences] = useState([]);
  let history = useHistory();

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

    fetch("/conferences/byFounder", requestOptions)
      .then((res) => {
        if (res.status !== 200) throw Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        setConferences(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div id="managementGrid">
      <div id="adminGrid">
        <div className="singleElementBox">
          <h1>Your Conferences</h1>
        </div>
        <div className="conferences">
          {conferences.map((single) => (
            <div
              className="singleRowContainer"
              onClick={() => props.showStats(single)}
            >
              <div className="singleElementBox">{single.description}</div>
              <EqualizerIcon></EqualizerIcon>
            </div>
          ))}
        </div>
        <div id="addConference" onClick={() => history.push("/make")}>
          <AddCircleOutlineIcon></AddCircleOutlineIcon>
        </div>
      </div>
    </div>
  );
};

export default ManageConference;
