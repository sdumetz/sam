const React = require('react');
const AppIcon = React.createClass({
  getInitialState(){
    return {src:"/img/default_icon.png"};
  },
  componentDidMount(){
    var source = "/icon?path="+encodeURIComponent(this.props.entry["Icon"]||"/img/default_icon.png");
    var image = new Image();
    image.onload = ()=>{
      this.setState({src:source});
    }
    image.onerror = (e)=>{
      console.warn("cannot find : ",source);
    }
    image.src = source;
  },
  render() {
    var style = {
      width:"100px",
      height:"100px"
    }
    return (
      <div className='icon'>
        <img style={style} src={this.state.src}></img>
      </div>
    );
  }
});
module.exports = AppIcon;
