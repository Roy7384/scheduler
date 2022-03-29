import React from "react";
import PropTypes from "prop-types"
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

// props:
// interviewers:array - an array of objects as seen above
// setInterviewer:function - a function that accepts an interviewer id. This function will simply be passed down to the <InterviewerListItem>
// interviewer:number - a number that represents the id of the currently selected interviewer

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;

  const parsedInterviewers = interviewers.map(interviewer => {
    const { id, name, avatar } = interviewer;
    return (
      <InterviewerListItem
        key={id}
        name={name}
        avatar={avatar}
        selected={id === value}
        setInterviewer={() => { onChange(id); }}
      />
    );
  });
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}