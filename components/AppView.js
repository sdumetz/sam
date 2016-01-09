const React = require('react');
const AppIcon = require("./AppIcon")
const AppTitle = require("./AppTitle")
const XhrMixin = require("./mixins/XhrMixin");
const AppView = React.createClass({
  mixins: [XhrMixin],
  handleClick: function() {
    this.postApp(this.props.entry["Exec"]).then(function(res){console.log(this.props.name,"sucessfully posted")},function(e){console.error(e.stack)})
 },
  render() {
    var divStyle={
      width:"33%",
      cursor:"pointer"
    }
    if(this.props.active){
      divStyle.backgroundColor = "black";
    }
    return (
      <div style={divStyle} className='appview' onClick={this.handleClick}>
        <AppIcon {...this.props}/>
        <AppTitle {...this.props}/>
      </div>
    );
  }
});
module.exports = AppView;
