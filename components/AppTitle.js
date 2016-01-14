const React = require('react');
const AppIcon = require("./AppIcon")
const AppView = React.createClass({

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
        <h3>{this.props.entry["Name"]}</h3>
        {this.props.entry["Description"]}
      </div>
    );
  }
});
module.exports = AppView;
