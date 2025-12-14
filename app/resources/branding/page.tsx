import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const logos = [
  {
    name: "Parallax Logo",
    files: [
      { type: "SVG", path: "/parallax_logo_rounded.svg" },
      { type: "PNG", path: "/parallax_logo_rounded.svg", png: true },
    ],
    preview: "/parallax_logo_rounded.svg"
  },
  {
    name: "Parallax Logo",
    files: [
      { type: "SVG", path: "/parallax_logo_color.svg" },
      { type: "PNG", path: "/parallax_logo_color.svg", png: true },
    ],
    preview: "/parallax_logo_color.svg"
  },
  {
    name: "Parallax Logo",
    files: [
      { type: "SVG", path: "/parallax_logo_color_dark.svg" },
      { type: "PNG", path: "/parallax_logo_color_dark.svg", png: true },
    ],
    preview: "/parallax_logo_color_dark.svg"
  },
]

function getPngPath(svgPath: string) {
  // Replace .svg with .png for PNG download links
  return svgPath.replace(/\.svg$/, ".png");
}

export default function BrandingPage() {
  return (
    <MainMotion>
      <PageHeader
        title="Parallax Branding"
        subTitle="Download official Parallax logos for use in media, presentations, and integrations."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {logos.map((logo, i) => (
            <Card key={`${logo.name}_${i}`}>
              <CardHeader>
                <CardTitle>{logo.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-8">
                  <Image src={logo.preview} alt={logo.name} width={200} height={200} className="rounded p-2" />
                </div>
                <div className="flex gap-4 justify-center">
                  {logo.files.map((file) => (
                    <Button key={file.type} variant="outline" size="sm" asChild>
                      <Link href={file.png ? getPngPath(file.path) : file.path} download>
                        <Download />
                        {file.type}
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </MainMotion>
  );
}
