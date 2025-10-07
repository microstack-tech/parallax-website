import Client from "@/components/client";
import { Community } from "@/components/community";
import { Documentation } from "@/components/documentation";
import { Hero } from "@/components/hero";
import { Technologies } from "@/components/technologies";

export default function Home() {
  return (
    <>
      <Hero />
      <Technologies />
      <Client />
      <Documentation />
      <Community />
    </>
  );
}
