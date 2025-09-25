import { Community } from "@/components/community";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Roadmap } from "@/components/roadmap";
import Sub from "@/components/sub";
import { Tokenomics } from "@/components/tokenomics";

export default function Home() {
  return (
    <>
      <Hero />
      <Sub />
      <Features />
      <Tokenomics />
      <Roadmap />
      <Community />
    </>
  );
}
