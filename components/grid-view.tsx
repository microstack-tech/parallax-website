'use client'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FadeIn } from "./fade-in";

export interface GridViewItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any,
  title: string,
  description: string,
}

export default function GridView({ items }: { items: GridViewItem[] }) {
  return (
    <section className="relative py-16 bg-transparent z-10">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-0">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.05}>
              <Card className="h-full">
                <CardHeader className="flex justify-start items-center gap-4">
                  <item.icon className="size-6 text-brand" />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {item.description}
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
