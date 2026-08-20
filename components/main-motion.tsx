/* Server component on purpose: the entrance runs as a CSS animation (see
   "Entrance animations" in globals.css) so the SSR HTML paints without
   waiting for hydration. */
export default function MainMotion({ children }: { children: React.ReactNode }) {
  return <div className="enter-fade-up pb-24">{children}</div>
}
