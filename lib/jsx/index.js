const React = require('react');
const ReactDOM = require('react-dom');
global.socket = io('http://localhost:8000');
var ListView = require("./ListView");
ReactDOM.render(<ListView/>, document.getElementById('view'));
