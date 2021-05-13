import React, { useState, useEffect } from 'react';
import '../../styles/css/Default.css';
import '../../styles/css/Upcoming.css';
import Calendar from './Calendar.js';
import UpcomingOptionDisplay from './UpcomingOptionDisplay.js';

const Upcoming = () => {
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

    return(
        <div className="mainContainer">
            <Calendar upcoming={upcomingConferences} />
            <UpcomingOptionDisplay objectProp={displayed} dispClass={displayClass}/>
            <div className="conferenceDisp">
                {loading ? <div>Loading...</div> : upcomingConferences.map(single=>(
                    <div key={single.toString()} className="upcomingSingle" onClick={()=>showDetails(single)}>{single.name}</div>
                ))}
            </div>
        </div>
    );
}

export default Upcoming;