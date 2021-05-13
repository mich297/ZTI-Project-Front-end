import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../../styles/css/Default.css';
import '../../styles/css/Upcoming.css';
import '../../styles/css/SignedConferences.css';
import ConferencePreview from './ConferencePreview.js';
import Calendar from './Calendar.js';
import UpcomingOptionDisplay from './UpcomingOptionDisplay.js';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ScheduleIcon from '@material-ui/icons/Schedule';
import EventIcon from '@material-ui/icons/Event';


const SignedConferences = () => {
    const [displayClass, setDispClass] = useState('conferenceDisp-inv');
    const [displayed, setDisplayed] = useState({});
    const [upcomingConferences, setUpcomingConferences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3333/conferences").then(res => res.json()).then(data=>{
        setUpcomingConferences(data);
        setLoading(false);
    });
    }, []);

    const showDetails = (object) => {
        let compClass = `conferenceDisp-${object.id}`;
        const invClass = "conferenceDisp-inv";
        displayClass === invClass ? setDispClass(compClass) : displayClass === compClass ? setDispClass(invClass) : setDispClass(compClass);
        setDisplayed(object);
    }

    return (
        <div id="signedConferences">
            <div id="titleDiv"><h1>Your Conferences</h1></div>
            {loading ? <div>Loading</div> : upcomingConferences.map(single => (
                <ConferencePreview object={single}/>
            ))}
        </div>
    );
}

export default SignedConferences;