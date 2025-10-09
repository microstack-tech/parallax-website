import GridView from "@/components/grid-view"
import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { BookOpen, Code, Heart, Megaphone, Pickaxe, Radio, Server, SquareTerminal, Waypoints } from "lucide-react"

const topics = [
  {
    icon: Heart,
    title: "Using Parallax",
    description: "The simplest way to support the network is to use it. Send and receive transactions, explore dApps, and treat Parallax like real money. Every interaction strengthens the ecosystem and builds trust in the protocol."
  },
  {
    icon: Waypoints,
    title: "Be the network",
    description: "Help secure and decentralize Parallax by running a full node. By doing so, you contribute to verifying blocks, propagating transactions, and ensuring the network remains censorship-resistant and resilient. Make sure to open port 32110 TPC/UDP in your router and firewall so that other nodes can connect to you!"
  },
  {
    icon: Pickaxe,
    title: "Mining",
    description: "Join as a miner and provide the computing power that secures Parallax. Mining protects the network, distributes new coins, and gives you a direct stake in its growth and security."
  },
  {
    icon: Code,
    title: "Development",
    description: "Contribute to the open-source codebase. Whether it’s core protocol improvements, tooling, or dApp development, your skills can shape the future of Parallax. We welcome contributions in Go, TypeScript, and beyond."
  },
  {
    icon: Megaphone,
    title: "Spread",
    description: "Tell people about Parallax. Share articles, make videos, write posts, or host discussions. The more people know about Parallax, the stronger the community becomes."
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Good documentation empowers new users and developers. Help us write, translate, and improve guides so anyone can learn how to run nodes, mine, or build on Parallax with ease."
  },
  {
    icon: Radio,
    title: "Meet the communities",
    description: "Parallax thrives on community. Join our forums, Telegram, and social channels to connect with others, exchange knowledge, and coordinate initiatives that strengthen the ecosystem."
  },
  {
    icon: SquareTerminal,
    title: "Run a bootnode",
    description: "Bootnodes are entry points for new participants joining the network. By operating one, you help ensure stable connectivity and contribute to the health of the peer-to-peer layer."
  },
  {
    icon: Server,
    title: "Run a public RPC",
    description: "Public RPC endpoints make Parallax accessible to developers, wallets, and applications. Hosting one helps the ecosystem grow by lowering the barrier to entry for anyone building on Parallax."
  },
]

export default function ParallaxForIndividuals() {
  return (
    <MainMotion>
      <PageHeader
        title="Support Parallax"
        subTitle="Parallax was born from a small community and it is still in its infancy phase. There are lots of things you can do to support it and help others learns more"
      />
      <GridView
        items={topics}
      />
    </MainMotion>
  )
}
