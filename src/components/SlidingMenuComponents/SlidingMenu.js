import React, {useState} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";
import '../../styles/Default.css';
import '../../styles/Main.css';
import '../../styles/SlidingMenu.css';
import Slider from './Slider.js';

const SlidingMenu = ()=>{
    const [iconStyle, setIconStyle] = useState("icon");
    const [slider, setSlider] = useState("slide-off");
    let history = useHistory();


    const slide = ()=>{
        iconStyle==="icon" ? setIconStyle("iconClicked") : setIconStyle("icon");
        slider==="slide-off" ? setSlider("slide-on") : setSlider("slide-off");
    }

    const handleLogout = ()=>{
        localStorage.removeItem('user');
        history.push('/')
        
    }

    return (
        <>
            <nav className="menu">
                <div className="singleElementBox">
                    <MenuIcon className={iconStyle} onClick={()=> slide()} />
                </div>
                <div className="singleElementBox">
                    <div onClick={handleLogout}>
                        <ExitToAppIcon className="logout"/>
                        <p>Logout</p>
                    </div>
                </div>
            </nav>
            <div className="sliderContainer">
                <div id={slider}>
                    <Slider/>
                </div>
            </div>
        </>
    );
}

export default SlidingMenu;