const React = require('react');
const AppIcon = require("./AppIcon")
const AppTitle = require("./AppTitle")
const AppView = React.createClass({
  render() {
    var divStyle={
      width:"33%",
      cursor:"pointer"
    }
    if(this.props.active){
      divStyle.backgroundColor = "black";
    }
    return (
      <div style={divStyle} className='appview' onClick={this.props.onClick}>
        <AppIcon {...this.props}/>
        <AppTitle {...this.props}/>
      </div>
    );
  }
});
module.exports = AppView;
