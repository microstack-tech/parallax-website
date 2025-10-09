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
        <h2 className="text-4xl text-foreground sm:text-5xl">{title}</h2>
        {subTitle && (
          <p className="text-xl text-muted-foreground max-w-2xl text-pretty">
            {subTitle}
          </p>
        )}
        {children}
      </div>
    </div>

  )
}
