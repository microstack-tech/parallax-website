import GridView from "@/components/grid-view";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { BookOpen, Boxes, LayoutGrid, PackagePlus, Users } from "lucide-react";
import Link from "next/link";

const topics = [
  {
    icon: LayoutGrid,
    title: "Build smart contracts and dApps",
    description: "Leverage the Parallax EVM to create decentralized applications, automate payments, and unlock new financial primitives."
  },
  {
    icon: Boxes,
    title: "Contribute to protocol development",
    description: "Help improve the Parallax protocol itself—security, scalability, and new features. All contributions are welcome!"
  },
  {
    icon: PackagePlus,
    title: "Integrate Parallax into your projects",
    description: "Connect your apps, wallets, or services to Parallax. Use our APIs and libraries to bring programmable cash to your users."
  },
  {
    icon: BookOpen,
    title: "Help improve documentation and guides",
    description: "Write guides, tutorials, and documentation to help others learn and build. Make Parallax accessible to everyone."
  },
  {
    icon: Users,
    title: "Join community discussions",
    description: "Share ideas, ask questions, and collaborate with other developers in our forums, and GitHub discussions."
  },
]

export default function DevelopersPage() {
  return (
    <>
      <PageHeader
        title="Developers"
        subTitle="Parallax is fully open source and welcomes contributions from developers of all backgrounds"
      />
      <GridView
        items={topics}
      />
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mx-auto mb-16">
        <Button className="font-medium text-md p-10 w-fit" asChild>
          <Link href={"https://github.com/microstack-tech"} target="_blank">
            Explore our GitHub
          </Link>
        </Button>
        <Button className="font-medium text-md p-10 w-fit" variant={"outline"} asChild>
          <Link href={"/resources/technical-documentation"}>
            Read Documentation
          </Link>
        </Button>
      </div>
    </>
  );
}
