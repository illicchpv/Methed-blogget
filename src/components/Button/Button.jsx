import React from "react";
import style from "./Button.module.css"

export const Button = React.memo( (props) => {
    
    return (
      <button className={style.btn}>{props.text}</button>
    )
})