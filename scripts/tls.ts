
// 参考 https://www.iana.org/assignments/tls-parameters/tls-parameters.xhtml
const tls = {
  versions: {
    TLS_1_0: { major: 3, minor: 1 },
    TLS_1_1: { major: 3, minor: 2 },
    TLS_1_2: { major: 3, minor: 3 },
    TLS_1_3: { major: 3, minor: 4 },
  },

  contentType: {
    change_cipher_spec: 20,
    alert: 21, // 警报
    handshake: 22, // 握手
    application_data: 23, // 应用程序数据
    heartbeat: 24, // 心跳
    tls12_cid: 25,
    ACK: 26, // 确认
  },

  // 握手类型
  handshakeType: {
    hello_request: 0,
    client_hello: 1,
    server_hello: 2,
    new_session_ticket: 4,
    end_of_early_data: 5,
    hello_retry_request:6,
    unassigned:7,
    encrypted_extensions: 8,
    request_connection_id: 9,
    new_connection_id: 10,
    certificate: 11,
    server_key_exchange: 12, // 在1.3之前的TLS版本中使用
    certificate_request: 13,
    server_hello_done: 14, // 在1.3之前的TLS版本中使用
    certificate_verify: 15,
    client_key_exchange: 16, // 在1.3之前的TLS版本中使用
    finished: 20,
    certificate_url: 21, // 在1.3之前的TLS版本中使用
    certificate_status: 22, // 在 1.3 之前的TLS版本中使用
    supplemental_data: 23, // 在 1.3 之前的TLS版本中使用
    key_update: 24,
    compressed_certificate: 25,
    ekt_key: 26
  },

  // 警报类型
  alertType: {
    close_notify: 0,
    unexpected_message: 10,
    bad_record_mac: 20,
    decryption_failed: 21,
    record_overflow: 22,
    decompression_failure: 30,
    handshake_failure: 40,
    no_certificate: 41,
    bad_certificate: 42,
    unsupported_certificate: 43,
    certificate_revoked: 44,
    certificate_expired: 45,
    certificate_unknown: 46,
    illegal_parameter: 47,
    unknown_ca: 48,
    access_denied: 49,
    decode_error: 50,
    decrypt_error: 51,
    too_many_cids_requested: 52,
    export_restriction: 60,
    protocol_version: 70,
    insufficient_security: 71,
    internal_error: 80,
    inappropriate_fallback: 86,
    user_canceled: 90,
    no_renegotiation: 100,
    missing_extension: 109,
    unsupported_extension: 110,
    certificate_unobtainable: 111,
    unrecognized_name: 112,
    bad_certificate_status: 113,
    bad_certificate_hash_value: 114,
    unknown_psk_identity: 115,
    certificate_required: 116,
    no_application_protocol: 120,
  },

  // 心跳类型
  heartbeatType: {
    heartbeat_reques: 1,
    heartbeat_response: 2
  },

  // 心跳模式
  heartbeatModes: {
    peer_allowed_to_send: 1,
    peer_not_allowed_to_send: 2
  },

  // 补充数据格式
  supplementalData: {
    user_mapping_data: 0,
    authz_data: 16386
  },

  userMappingType: {
    upn_domain_hint: 64
  },

  // 哈希算法
  // 此注册表中的值仅适用于 1.3 之前的 (D)TLS 协议版本。(D)TLS 1.3 和更高版本的值在 TLS SignatureScheme 注册表中注册.
  hashAlgorithm: {
    none: 0,
    md5: 1,
    sha1: 2,
    sha224: 3,
    sha256: 4,
    sha384: 5,
    sha512: 6,
  },

  // 签名算法 
  // 此注册表中的值仅适用于 1.3 之前的 (D)TLS 协议版本。(D)TLS 1.3 和更高版本的值在 TLS SignatureScheme 注册表中注册.
  signatureAlgorithm: {
    anonymous: 0,
    rsa: 1,
    dsa: 2,
    ecdsa: 3,
    ed25519: 7,
    ed448: 8,
    gostr34102012_256: 64,
    gostr34102012_512: 65
  },

  // 签名方案
  signatureScheme: {
    rsa_pkcs1_sha1: 0x0201,
    ecdsa_sha1: 0x0203,
    rsa_pkcs1_sha256: 0x0401,
    ecdsa_secp256r1_sha256: 0x0403,
    rsa_pkcs1_sha256_legacy: 0x0420,
    rsa_pkcs1_sha384: 0x0501,
    ecdsa_secp384r1_sha384: 0x0503,
    rsa_pkcs1_sha384_legacy: 0x0520,
    rsa_pkcs1_sha512: 0x0601,
    ecdsa_secp521r1_sha512: 0x0603,
    rsa_pkcs1_sha512_legacy: 0x0620,
    eccsi_sha256: 0x0704,
    iso_ibs1: 0x0705,
    iso_ibs2: 0x0706,
    iso_chinese_ibs: 0x0707,
    sm2sig_sm3: 0x0708,
    gostr34102012_256a: 0x0709,
    gostr34102012_256b: 0x070A,
    gostr34102012_256c: 0x070B,
    gostr34102012_256d: 0x070C,
    gostr34102012_512a: 0x070D,
    gostr34102012_512b: 0x070E,
    gostr34102012_512c: 0x070F,
    rsa_pss_rsae_sha256: 0x0804,
    rsa_pss_rsae_sha384: 0x0805,
    rsa_pss_rsae_sha512: 0x0806,
    ed25519: 0x0807,
    ed448: 0x0808,
    rsa_pss_pss_sha256: 0x0809,
    rsa_pss_pss_sha384: 0x080A,
    rsa_pss_pss_sha512: 0x080B,
    ecdsa_brainpoolP256r1tls13_sha256: 0x081A,
    ecdsa_brainpoolP384r1tls13_sha384: 0x081B,
    ecdsa_brainpoolP512r1tls13_sha512: 0x081C
  },

  // EC 点格式
  ecPoint:{
    uncompressed:0,
    ansiX962_compressed_prime:1,
    ansiX962_compressed_char2:2
  },

  // EC 曲线类型
  ecCurveTypes: {
    unassigned:0,
    explicit_prime: 1,
    explicit_char2: 2,
    named_curve: 3
  },

  pskKeyExchangeMode: {
    psk_ke: 0,
    psk_dhe_ke: 1
  },

  // 授权数据格式
  authorizationData: {
    x509_attr_cert: 0,
    saml_assertion: 1,
    x509_attr_cert_url: 2,
    saml_assertion_url: 3,
    keynote_assertion_list: 64,
    keynote_assertion_list_url: 65,
    dtcp_authorization: 66
  },

}