import { createFileRoute } from "@tanstack/react-router";
import { Camera, Lock, Network } from "lucide-react";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — UG Technology Store" },
      { name: "description", content: "Security cameras, door locks, and networking equipment in Hetauda, Nepal." },
    ],
  }),
  component: Products,
});

type Product = { name: string; desc: string };
type Category = { icon: typeof Camera; title: string; products: Product[] };

const categories: Category[] = [
  {
    icon: Camera,
    title: "Security Cameras",
    products: [
      { name: "Dahua 2MP Bullet Camera", desc: "HD outdoor camera with night vision and IP67 rating." },
      { name: "Dahua 4MP IP Dome", desc: "Indoor dome with PoE support and crisp 4MP video." },
      { name: "Dahua 8-Channel DVR", desc: "Full HD DVR with mobile app and cloud playback." },
    ],
  },
  {
    icon: Lock,
    title: "Door Locks",
    products: [
      { name: "Biometric Smart Lock", desc: "Fingerprint + PIN + RFID card access for doors." },
      { name: "Digital Keypad Lock", desc: "Reliable keypad lock for offices and apartments." },
      { name: "Electromagnetic Lock", desc: "Heavy-duty lock for access-controlled entries." },
    ],
  },
  {
    icon: Network,
    title: "Networking Equipment",
    products: [
      { name: "Gigabit PoE Switch", desc: "8-port PoE switch ideal for IP camera deployments." },
      { name: "Dual-Band Wi-Fi Router", desc: "Fast, stable Wi-Fi for homes and small offices." },
      { name: "Cat6 Network Cable", desc: "High-quality cabling for structured networks." },
    ],
  },
];

function Products() {
  return (
    <Layout>
      <section className="bg-[var(--brand-navy)] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Our Products</h1>
          <p className="mt-4 max-w-2xl text-white/80">Genuine, warranty-backed equipment from trusted brands including Dahua.</p>
        </div>
      </section>

      {categories.map((cat) => (
        <section key={cat.title} className="py-16 even:bg-secondary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]">
                <cat.icon className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{cat.title}</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cat.products.map((p) => (
                <div key={p.name} className="overflow-hidden rounded-xl border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                  <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-[var(--brand-navy)] to-[#2a5285]">
                    <cat.icon className="h-16 w-16 text-[var(--brand-orange)]/80" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground">{p.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </Layout>
  );
}
