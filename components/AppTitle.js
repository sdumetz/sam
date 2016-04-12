import React from 'react';
import AppIcon from './AppIcon';
export default class AppView extends React.Component{
  constructor(props){
    super(props)
  }
  render() {
    var divStyle={
      height:"150px",
      textAlign:"center"
    }
    if(this.props.active){
      divStyle.opacity="0.8";
    }
    return (
      <div style={divStyle} className='apptitle' onClick={this.handleClick}>
        <h3>{this.props.title}</h3>
        {this.props.children}
      </div>
    );
  }
};
