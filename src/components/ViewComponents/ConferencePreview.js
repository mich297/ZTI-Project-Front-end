import React, { useState, useEffect } from 'react';
import '../../styles/css/Default.css';
import '../../styles/css/Upcoming.css';
import '../../styles/css/SignedConferences.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ScheduleIcon from '@material-ui/icons/Schedule';
import EventIcon from '@material-ui/icons/Event';


const ConferencePreview = (props) => {
    const [height, setHeight] = useState("0px");
    const [expand, setExpand] =  useState(true);
    const [button, setButton] = useState("Unregister");

    const slidePreview = () => {
        expand === true ? setExpand(false) : setExpand(true);
        height === "0px" ? setHeight("fit-content") : setHeight("0px");
    }

    const banner = {
        background: props.object.banner[0],
        background: props.object.banner[1] 
    }
    return(
        <div className="singleRowContainer">
                    <div>
                        <p>{props.object.name}</p>
                        <EventIcon></EventIcon>
                        <p>{props.object.date}</p>
                        <ScheduleIcon></ScheduleIcon>
                        <p>{props.object.begins}</p>
                        <p>{props.object.ends}</p>
                        {expand ? <ExpandMoreIcon onClick={()=>slidePreview()}></ExpandMoreIcon> : <ExpandLessIcon onClick={()=>slidePreview()}></ExpandLessIcon>}
                    </div>
                    <div style={{height: `${height}`}}>
                        <div className="slideContent">
                            <h3 style={banner}>{props.object.name}</h3>
                            <p>{props.object.description}</p>
                            <button className="button">{button}</button>
                        </div>
                    </div>
        </div>
    );
}

export default ConferencePreview;