import React from 'react';
import AppIcon from './AppIcon';
import AppTitle from './AppTitle';
import CustomUrl from './CustomUrl';
export default class GotoView extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
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
      <div style={divStyle} className='appview' >
        <AppIcon source="/img/url.png" active={this.props.active}/>
        <AppTitle title="Custom URL" active={this.props.active}>
          <CustomUrl handleSend={this.props.handleSend} active= {this.props.active}/>
        </AppTitle>
      </div>
    );
  }
}
