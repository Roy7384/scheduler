// possible props
// Confirm: Boolean;
// Danger: Boolean;
// Clickable:
// Disabled: Boolean


import React from "react";

import "components/Button.scss";

export default function Button(props) {
   return (
     <button>
        {props.children}
     </button> 
   );
}
