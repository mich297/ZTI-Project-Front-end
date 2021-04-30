import React, { useRef, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import MenuIcon from '@material-ui/icons/Menu';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../styles/Default.css';
import '../styles/Main.css';
import InputText from './InputText.js';
import Upcoming from './ContentViewComponents/Upcoming.js';
import SlidingMenu from './SlidingMenuComponents/SlidingMenu';

const Main = ()=>{
    const [iconStyle, setIconStyle] = useState("icon");
    const permissions =useState(localStorage.getItem("permissions"));
    const [content, setContent] = useState("upcoming");
    
    let visibleContent = content === "signed" ? (<SignedConferences/>) :
    content === "settings" ? (<Profile/>) :
    content === "all" ? (<AllConferences/>) :
    content === "manage" ? (<ManageConference/>) : (<Upcoming/>);

    return (
        <div className="menuGrid">
            <div className="title">
                <div className="title">
                    <h1>Conference App</h1>
                </div>
            </div>
            <SlidingMenu viewChange={(contentOption)=>setContent(contentOption)} />
            {visibleContent}
        </div>
    );
}

export default Main;