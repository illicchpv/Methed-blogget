import React from "react";
import style from "./Heading.module.css"

export const Heading = React.memo( (props) => {
    
    return (
      <div className={style.heading}>{props.text}</div>
    )
})
