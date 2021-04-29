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
import Upcoming from './Upcoming.js';
import SlidingMenu from './SlidingMenuComponents/SlidingMenu';

const Main = ()=>{
    const [iconStyle, setIconStyle] = useState("icon");


    return (
        <div className="menuGrid">
            <div className="title">
                <div className="title">
                    <h1>Conference App</h1>
                </div>
            </div>
            <SlidingMenu/>
            <Upcoming/>
        </div>
    );
}

export default Main;