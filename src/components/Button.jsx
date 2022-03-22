// possible props
// Confirm: Boolean;
// Danger: Boolean;
// Clickable:
// Disabled: Boolean

import React from "react";

import "components/Button.scss";

export default function Button(props) {
   let buttonClass = "button";

   if (props.confirm) {
      buttonClass += " button--confirm";
   };

   if (props.danger) {
      buttonClass += " button--danger";
   };

   return (
     <button onClick={props.onClick} disabled={props.disabled} className={buttonClass}>
        {props.children}
     </button> 
   );
}
