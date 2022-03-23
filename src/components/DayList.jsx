// props:
// days:Array an array of objects (each object represents a day and includes an id, name, and spots)
// day:String the currently selected day
// setDay:Function sets the currently selected day and accepts the name of the day eg. "Monday", "Tuesday"

import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;

  const parsedDays = days.map(dayData => <DayListItem key={dayData.id} {...dayData} setDay={setDay} selected={ day === dayData.name }/>);

  return (
    <ul>
      {parsedDays};
    </ul>
  );
}