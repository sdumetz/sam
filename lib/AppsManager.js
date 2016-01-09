const Launcher = require("desktop-launch")
    , EventEmitter = require('events').EventEmitter
    , util = require("util");
function AppsManager(){
  this.launcher = new Launcher();
  this.launcher.on("end",this.emit.bind(this,"end"));
  this.apps =  this.launcher.finder.entries.entries; //Seriously?
}
util.inherits(AppsManager, EventEmitter);

AppsManager.prototype.list = function () {
  //return this.apps;
  return Promise.resolve({
    "Chromium":{
      "Desktop Entry":{
        Name:"Chromium Browser",
        Exec:"/usr/bin/chromium-browser",
        Icon:"/usr/share/icons/hicolor/256x256/apps/chromium-browser.png"
      }
    },
    "Kodi":{
      "Desktop Entry":{
        Name:"Kodi media player",
        Exec:"/usr/bin/kodi",
        Icon:"/usr/share/icons/hicolor/256x256/apps/kodi.png"
      }
    }
  })
};

AppsManager.prototype.launch = function (key) {
  this.launcher.start(key);
};

module.exports = AppsManager;
