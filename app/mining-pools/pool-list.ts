export type Continent = "north-america" | "europe" | "asia" | "south-america" | "africa" | "oceania"
type Continents = Array<{ id: Continent, name: string }>

type PoolCapability = 'PPLNS' | 'SOLO'
type PoolProtocol = 'stratum1+tcp' | ''

export interface Pool {
  name: string
  url: string
  location: Array<Continent>
  capabilities: Array<PoolCapability>
  protocols: Array<PoolProtocol>
}

export const continents: Continents = [
  { id: "north-america", name: "North America" },
  { id: "europe", name: "Europe" },
  { id: "asia", name: "Asia" },
  { id: "south-america", name: "South America" },
  { id: "africa", name: "Africa" },
  { id: "oceania", name: "Oceania" },
]

export const pools: Pool[] = [
  {
    name: "COOLPOOL.Top",
    url: "https://coolpool.top/pool/prlx",
    location: ['north-america', 'europe', 'asia'],
    capabilities: ['PPLNS', 'SOLO'],
    protocols: ['stratum1+tcp'],
  },
  {
    name: "Rplant Pool",
    url: "https://pool.rplant.xyz/#parallax",
    location: ['north-america', 'europe', 'asia'],
    capabilities: ['PPLNS', 'SOLO'],
    protocols: ['stratum1+tcp'],
  },
  {
    name: "LuckyPool",
    url: "https://parallax.luckypool.io/",
    location: ['europe'],
    capabilities: ['PPLNS', 'SOLO'],
    protocols: ['stratum1+tcp'],
  },
]

