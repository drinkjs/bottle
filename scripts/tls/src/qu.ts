// import { Client, connect as conn } from 'undici'
// import { Duplex, finished } from 'stream'
import * as http from 'http'
import * as https from "https"
import * as net from "net"
import * as tls from "tls"
import HTTPParser from "./HTTPParser"

const agent = new https.Agent({
  keepAlive: true,
  scheduling: "fifo"
})

const p = new HTTPParser(HTTPParser.RESPONSE);


const requestOptions = {
  method: 'CONNECT',
  host: "52.188.16.167",
  port: 8084,
  path: `www.baidu.com:443`,
  // servername:"localhost",
  setHost: false,
  headers: { connection: 'keep-alive', host: `www.baidu.com:443` },
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

      // socket.on("close", ()=>{
      //   console.log("-----------------------ddddddddddddddd--close")
      // });

      // socket.on("error", (err)=>{
      //   console.log("================error", err)
      // });

      // socket.on("data", (data)=>{
      //   console.log("--------------------sokcet", data.toString());
      // })



      console.log(response.statusCode);
      console.log(head);
      // const secureSocket = net.createConnection({ ...options, socket })

      // const tlsConn = new tls.TLSSocket(socket);
      // tlsConn.on("keylog", (log)=>{
      //   console.log("============keylog", log)
      // });
      // tlsConn.connect({
      //   host:"www.baidu.com",
      //   port:443,
      // })

      const tlsConn = tls.connect({
        host:"www.baidu.com",
        port:443,
        // rejectUnauthorized:false,
        // requestCert:false,
        servername:"www.baidu.com",
        socket
      }, ()=>{
        tlsConn.write("GET / HTTP/1.1\r\nHost: www.baidu.com\r\n\r\n");
      });
      tlsConn.setNoDelay(true);

      tlsConn.on("error", (err)=>{
        console.log("tls error", err)
      })

      tlsConn.on("close", ()=>{
        console.log("==========tls close===");
      });

      tlsConn.on("data", (buf)=>{
        p.execute(buf);
      })
      

      // let datas = []
      // tlsConn.on("readable", ()=>{
      //   while(true){
      //     const chunk = tlsConn.read()
      //     if (chunk === null) {
            
      //       break
      //     }
      //     datas.push(chunk)
      //   }
      // })

      // tlsConn.on("end", ()=>{
      //   console.log("==========tls data read===", datas.toString());
      // })
      
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
//   hostname: "www.baidu.com",
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
