import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import AddBoxIcon from "@material-ui/icons/AddBox";
import SearchIcon from "@material-ui/icons/Search";
import "../../styles/css/Default.css";
import "../../styles/css/Main.css";
import "../../styles/css/SlidingMenu.css";
import "../../styles/css/Slider.css";

const Slider = (props) => {
  const handleClick = (componentClass) => {
    props.viewChange(componentClass);
    props.slideBack();
  };

  return (
    <div className={"singleRowContainer"}>
      <div className={"optionTile"}>
        <div className="optionCircle" onClick={() => handleClick("signed")}>
          <BookmarksIcon className="icon" />
          <p>Rejestrowana konferencja</p>
        </div>
      </div>
      <div className={"optionTile"}>
        <div className="optionCircle" onClick={() => handleClick("manage")}>
          <AddBoxIcon className="icon" />
          <p>Zarządzaj konferencjami</p>
        </div>
      </div>
      <div className={"optionTile"}>
        <div className="optionCircle" onClick={() => handleClick("all")}>
          <SearchIcon className="icon" />
          <p>Przeglądaj konferencje</p>
        </div>
      </div>
      <div className={"optionTile"}>
        <div className="optionCircle" onClick={() => handleClick("settings")}>
          <SettingsIcon className="icon" />
          <p>Ustawienia</p>
        </div>
      </div>
    </div>
  );
};

export default Slider;
