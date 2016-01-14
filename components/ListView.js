const React = require('react');
const AppView = require("./AppView");
const XhrMixin = require("./mixins/XhrMixin");

const ListView = React.createClass({
  mixins: [XhrMixin],
  handleClick: function(i) {
    var apps = this._getApps();
    if(!apps || !apps[i]) return;
    console.log("handling click on : ",i);
    this.postApp(apps[i]["Exec"]).catch(function(e){console.error(e.stack)})
  },
  getInitialState() {
      return {apps:{},select:-1};//select init to -1 : no selection until a key is pressed
  },
  componentDidMount(){
    this.getJSON("/list").then((res)=>{
      this.setState({apps:res});
    },function(e){console.error(e.stack)});
    window.onkeydown = (evt)=> {
      var apps = this._getApps();
      evt = evt || window.event;
      if (evt.keyCode == 13 && apps[this.state.select]){
        this.handleClick(this.state.select);
      }else if(evt.keyCode == 37) {
        this.setState({select:((this.state.select-1<0)? apps.length-1 : this.state.select-1)});
      }else if(evt.keyCode == 39){
        this.setState({select:((this.state.select+1>apps.length-1)? 0 : this.state.select+1)});
      }else{
        console.log(evt.keyCode);
      }
    };

  },
  _getApps(){
    return Object.keys(this.state.apps).filter((appname)=>{
      return ((
        typeof this.state.apps[appname]["Desktop Entry"] === "object"
        && typeof this.state.apps[appname]["Desktop Entry"]["Name"] === "string"
      )? true : false)
    }).map((appname)=>{
      return this.state.apps[appname]["Desktop Entry"];
    })
  },
  render() {
    var divStyle= {
      display:"flex",
      "maxWidth":"1200px",
      padding: "50px"
    }
    var appviews = this._getApps().map((entry,index,apps)=>{
      return(<AppView key={index} entry={entry} active={this.state.select == index} onClick={this.handleClick.bind(this,index)}/>)
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
