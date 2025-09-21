import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div style={{ minHeight: "100dvh", background: "#000", color: "#fff" }}>
      <Navigation />
      <main className="mt-0 bg-background">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
