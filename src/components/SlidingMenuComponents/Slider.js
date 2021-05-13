import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search';
import {useHistory} from "react-router-dom";
import '../../styles/css/Default.css';
import '../../styles/css/Main.css';
import '../../styles/css/SlidingMenu.css';
import '../../styles/css/Slider.css';


const Slider =(props)=>{
    
    const handleClick = (componentClass) => {
        props.viewChange(componentClass);
        props.slideBack();
    }

    return(
        <div className={"singleRowContainer"}>
            <div className={"optionTile"}>
                <div className="optionCircle" onClick={()=>handleClick("signed")}>
                    <BookmarksIcon className="icon"/>
                    <p>Your conferences</p>
                </div>
            </div>
            <div className={"optionTile"}>
                <div className="optionCircle" onClick={()=>handleClick("manage")}>
                    <AddBoxIcon className="icon"/>
                    <p>Manage conferences</p>
                </div>
            </div>
            <div className={"optionTile"}>
                <div className="optionCircle" onClick={()=>handleClick("all")}>
                    <SearchIcon className="icon"/>
                    <p>Find conference</p>
                </div>
            </div>
            <div className={"optionTile"}>
                <div className="optionCircle" onClick={()=>handleClick("settings")}>
                    <SettingsIcon className="icon"/>
                    <p>Settings</p>
                </div>
            </div>
        </div>
    );
}

export default Slider;