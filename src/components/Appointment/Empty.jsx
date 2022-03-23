import React from "react";

export default function Empty(props) {

  return (
    <main className="appointment__add" onClick={props.setDay}>
      <img 
        src="images/add.png" 
        alt="Add" 
        className="appointment__add-button" 
      />
    </main>
  )
}