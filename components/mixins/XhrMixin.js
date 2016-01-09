const xhr = function (url,method){
return new Promise(function(resolve, reject) {
  var req = new XMLHttpRequest();
  req.open(method, url, true);
  req.onreadystatechange = function (aEvt) {
    if (req.readyState == 4) {
       if(req.status == 200)
        resolve(req.response);
       else
        reject(req.status);
    }
  };
  req.send(null);
});
}
module.exports = {
  getJSON: function(url){
    return xhr(url,"GET").then(JSON.parse);
  },
  getIcon:function(path){
    return xhr("/icon?path="+path,"GET");
  },
  postApp:function(name){
    return xhr("/app/"+encodeURIComponent(name),"POST");
  }
}
