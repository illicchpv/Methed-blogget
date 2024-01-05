import React from "react";
import style from "./Layout.module.css"

// export const Layout = React.memo( (props) => {
export const Layout = ( (props) => {
    return (
      <div className={style.container}>{props.children}</div>
    )
})