import net from "net"

net.createServer((client)=>{
  client.on("data", (data:Buffer)=>{
    console.log(data);
  })
}).listen(443)