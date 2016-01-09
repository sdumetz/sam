const React = require('react');
const AppIcon = require("./AppIcon")
const XhrMixin = require("./mixins/XhrMixin");
const AppView = React.createClass({
  mixins: [XhrMixin],
  handleClick: function() {
    this.postApp(this.props.entry["Exec"]).then(function(res){console.log(this.props.name,"sucessfully posted")},function(e){console.error(e.stack)})
 },
  render() {
    var divStyle={
      width:"33%"
    }
    return (
      <div style={divStyle} className='app' onClick={this.handleClick}>
        <h3>{this.props.name}</h3>
        <AppIcon entry={this.props.entry} />
      </div>
    );
  }
});
module.exports = AppView;
