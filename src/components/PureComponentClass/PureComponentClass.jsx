import React from "react";

export default class PureComponentClass extends React.PureComponent {
  // React.PureComponent проверяет изменение пропс \  React.Component не проверяет

  render(){
    console.warn(`-----------------`)
    console.warn(`PureComponentClass`)
    
    return (
      <p>[{this.props.string}]</p>
    )
  }

}