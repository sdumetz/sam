import React from 'react';
import AppView from './AppView';
import GotoView from './GotoView';
import xhrMixin from './mixins/XhrMixin';

export default class ListView extends React.Component{
  constructor(props){
    super(props)
    this.state={apps:{},select:-1}
  }
  handleClick(i) {
    var apps = this._getApps();
    console.log("handling click on : ",i);
    if(apps[i] && apps[i]["Exec"]){
      return xhrMixin.postApp(apps[i]["Exec"]).catch(function(e){console.error(e.stack)})
    }else{

    }
  }
  handleCustom(url){
    return xhrMixin.postApp(url).catch(function(e){console.error(e.stack)})
  }
  componentDidMount(){
    xhrMixin.getJSON("/list").then((res)=>{
      this.setState({apps:res});
    },function(e){console.error(e.stack)});
    window.onkeydown = (evt)=> {
      var apps = this._getApps();
      evt = evt || window.event;
      if (evt.keyCode == 13 && apps[this.state.select]){
        this.handleClick(this.state.select);
      }else if(evt.keyCode == 37) {
        this.setState({select:((this.state.select-1<0)? apps.length : this.state.select-1)});
      }else if(evt.keyCode == 39){
        this.setState({select:((this.state.select+1>apps.length)? 0 : this.state.select+1)});
      }else{
        //console.log(evt.keyCode);
      }
    };

  }
  _getApps(){
    return Object.keys(this.state.apps).filter((appname)=>{
      return ((
        typeof this.state.apps[appname]["Desktop Entry"] === "object"
        && typeof this.state.apps[appname]["Desktop Entry"]["Name"] === "string"
      )? true : false)
    }).map((appname)=>{
      return this.state.apps[appname]["Desktop Entry"];
    })
  }
  render() {
    var divStyle= {
      display:"flex",
      flexWrap:"wrap",
      padding: "50px"
    }
    var appviews = this._getApps().map((entry,index,apps)=>{
      return(<AppView key={index} entry={entry} active={this.state.select == index} onClick={this.handleClick.bind(this,index)}/>)
    });
    appviews.push(<GotoView key={appviews.length} active={this.state.select == appviews.length} handleSend={this.handleCustom.bind(this)}/>)
    return (
      <div>
        <div style={divStyle} className='list'>
          {appviews}
        </div>
      </div>
    );
  }
};
