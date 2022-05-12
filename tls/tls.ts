export const GREASE = [
  0x0A0A, 
  0x1A1A,
  0x2A2A,
  0x3A3A,
  0x4A4A,
  0x5A5A,
  0x6A6A,
  0x7A7A,
  0x8A8A,
  0x9A9A,
  0xAAAA,
  0xBABA,
  0xCACA,
  0xDADA,
  0xEAEA,
  0xFAFA,
]

export const PskKeyExchangeModesGREASE = [
  0x0B,0x2A,0x49,
  0x68,0x87,0xA6,
  0xC5,0xE4
]

// 参考 https://www.iana.org/assignments/tls-parameters/tls-parameters.xhtml
  export enum Version {
    TLS_1_0 = 0x0301,
    TLS_1_1 = 0x0302,
    TLS_1_2 = 0x0303,
    TLS_1_3 = 0x0304,
  }

  export enum ExtensionType {
    server_name = 0,

    client_certificate_url = 2,

    trusted_ca_keys = 3,

    // 当 Client 收到 Server 发来的证书以后，除了校验证书身份以外，还需要校验证书是否有效。有可能证书已经被 CA 刚刚吊销了。所以 Client 必须通过 CRL 和 OCSP 机制校验证书是否还在有效期之内。
    // 不管是 CRL 还是 OCSP 机制都会发送一个额外的请求去验证有效期，这个请求可能会阻塞握手下面的流程，为了避免阻塞，一般采用 Server 向 CA 发送 OCSP 请求。
    // 为了使用 OCSP 封套技术，在 ClientHello 中增加 status_request 扩展，这个扩展内包含了证书状态的请求。
    status_request = 5,

    user_mapping = 6,

    // 它标识了 Client 支持的椭圆曲线的种类
    supported_groups = 10,

    // 这个扩展标识了是否能对椭圆曲线参数进行压缩。一般不启用压缩(uncompressed)
    ec_point_formats = 11,

    use_srtp = 14,

    heartbeat = 15,

    // Application Layer Protocol Negotiation，ALPN 应用层协议扩展。由于应用层协议存在多个版本，Client 在 TLS 握手的时候想知道应用层用的什么协议。
    // 基于这个目的，ALPN 协议就出现了。ALPN 希望能协商出双方都支持的应用层协议，应用层底层还是基于 TLS/SSL 协议的。
    application_layer_protocol_negotiation = 16,

    status_request_v2 = 17,

    signed_certificate_timestamp = 18,

    server_certificate_type = 20,

    padding = 21,

    // 客户端表示它可以支持 EtM，这可以防止 早期版本的 TLS 中的某些漏洞。在 TLS 1.3 中始终使用此机制，因此此扩展在此会话中无效
    encrypt_then_mac = 22,

    extended_master_secret = 23,

    token_binding = 24,

    cached_info = 25,

    compress_certificate = 27,

    record_size_limit = 28,

    // 客户端表示它没有会话票据来提供此连接
    session_ticket = 35,

    // 客户端表示支持额外的加密操作，以防止早期版本的 TLS 中的漏洞（有关详细信息，请参阅RFC 7627）。在 TLS 1.3 中，漏洞不再存在，
    // 因此此扩展在此会话中无效。
    master_secret = 23,

    // Client 使用 "signature_algorithms" 扩展来向 Server 表明哪个签名/ hash 算法对会被用于数字签名。
    // 这个扩展的 "extension_data" 域包含了一个 "supported_signature_algorithms" 值。
    signature_algorithms = 13,

    // 客户端表明它支持 TLS 1.3。这是客户端 Hello 记录中提示客户端支持 TLS 1.3 的唯一指示，因为出于兼容性原因，它已假装是 TLS 1.2 连接尝试。
    supported_versions = 43,

    // 客户端指示可用于从预共享密钥 (PSK) 建立密钥的模式。由于TLS 1.3不使用 PSK，因此此扩展TLS 1.3无效。
    psk_key_exchange_modes = 45,

    // 在 TLS 1.3 中，之所以能比 TLS 1.2 快的原因，原因之一就在 key_share 这个扩展上。
    // key_share 扩展内包含了 (EC)DHE groups 需要协商密钥参数，这样不需要再次花费 1-RTT 进行协商了。
    // "supported_groups" 的扩展 和 "key_share" 扩展配合使用。“supported_groups” 
    // 这个扩展表明了 Client 支持的 (EC)DHE groups，"key_share" 扩展表明了 Client 是否包含了一些或者全部的（EC）DHE共享参数。
    key_share = 51,

    // 重新谈判信息
    renegotiation_info = 65281,

    pre_shared_key = 41,

    early_data = 42,

    cookie = 44,

    certificate_authorities = 47,

    oid_filters = 48,

    post_handshake_auth = 49,

    signature_algorithms_cert = 50,
  }

  export enum ContentType {
    change_cipher_spec = 20,
    alert = 21, // 警报
    handshake = 22, // 握手
    application_data = 23, // 应用程序数据
    heartbeat = 24, // 心跳
    tls12_cid = 25,
    ACK = 26, // 确认
  }

  export enum HandshakeType {
    hello_request = 0,
    client_hello = 1,
    server_hello = 2,
    new_session_ticket = 4,
    end_of_early_data = 5,
    hello_retry_request = 6,
    unassigned = 7,
    encrypted_extensions = 8,
    request_connection_id = 9,
    new_connection_id = 10,
    certificate = 11,
    server_key_exchange = 12, // 在1.3之前的TLS版本中使用
    certificate_request = 13,
    server_hello_done = 14, // 在1.3之前的TLS版本中使用
    certificate_verify = 15,
    client_key_exchange = 16, // 在1.3之前的TLS版本中使用
    finished = 20,
    certificate_url = 21, // 在1.3之前的TLS版本中使用
    certificate_status = 22, // 在 1.3 之前的TLS版本中使用
    supplemental_data = 23, // 在 1.3 之前的TLS版本中使用
    key_update = 24,
    compressed_certificate = 25,
    ekt_key = 26
  }

  // 警报类型
  export enum AlertType {
    close_notify = 0,
    unexpected_message = 10,
    bad_record_mac = 20,
    decryption_failed = 21,
    record_overflow = 22,
    decompression_failure = 30,
    handshake_failure = 40,
    no_certificate = 41,
    bad_certificate = 42,
    unsupported_certificate = 43,
    certificate_revoked = 44,
    certificate_expired = 45,
    certificate_unknown = 46,
    illegal_parameter = 47,
    unknown_ca = 48,
    access_denied = 49,
    decode_error = 50,
    decrypt_error = 51,
    too_many_cids_requested = 52,
    export_restriction = 60,
    protocol_version = 70,
    insufficient_security = 71,
    internal_error = 80,
    inappropriate_fallback = 86,
    user_canceled = 90,
    no_renegotiation = 100,
    missing_extension = 109,
    unsupported_extension = 110,
    certificate_unobtainable = 111,
    unrecognized_name = 112,
    bad_certificate_status = 113,
    bad_certificate_hash_value = 114,
    unknown_psk_identity = 115,
    certificate_required = 116,
    no_application_protocol = 120,
  }

  // 心跳类型
  export enum HeartbeatType {
    heartbeat_reques = 1,
    heartbeat_response = 2
  }

  // 心跳模式
  export enum HeartbeatModes {
    peer_allowed_to_send = 1,
    peer_not_allowed_to_send = 2
  }

  // 哈希算法
  // 此注册表中的值仅适用于 1.3 之前的 (D)TLS 协议版本。(D)TLS 1.3 和更高版本的值在 TLS SignatureScheme 注册表中注册.
  export enum HashAlgorithm {
    none = 0,
    md5 = 1,
    sha1 = 2,
    sha224 = 3,
    sha256 = 4,
    sha384 = 5,
    sha512 = 6,
  }

  // 签名算法 
  // 此注册表中的值仅适用于 1.3 之前的 (D)TLS 协议版本。(D)TLS 1.3 和更高版本的值在 TLS SignatureScheme 注册表中注册.
  export enum SignatureAlgorithm {
    anonymous = 0,
    rsa = 1,
    dsa = 2,
    ecdsa = 3,
    ed25519 = 7,
    ed448 = 8,
    gostr34102012_256 = 64,
    gostr34102012_512 = 65
  }

  // 签名方案
  export enum SignatureScheme {
    rsa_pkcs1_sha1 = 0x0201,
    ecdsa_sha1 = 0x0203,
    rsa_pkcs1_sha256 = 0x0401,
    ecdsa_secp256r1_sha256 = 0x0403,
    rsa_pkcs1_sha256_legacy = 0x0420,
    rsa_pkcs1_sha384 = 0x0501,
    ecdsa_secp384r1_sha384 = 0x0503,
    rsa_pkcs1_sha384_legacy = 0x0520,
    rsa_pkcs1_sha512 = 0x0601,
    ecdsa_secp521r1_sha512 = 0x0603,
    rsa_pkcs1_sha512_legacy = 0x0620,
    eccsi_sha256 = 0x0704,
    iso_ibs1 = 0x0705,
    iso_ibs2 = 0x0706,
    iso_chinese_ibs = 0x0707,
    sm2sig_sm3 = 0x0708,
    gostr34102012_256a = 0x0709,
    gostr34102012_256b = 0x070A,
    gostr34102012_256c = 0x070B,
    gostr34102012_256d = 0x070C,
    gostr34102012_512a = 0x070D,
    gostr34102012_512b = 0x070E,
    gostr34102012_512c = 0x070F,
    rsa_pss_rsae_sha256 = 0x0804,
    rsa_pss_rsae_sha384 = 0x0805,
    rsa_pss_rsae_sha512 = 0x0806,
    ed25519 = 0x0807,
    ed448 = 0x0808,
    rsa_pss_pss_sha256 = 0x0809,
    rsa_pss_pss_sha384 = 0x080A,
    rsa_pss_pss_sha512 = 0x080B,
    ecdsa_brainpoolP256r1tls13_sha256 = 0x081A,
    ecdsa_brainpoolP384r1tls13_sha384 = 0x081B,
    ecdsa_brainpoolP512r1tls13_sha512 = 0x081C
  }

  export enum ECPoint {
    uncompressed = 0,
    ansiX962_compressed_prime = 1,
    ansiX962_compressed_char2 = 2
  }

  export enum ECCurveType {
    unassigned = 0,
    explicit_prime = 1,
    explicit_char2 = 2,
    named_curve = 3
  }

  export enum PSKKeyExchangeMode {
    psk_ke = 0,
    psk_dhe_ke = 1
  }

  export enum AuthorizationData {
    x509_attr_cert = 0,
    saml_assertion = 1,
    x509_attr_cert_url = 2,
    saml_assertion_url = 3,
    keynote_assertion_list = 64,
    keynote_assertion_list_url = 65,
    dtcp_authorization = 66
  }