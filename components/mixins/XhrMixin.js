module.exports = {
  getJSON: function(url){
    return this.xhr(url,"GET").then(JSON.parse);
  },
  getIcon:function(path){
    return this.xhr("/icon?path="+path,"GET");
  },
  postApp:function(name){
    return this.xhr("/app/"+encodeURIComponent(name),"POST");
  },
  xhr: function (url,method){
    console.log("sending XHR for : ",url)
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open(method, url, true);
      req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
           if(req.status == 200){
             resolve(req.response);
           }else{
             reject(req.status);
           }
        }
      };
      req.send(null);
    });
  }
}
