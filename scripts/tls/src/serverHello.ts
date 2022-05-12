import BuffHelper from "./BuffHelper";
import {
  parse_ec_point_formats, parse_encrypt_then_mac, parse_key_share,
  parse_master_secret, parse_padding, parse_psk_key_exchange_modes, parse_renegotiation_info, parse_server_name, parse_session_ticket,
  parse_signature_algorithms, parse_supported_groups, parse_supported_versions
} from "./extension";
import Handshake from "./handshake";
import Session from "./session";
import * as TLS from "./tls";
import { random } from "./utils";

export function readHello() {

}

export function replyHello(params: { extensionData: any, sessionId: Buffer, cipherSuite: number }) {
  const { extensionData, sessionId } = params

  const serverHelloData = Handshake.createServerHello({
    serverRandom: random(32),
    session: Session.create(sessionId),
    cipherSuite: 0x1302,
    compression: 0x00,
    extensions: Buffer.from("33333")
  });

  console.log("============serverHelloData==============", serverHelloData.length, serverHelloData);

  const headerData = Handshake.createHeader({
    type: TLS.HandshakeType.server_hello,
    data: serverHelloData
  });

  console.log("============headerData==============", headerData.length, serverHelloData);

  const record = Handshake.createRecord(headerData);

  console.log("============record==============", record.length, record);

}