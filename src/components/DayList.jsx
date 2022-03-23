// props:
// days:Array an array of objects (each object represents a day and includes an id, name, and spots)
// day:String the currently selected day
// setDay:Function sets the currently selected day and accepts the name of the day eg. "Monday", "Tuesday"

import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, value, onChange } = props;

  const parsedDays = days.map(
    dayData => 
      <DayListItem 
        key={dayData.id} 
        name={dayData.name}
        spots={dayData.spots}
        setDay={onChange} 
        selected={ value === dayData.name }/>
  );

  return (
    <ul>
      {parsedDays};
    </ul>
  );
}