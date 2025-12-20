'use client'
import Client from "@/components/client";
import { Community } from "@/components/community";
import { Documentation } from "@/components/documentation";
import { Hero } from "@/components/hero";
import { Parallax } from "@/components/parallax";
import { SoundMoney } from "@/components/sound-money";
import { UseCases } from "@/components/use-cases";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-0"
      >
        <Hero />
        <UseCases />
        <Parallax />
        <SoundMoney />
        <Client />
        <Documentation />
        <Community />
      </motion.div>
    </>
  );
}
