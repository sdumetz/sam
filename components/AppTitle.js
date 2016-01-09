const React = require('react');
const AppIcon = require("./AppIcon")
const XhrMixin = require("./mixins/XhrMixin");
const AppView = React.createClass({

  render() {
    var divStyle={
      height:"150px",
      textAlign:"center"
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
