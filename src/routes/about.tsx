import { createFileRoute } from "@tanstack/react-router";
import { Award, ShieldCheck, Headphones } from "lucide-react";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — UG Technology Store" },
      { name: "description", content: "UG Technology Store: Hetauda-based authorized Dahua wholesaler delivering security and networking solutions." },
    ],
  }),
  component: About,
});

const trust = [
  { icon: Award, title: "Years of Experience", desc: "A trusted name in Hetauda's tech and security space." },
  { icon: ShieldCheck, title: "Quality Products", desc: "Only genuine, warranty-backed products from leading brands." },
  { icon: Headphones, title: "Local Support", desc: "Friendly, fast support and on-site service whenever you need us." },
];

function About() {
  return (
    <Layout>
      <section className="bg-[var(--brand-navy)] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">About UG Technology Store</h1>
          <p className="mt-4 max-w-2xl text-white/80">Helping Nepali homes and businesses stay safe and connected.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            <p>
              UG Technology Store was founded in Hetauda with one clear mission: to make modern security
              and networking technology accessible, reliable, and affordable for everyone in Nepal.
            </p>
            <p>
              From our first day, we've focused on selling only genuine equipment and pairing it with
              expert installation and honest advice. Whether it's a single CCTV camera for a home or a
              full network and surveillance rollout for a business, our team delivers the same level of
              care and craftsmanship.
            </p>
            <p className="rounded-lg border-l-4 border-[var(--brand-orange)] bg-secondary p-5 font-medium text-foreground">
              We are an authorized wholesaler of Dahua cameras — supplying genuine products with full
              warranty to retailers, integrators, and end customers across Nepal.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-foreground">Why Choose Us</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {trust.map((t) => (
              <div key={t.title} className="rounded-xl bg-card p-8 text-center shadow-[var(--shadow-card)]">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]">
                  <t.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
