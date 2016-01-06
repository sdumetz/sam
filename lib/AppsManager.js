const Launcher = require("desktop-launch");
function AppsManager(){
  this.launcher = new Launcher();
  this.apps =  this.launcher.finder.entries.entries; //Seriously?
}
AppsManager.prototype.list = function () {
  //return this.apps;
  return Promise.resolve({
    "Chromium":{
      "Desktop Entry":{
        Name:"Chromium Browser",
        Exec:"/usr/bin/chromium",
        Icon:"/usr/share/icons/hicolor/256x256/apps/chromium.png"
      }
    }
  })
};

AppsManager.prototype.launch = function (key) {
  this.launcher.exec(key);
};

module.exports = AppsManager;
