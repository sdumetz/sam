const React = require('react');
const AppIcon = React.createClass({

  render() {
    var src = "/icon?path="+encodeURIComponent(this.props.entry["Icon"]||"/img/default_icon.png");
    var style = {
      width:"100px",
      height:"100px"
    }
    return (
      <div className='icon'>
        <img style={style} src={src}></img>
      </div>
    );
  }
});
module.exports = AppIcon;
