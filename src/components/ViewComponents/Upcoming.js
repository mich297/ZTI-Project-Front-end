import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../../styles/Default.css';
import '../../styles/Upcoming.css';
import Calendar from './Calendar.js';


const Upcoming = () => {
    const [displayClass, setDispClass] = useState('conferenceDisp-inv');

    //zapytanie do serwera
    let temp = {
        name: "Sample Conference",
        date: [2021, 4, 11],
        adress: '7 Sample Street',
        begins: '7:30',
        ends: '18:00'
    }

    let temp2 = {
        name: "Sample Conference 2",
        date: [2021, 4, 15],
        adress: '7 Sample Street',
        begins: '7:30',
        ends: '18:00'
    }
    let upcomingConferences =[temp, temp2];


    const showDetails = (object) => {

    }
    return(
        <div className="mainContainer">
            <Calendar upcoming={upcomingConferences} />
            <div className="upcomingWindow">
            </div>
            <div className={displayClass}>
                {upcomingConferences.map(single=>(
                    <div className="upcomingSingle" onClick={showDetails(single)}>{single.name}</div>
                ))}
            </div>
        </div>
    );
}

export default Upcoming ;