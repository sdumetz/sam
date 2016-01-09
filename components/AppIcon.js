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
    var imgStyle = {
      backgroundImage:"url(\""+this.state.src+"\")",
      backgroundRepeat:"no-repeat",
      backgroundPosition:"center",
      backgroundSize:"auto 150px",
      width: "100%",
      height: "150px"
    }
    return (
      <div style={imgStyle} className='icon'>
      </div>
    );
  }
});
module.exports = AppIcon;
