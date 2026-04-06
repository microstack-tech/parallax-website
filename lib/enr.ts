// Minimal ENR (EIP-778) decoder. We only need to *read* fields — no signature
// verification — so this avoids pulling in a crypto library.
//
// An ENR is `"enr:" + base64url(rlp([signature, seq, k1, v1, k2, v2, ...]))`.
// Keys are sorted ASCII byte strings, values are arbitrary bytes (often
// themselves RLP-encoded for richer types).

export type DecodedEnr = {
  /** Stable identifier for the node — first 16 hex chars of the secp256k1 pubkey. */
  id: string
  /** Dotted-quad IPv4 string, or null if the ENR has no `ip` field. */
  ip: string | null
  /** TCP port advertised by the node, or null. */
  tcp: number | null
  /** UDP port advertised by the node, or null. */
  udp: number | null
  /** All raw key/value pairs after the signature and sequence number. */
  kv: Record<string, Uint8Array>
}

function base64UrlDecode(input: string): Uint8Array {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/")
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4)
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(padded, "base64"))
  }
  // Fallback for non-Node runtimes (edge). atob() handles standard base64.
  const bin = atob(padded)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

type RlpItem = { val: Uint8Array; isList: boolean; next: number }

function rlpDecodeItem(buf: Uint8Array, off: number): RlpItem {
  const p = buf[off]
  if (p < 0x80) {
    return { val: buf.subarray(off, off + 1), isList: false, next: off + 1 }
  }
  if (p < 0xb8) {
    const len = p - 0x80
    return { val: buf.subarray(off + 1, off + 1 + len), isList: false, next: off + 1 + len }
  }
  if (p < 0xc0) {
    const ll = p - 0xb7
    const len = readBigEndian(buf, off + 1, ll)
    return {
      val: buf.subarray(off + 1 + ll, off + 1 + ll + len),
      isList: false,
      next: off + 1 + ll + len,
    }
  }
  if (p < 0xf8) {
    const len = p - 0xc0
    return { val: buf.subarray(off + 1, off + 1 + len), isList: true, next: off + 1 + len }
  }
  const ll = p - 0xf7
  const len = readBigEndian(buf, off + 1, ll)
  return {
    val: buf.subarray(off + 1 + ll, off + 1 + ll + len),
    isList: true,
    next: off + 1 + ll + len,
  }
}

function readBigEndian(buf: Uint8Array, off: number, len: number): number {
  let n = 0
  for (let i = 0; i < len; i++) n = n * 256 + buf[off + i]
  return n
}

function bytesToHex(b: Uint8Array): string {
  let s = ""
  for (let i = 0; i < b.length; i++) s += b[i].toString(16).padStart(2, "0")
  return s
}

/**
 * Decode an ENR string. Returns null if the input doesn't parse — callers
 * should treat unparseable records as transient noise rather than fail loudly.
 */
export function decodeEnr(enrText: string): DecodedEnr | null {
  try {
    const trimmed = enrText.trim()
    if (!trimmed.startsWith("enr:")) return null
    const buf = base64UrlDecode(trimmed.slice(4))
    const top = rlpDecodeItem(buf, 0)
    if (!top.isList) return null

    const items: Uint8Array[] = []
    let off = 0
    while (off < top.val.length) {
      const it = rlpDecodeItem(top.val, off)
      items.push(it.val)
      off = it.next
    }
    // items[0] = signature, items[1] = seq, then alternating key/value pairs.
    if (items.length < 4 || (items.length - 2) % 2 !== 0) return null

    const kv: Record<string, Uint8Array> = {}
    for (let i = 2; i < items.length; i += 2) {
      const key = new TextDecoder().decode(items[i])
      kv[key] = items[i + 1]
    }

    let ip: string | null = null
    if (kv.ip && kv.ip.length === 4) {
      ip = `${kv.ip[0]}.${kv.ip[1]}.${kv.ip[2]}.${kv.ip[3]}`
    }

    const tcp = kv.tcp && kv.tcp.length > 0 ? readBigEndian(kv.tcp, 0, kv.tcp.length) : null
    const udp = kv.udp && kv.udp.length > 0 ? readBigEndian(kv.udp, 0, kv.udp.length) : null

    // Stable id derived from the secp256k1 pubkey. We don't compute the
    // canonical EIP-778 keccak256 node id because (a) we don't need it for
    // display and (b) avoiding a hash dep keeps this file dependency-free.
    const pub = kv.secp256k1
    const id = pub ? bytesToHex(pub).slice(0, 16) : bytesToHex(items[0]).slice(0, 16)

    return { id, ip, tcp, udp, kv }
  } catch {
    return null
  }
}
