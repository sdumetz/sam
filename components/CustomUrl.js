import React from 'react';
import ReactDOM from 'react-dom';
export default class CustomUrl extends React.Component{
  constructor(props){
    super(props)
    this.state = {url:""}
  }
  componentDidUpdate(){
    this.setFocus();
  }
  componentDidMount(){
    this.setFocus();
  }
  setFocus(){
    console.log("did mount : ",this.props)
    if(this.props.active){
      console.log("set input focus")
      ReactDOM.findDOMNode(this.refs.input).focus();
    }else{
      ReactDOM.findDOMNode(this.refs.input).blur();
    }
  }
  handleChange(event){
    this.setState({url: event.target.value});
  }
  onSubmit(e){
    e.preventDefault();
    e.stopPropagation();
    console.log(this.state.url);
    this.props.handleSend(this.state.url);
    return false;
  }
  render(){
    return(<form method="" action="" onSubmit={this.onSubmit.bind(this)}><input ref="input" placeholder="http://example.com" value={this.state.url} onChange={this.handleChange.bind(this)} type="text"/><button type="submit">Submit</button></form>)
  }
}
