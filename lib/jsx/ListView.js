const React = require('react');
const AppView = require("./AppView");
const ListView = React.createClass({
  getInitialState() {
      return {apps:{}};
  },
  componentDidMount(){
    socket.on('list',this._onList);
    socket.on("error",this._onError);
    socket.emit("get/list");
  },
  _onList(list){
    this.setState({apps:list});
  },
  _onError(e){
    console.warn("Master process error : ",e);
  },
  render() {
    var appviews = Object.keys(this.state.apps).filter((appname)=>{
      return ((
        typeof this.state.apps[appname]["Desktop Entry"] === "object"
        && typeof this.state.apps[appname]["Desktop Entry"]["Name"] === "string"
      )? true : false)
    }).map((appname)=>{
      var entry = this.state.apps[appname]["Desktop Entry"]
      return(<AppView key={appname} entry={entry} name={entry.Name}/>)
    });
      return (
          <div className='list'>
              <h3> Available apps </h3>
              {appviews}
          </div>
      );
  }
});
module.exports = ListView;
