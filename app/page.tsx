'use client'
import Client from "@/components/client";
import { Community } from "@/components/community";
import { Documentation } from "@/components/documentation";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Technologies } from "@/components/technologies";
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
        <Features />
        <Technologies />
        <Client />
        <Documentation />
        <Community />
      </motion.div>
    </>
  );
}
