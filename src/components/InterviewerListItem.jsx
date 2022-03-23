import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

// props:
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// selected: boolean
// setInterviewer: set state function

export default function InterviewerListItem (props) {
  const { name, avatar, selected, setInterviewer } = props;

  const InterviewerListItemClassName = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  })

  return (
    <li 
      onClick={setInterviewer} 
      className={InterviewerListItemClassName}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
    {selected && props.name}
    </li>
  );
};