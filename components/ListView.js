const React = require('react');
const AppView = require("./AppView");
const XhrMixin = require("./mixins/XhrMixin");
const ListView = React.createClass({
  mixins: [XhrMixin],
  getInitialState() {
      return {apps:{}};
  },
  componentDidMount(){
    this.getJSON("/list").then((res)=>{
      this.setState({apps:res});
    },function(e){console.error(e.stack)});
  },
  render() {
    var divStyle= {
      display:"flex",
      "maxWidth":"1200px",
      padding: "50px"
    }
    var appviews = Object.keys(this.state.apps).filter((appname)=>{
      return ((
        typeof this.state.apps[appname]["Desktop Entry"] === "object"
        && typeof this.state.apps[appname]["Desktop Entry"]["Name"] === "string"
      )? true : false)
    }).map((appname)=>{
      var entry = this.state.apps[appname]["Desktop Entry"]
      return(<AppView key={appname} entry={entry}/>)
    });
      return (
        <div>
          <div style={divStyle} className='list'>
              {appviews}
          </div>
        </div>
      );
  }
});
module.exports = ListView;
