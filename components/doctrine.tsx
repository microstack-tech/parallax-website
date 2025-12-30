import Link from "next/link"
import {
  BookText,
  ScrollText,
  ExternalLink,
  Mountain,
  Timer,
  Shield,
  Signature,
  Scale,
  KeyRound,
  Network,
  Eye,
  Layers,
  Ghost,
  GitBranch,
} from "lucide-react"
import MainMotion from "./main-motion"
import PageHeader from "./page-header"
import { Button } from "./ui/button"

type Axiom = {
  id: string
  title: string
  subtitle: string
  commentary: string
  Icon: React.ComponentType<{ className?: string }>
}

const AXIOMS: Axiom[] = [
  {
    id: "I",
    title: "Physical cost is the only scalable defense against revision",
    subtitle: "Any system that can be rewritten cheaply will be rewritten.",
    commentary:
      "Digital systems do not escape the physical world. Computation consumes energy, communication traverses space, and verification is bounded by hardware. Parallax anchors consensus to Proof-of-Work because it introduces an external, objective cost that cannot be simulated, voted into existence, or socially negotiated.\n\nEnergy expenditure creates asymmetry: honest participation accumulates work incrementally, while attacks require disproportionate cost. Proof-of-Work does not guarantee correctness, but it guarantees that rewriting history is expensive. In adversarial systems, expense is credibility.",
    Icon: Mountain,
  },
  {
    id: "II",
    title: "Time cannot be compressed without centralization",
    subtitle: "Global agreement requires delay. Attempts to eliminate it create advantage.",
    commentary:
      "Consensus is not computation; it is coordination. Coordination across a global network is constrained by latency, bandwidth, and verification time. These are not engineering problems to be solved away, but physical limits.\n\nSystems that minimize time-to-finality below these limits introduce hidden advantages: proximity, specialized networking, privileged ordering, or coordination mechanisms. Over time, these advantages compound into control. Parallax treats time as a stabilizing force. Finality earned slowly is more robust than finality declared quickly.",
    Icon: Timer,
  },
  {
    id: "III",
    title: "Trust that can be reassigned has not been removed",
    subtitle: "Replacing institutions with committees or validators does not eliminate trust.",
    commentary:
      "Trustlessness does not mean the absence of trust; it means the minimization of trust assumptions. Many systems merely relocate trust—from banks to validators, from institutions to governance—without removing it.\n\nParallax minimizes trust by ensuring that validity is independently verifiable, enforcement is mechanical, and correctness does not depend on identity or reputation. A system is trustless not when participants are trustworthy, but when trust is unnecessary.",
    Icon: Shield,
  },
  {
    id: "IV",
    title: "Any rule that requires interpretation will be captured",
    subtitle: "Rules must be executable without judgment.",
    commentary:
      "Interpretation introduces discretion. Discretion introduces power. If a rule requires context, intent, or explanation to be applied correctly, enforcement depends on human judgment. Judgment accumulates authority, and authority becomes a point of capture.\n\nParallax favors rules that can be evaluated deterministically. Ambiguity is not flexibility; it is deferred centralization.",
    Icon: Signature,
  },
  {
    id: "V",
    title: "Monetary rules must not respond to circumstance",
    subtitle: "Flexibility in money is discretion in disguise.",
    commentary:
      "Monetary systems fail not because rules are rigid, but because they are negotiable. Exceptions become precedents; discretion attracts influence.\n\nParallax treats monetary rules as constraints, not policies. They do not adapt to crises, sentiment, or coordination pressure. Predictability is not convenience—it is the foundation of trust minimization.",
    Icon: Scale,
  },
  {
    id: "VI",
    title: "Permission is incompatible with ownership",
    subtitle: "Access that can be revoked is not ownership.",
    commentary:
      "Ownership requires irrevocable access. If participation depends on approval, identity, or delegation, access is conditional. Conditional access implies an authority capable of revocation.\n\nParallax does not grant access. It defines constraints that anyone may satisfy. Permissionlessness is not openness; it is the absence of gatekeepers.",
    Icon: KeyRound,
  },
  {
    id: "VII",
    title: "Systems that depend on cooperation will fail under stress",
    subtitle: "Adversarial conditions are the default, not the exception.",
    commentary:
      "Parallax assumes rational self-interest, asymmetric information, and persistent incentives to cheat. Security does not emerge from goodwill, but from constraints that make misbehavior ineffective.\n\nA system that requires cooperation to remain secure is not decentralized; it is fragile.",
    Icon: Network,
  },
  {
    id: "VIII",
    title: "History must be expensive to change, not impossible to discuss",
    subtitle: "Finality emerges from cost, not decree.",
    commentary:
      "History is valuable only if it resists revision. Parallax does not claim absolute immutability; it ensures that rewriting history requires real expenditure.\n\nAbsolute immutability is brittle. Cost-based immutability scales. Finality accumulates through work.",
    Icon: Eye,
  },
  {
    id: "IX",
    title: "The base layer exists to settle, not to impress",
    subtitle: "Complexity belongs above settlement.",
    commentary:
      "The base layer establishes ordering and finality. Attempting to maximize throughput or expressiveness at this layer increases complexity and attack surface.\n\nParallax confines experimentation to higher layers, where failure does not threaten settlement integrity. The base layer remains slow, conservative, and difficult to change by design.",
    Icon: Layers,
  },
  {
    id: "X",
    title: "Neutral systems must not adapt to narrative",
    subtitle: "Preference is a form of capture.",
    commentary:
      "Neutrality is not a moral stance; it is an architectural requirement. Parallax applies the same rules regardless of participant, transaction, or context.\n\nSystems that adapt to political, social, or economic narratives introduce discretion. Discretion is the root of capture.",
    Icon: ScrollText,
  },
  {
    id: "XI",
    title: "Hidden failure modes compound silently",
    subtitle: "What cannot be observed cannot be corrected.",
    commentary:
      "Systems that obscure trade-offs, abstract costs, or mask fragility accumulate hidden risk. Failure compounds until collapse.\n\nParallax favors explicit costs, visible attacks, and acknowledged limitations. Transparency is not optimism; it is resilience.",
    Icon: BookText,
  },
  {
    id: "XII",
    title: "The protocol must outlive its creators",
    subtitle: "No individual or organization is required for validity.",
    commentary:
      "Parallax must remain correct even if its creators disappear, disagree, or are forgotten. Intent does not matter. Authority does not matter.\n\nOnly validity matters. A system that requires stewardship to survive is not neutral infrastructure.",
    Icon: GitBranch,
  },
  {
    id: "XIII",
    title: "Infrastructure succeeds by becoming invisible",
    subtitle: "Longevity, not adoption, is the measure of success.",
    commentary:
      "Parallax is not designed to attract attention, optimize engagement, or chase relevance. Its purpose is to persist.\n\nLongevity requires restraint. Restraint requires constraint. Infrastructure succeeds when it fades into the background.",
    Icon: Ghost,
  },
]

