const socketio = require('socket.io')
    , AppsManager = require("./AppsManager")
    , express = require('express')
    , http = require('http')
    , browserify = require("browserify")
    , fs = require("fs");
function WebServer(){
  this.app = express();
  this.server = http.Server(this.app)
  var io = socketio(this.server);
  var apps = new AppsManager();
  this.app.get("/index.js",this.getComponents.bind(this));
  io.on('connection',(socket)=> {
    var err = function(e){
      console.log("catched error : ",e);
      socket.emit("error",e);
    }
    socket.on("get/list",function(){
      apps.list().then((data)=>{
        console.log("listed OK")
        this.emit("list",data);
      }).catch((e)=>{
        this.emit("error",e);
      });
    });
    socket.on("get/icon",function(path,cb){
      if(path.indexOf("/") == 0){
        fs.readFile(path,function(err,data){
          cb(err,data);
        });
      }else{
        cb("Not an absolute path");
      }
    })
  });

}
WebServer.prototype.listen = function(port){
  return new Promise((resolve, reject) =>{
    this.server.listen(port||8000,resolve);
  });
}
WebServer.prototype.getComponents = function(req,res){
  res.setHeader("content-type", "application/javascript");
  browserify(__dirname+"/jsx/index.js",{debug:true})
  .transform("babelify", {presets: ["es2015", "react"]})
  .bundle()
  .pipe(res);
}

module.exports = WebServer;
