import BuffHelper from "./BuffHelper";
import { parse_ec_point_formats, parse_encrypt_then_mac, parse_key_share, 
  parse_master_secret, parse_padding, parse_psk_key_exchange_modes, parse_renegotiation_info, parse_server_name, parse_session_ticket, 
  parse_signature_algorithms, parse_supported_groups, parse_supported_versions } from "./extension";
import * as TLS from "./tls";
import * as serverHello from "./serverHello"

export function handleHello(handshakeBuf: BuffHelper) {
  // 客户端tls版本
  const clientVersion = handshakeBuf.readNextInt(2);
  console.log("=====clientVersion===", clientVersion)
  // 客户端32位随机数
  const clientRandom = handshakeBuf.readNextBuff(32);

  console.log("clientRandom", clientRandom);

  // sessionId长度
  const sessionLength = handshakeBuf.readNextInt(1);
  // sessionId
  let sessionId = handshakeBuf.readNextBuff(sessionLength);
  // tls1.3
  //const is13 = TLS.Version.TLS_1_3 === clientVersion;
  // if (is13) {
  //   // 在 TLS 1.3 中，此“会话恢复”是通过更灵活的 PSK（预共享密钥）机制完成的，因此不再需要此字段
  //   handshakeBuf.skip(sessionLen);
  // } else {
  //   sessionId = handshakeBuf.readNextBuff(sessionLen);
  // }

  // 客户端支持密码套件数量
  const cipherLen = handshakeBuf.readNextInt(2);
  console.log("cipherLen", cipherLen);
  // 加密套件
  const ciphers: number[] = [];
  for (let i = 0; i < cipherLen; i += 2) {
    ciphers.push(handshakeBuf.readNextInt(2))
  }
  console.log("密码套件", ciphers);

  // 压缩方法，基本不再使用
  handshakeBuf.skip(2);
  // 扩展长度
  const extenLen = handshakeBuf.readNextInt(2);

  // 扩展数据
  const extensionBuf = handshakeBuf.newNextBuff(extenLen);

  const extensionData:{[key:string]:any} = {}

  // 读取扩展数据
  while (!extensionBuf.EOF) {
    // 扩展类型
    const extType = extensionBuf.readNextInt(2);
    // 扩展类型内容长度
    const extContentLen = extensionBuf.readNextInt(2);
    // 扩展内容
    const extBuf = extensionBuf.newNextBuff(extContentLen);

    if (extType === TLS.ExtensionType.server_name) {

      extensionData.server_name = parse_server_name(extBuf)
      console.log("------------server_name-----", extensionData.server_name, extensionData.server_name.toString("utf-8"))

    } else if (extType === TLS.ExtensionType.supported_groups) {

      extensionData.supported_groups = parse_supported_groups(extBuf)
      console.log("------------supported_groups-----", extensionData.supported_groups)

    } else if (extType === TLS.ExtensionType.key_share) {

      extensionData.key_share = parse_key_share(extBuf)
      console.log("------------key_share-----", extensionData.key_share[0].value.toString("hex"));

    } else if (extType === TLS.ExtensionType.ec_point_formats) {
      extensionData.ec_point_formats = parse_ec_point_formats(extBuf);

      console.log("------------ec_point-----", extensionData.ec_point_formats)

    } else if (extType === TLS.ExtensionType.session_ticket) {
      extensionData.session_ticket = parse_session_ticket(extBuf);

      console.log("------------session_ticket-----", extensionData.session_ticket);

    } else if (extType === TLS.ExtensionType.encrypt_then_mac) {
      extensionData.encrypt_then_mac = parse_encrypt_then_mac(extBuf)
      console.log("------------encrypt_then_mac-----", extensionData.encrypt_then_mac)

    } else if (extType === TLS.ExtensionType.master_secret) {
      extensionData.master_secret = parse_master_secret(extBuf)
      console.log("------------master_secret-----", extensionData.master_secret)

    } else if (extType === TLS.ExtensionType.signature_algorithms) {

      extensionData.signature_algorithms = parse_signature_algorithms(extBuf)
      console.log("------------signature_algorithms-----", extensionData.signature_algorithms)

    } else if (extType === TLS.ExtensionType.supported_versions) {

      extensionData.supported_versions = parse_supported_versions(extBuf)
      console.log("------------supported_versions-----", extensionData.supported_versions)

    } else if (extType === TLS.ExtensionType.psk_key_exchange_modes) {

      extensionData.psk_key_exchange_modes = parse_psk_key_exchange_modes(extBuf)
      console.log("------------psk_key_exchange_modes-----", extensionData.psk_key_exchange_modes)

    } else if (extType === TLS.ExtensionType.status_request) {
      console.log("------------status_request------")

    } else if (extType === TLS.ExtensionType.application_layer_protocol_negotiation) {
      console.log("------------application_layer_protocol_negotiation------")

    } else if (extType === TLS.ExtensionType.signed_certificate_timestamp) {
      console.log("------------signed_certificate_timestamp------")

    } else if (extType === TLS.ExtensionType.compress_certificate) {
      console.log("------------compress_certificate------")

    } else if (extType === TLS.ExtensionType.padding) {
      extensionData.padding = parse_padding(extBuf);

    } else if(extType === TLS.ExtensionType.renegotiation_info){
      extensionData.renegotiation_info = parse_renegotiation_info(extBuf);
      console.log("------------renegotiation_info------", extensionData.renegotiation_info);

    }else {
      console.log("unknown extension type", extType);
    }
  }
  console.log("extensionData", extensionData)
  serverHello.replyHello({extensionData, sessionId, cipherSuite:0});
}

export function sendHello(){

}