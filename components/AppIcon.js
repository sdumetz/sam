import React from 'react';
export default class AppIcon extends React.Component{
  constructor(props){
    super(props)
    this.state={src:"/img/default_icon.png"}
  }
  componentDidMount(){
    if(this.props.source){
      return this.setState({src:this.props.source});
    }
    var source = "/icon?path="+encodeURIComponent(this.props.file||"/img/default_icon.png");
    var image = new Image();
    image.onload = ()=>{
      this.setState({src:source});
    }
    image.onerror = (e)=>{
      console.warn("cannot find : ",source);
    }
    image.src = source;
  }
  render() {
    var imgStyle = {
      backgroundColor:"white",
      backgroundImage:"url(\""+this.state.src+"\")",
      backgroundRepeat:"no-repeat",
      backgroundPosition:"center",
      backgroundSize:"auto 150px",
      width: "100%",
      height: "150px"
    }
    if(this.props.active){
      imgStyle.opacity = "0.8";
    }
    return (
      <div style={imgStyle} className='icon'>
      </div>
    );
  }
};
