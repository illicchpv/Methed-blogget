---
to: <%= absPath %>/<%= component_name %>.jsx
---
import React from "react";
import style from "./<%= component_name %>.module.css"

export const <%= component_name %> = React.memo( (props) => {
    
    return (
      <div className={style.container}><%= component_name %></div>
    )
})