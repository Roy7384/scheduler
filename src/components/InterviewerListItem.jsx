import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

// props:
// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// selected: Boolean
// setInterviewer: set state function

export default function InterviewerListItem (props) {
  const { id, name, avatar, selected, setInterviewer } = props;

  const InterviewerListItemClassName = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  })

  return (
    <li onClick={() => {setInterviewer(id)}} className={InterviewerListItemClassName} key={id}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
    {selected ? name : ''}
    </li>
  );
};