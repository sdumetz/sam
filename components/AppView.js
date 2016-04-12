import React from 'react';
import AppIcon from './AppIcon';
import AppTitle from './AppTitle';
export default class AppView extends React.Component{
  constructor(props){
    super(props)
  }
  render() {
    var divStyle={
      width:"25%",
      margin: 2,
      cursor:"pointer"
    }
    if(this.props.active){
      divStyle.backgroundColor = "#bbb";
      divStyle.boxShadow= "3px 3px 3px #444";
    }
    return (
      <div style={divStyle} className='appview' onClick={this.props.onClick}>
        <AppIcon file={this.props.entry["Icon"]} active={this.props.active}/>
        <AppTitle title={this.props.entry["Name"]} active={this.props.active}>{this.props.entry["Description"]}</AppTitle>
      </div>
    );
  }
};
