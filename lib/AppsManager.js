const Launcher = require("desktop-launch");
function AppsManager(){
  this.launcher = new Launcher();
  this.apps =  this.launcher.finder.entries.entries; //Seriously?
}
AppsManager.prototype.list = function () {
  return this.apps;
};

module.exports = AppsManager;
