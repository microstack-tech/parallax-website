export type Continent = "north-america" | "europe" | "asia" | "south-america" | "africa" | "oceania" | "international"
type Continents = Array<{ id: Continent, name: string }>

export interface Exchange {
  name: string
  url: string
  location: Array<Continent>
}

export const continents: Continents = [
  { id: "international", name: "International" },
  { id: "north-america", name: "North America" },
  { id: "europe", name: "Europe" },
  { id: "asia", name: "Asia" },
  { id: "south-america", name: "South America" },
  { id: "africa", name: "Africa" },
  { id: "oceania", name: "Oceania" },
]

export const exchanges: Exchange[] = [
  {
    name: "Rabid Rabbit",
    url: "https://rabid-rabbit.org/account/trade/LAX-USDT",
    location: ['international'],
  },
  {
    name: "BITGoGet",
    url: "https://bitgoget.com/crypto/detail/lax",
    location: ['asia', 'international'],
  },
  {
    name: "Exbitron",
    url: "https://app.exbitron.com/exchange/?market=LAX-USDT",
    location: ['international'],
  },
  {
    name: "SafeTrade",
    url: "https://safetrade.com/exchange/LAX-USDT",
    location: ['international'],
  },
]

