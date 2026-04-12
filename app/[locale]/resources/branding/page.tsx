import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const LOGO_ASSETS = [
  {
    files: [
      { type: "SVG", path: "/new_parallax_logo_square.svg" },
      { type: "PNG", path: "/new_parallax_logo_square.svg", png: true },
    ],
    preview: "/new_parallax_logo_square.svg",
  },
  {
    files: [
      { type: "SVG", path: "/new_parallax_logo_square_white.svg" },
      { type: "PNG", path: "/new_parallax_logo_square_white.svg", png: true },
    ],
    preview: "/new_parallax_logo_square_white.svg",
  },
  {
    files: [
      { type: "SVG", path: "/new_parallax_logo_rounded.svg" },
      { type: "PNG", path: "/new_parallax_logo_rounded.svg", png: true },
    ],
    preview: "/new_parallax_logo_rounded.svg",
  },
  {
    files: [
      { type: "SVG", path: "/new_parallax_logo_rounded_white.svg" },
      { type: "PNG", path: "/new_parallax_logo_rounded_white.svg", png: true },
    ],
    preview: "/new_parallax_logo_rounded_white.svg",
  },
  {
    files: [
      { type: "SVG", path: "/new_parallax_logo_transparent.svg" },
      { type: "PNG", path: "/new_parallax_logo_transparent.svg", png: true },
    ],
    preview: "/new_parallax_logo_transparent.svg",
  },
];

function getPngPath(svgPath: string) {
  // Replace .svg with .png for PNG download links
  return svgPath.replace(/\.svg$/, ".png");
}

export default async function BrandingPage() {
  const t = await getTranslations("resources.branding");
  const names = t.raw("logos") as Array<{ name: string }>;

  return (
    <MainMotion>
      <PageHeader
        title={t("title")}
        subTitle={t("subtitle")}
      />
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {LOGO_ASSETS.map((logo, i) => {
            const name = names[i]?.name ?? "";
            return (
              <Card key={`${name}_${i}`}>
                <CardHeader>
                  <CardTitle>{name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-8">
                    <Image src={logo.preview} alt={name} width={200} height={200} className="rounded p-2" />
                  </div>
                  <div className="flex gap-4 justify-center">
                    {logo.files.map((file) => (
                      <Button key={file.type} variant="outline" size="sm" asChild>
                        <a href={file.png ? getPngPath(file.path) : file.path} download>
                          <Download />
                          {file.type}
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </MainMotion>
  );
}
