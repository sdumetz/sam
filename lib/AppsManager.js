const Launcher = require("desktop-launch")
    , EventEmitter = require('events').EventEmitter
    , util = require("util");
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
function AppsManager(){
  this.launcher = new Launcher();
  this.launcher.on("end",this.emit.bind(this,"end"));
  this.apps =  this.launcher.finder.entries.entries; //Seriously?
}
util.inherits(AppsManager, EventEmitter);

AppsManager.prototype.list = function () {
  //return this.apps;
  return Promise.resolve({
    "Kodi":{
      "Desktop Entry":{
        Name:"Kodi media player",
        Exec:"/usr/bin/kodi",
        Icon:"/usr/share/icons/hicolor/256x256/apps/kodi.png"
      }
    },
    "Youtube":{
      "Desktop Entry":{
        Name:"Youtube Videos",
        Exec:"https://youtube.com",
        Icon:__dirname+"/../static/img/youtube-logo.png"
      }
    },"Steam":{
      "Desktop Entry":{
        Name:"Steam",
        Exec:"/usr/bin/steam",
        Icon:__dirname+"/../static/img/steam_logo.png"
      }
    }
  })
};

AppsManager.prototype.launch = function (key) {
  this.launcher.start(key);
};

module.exports = AppsManager;
