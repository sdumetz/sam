const React = require('react');
const AppIcon = require("./AppIcon")
const AppView = React.createClass({
  render() {
    return (
      <div className='app'>
        <h3>{this.props.name}</h3>
        <AppIcon entry={this.props.entry} />
      </div>
    );
  }
});
module.exports = AppView;
