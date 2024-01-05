// import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Layout from "./components/Layout";

// React.memo(( (props) => {...
const App = ( (props) => {
    return (
      // <React.Fragment>
      <>
        <Header />
        <Main>
          <h2>main.children</h2>
          <h3>main.children</h3>
          <h4>main.children</h4>
          <h5>main.children</h5>
        </Main>
      </>
      // </React.Fragment>
    )
})
export default App