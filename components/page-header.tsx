/* Server component on purpose: the entrances run as CSS animations (see
   "Entrance animations" in globals.css) so the title — usually the page's
   LCP element — paints without waiting for hydration. */
export default function PageHeader({
  title,
  subTitle,
  children,
}: {
  title: string,
  subTitle?: string,
  children?: React.ReactNode,
}) {
  return (
    <div className="relative mt-24 py-23.5 px-4 md:px-0 text-center">
      <div className="flex flex-col gap-8 max-w-4xl items-center mx-auto">
        {/* Brand accent rule */}
        <div className="w-12 h-0.5 brand-gradient enter-scale-x" />
        <h2 className="text-4xl text-foreground sm:text-5xl enter-fade-up" style={{ "--enter-delay": "0.1s" } as React.CSSProperties}>
          {title}
        </h2>
        {subTitle && (
          <p className="text-xl text-muted-foreground max-w-2xl text-pretty enter-fade-up" style={{ "--enter-delay": "0.25s" } as React.CSSProperties}>
            {subTitle}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}
