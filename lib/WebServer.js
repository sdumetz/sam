const AppsManager = require("./AppsManager")
    , express = require('express')
    , fs = require("fs")
    , EventEmitter = require('events').EventEmitter
    , util = require("util");
function WebServer(){
  this.apps = new AppsManager();
  this.apps.on("end",this.emit.bind(this,"end"));
  this.server = express();
  this.server.get("/index.js",this.getComponents.bind(this));
  this.server.get("/list",this.getList.bind(this));
  this.server.get("/icon",this.getIcon.bind(this));
  this.server.post("/app/:name",(req,res)=>{
    this.emit("start",req.params.name);
    this.apps.launch(decodeURIComponent(req.params.name))
  });
  this.server.use(express.static(__dirname + '/../static'));
}
util.inherits(WebServer, EventEmitter);

WebServer.prototype.listen = function(port){
  return new Promise((resolve, reject) =>{
    this.server.listen(port||8000,resolve);
  });
}
WebServer.prototype.getComponents = function(req,res){
  res.setHeader("content-type", "application/javascript");
  fs.createReadStream(path.resolve(__dirname,"../build/bundle.js"))
  .pipe(res);
}
WebServer.prototype.getList = function (req,res) {
  this.apps.list().then((data)=>{
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
  })
  .pipe(res)


}
module.exports = WebServer;
