export default function PageHeader({
  title,
  subTitle,
}: {
  title: string,
  subTitle?: string,
}) {
  return (
    <div className="relative mt-16 py-24 px-4 md:px-0 border-b border-t text-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="flex flex-col gap-8 max-w-4xl items-center mx-auto">
        <h2 className="text-3xl tracking-tight text-foreground sm:text-4xl">{title}</h2>
        {subTitle && (
          <p className="text-xl text-muted-foreground max-w-2xl text-pretty">
            {subTitle}
          </p>
        )}
      </div>
    </div>

  )
}
