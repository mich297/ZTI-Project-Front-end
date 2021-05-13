import React, { useRef, useState, useEffect} from 'react';
import '../styles//css/Default.css';
import '../styles/css/Main.css';
import SignedConferences from './ViewComponents/SignedConferences';
import Upcoming from './ViewComponents/Upcoming';
import Profile from './ViewComponents/Profile';
import AllConferences from './ViewComponents/AllConferences';
import ManageConference from './ViewComponents/ManageConference';
import SlidingMenu from './SlidingMenuComponents/SlidingMenu';

const fetchConferenceData = async () => {
    const data = await fetch("http://localhost3333", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

const fetchUserData = async () => {
    
}

const Main = ()=>{
    const [iconStyle, setIconStyle] = useState("icon");
    const permissions = useState(localStorage.getItem("permissions"));
    const [content, setContent] = useState("upcoming");

    
    let visibleContent = content === "signed" ? (<SignedConferences/>) :
    content === "settings" ? (<Profile/>) :
    content === "all" ? (<AllConferences/>) :
    content === "manage" ? (<ManageConference/>) : (<Upcoming/>);

    return (
        <div className="menuGrid">
            <div className="title">
                <div className="title">
                    <h1 onClick={()=> setContent("upcoming")}>Conference App</h1>
                </div>
            </div>
            <SlidingMenu viewChange={(contentOption)=>setContent(contentOption)} />
            {visibleContent}
        </div>
    );
}

export default Main;