function Paragraphs({ text }: { text: string }) {
  return (
    <div className="space-y-4">
      {text.split("\n\n").map((p, i) => (
        <p key={i} className="text-sm leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  )
}

export function Doctrine() {
  return (
    <>
      <MainMotion>
        <PageHeader
          title="The Parallax Doctrine"
          subTitle="Axioms and commentary defining the constraints under which Parallax exists, independent of adoption, relevance or success."
        />
        <section className="flex flex-col gap-4 bg-card ring-4 max-w-7xl ring-muted/10 rounded-md font-sans text-foreground/90 border px-8 py-12 mx-auto items-start">
          <div className="mx-auto">
            <header className="text-center">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button variant={"secondary"} asChild>
                  <Link
                    href="https://github.com/ParallaxProtocol/parallax-doctrine"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink className="size-4" />
                    Canonical source
                  </Link>
                </Button>

                <Button variant={"secondary"} asChild>
                  <Link
                    href="https://github.com/ParallaxProtocol/parallax-doctrine/blob/main/AXIOMS.md"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ScrollText className="size-4" />
                    Axioms
                  </Link>
                </Button>

                <Button variant={"secondary"} asChild>
                  <Link
                    href="https://github.com/ParallaxProtocol/parallax-doctrine/blob/main/COMMENTARY.md"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BookText className="size-4" />
                    Commentary
                  </Link>
                </Button>
              </div>
            </header>

            <div className="mt-12 border-t" />

            <section className="mt-12 space-y-10">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Axioms and Commentary for Durable Settlement</h3>
                <p className="text-base italic leading-relaxed">
                  December 2025<br />
                  By the Parallax contributors
                </p>
                <p className="text-base leading-relaxed">
                  Inspired by the axiomatic style of <span className="italic">The Zurich Axioms</span>, this document defines the non-negotiable constraints under which Parallax exists, followed by commentary explaining their necessity.
                </p>
                <p className="text-base leading-relaxed">
                  The axioms are declarative and immutable.<br />
                  The commentary is explanatory and non-authoritative.
                </p>
                <p className="text-base leading-relaxed">
                  If commentary and axiom ever diverge, the axiom prevails.
                </p>
              </div>

              <div className="mt-12 border-t" />

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Purpose</h3>
                <p className="text-base leading-relaxed">
                  The Parallax Doctrine exists to make explicit the principles that must remain true regardless of adoption, relevance, or success.
                </p>
                <p className="text-base leading-relaxed">
                  It does not argue.<br />
                  It does not persuade.<br />
                  It does not promise outcomes.
                </p>
                <p className="text-base leading-relaxed">
                  It defines the conditions under which correctness is preserved in adversarial environments.
                </p>
              </div>

              <div className="mt-12 border-t" />

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">On Scope and Intent</h3>
                <p className="text-base leading-relaxed">
                  Parallax does not assume success. It does not presume adoption, relevance, or
                  dominance. It does not define a destiny, roadmap, or outcome.
                </p>
                <p className="text-base leading-relaxed">
                  This doctrine exists to state the conditions under which correctness is preserved
                  regardless of whether Parallax succeeds or fails.
                </p>
                <p className="text-base leading-relaxed">
                  A system that believes it is meant to win will eventually justify intervention to
                  avoid losing. Parallax rejects this premise.
                </p>
              </div>

              <div className="mt-12 border-t" />

              <div className="space-y-12">
                {AXIOMS.map(({ id, title, subtitle, commentary }) => (
                  <article key={id} className="scroll-mt-24" id={`axiom-${id}`}>
                    <div className="flex items-start gap-4">
                      <div className="min-w-0">
                        <h4 className="text-xl font-semibold leading-snug text-foreground">
                          <span>Axiom {id} — </span>
                          {title}
                        </h4>

                        <p className="mt-3 text-base text-foreground/90 leading-relaxed">{subtitle}</p>

                        <div className="mt-6 border p-6 bg-popover">
                          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <span className="inline-flex size-6 items-center justify-center bg-muted/30">
                              <ScrollText className="size-4" />
                            </span>
                            Commentary
                          </div>
                          <div className="mt-3 text-foreground/80">
                            <Paragraphs text={commentary} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 border-t" />
                  </article>
                ))}
              </div>

              <div className="space-y-4 pt-2">
                <h3 className="text-xl font-semibold text-foreground">Closing</h3>

                <p className="text-base leading-relaxed">
                  Parallax does not ask to be believed.
                </p>

                <p className="text-base leading-relaxed">
                  If any axiom is false, Parallax will fail — and that failure is acceptable.
                </p>

                <p className="text-base leading-relaxed">
                  Reality is the arbiter. <br />
                  Cost is the signal. <br />
                  Time is the filter.
                </p>

                <p className="text-base leading-relaxed">
                  Parallax is not designed to be liked, upgraded, or governed — only to remain correct.
                </p>
              </div>
            </section>
          </div>
        </section>
      </MainMotion>
    </>
  )
}
