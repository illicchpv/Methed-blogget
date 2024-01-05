import React from "react";
import style from "./style.module.css"

export const ComponentFunc = React.memo( (props) => {
  // оборачивание в React.memo позволяет не перерендить компонент когда пропсы не поменялись

    console.warn(`-----------------`)
    console.warn(`ComponentFunc`)
    
    return (
      <p className={style.text}>[{props.string}]</p>
    )
})
// export default ComponentFunc
