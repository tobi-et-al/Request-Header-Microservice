var express = require('express');
var jquery = require('jquery');
var moment = require('moment');


var app = express();

 
app.use(express.static('public'));

function getLanguage(headerLanguage){
  return headerLanguage.match(/(.*)(,)/)[1];
}

function getOS(userAgent){ 
  var userAgent = userAgent.match(/((\()[a-zA-Z0-9;_ ]{0,}(\)+))/g);
  userAgent = userAgent[0].replace('(','').replace(')','');
  return userAgent;
}

function getIP(IP){
  IP = IP.match(/([.0-9]*\b)/g)[0];
  return IP;

}

app.get("/", function (request, response) {
    
    var ipaddress = getIP(request.headers['x-forwarded-for']);
    var language = getLanguage(request.headers['accept-language']);
    var os = getOS(request.headers['user-agent']);
    var val = {
               "ipaddress": ipaddress,
               "language": language,
               "software": os
              };
    console.log(val);
    response.send(val)

});

var listener = app.listen(3000,
    function() {
        console.log('Your app is listening on port ' + listener.address().port);
    });