const React = require('react');
const AppView = require("./AppView");
const XhrMixin = require("./mixins/XhrMixin");
const ListView = React.createClass({
  mixins: [XhrMixin],
  getInitialState() {
      return {apps:{},select:-1};//select init to -1 : no selection until a key is pressed
  },
  componentDidMount(){
    this.getJSON("/list").then((res)=>{
      this.setState({apps:res});
    },function(e){console.error(e.stack)});
    document.onkeydown = (evt)=> {
      evt = evt || window.event;
      if (evt.keyCode == 37) {
        this.setState({select:((this.state.select-1<0)? Object.keys(this.state.apps).length-1 : this.state.select-1)});
      }else if(evt.keyCode == 39){
        this.setState({select:((this.state.select+1>Object.keys(this.state.apps).length-1)? 0 : this.state.select+1)});
      }else{
        console.log(evt.keyCode);
      }
    };

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
    }).map((appname,index,apps)=>{
      var entry = this.state.apps[appname]["Desktop Entry"]
      return(<AppView key={appname} entry={entry} active={this.state.select == index}/>)
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
