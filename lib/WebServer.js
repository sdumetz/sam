const express = require('express')
    , fs = require("fs")
    , EventEmitter = require('events').EventEmitter
    , util = require("util");
function WebServer(applist){
  this.apps = applist;
  //this.apps.on("end",this.emit.bind(this,"end"));
  this.server = express();
  this.server.get("/list",this.getList.bind(this));
  this.server.get("/icon",this.getIcon.bind(this));
  this.server.post("/app/:name",(req,res)=>{
    this.emit("start",decodeURIComponent(req.params.name));
    res.status(200).send("OK");
  });
  this.server.use("/dist",express.static(__dirname + '/../dist'));
  this.server.use(express.static(__dirname + '/../static'));
}
util.inherits(WebServer, EventEmitter);

WebServer.prototype.listen = function(port){
  return new Promise((resolve, reject) =>{
    this.server.listen(port||8000,resolve);
  });
}

WebServer.prototype.getList = function (req,res) {
  this.apps.then((data)=>{
    res.status(200).send(data);
  }).catch((e)=>{
    res.status(500).send(e);
  });
};
WebServer.prototype.getIcon = function(req,res){
  if(!req.query.path) return res.status(400).send("require a query \"path\"");
  fs.createReadStream(req.query.path)
  .on("error",function(e){
    console.warn("In getIcon : ",e);
    res.status(404).send("404 : Not Found");
  })
  .pipe(res)


}
module.exports = WebServer;
