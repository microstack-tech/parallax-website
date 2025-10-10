import Image from 'next/image'

export function Footer() {
  return (
    <footer className="relative mt-8 bg-black w-full">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <div className="text-center">
          <h3 className="text-4xl font-bold text-foreground mb-4">
            <span className="inline-flex items-center gap-2 font-sans">
              <Image
                src="/parallax_logo_dark.svg"
                className="h-10 w-auto"
                alt="Parallax logo"
                width={200}
                height={200}
              />
              Parallax
            </span>
          </h3>

          <div className="pt-6">
            <p className="text-sm text-muted-foreground">© Parallax Project 2025 Released under LGPL-3.0 license.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
