import Client from "@/components/client";
import { Community } from "@/components/community";
import { Documentation } from "@/components/documentation";
import { Hero } from "@/components/hero";
import { Technologies } from "@/components/technologies";
import { Tokenomics } from "@/components/tokenomics";

export default function Home() {
  return (
    <>
      <Hero />
      <Technologies />
      <Tokenomics />
      <Client />
      <Documentation />
      <Community />
    </>
  );
}
