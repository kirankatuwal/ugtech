import { createFileRoute } from "@tanstack/react-router";
import { Camera, Lock, Network, Boxes } from "lucide-react";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — UG Technology Store" },
      { name: "description", content: "CCTV installation, door locking systems, network solutions, and wholesale supply in Hetauda, Nepal." },
    ],
  }),
  component: Services,
});

const services = [
  { icon: Camera, title: "CCTV Camera Installation", desc: "Professional installation of HD & IP cameras for homes, shops, and offices. Genuine Dahua and premium brand products." },
  { icon: Lock, title: "Door Locking Systems", desc: "Biometric, RFID, and smart digital locks with on-site setup. Secure your premises with modern access control." },
  { icon: Network, title: "Network Solutions", desc: "Structured cabling, Wi-Fi, routers, and switches. Reliable connectivity for small to large premises." },
  { icon: Boxes, title: "Wholesale Supply", desc: "Authorized Dahua wholesaler with bulk pricing for resellers, integrators, and contractors across Nepal." },
];

function Services() {
  return (
    <Layout>
      <section className="bg-[var(--brand-navy)] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Our Services</h1>
          <p className="mt-4 max-w-2xl text-white/80">End-to-end security and connectivity solutions delivered by experienced technicians.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          {services.map((s) => (
            <div key={s.title} className="rounded-xl border bg-card p-8 shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-elegant)]">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]">
                <s.icon className="h-7 w-7" />
              </div>
              <h2 className="mt-6 text-xl font-bold text-foreground">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
