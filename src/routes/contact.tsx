import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { z } from "zod";
import { Layout } from "@/components/site/Layout";
import { CONTACT } from "@/lib/contact";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — UG Technology Store" },
      { name: "description", content: "Call, WhatsApp or email UG Technology Store in Hetauda, Nepal for CCTV, locks and networking." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(80),
  phone: z.string().trim().min(7, "Please enter a valid phone").max(20),
  message: z.string().trim().min(5, "Tell us a bit more").max(800),
});

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    const text = `Hello UG Technology Store!%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0AMessage: ${encodeURIComponent(form.message)}`;
    window.open(`${CONTACT.whatsappHref}?text=${text}`, "_blank");
    toast.success("Opening WhatsApp to send your message…");
    setForm({ name: "", phone: "", message: "" });
    setSubmitting(false);
  };

  return (
    <Layout>
      <Toaster />
      <section className="bg-[var(--brand-navy)] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Get in Touch</h1>
          <p className="mt-4 max-w-2xl text-white/80">We're happy to help with quotes, installations, or wholesale inquiries.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-6">
            <a href={CONTACT.phoneHref} className="flex items-start gap-4 rounded-xl border bg-card p-6 shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-elegant)]">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]"><Phone className="h-6 w-6" /></div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Call us</p>
                <p className="text-lg font-bold text-foreground">{CONTACT.phone}</p>
              </div>
            </a>
            <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-xl border bg-card p-6 shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-elegant)]">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/10 text-[#25D366]"><MessageCircle className="h-6 w-6" /></div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">WhatsApp</p>
                <p className="text-lg font-bold text-foreground">{CONTACT.phone}</p>
              </div>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-4 rounded-xl border bg-card p-6 shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-elegant)]">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]"><Mail className="h-6 w-6" /></div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Email</p>
                <p className="text-lg font-bold text-foreground">{CONTACT.email}</p>
              </div>
            </a>
            <div className="flex items-start gap-4 rounded-xl border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]"><MapPin className="h-6 w-6" /></div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Visit us</p>
                <p className="text-lg font-bold text-foreground">{CONTACT.address}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border bg-card p-8 shadow-[var(--shadow-card)]">
            <h2 className="text-2xl font-bold text-foreground">Send an Inquiry</h2>
            <p className="mt-1 text-sm text-muted-foreground">We'll get back to you as soon as possible.</p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  maxLength={80}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-[var(--brand-orange)] focus:ring-2 focus:ring-[var(--brand-orange)]/30"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  maxLength={20}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-[var(--brand-orange)] focus:ring-2 focus:ring-[var(--brand-orange)]/30"
                  placeholder="+977 9800000000"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  maxLength={800}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-[var(--brand-orange)] focus:ring-2 focus:ring-[var(--brand-orange)]/30"
                  placeholder="Tell us what you need…"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--brand-orange)] px-6 py-3 text-base font-semibold text-white shadow-md transition hover:brightness-110 disabled:opacity-60"
              >
                <Send className="h-4 w-4" /> Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
