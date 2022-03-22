// name:string the name of the day
// spots:number the number of spots remaining
// selected:boolean true or false declaring that this day is selected
// setDay:function accepts the name of the day eg. "monday", "tuesday"
import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  const DayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": (!spots)
  })

  const formatSpots = function (spots) {
    let resultStr = '';
    switch (spots) {
      case 0:
        resultStr = 'no spots'
        break;
      case 1:
        resultStr = '1 spot'
        break;
      default:
        resultStr = `${spots} spots`
        break;
    }
    return resultStr;
  }

  return (
    <li className={DayListItemClass} onClick={() => { setDay(name) }}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)} remaining</h3>
    </li>
  );
}