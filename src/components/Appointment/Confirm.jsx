import React from "react";
import Button from "../Button";

//props
// message:String eg. "Delete the appointment?"
// onConfirm:Function to be called when the user clicks the Confirm button
// onCancel:Function to be called when the user clicks the Cancel button
export default function (props) {

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">Delete the appointment?</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button danger onClick={props.onConfirm}>Confirm</Button>
      </section>
    </main>
  );
}