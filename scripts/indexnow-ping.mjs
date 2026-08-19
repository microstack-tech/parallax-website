/**
 * Submit URLs to IndexNow (Bing, Yandex, Naver, Seznam) so new and changed
 * pages are picked up without waiting for a crawl.
 *
 * Usage:
 *   node scripts/indexnow-ping.mjs                 # submit every URL in the live sitemap
 *   node scripts/indexnow-ping.mjs <url> [<url>…]  # submit specific URLs (e.g. a new post)
 *
 * Run after a deploy, not before: IndexNow validates the key file and may
 * fetch submitted URLs immediately, so they must already be live.
 *
 * The key is public by design — engines verify ownership by fetching the
 * matching key file from the site root (public/<key>.txt).
 */

const HOST = "parallaxprotocol.org"
const KEY = "f08a665e2d8726c543f4961fb0348563"
const ENDPOINT = "https://api.indexnow.org/indexnow"
const BATCH_SIZE = 10_000 // protocol maximum per submission

async function urlsFromSitemap() {
  const res = await fetch(`https://${HOST}/sitemap.xml`)
  if (!res.ok) throw new Error(`Failed to fetch sitemap: HTTP ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
}

const args = process.argv.slice(2)
const urls = args.length > 0 ? args : await urlsFromSitemap()

const bad = urls.filter((u) => !u.startsWith(`https://${HOST}/`))
if (bad.length > 0) {
  console.error(`Refusing to submit URLs outside https://${HOST}/:\n  ${bad.join("\n  ")}`)
  process.exit(1)
}

for (let i = 0; i < urls.length; i += BATCH_SIZE) {
  const batch = urls.slice(i, i + BATCH_SIZE)
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: batch,
    }),
  })
  // 200 = submitted, 202 = accepted (key not yet verified) — both fine.
  if (res.status !== 200 && res.status !== 202) {
    console.error(`IndexNow rejected the submission: HTTP ${res.status} ${await res.text()}`)
    process.exit(1)
  }
  console.log(`Submitted ${batch.length} URL(s) (HTTP ${res.status})`)
}
