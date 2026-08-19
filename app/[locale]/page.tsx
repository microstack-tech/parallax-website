'use client'
import { AudienceRouter } from "@/components/audience-router";
import Client from "@/components/client";
import { Community } from "@/components/community";
import { Documentation } from "@/components/documentation";
import { GenesisProof } from "@/components/genesis-proof";
import { Hero } from "@/components/hero";
import { Parallax } from "@/components/parallax";
import { NetworkStats } from "@/components/network-stats";
import { SoundMoney } from "@/components/sound-money";
import { motion } from "framer-motion";
import { Hairline } from "@/components/fade-in";

function SectionDivider() {
  return <Hairline />
}

export default function Home() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-0 overflow-x-hidden"
      >
        <Hero />
        <NetworkStats />
        <SectionDivider />
        <GenesisProof />
        <SectionDivider />
        <AudienceRouter />
        <SectionDivider />
        <Parallax />
        <SectionDivider />
        <SoundMoney />
        <SectionDivider />
        <Client />
        <SectionDivider />
        <Documentation />
        <SectionDivider />
        <Community />
      </motion.div>
    </>
  );
}
