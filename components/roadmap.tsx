import { CheckCircle, Circle } from "lucide-react"

interface RoadmapItem {
  title: string
  description: string
  completed: boolean
  quarter: string
}

const roadmapItems: RoadmapItem[] = [
  {
    title: "Whitepaper Publication",
    description: "Release comprehensive whitepaper detailing Parallax protocol design and vision",
    completed: true,
    quarter: "13th Sep, 2025",
  },
  {
    title: "Testnet Launch",
    description: "Deploy Parallax testnet for community testing and validation",
    completed: true,
    quarter: "16 Sep, 2025",
  },
  {
    title: "Mainnet Launch",
    description: "Launch Parallax mainnet with fair distribution and full functionality",
    completed: false,
    quarter: "28th Oct, 2025",
  },
]

export function Roadmap() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Road to Launch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our journey to build the future of programmable cash
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {roadmapItems.map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
                    {item.completed ? (
                      <CheckCircle className="w-6 h-6 text-blue-400 bg-background" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground bg-background" />
                    )}
                  </div>

                  <div className="md:flex">
                    {/* Mobile layout */}
                    <div className="md:hidden pl-12">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">{item.quarter}</span>
                        <h3
                          className={`text-xl ${item.completed ? "text-blue-400" : "text-foreground"}`}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-pretty">{item.description}</p>
                    </div>

                    {/* Desktop alternating layout */}
                    <div className="hidden md:flex w-full">
                      {index % 2 === 0 ? (
                        // Left side content
                        <>
                          <div className="w-1/2 pr-8 text-right">
                            <div className="flex items-center justify-end gap-4 mb-2">
                              <h3
                                className={`text-xl ${item.completed ? "text-blue-400" : "text-foreground"}`}
                              >
                                {item.title}
                              </h3>
                              <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                                {item.quarter}
                              </span>
                            </div>
                            <p className="text-muted-foreground text-pretty">{item.description}</p>
                          </div>
                          <div className="w-1/2"></div>
                        </>
                      ) : (
                        // Right side content
                        <>
                          <div className="w-1/2"></div>
                          <div className="w-1/2 pl-8 text-left">
                            <div className="flex items-center justify-start gap-4 mb-2">
                              <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                                {item.quarter}
                              </span>
                              <h3
                                className={`text-xl ${item.completed ? "text-blue-400" : "text-foreground"}`}
                              >
                                {item.title}
                              </h3>
                            </div>
                            <p className="text-muted-foreground text-pretty">{item.description}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
