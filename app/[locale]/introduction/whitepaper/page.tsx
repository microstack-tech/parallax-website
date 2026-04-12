"use client";

import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { FaGithub } from "react-icons/fa";

type ParamRow = { param: string; value: string };
type CompareRow = { feature: string; bitcoin: string; ethereum: string; parallax: string };
type ReleaseItem = { title: string; body: string };

export default function WhitepaperPage() {
  const t = useTranslations("introduction.whitepaper");
  const paramRows = t.raw("sections.parameters.rows") as ParamRow[];
  const compareRows = t.raw("sections.comparative.table.rows") as CompareRow[];
  const releaseItems = t.raw("sections.release.items") as ReleaseItem[];

  return (
    <MainMotion>
      <PageHeader
        title={t("pageTitle")}
      />
      <main className="py-8 min-h-screen bg-background">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="flex flex-row justify-end max-w-7xl w-full pb-8 mx-auto">
            <Button variant={'outline'} asChild>
              <a href="https://github.com/ParallaxProtocol/parallax-whitepaper" target="_blank" rel="noopener noreferrer">
                <FaGithub />
                {t("viewOnGithub")}
              </a>
            </Button>
          </div>
          <div className="flex flex-col gap-4 bg-card ring-4 max-w-7xl ring-muted/10 rounded-md font-sans text-foreground/90 border px-8 py-12 mx-auto items-start">
            <h2 className="border-b pb-2 text-3xl w-full font-semibold first:mt-0">
              {t("sections.abstract.heading")}
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.abstract.body")}
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold first:mt-0">
              {t("sections.introduction.heading")}
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.introduction.body1")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.introduction.body2")}
            </p>

            <h2 className="border-b pb-2 text-3xl w-full font-semibold first:mt-0">
              {t("sections.motivation.heading")}
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.motivation.body1")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.motivation.body2")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.motivation.body3")}
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold first:mt-0">
              {t("sections.parameters.heading")}
            </h2>
            <div className="my-6 w-full overflow-visible">
              <table className="w-full">
                <thead>
                  <tr className="even:bg-muted/40 m-0 border-t p-0">
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                      {t("sections.parameters.columns.parameter")}
                    </th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                      {t("sections.parameters.columns.value")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paramRows.map((row, i) => (
                    <tr key={i} className="even:bg-muted/20 m-0 border-t p-0">
                      <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        {row.param}
                      </td>
                      <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold first:mt-0">
              {t("sections.comparative.heading")}
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.comparative.body1")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.comparative.body2")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.comparative.body3")}
            </p>
            <div className="my-6 w-full overflow-x-scroll">
              <table className="w-full">
                <thead>
                  <tr className="even:bg-muted/40 m-0 border-t p-0">
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                      {t("sections.comparative.table.columns.feature")}
                    </th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                      {t("sections.comparative.table.columns.bitcoin")}
                    </th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                      {t("sections.comparative.table.columns.ethereum")}
                    </th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                      {t("sections.comparative.table.columns.parallax")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr key={i} className="even:bg-muted/20 m-0 border-t p-0">
                      <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        {row.feature}
                      </td>
                      <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        {row.bitcoin}
                      </td>
                      <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        {row.ethereum}
                      </td>
                      <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        {row.parallax}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold first:mt-0">
              {t("sections.genesis.heading")}
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.genesis.body1")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.genesis.body2")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.genesis.body3")}
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold first:mt-0">
              {t("sections.consensus.heading")}
            </h2>
            <h3 className="pt-4 scroll-m-20 text-2xl font-semibold">
              {t("sections.consensus.blockStructure.heading")}
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.consensus.blockStructure.body")}
            </p>
            <h3 className="pt-4 scroll-m-20 text-2xl font-semibold">
              {t("sections.consensus.pow.heading")}
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.consensus.pow.body1Before")}
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                n
              </code>
              {t("sections.consensus.pow.body1After")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {`XHash(block_header, n) < T`}
              </code>
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.consensus.pow.body2Where")}
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {`T`}
              </code>
              {t("sections.consensus.pow.body2Target")}
            </p>
            <h3 className="pt-4 scroll-m-20 text-2xl font-semibold">
              {t("sections.consensus.interval.heading")}
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.consensus.interval.body1")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {`T_new = clamp( T_old * (t_actual / t_expected), T_old / 4, T_old * 4 )`}
              </code>
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.consensus.interval.whereLabel")}
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {`T_old = ${t("sections.consensus.interval.oldTargetDesc")}`}
              </code>,
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {`t_actual = ${t("sections.consensus.interval.actualTimeDesc")}`}
              </code> {t("sections.consensus.interval.andLabel")}
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {`t_expected = ${t("sections.consensus.interval.expectedTimeDesc")}`}
              </code>.
            </p>
            <h3 className="pt-4 scroll-m-20 text-2xl font-semibold">
              {t("sections.consensus.emission.heading")}
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.consensus.emission.intro")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {`R(h) = 50 / 2^( floor(h / 210000) )`}
              </code>.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.consensus.emission.whereLabel")}
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {`h`}
              </code>.
              {t("sections.consensus.emission.heightDesc")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {`lim h→∞ S(h) = 21,000,000`}
              </code>.
            </p>
            <h3 className="pt-4 scroll-m-20 text-2xl font-semibold">
              {t("sections.consensus.maturity.heading")}
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.consensus.maturity.body")}
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold first:mt-0">
              {t("sections.execution.heading")}
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.execution.body1")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.execution.body2")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.execution.body3")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.execution.body4")}
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold first:mt-0">
              {t("sections.tokenomics.heading")}
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.tokenomics.body")}
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold first:mt-0">
              {t("sections.security.heading")}
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.security.body1")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.security.body2")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.security.body3")}
            </p>
            <h3 className="pt-4 scroll-m-20 text-2xl font-semibold">
              {t("sections.security.energy.heading")}
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.security.energy.body1")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.security.energy.body2")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.security.energy.body3")}
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold first:mt-0">
              {t("sections.useCases.heading")}
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.useCases.body1")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.useCases.body2")}
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold first:mt-0">
              {t("sections.governance.heading")}
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.governance.body1")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.governance.body2")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.governance.body3")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.governance.body4")}
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold first:mt-0">
              {t("sections.powPrimacy.heading")}
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.powPrimacy.body1")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.powPrimacy.body2")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.powPrimacy.body3")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.powPrimacy.body4")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.powPrimacy.body5")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.powPrimacy.body6")}
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold first:mt-0">
              {t("sections.conclusion.heading")}
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.conclusion.body")}
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold first:mt-0">
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.release.intro")}
            </p>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              {releaseItems.map((item, i) => (
                <li key={i}><strong>{item.title}</strong><br /> {item.body}</li>
              ))}
            </ul>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.release.outro1")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.release.outro2")}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {t("sections.release.outro3")}
            </p>
          </div>
        </div>
      </main>
    </MainMotion>
  );
}
