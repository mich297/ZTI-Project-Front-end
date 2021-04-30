import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search';
import {useHistory} from "react-router-dom";
import '../../styles/Default.css';
import '../../styles/Main.css';
import '../../styles/SlidingMenu.css';
import '../../styles/Slider.css';


const Slider =(props)=>{
    let history = useHistory();
    


    return(
        <div className={"singleRowContainer"}>
            <div className={"optionTile"}>
                <div className="optionCircle" onClick={props.viewChange("signed")}>
                    <BookmarksIcon className="icon"/>
                    <p>Your conferences</p>
                </div>
            </div>
            <div className={"optionTile"}>
                <div className="optionCircle" onClick={props.viewChange("manage")}>
                    <AddBoxIcon className="icon"/>
                    <p>Manage conferences</p>
                </div>
            </div>
            <div className={"optionTile"}>
                <div className="optionCircle" onClick={props.viewChange("all")}>
                    <SearchIcon className="icon"/>
                    <p>Find conference</p>
                </div>
            </div>
            <div className={"optionTile"}>
                <div className="optionCircle" onClick={props.viewChange("settings")}>
                    <SettingsIcon className="icon"/>
                    <p>Settings</p>
                </div>
            </div>
        </div>
    );
}

export default Slider;