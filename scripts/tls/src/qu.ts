import { Client, connect as conn } from 'undici'
import { Duplex, finished } from 'stream'
import * as http from 'http'
import * as https from "https"
import * as net from "net"
import * as tls from "tls"

const agent = new https.Agent({
  keepAlive: true,
  scheduling: "fifo"
})


const requestOptions = {
  method: 'CONNECT',
  host: "52.188.16.167",
  port: 8084,
  path: `www.footlocker.com:443`,
  // servername:"localhost",
  setHost: false,
  headers: { connection: 'keep-alive', host: `www.footlocker.com:443` },
  agent: false,
  timeout: 0,
}

const base64 = Buffer.from(`${decodeURIComponent("c2b401a6a2b19893676c5d4e3d62fe3d")}:${decodeURIComponent("0521c1c43a33733ab0242ecd92c5170f")}`).toString('base64')
class ProxyAgent extends https.Agent {

  socket:any

  createConnection(options, callback) {
    // console.log("===================options=============", options);
    // console.log("===================callback=============", callback);

    const proxyReq = http.request(requestOptions);
    proxyReq.once("connect", (response, socket, head) => {
      // proxyReq.removeAllListeners()
      // socket.removeAllListeners()

      socket.on("close", ()=>{
        console.log("-----------------------ddddddddddddddd--close")
      });

      socket.on("error", (err)=>{
        console.log("================error", err)
      });

      socket.on("data", (data)=>{
        console.log("--------------------sokcet", data.toString());
      })



      console.log(response.statusCode);
      console.log(head);
      // const secureSocket = net.createConnection({ ...options, socket })

      // const tlsConn = new tls.TLSSocket(socket);
      // tlsConn.on("keylog", (log)=>{
      //   console.log("============keylog", log)
      // });
      // tlsConn.connect({
      //   host:"www.footlocker.com",
      //   port:443,
      // })

      const tlsConn = tls.connect({
        host:"www.footlocker.com",
        port:443,
        // rejectUnauthorized:false,
        // requestCert:false,
        servername:"www.footlocker.com",
        socket
      }, ()=>{
        tlsConn.write("GET /product/~/Y6317GSB.html HTTP/1.1\r\nHost: www.footlocker.com\r\nuser-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36\r\n\r\n");
      });

      tlsConn.on("error", (err)=>{
        console.log("tls error", err)
      })

      tlsConn.on("close", ()=>{
        console.log("==========tls close===");
      })
      

      tlsConn.on("data", (data)=>{
        console.log("==========tls data===", data.toString());
        // tlsConn.end();
      })
      
    });

    proxyReq.on("error", (err)=>{
      console.log("proxy error", err)
    })

    proxyReq.setHeader("proxy-authorization", `Basic ${base64}`)
    proxyReq.end();
  }
}

const proxyAgent = new ProxyAgent();

proxyAgent.createConnection({}, ()=>{

})


// const req = https.request({
//   method: "GET",
//   hostname: "www.footlocker.com",
//   port: 443,
//   path: "/",
//   // agent: proxyAgent,
// }, (res) => {
//   console.log('statusCode:', res.statusCode);
//   console.log('headers:', res.headers);

//   let datas = []
//   res.on('data', (d) => {
//     datas.push(d);
//     // console.log("=============================", d);
//   });
//   res.on("error", (e) => {
//     console.log(e);
//   });
//   res.on("end", () => {
//     console.log("=============end=============", Buffer.concat(datas).toString())
//   })
// });

// req.on("error", (e)=>{
//   console.log(e);
// });

// req.end();


http.createServer().listen(9090, ()=>{
  console.log("-------------9090---------")
});


const proxyUrl = `http://localhost:8888`
