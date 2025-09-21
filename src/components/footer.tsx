export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Parallax</span>
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">
            A timechain protocol that unites Bitcoin's immutability and monetary discipline with Ethereum's
            programmability. Fair launch, no premine, community-driven.
          </p>

          <div className="border-t border-border pt-6">
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
