var http = require('http');
var net = require('net');
var url = require('url');

function connect(cReq, cSock) {

  console.log("======dfdfd onconnect")

    var u = url.parse(cReq.url);

    console.log("==============xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", u);

    var pSock = net.connect(u.port || 80, u.hostname, function() {
        cSock.write('HTTP/1.1 200 Connection Established\r\n\r\n');
        pSock.pipe(cSock);
    }).on('error', function(e) {
        cSock.end();
    });

    cSock.pipe(pSock);
}

http.createServer().on('connect', connect).listen(8888, '0.0.0.0', ()=>{
  console.log("============")
})