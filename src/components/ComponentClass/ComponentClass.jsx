import React from "react";

export default class ComponentClass extends React.Component {

  render(){
    console.warn(`-----------------`)
    console.warn(`ComponentClass`)
    
    return (
      <p>[{this.props.string}]</p>
    )
  }

  // typeComponent = '=== class component ==='
  // state = { // state  - зарезервированное название
  //   count: 0,
  // }
  // logged = () => {
  //   this.setState({
  //     count: 1+this.state.count,
  //   })
  //   console.warn(`🚀 ~ logged`, this.state.count)
  // }
  // render(){
  //   return (
  //     <div className="container">
  //       <p>ComponentClass</p>
  //       <p>{this.typeComponent} count: {this.state.count}</p>
  //       <button onClick={this.logged}>Component</button>
  //     </div>
  //   )
  // }
}