import React from "react";
import style from "./Main.module.css"
import Layout from "../Layout";

export const Main = React.memo( (props) => {
    // 
    return (
      <main className={style.main}>
        <Layout>
          <p> main.Layout</p>
        </Layout>        
      </main>
    )
})