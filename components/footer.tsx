import Image from 'next/image'

export function Footer() {
  return (
    <footer className="relative mt-8 border-t border-border">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="text-center">
          <h3 className="text-4xl font-bold text-foreground mb-4">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              <Image
                src="/parallax_logo_color.svg"
                className="h-10 w-auto"
                alt="Parallax logo"
                width={200}
                height={200}
              />
              Parallax
            </span>
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">
            {`A timechain protocol that unites Bitcoin's immutability and monetary discipline with Ethereum's
            programmability. Fair launch, no premine, community-driven.`}
          </p>

          <div className="pt-6">
            <p className="text-xs text-muted-foreground">© 2025 Parallax Protocol. Open source and community-driven.</p>
            <p className="text-xs text-muted-foreground mt-2">
              {"Built with Bitcoin's ethos, powered by Ethereum's innovation."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
