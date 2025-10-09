import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

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
          {items.map((item) => (
            <Card key={item.title} className="border-border py-12">
              <CardHeader className="flex flex-col justify-center items-center gap-8">
                <item.icon className="h-10 w-10 text-primary" strokeWidth={1.5} />
                <CardTitle className="text-xl text-center">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-center leading-relaxed">{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

  )
}
