const fs = require("fs");
const electron = require('electron');
const express = require("express");
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const globalShortcut = electron.globalShortcut;
const WebServer = require("./lib/WebServer")
const AppsManager = require("./lib/AppsManager")
var mainWindow = null; // Keep a global reference of the window object

var appsmanager = new AppsManager();
var webserver = new WebServer(appsmanager.list());
var init = [];

// Load flash plugin if available
try {
  if(fs.statSync("/usr/lib/pepperflashplugin-nonfree/libpepflashplayer.so").isFile()){
    app.commandLine.appendSwitch('ppapi-flash-path', '/usr/lib/pepperflashplugin-nonfree/libpepflashplayer.so');
  }
}catch(e){
  //silently ignore flash player absence
}


init.push(webserver.listen(8000));
init.push(new Promise(function(resolve, reject) {
  app.on('ready',resolve);
}))

webserver.on("start",function(key){
  if(/^https?/.test(key)){
    mainWindow.loadURL(key);
  }else{
    appsmanager.launch(key)
    mainWindow.hide();
  }


})
appsmanager.on("end",function(){
  console.log("End of app");
  mainWindow.show();
});


Promise.all(init).then(function() {
  var size = electron.screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  mainWindow = new BrowserWindow({width: size.width, height: size.height,frame:false,webPreferences: { plugins: true }});

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:8000/');

  // Open the DevTools.
  if(process.env["NODE_ENV"] === "development"){
    mainWindow.webContents.openDevTools();
  }
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  mainWindow.on('keypress', function(date) {
    console.log("keypress",data);
  });
  var ret = globalShortcut.register('ctrl+d', function() {
    mainWindow.loadURL('http://localhost:8000/');
  });
}).catch(function(e){
  process.nextTick(function(){
    throw e;
  })
})


app.on('window-all-closed', function() {
  app.quit();
});
