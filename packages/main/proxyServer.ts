import { BrowserWindow } from "electron";
import * as http from "http";
import { v1 as uuidv1 } from 'uuid';
import { request, ProxyAgent } from "undici";
import { HttpMethod } from "undici/types/dispatcher";

export default function proxyServer(win:BrowserWindow){
  
  // const server = http.createServer(async (req, res) => {

  //   if(!req.url || req.url === "/" || req.url.indexOf("/") === 0){
  //     res.writeHead(200);
  //     res.end("ok")
  //     return;
  //   }

  //   const id = uuidv1();
  //   // body数据
  //   const buffers = []
  //   for await (const chunk of req) {
  //     buffers.push(chunk);
  //   }
  //   const body = Buffer.concat(buffers);
  //   const urlObj = new URL(req.url);
  //   const {host, origin, pathname, search, protocol, href} = urlObj

  //   // 发送回界面
  //   win.webContents.send("/bottle/request", {
  //     id,
  //     host,
  //     origin,
  //     pathname,
  //     search,
  //     protocol: protocol.replace(":", ""),
  //     href,
  //     headers: req.headers,
  //     body: body.toString("utf-8")
  //   });
  

  //   let statusCode = 0;
  //   let relText = ""
  //   let relHeaders = {};
  //   // 发起请求
  //   try{
  //     const orgRel = await request(req.url, {
  //       method: req.method as HttpMethod,
  //       headers: {
  //         ...req.headers,
  //         host,
  //         connection:undefined,
  //       },
  //       body,
  //     });
  //     relHeaders = orgRel.headers
  //     statusCode = orgRel.statusCode;
  //     relText = await orgRel.body.text();
 
  //   }catch(e:any){
  //     statusCode = -1;
  //     relText = e.message
  //   }
    
  //   // 发送回界面
  //   win.webContents.send("/bottle/response", {
  //     id,
  //     statusCode,
  //     body: relText,
  //     headers: relHeaders,
  //   });
  
  //   res.writeHead(statusCode == -1 ? 500 : statusCode, relHeaders);
  //   res.end(relText);
  // });
  
  // const port = 7777
  // server.listen(
  //   {
  //     port,
  //     host:"0.0.0.0"
  //   },
  //   () => {
  //     console.log(`listen on ${port}`);
  //   }
  // );
}


