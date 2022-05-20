import BuffReader from "./BuffHelper";
import * as TLS from "./tls"

export function parse_server_name(extBuf: BuffReader) {
  const serverListLen = extBuf.readNextInt(2);
  const nameType = extBuf.readNextInt(1);
  const nameLen = extBuf.readNextInt(2);
  const hostName = extBuf.readNextBuff(nameLen);
  return hostName
}

export function parse_supported_groups(extBuf: BuffReader) {
  let len = extBuf.readNextInt(2);
  const supported_groups:number[] = [];
  while (len > 0) {
    const group = extBuf.readNextInt(2);
    if(!TLS.GREASE.includes(group))
      supported_groups.push(group);
    len -= 2
  }
  return supported_groups
}

export function parse_key_share(extBuf: BuffReader) {
  let len = extBuf.readNextInt(2);
  const key_share:{group:number, value:Buffer}[] = []
  while(len > 0){
    const group = extBuf.readNextInt(2);
    const valueLen = extBuf.readNextInt(2);
    const value = extBuf.readNextBuff(valueLen);
    if(!TLS.GREASE.includes(group)){
      key_share.push({group, value});
    }
    len -= (4 + valueLen);
  }
  return key_share
}

export function parse_supported_versions(extBuf: BuffReader) {
  const supported_versions:number[] = [];
  let len = extBuf.readNextInt(1);
  while (len > 0) {
    const v = extBuf.readNextInt(2);
    if(!TLS.GREASE.includes(v))
      supported_versions.push(v);
    len -= 2;
  }
  return supported_versions
}

export function parse_psk_key_exchange_modes(extBuf: BuffReader){
  const len = extBuf.readNextInt(1);
  const psk_key_exchange_modes = extBuf.readNextInt(len);
  return psk_key_exchange_modes
}

export function parse_signature_algorithms(extBuf: BuffReader){
  const signature_algorithms:number[] = [];
  let len = extBuf.readNextInt(2);
  while (len > 0) {
    signature_algorithms.push(extBuf.readNextInt(2));
    len -= 2;
  }
  return signature_algorithms;
}

export function parse_master_secret(extBuf: BuffReader){
  return extBuf.readNextBuff(extBuf.readNextInt(2));
}

export function parse_ec_point_formats(extBuf: BuffReader){
  const len = extBuf.readNextInt(1);
  return extBuf.readNextInt(len);
}

export function parse_session_ticket(extBuf: BuffReader){
  return extBuf.buffer
}

export function parse_encrypt_then_mac(extBuf: BuffReader){
  return extBuf.buffer
}

export function parse_renegotiation_info(extBuf: BuffReader){
  return extBuf.readNextBuff(extBuf.readNextInt(1))
}

export function parse_padding(extBuf: BuffReader){
  return extBuf.buffer;
}