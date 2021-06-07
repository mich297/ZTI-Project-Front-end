import React, { useState } from "react";
import EventIcon from "@material-ui/icons/Event";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import "../../styles/css/Default.css";
import "../../styles/css/Upcoming.css";
import "../../styles/css/Calendar.css";
import { actualDate, dayPerMonth, textDate, checkColor } from "../Functions.js";

const specialDate = (day, month, year, upcoming, actual) => {
  let tempDate = [year, month, day];
  let actualDateTemp = [actual[2], actual[1], actual[0]];

  for (let i = 0; i < upcoming.length + 1; i++) {
    return checkColor(upcoming, tempDate, actualDateTemp, i);
  }
};

const Box = (props) => {
  return (
    <div className={props.boxclass}>
      <p>{props.day}</p>
    </div>
  );
};

const Calendar = (props) => {
  const [month, setMonth] = useState(actualDate()[1]);
  const [year, setYear] = useState(actualDate()[2]);
  let currentData = [...actualDate()];

  const setBoth = (year, month) => {
    setYear(year);
    setMonth(month);
  };

  const changeMonth = (direction) => {
    if (direction === "left" && year >= 1900) {
      month === 1 ? setBoth(year - 1, 12) : setMonth(month - 1);
      month === 1
        ? props.changeDisplay(12, year - 1)
        : props.changeDisplay(month - 1, year);
    }
    if (direction === "right") {
      month === 12 ? setBoth(year + 1, 1) : setMonth(month + 1);
      month === 12
        ? props.changeDisplay(1, year + 1)
        : props.changeDisplay(month + 1, year);
    }
  };

  return (
    <div className="calendar">
      <div className="calendarHeader">
        <div className="singleElementBox">
          <EventIcon />
        </div>
        <h1>Kalendarz</h1>
      </div>
      <div className="monthHeader">
        <div className="singleElementBox">
          <ArrowLeftIcon onClick={() => changeMonth("left")} />
        </div>
        <h2>
          {textDate(month)}
          {" " + year}
        </h2>
        <div className="singleElementBox">
          <ArrowRightIcon onClick={() => changeMonth("right")} />
        </div>
      </div>
      {dayPerMonth(month, year).map((singleDay) => (
        <Box
          day={singleDay}
          key={singleDay + month + year}
          boxclass={specialDate(
            singleDay,
            month,
            year,
            props.upcoming,
            currentData
          )}
        ></Box>
      ))}
    </div>
  );
};

export default Calendar;
