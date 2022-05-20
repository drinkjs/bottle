import * as net from "net"
import BuffHelper from "./BuffHelper"
import { handleHello } from "./client"
import * as TLS from "./tls"

net.createServer((client) => {
  client.on("data", (data: Buffer) => {
    console.log(data);

    const buffReader = new BuffHelper(data)
    // 消息类型
    const contentType = buffReader.readNextInt(1);
    // 主版本
    const version= buffReader.readNextInt(2);
    // 消息长度
    const payloadLen = buffReader.readNextInt(2);
    // 消息内容
    const payloadBuf = buffReader.newNextBuff(payloadLen)

    console.log("payloadLen", payloadLen)
    console.log(payloadBuf.buffer);

    if (contentType === TLS.ContentType.handshake) {
      // 握手类型
      const handshakeType = payloadBuf.readNextInt(1);
      console.log("handshakeType", handshakeType);
      // 握手内容长度
      const handshakeLen = payloadBuf.readNextInt(3);
      console.log("handshakeLen:", handshakeLen);
      // 握手内容
      const handshakeBuf = payloadBuf.newNextBuff(handshakeLen);
      console.log("handshakeBuf", handshakeBuf.buffer)

      if (handshakeType === TLS.HandshakeType.client_hello) {
        handleHello(handshakeBuf);
      }
    }
  })
}).listen(443, () => {
  console.log("ok")
})