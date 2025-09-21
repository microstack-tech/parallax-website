import BlackHoleVisualization from "./black-hole"

export function Hero() {
  return (
    <section className="relative overflow-visible">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]" /> */}

      <div className="absolute inset-0 z-0">
        <BlackHoleVisualization />
      </div>

      <div className="relative pt-25 mx-auto pointer-events-none h-screen max-w-7xl px-6 py-16 lg:px-8 overflow-visible">
        <div className="mx-auto max-w-4xl text-center overflow-visible">
          <div className="absolute w-full z-10 left-0">
            {/* Logo/Brand */}
            <h1 className="text-6xl font-bold tracking-tight text-foreground sm:text-8xl">
              <span className="bg-gradient-to-r from-white to-white/70 p-2 bg-clip-text text-transparent"
              >Parallax</span>
            </h1>
            <div className="mb-8">
              <p className="mt-4 text-xl text-muted-foreground font-medium">A New Perspective on Programmable Cash</p>
            </div>
          </div>


          <div className="absolute w-full left-0 bottom-16 pb-0">
            {/* Main Headline */}
            <div className="mx-auto">
              <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent sm:text-5xl text-balance pb-2">
                Scarce. Decentralized.
                <br />
                <span className="bg-clip-text text-transparent">Permissionless. Programmable.</span>
              </h2>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
