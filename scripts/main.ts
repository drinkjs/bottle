import http from "http"
import net from "net"
import stream from "stream";
import * as url from "url"

function connect(cReq, cSock:stream.Duplex) {
    var u = new URL('http://' + cReq.url);

    var pSock = net.connect(Number(u.port), u.hostname, function() {
        cSock.write('HTTP/1.1 200 Connection Established\r\n\r\n');
        pSock.pipe(cSock);
        console.log("-------------------")
    }).on('error', function(e) {
        cSock.end();
    });

    cSock.pipe(pSock);

    cSock.on("data", (chunk)=>{
      console.log(Buffer.from(chunk).readUInt8() === 0x16)
    })
}

http.createServer().on('connect', connect).listen(6666, '0.0.0.0', ()=>{
  console.log("ok")
});

import * as https from "https"
import * as fs from "fs"

const options = {
  key: fs.readFileSync('./scripts/key.pem'),
  cert: fs.readFileSync('./scripts/certificate.cer')
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(443);

import got from "got"
import {HttpsProxyAgent} from 'hpagent';

got('https://imququ.com/', {
	agent: {
		https: new HttpsProxyAgent({
			keepAlive: true,
			scheduling: 'lifo',
			proxy: 'http://localhost:6666'
		})
	}
}).then(rel =>{
    console.log(rel.statusCode,  rel.body)
})