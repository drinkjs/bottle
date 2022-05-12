import BuffHelper from "./BuffHelper";
import * as TLS from "./tls";
import { HandshakeHeader, ServerHelloData } from "./types";

export default class Handshake{
  static parse(){

  }

  static createRecord(data:Buffer){
    const bh = new BuffHelper(Buffer.alloc(32));
    bh.writeNextInt(TLS.ContentType.handshake, 1);
    bh.writeNextInt(TLS.Version.TLS_1_2, 2);
    bh.writeNextInt(data.length, 2);
    bh.writeNextBuffer(data);
    return bh.buffer
  }

  static createHeader(params:HandshakeHeader){
    const bh = new BuffHelper(Buffer.alloc(32));
    bh.writeNextInt(params.type, 1);
    bh.writeNextInt(params.data.length, 2);
    bh.writeNextBuffer(params.data);
    return bh.buffer
  }

  static createServerHello(params:ServerHelloData){
    const bh = new BuffHelper(Buffer.alloc(32));
    bh.writeNextInt(params.tlsVersion || TLS.Version.TLS_1_2, 2);
    bh.writeNextBuffer(params.serverRandom);
    bh.writeNextBuffer(params.session);
    bh.writeNextInt(params.cipherSuite, 2);
    bh.writeNextInt(params.compression, 1);
    bh.writeNextInt(params.extensions.length, 2);
    bh.writeNextBuffer(params.extensions);
    return bh.buffer;
  }
}