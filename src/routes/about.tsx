import { createFileRoute } from "@tanstack/react-router";
import { Award, ShieldCheck, Headphones, Phone, MessageCircle, CheckCircle2, Clock, MapPin } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { CONTACT } from "@/lib/contact";
import ceoPhoto from "@/assets/uttam-raj-ghimire.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About UG Technology Store — Uttam Raj Ghimire, CEO & Founder" },
      { name: "description", content: "Meet Uttam Raj Ghimire, Founder & CEO of UG Technology Store — the best CCTV, networking & security expert in Hetauda serving clients all over Nepal with 100% success rate and 24/7 support." },
      { name: "keywords", content: "Uttam Raj Ghimire, UG Technology CEO, best CCTV expert Nepal, best networking expert Hetauda, top security solution provider Nepal, CCTV installation all over Nepal, Dahua wholesaler Nepal, best IT consultant Hetauda, 24/7 CCTV support Nepal, trusted CCTV company Nepal" },
      { property: "og:title", content: "Uttam Raj Ghimire — Founder & CEO of UG Technology Store" },
      { property: "og:description", content: "The best CCTV and networking expert in Nepal — 100% success rate, 24/7 available, free expert advice across all over Nepal." },
      { property: "og:image", content: ceoPhoto },
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

      {/* CEO / Founder Spotlight */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-orange)]/40 bg-[var(--brand-orange)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--brand-orange)]">
              Meet the Founder
            </span>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
              Leadership You Can Trust
            </h2>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr]">
            <div className="mx-auto lg:mx-0">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-[var(--brand-orange)]/20 blur-2xl" />
                <img
                  src={ceoPhoto}
                  alt="Uttam Raj Ghimire — Founder & CEO of UG Technology Store, best CCTV and networking expert in Nepal"
                  width={320}
                  height={320}
                  loading="lazy"
                  className="relative h-64 w-64 rounded-full object-cover shadow-[var(--shadow-elegant)] ring-4 ring-[var(--brand-orange)]/40 sm:h-80 sm:w-80"
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground sm:text-3xl">Uttam Raj Ghimire</h3>
              <p className="mt-1 text-base font-semibold text-[var(--brand-orange)]">
                Founder &amp; CEO — UG Technology Store
              </p>

              <p className="mt-5 text-lg leading-relaxed text-foreground">
                Widely recognized as one of the <strong>best CCTV and networking experts in Nepal</strong>,
                Uttam Raj Ghimire founded UG Technology Store with a single promise — honest technology,
                done right. From a small home install in Hetauda to enterprise rollouts{" "}
                <strong>all over Nepal</strong>, he personally stands behind every project.
              </p>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                As CEO, Uttam personally visits client sites to diagnose issues firsthand, ensuring no
                problem is too small and no customer is left waiting. His hands-on leadership is the
                reason UG Technology has built a reputation as the most trusted security and
                networking partner in the country.
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                <li className="flex items-start gap-3 rounded-lg bg-card p-4 shadow-[var(--shadow-card)]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-orange)]" />
                  <span className="text-sm font-medium text-foreground">100% project success rate</span>
                </li>
                <li className="flex items-start gap-3 rounded-lg bg-card p-4 shadow-[var(--shadow-card)]">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-orange)]" />
                  <span className="text-sm font-medium text-foreground">24/7 available for every issue</span>
                </li>
                <li className="flex items-start gap-3 rounded-lg bg-card p-4 shadow-[var(--shadow-card)]">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-orange)]" />
                  <span className="text-sm font-medium text-foreground">On-site visits all over Nepal</span>
                </li>
                <li className="flex items-start gap-3 rounded-lg bg-card p-4 shadow-[var(--shadow-card)]">
                  <Headphones className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-orange)]" />
                  <span className="text-sm font-medium text-foreground">Free, genuine expert advice</span>
                </li>
              </ul>

              <blockquote className="mt-6 border-l-4 border-[var(--brand-orange)] bg-card p-5 italic text-foreground shadow-[var(--shadow-card)]">
                “If it protects your family, your shop, or your business — it deserves to be done
                properly. That's the only way we work.”
                <footer className="mt-2 text-sm not-italic text-muted-foreground">
                  — Uttam Raj Ghimire, CEO
                </footer>
              </blockquote>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 rounded-md bg-[var(--brand-orange)] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
                >
                  <Phone className="h-4 w-4" /> Talk to the CEO
                </a>
                <a
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Uttam
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
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
