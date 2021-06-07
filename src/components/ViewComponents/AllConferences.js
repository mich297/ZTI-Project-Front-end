import { useState, useEffect } from "react";
import "../../styles/css/Default.css";
import "../../styles/css/Upcoming.css";
import "../../styles/css/SignedConferences.css";
import ConferencePreview from "./ConferencePreview.js";
import SearchIcon from "@material-ui/icons/Search";

const AllConferences = (props) => {
  const [conferences, setConferences] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [renSwitch, setSwitch] = useState(true);

  useEffect(() => {
    setLoading(true);
    let authorization = "Bearer " + localStorage.getItem("token");
    let myHeaders = new Headers();
    myHeaders.append("authorization", authorization);

    let requestOptions = {
      method: "GET",
      body: null,
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("/conferences", requestOptions)
      .then((res) => {
        if (res.status !== 200) throw Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        setConferences(data);
        setDisplayed(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [renSwitch]);

  useEffect(() => {
    let displayedArray = [];
    for (let i = 0; i < conferences.length; i++) {
      if (conferences[i].description.includes(search))
        displayedArray.push(conferences[i]);
    }
    setDisplayed([...displayedArray]);
  }, [search]);

  return (
    <div class="signedConferences">
      <div id="titleDiv">
        <h1>Wszystkie konferencje</h1>
      </div>
      <div className="singleRowContainer">
        <SearchIcon></SearchIcon>
        <input
          type="text"
          className="inputForm"
          required
          placeholder="Szukaj..."
          name="search"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </div>
      {loading ? (
        <div className="loader">Ładuję...</div>
      ) : displayed.length === 0 ? (
        <div>No such records</div>
      ) : (
        displayed.map((single) => (
          <ConferencePreview
            conferencePanel={(confObject) => props.conferencePanel(confObject)}
            object={single}
            mode={"all"}
            key={single.id}
            renSwitch={() => setSwitch(!renSwitch)}
          />
        ))
      )}
    </div>
  );
};

export default AllConferences;
