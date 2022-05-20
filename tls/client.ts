import BuffHelper from "./BuffHelper";
import { parse_ec_point_formats, parse_encrypt_then_mac, parse_key_share, 
  parse_master_secret, parse_padding, parse_psk_key_exchange_modes, parse_renegotiation_info, parse_server_name, parse_session_ticket, 
  parse_signature_algorithms, parse_supported_groups, parse_supported_versions } from "./extension";
import * as TLS from "./tls";

export function handleHello(handshakeBuf: BuffHelper) {
  // 客户端tls版本
  const clientVersion = handshakeBuf.readNextInt(2);
  console.log("=====clientVersion===", clientVersion)
  // 客户端32位随机数
  const clientRandom = handshakeBuf.readNextBuff(32);

  console.log("clientRandom", clientRandom);

  // sessionId长度
  const sessionLen = handshakeBuf.readNextInt(1);
  // sessionId
  let sessionId = handshakeBuf.readNextBuff(sessionLen);
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


    console.log("extensionData", extensionData)

    // 回复客户端server_hello
    const serverHelloBuf = new BuffHelper(Buffer.alloc(128))
    // 握手类型
    serverHelloBuf.writeNextInt(TLS.ContentType.handshake, 1);
    //  服务器版本 该字段不再用于版本协商，而是硬编码为 1.2 版本。相反，版本协商是使用supported_versions来执行的
    serverHelloBuf.writeNextInt(TLS.Version.TLS_1_2, 2);

    // 握手内容
    const handshakeBuf = new BuffHelper(Buffer.alloc(123));
    handshakeBuf.writeNextInt(TLS.HandshakeType.server_hello, 1);

    const handshakeConent = new BuffHelper(Buffer.alloc(120));

    // 服务器版本
    handshakeConent.writeNextInt(TLS.Version.TLS_1_3, 2);
    // 32位随机数
    handshakeConent.writeNextBuffer(Buffer.alloc(32, 0xAA), 32);
    // sessionId 此遗留字段不再用于识别和重用会话。相反，服务器会回显客户端提供的会话 ID（如果有）
    handshakeConent.writeNextBuffer(32, 1);
    handshakeConent.writeNextBuffer(sessionId, sessionLen);
    // 服务器已从客户端提供的选项列表中选择密码套件
    handshakeConent.writeNextBuffer(0x1302, 2);
    // 压缩方法 0x00 不执行压缩）
    handshakeConent.writeNextBuffer(0, 1);

    // 扩展内容
    const serverExtensionBuf = new BuffHelper(Buffer.alloc(0));
    // 版本扩展
    serverExtensionBuf.writeNextInt(TLS.ExtensionType.supported_versions, 2);
    // 版本扩展长度
    serverExtensionBuf.writeNextInt(2, 2);
    // 版本
    serverExtensionBuf.writeNextInt(extensionData.supported_versions ? extensionData.supported_versions[0] : TLS.Version.TLS_1_3, 2);

    // 服务器使用客户端发送的公钥的算法发送公钥。一旦发送，就可以计算加密密钥，其余的握手将被加密，这与以前的协议版本不同，握手是明文发送的
    if(extensionData.key_share && extensionData.key_share.length){
      serverExtensionBuf.writeNextInt(TLS.ExtensionType.key_share, 2);
      serverExtensionBuf.writeNextInt(0x0024, 2);
       // 通过曲线 25519 进行密钥交换
      serverExtensionBuf.writeNextInt(0x001d, 2);
      // 密钥长度
      serverExtensionBuf.writeNextInt(0x0020, 2);
      // “服务器密钥交换生成”的公钥
      serverExtensionBuf.writeNextBuffer(Buffer.alloc(32), 32);
    }


    console.log(serverExtensionBuf)
  }
}