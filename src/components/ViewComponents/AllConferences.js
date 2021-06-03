import { useState, useEffect } from "react";
import "../../styles/css/Default.css";
import "../../styles/css/Upcoming.css";
import "../../styles/css/SignedConferences.css";
import ConferencePreview from "./ConferencePreview.js";
import SearchIcon from "@material-ui/icons/Search";

const AllConferences = () => {
  const [conferences, setConferences] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);

    debugger;

    let authorization = "Bearer " + localStorage.getItem("token");
    let myHeaders = new Headers();
    myHeaders.append("authorization", authorization);

    let requestOptions = {
      method: "GET",
      body: null,
      // mode: "cors",
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

    // let headers = new Headers();

    // headers.append("Content-Type", "application/json");
    // headers.append("Accept", "application/json");
    // headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    // headers.append("Origin", "http://localhost:3000");

    // let requestOptions = {
    //   // mode: "cors",
    //   credentials: "include",
    //   method: "GET",
    //   headers: headers,
    // };

    // fetch("http://localhost:8080/conferences", requestOptions)
    //   .then((response) => response.json())
    //   .then((json) => console.log(json))
    //   .catch((error) => console.log("Authorization failed : " + error.message));

    // var data = "";
    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    // xhr.addEventListener("readystatechange", function () {
    //   if (this.readyState === 4) {
    //     debugger;
    //     console.log(this.responseText);
    //   }
    // });

    // xhr.open("GET", "http://localhost:8080/conferences");
    // xhr.setRequestHeader(
    //   "Authorization",
    //   `Bearer ${localStorage.getItem("token")}`
    // );
    // xhr.send(data);
  }, []);

  useEffect(() => {
    let displayedArray = [];
    for (let i = 0; i < conferences.length; i++) {
      if (conferences[i].name.includes(search))
        displayedArray.push(conferences[i]);
    }
    setDisplayed([...displayedArray]);
  }, [search]);

  return (
    <div class="signedConferences">
      <div id="titleDiv">
        <h1>All Conferences</h1>
      </div>
      <div className="singleRowContainer">
        <SearchIcon></SearchIcon>
        <input
          type="text"
          className="inputForm"
          required
          placeholder="Search..."
          name="search"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </div>
      {loading ? (
        <div>Loading</div>
      ) : displayed.length === 0 ? (
        <div>No such records</div>
      ) : (
        displayed.map((single) => <ConferencePreview object={single} />)
      )}
    </div>
  );
};

export default AllConferences;
