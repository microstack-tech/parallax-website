import Image from "next/image"

export function Parallax() {
  return (
    <section className="relative z-10 border-b px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl text-foreground sm:text-4xl">Parallax Protocol</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground">
            The open source protocol for P2P Programmable Cash System
          </p>
        </div>

        <div className="mt-14 grid items-start gap-10 sm:mt-16 lg:grid-cols-[420px_1fr] lg:gap-14">
          {/* Image */}
          <figure className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[1000/652] w-full overflow-hidden border">
              <Image
                src="/the-death-of-socrates.png"
                alt="The Death of Socrates"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="mt-3 px-1 text-sm italic text-muted-foreground text-center lg:text-left">
              The Death of Socrates — Jacques-Louis David
            </figcaption>
          </figure>

          {/* Text */}
          <div className="mx-auto max-w-prose text-justify text-base leading-relaxed text-muted-foreground sm:leading-8 lg:mx-0 lg:text-left lg:text-lg lg:leading-9">
            Parallax uses peer-to-peer technology to operate with no central authority or banks; managing transactions and the issuing of coins is carried out collectively by the network. Parallax is open-source; its design is public, nobody owns or controls Parallax and everyone can take part.
          </div>
        </div>
      </div>
    </section>
  )
}
