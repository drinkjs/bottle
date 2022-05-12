
import { Version, HandshakeType, ContentType } from "./tls"

export interface ServerHelloData {
  // 2 bytes, 该字段不再用于版本协商，而是硬编码为 1.2 版本。相反，版本协商是使用下面的“支持的版本”扩展来执行的
  tlsVersion?: Version,
  // 32 bytes
  serverRandom: string,
  // 1 bytes lenght 32 bytes content
  session: Buffer
  // 2 bytes 服务器已从客户端提供的选项列表中选择密码套件, 0x1302 (TLS_AES_256_GCM_SHA384)
  cipherSuite: number
  // 1 bytes 服务器从客户端提供的选项列表中选择了压缩方法 0x00
  compression: number

  extensions: Buffer
}

export interface HandshakeHeader {
  // 1 bytes
  type: HandshakeType,
  data: Buffer
}

export interface RecordHeader{
  // 1 bytes
  type: ContentType,
  // 2 bytes 该字段不再用于版本协商，而是硬编码为 1.2 版本。相反，版本协商是使用下面的“支持的版本”扩展来执行的
  tlsVersion: Version,
  data:Buffer
}