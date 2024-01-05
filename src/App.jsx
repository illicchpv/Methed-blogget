import React from "react";
import { generate, count } from "random-words";
import ComponentClass from "./components/ComponentClass/ComponentClass";
import PureComponentClass from "./components/PureComponentClass/PureComponentClass";
// import ComponentFunc from "./components/ComponentFunc/ComponentFunc";
import ComponentFunc from "./components/ComponentFunc";
import Button from "./components/Button";

// const tech = 'react'

export default class App extends React.Component {

  state = {
    count: 0,
    str: 'str',
    pure: 'pure',
    func: 'func',
  }

  componentDidMount(){ // вызывается 2
    console.warn(`🚀 ~ componentDidMount:`, this.state.count)

    setInterval(() => {
      if(this.state.count % 2){
        this.setState({
          count: 1+this.state.count,
          str: generate(),
        })
      }else{
        this.setState({
          count: 1+this.state.count,
          str: generate(),
          pure: generate(),
          func: generate(),
        })
      }
    }, 3000)
  }

  render(){ // вызывается 1
    console.clear()
    console.warn(`🚀 ~ render:`, this.state.count)
    
    return (
      <header className="App-header">
        <ComponentClass string={this.state.str} />
        <PureComponentClass string={this.state.pure}/>
        <ComponentFunc string={this.state.func} />
        <Button text='жми сюда'/>
      </header>
    )
  }
}


// const str = (tech === 'react' ?  <h1>Привет {tech}</h1> : <h1>Привет mir</h1>)

// function App() {
//   return (
//     <header className="App-header">
//       <ComponentClass str={generate()} />
//     </header>
//   )

//   // {/* <div className={tech}>{str}</div> */}
//   // <div className={tech}>
//   //   {/* {tech === 'react' ?  
//   //     <h1>Привет {tech}</h1> : 
//   //     <h1>Привет mir</h1>} */}

//   //   <p>technology:</p>
//   //   <ul>
//   //     <li>html</li>
//   //     <li>css</li>
//   //     <li>js</li>
//   //     {tech && <li>{tech}</li>}
//   //   </ul>
//   //     {/* 
//   //     comments 
//   //     comments 
//   //     comments 
//   //     */}
//   // </div>

//   // return (
//   //   <div className="App">
//   //     <p > {str} </p>
//   //   </div>
//   // );
//   // тоже:    
//   // return React.createElement('div', {className: 'App'}, '', 
//   //     React.createElement('p', {}, str))
// }
// export default App;
