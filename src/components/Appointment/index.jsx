import React from "react";

import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

export default function Appointment(props) {

  const { time, interview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );
  
  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer} 
      />
      )}
      {mode === CREATE && (
      <Form 
        interviewers={[]}
        onCancel={back}
      />
      )}
    </article>
  )
}