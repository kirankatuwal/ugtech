import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import logo from "@/assets/logo-ug.jpg";
import { CONTACT } from "@/lib/contact";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[var(--brand-navy)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--brand-navy)]/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="UG Technology Store" className="h-10 w-10 rounded-md object-cover" />
          <span className="hidden text-white sm:block">
            <span className="block text-sm font-bold leading-tight">UG Technology</span>
            <span className="block text-[10px] tracking-[0.2em] text-white/70">STORE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-white bg-white/10" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={CONTACT.phoneHref}
            className="inline-flex items-center gap-2 rounded-md bg-[var(--brand-orange)] px-3 py-2 text-sm font-semibold text-white shadow-md transition hover:brightness-110 sm:px-4"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Call Now</span>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-white md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-[var(--brand-navy)] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
                activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-white bg-white/10" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
