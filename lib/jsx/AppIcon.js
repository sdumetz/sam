const React = require('react');
const AppIcon = React.createClass({
  getInitialState() {
      return {image:""};
  },
  componentDidMount(){
    if(this.props.entry.Icon){
      socket.emit("get/icon",this.props.entry.Icon,(err,icon)=>{
        this.state.image = this._arrayBufferToBase64( icon );
        if(this.state.image){
          console.log(this.props.entry.Icon);
        }
      });
    }
  },
  _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  },
  render() {
    var src = "data:image/png;base64,"+this.state.image;
    return (
      <div className='icon'>
        <img src={src}></img>
      </div>
    );
  }
});
module.exports = AppIcon;
