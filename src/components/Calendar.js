import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EventIcon from '@material-ui/icons/Event';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import '../styles/Default.css';
import '../styles/Upcoming.css';



const actualDate = ()=>{
    let today = new Date();
    // let dd = String(today.getDate()).padStart(2, '0');
    // let mm = String(today.getMonth() + 1).padStart(2, '0');
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    return [dd, mm, yyyy];
}

const dayPerMonth = (month, year) => {
    let days = new Date(year, month, 0).getDate();
    let daysArray = new Array(days);
    for(let i = 0; i<days; i++) daysArray[i] = i+1;
    return [...daysArray];
}

const textDate = (month) => {
    let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    return months[month-1];
}

const specialDate = (day, month, year, upcoming, actual) => {
    let tempDate = [year, month, day]
    let actualDateTemp = [actual[2], actual[1], actual[0]];
    
    for(let i=0; i<upcoming.length; i++){
        if(tempDate[0]===upcoming[i].date[0] &&
            tempDate[1]===upcoming[i].date[1] &&
            tempDate[2]===upcoming[i].date[2] &&
             tempDate[0]===actualDateTemp[0] &&
             tempDate[1]===actualDateTemp[1] && 
             tempDate[2]===actualDateTemp[2] ) return "singleDayBoxPlannedToday";
        else if(tempDate[0]===upcoming[i].date[0] &&
            tempDate[1]===upcoming[i].date[1] &&
            tempDate[2]===upcoming[i].date[2]) return "singleDayBoxPlanned";
        else if( tempDate[0]===actualDateTemp[0] &&
            tempDate[1]===actualDateTemp[1] && 
            tempDate[2]===actualDateTemp[2]) return "singleDayBoxToday";
        else return "singleDayBox";
    }
}

const Box = (props) => {
    return(
        <div className={props.boxclass}>
            <p>{props.day}</p>
        </div>
    );
}
const Calendar = (props)=>{
    const [month, setMonth] = useState(actualDate()[1]);
    const [day, setDay] = useState(actualDate()[0]);
    const [year, setYear] = useState(actualDate()[2]);
    let currentData = [...actualDate()];

    const changeMonth = (direction) => {
        if(direction === "left") setMonth(month-1);
        if(direction === "right") setMonth(month+1); 
    }

    return(
        <div className="calendar">
            <div className="calendarHeader">
                <div className="singleElementBox">
                    <EventIcon/>
                </div>
                <h1>Upcoming</h1>
            </div>
            <div className="monthHeader">
                <div className="singleElementBox">
                    <ArrowLeftIcon onClick={()=>changeMonth("left")}/>
                </div>
                <h2>{textDate(month)}{" "+year}</h2>
                <div className="singleElementBox">
                    <ArrowRightIcon onClick={()=>changeMonth("right")}/>
                </div>
            </div>
            {dayPerMonth(month, year).map(singleDay => 
                (<Box day={singleDay} boxclass={specialDate(singleDay, month, year, props.upcoming, currentData)}>
                    
                    </Box>)
            )
            }
        </div>
    );
}


export default Calendar;