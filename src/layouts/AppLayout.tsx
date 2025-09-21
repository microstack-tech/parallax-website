import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      <Navigation />
      <main className="mt-16 min-h-screen bg-background">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
