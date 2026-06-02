import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MessageCircle, ShieldCheck, Camera, Lock, Network, Boxes, BadgeCheck } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { LatestBlogCarousel } from "@/components/site/LatestBlogCarousel";
import { ClientVoices } from "@/components/site/ClientVoices";
import { CONTACT } from "@/lib/contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UG Technology Store — CCTV, Door Locks & Networking in Hetauda" },
      { name: "description", content: "Authorized Dahua camera wholesaler in Hetauda, Nepal. CCTV installation, smart door locks, and networking solutions." },
      { property: "og:title", content: "UG Technology Store — Securing Your World with Smart Technology" },
      { property: "og:description", content: "CCTV, door locks & networking. Authorized Dahua wholesaler in Hetauda, Nepal." },
    ],
  }),
  component: Home,
});

const highlights = [
  { icon: Camera, title: "CCTV Cameras", desc: "Dahua & premium brand cameras for homes and businesses." },
  { icon: Lock, title: "Smart Door Locks", desc: "Biometric and digital locking systems with full installation." },
  { icon: Network, title: "Network Solutions", desc: "Reliable networking for offices, shops, and large premises." },
  { icon: Boxes, title: "Wholesale Supply", desc: "Bulk pricing for resellers, integrators, and contractors." },
];

function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,#f97316_0,transparent_40%),radial-gradient(circle_at_80%_80%,#2a5285_0,transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-orange)]/40 bg-[var(--brand-orange)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--brand-orange)]">
              <BadgeCheck className="h-3.5 w-3.5" /> Authorized Dahua Camera Wholesaler
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Securing Your World with{" "}
              <span className="text-[var(--brand-orange)]">Smart Technology</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80">
              UG Technology Store delivers professional CCTV installation, modern door locking
              systems, and reliable networking solutions across Hetauda and all over Nepal.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 rounded-md bg-[var(--brand-orange)] px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:brightness-110">
                <Phone className="h-5 w-5" /> Call Now
              </a>
              <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:brightness-110">
                <MessageCircle className="h-5 w-5" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">What We Do Best</h2>
            <p className="mt-3 text-muted-foreground">Complete security & connectivity solutions under one roof.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.title} className="group rounded-xl border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] transition group-hover:bg-[var(--brand-orange)] group-hover:text-white">
                  <h.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{h.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest blog posts */}
      <LatestBlogCarousel />

      {/* Client testimonials */}
      <ClientVoices />

      {/* Trust band */}
      <section className="bg-[var(--brand-navy)] py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left">
          <div className="flex items-center gap-4">
            <ShieldCheck className="h-10 w-10 text-[var(--brand-orange)]" />
            <div>
              <p className="text-xl font-bold">Authorized Dahua Camera Wholesaler</p>
              <p className="text-white/70">Genuine products · Warranty · Expert installation</p>
            </div>
          </div>
          <Link to="/contact" className="rounded-md bg-[var(--brand-orange)] px-6 py-3 text-base font-semibold text-white shadow-md transition hover:brightness-110">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </Layout>
  );
}
