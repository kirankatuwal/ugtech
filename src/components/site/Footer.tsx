import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo-ug.jpg";
import { CONTACT } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="bg-[var(--brand-navy)] text-white/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="UG Technology Store" className="h-12 w-12 rounded-md object-cover" />
            <div>
              <p className="text-base font-bold text-white">UG Technology Store</p>
              <p className="text-xs tracking-widest text-white/60">HETAUDA · NEPAL</p>
            </div>
          </div>
          <p className="mt-4 text-sm">
            Authorized wholesaler of Dahua cameras. Securing homes and businesses with smart technology.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-[var(--brand-orange)]">Services</Link></li>
            <li><Link to="/products" className="hover:text-[var(--brand-orange)]">Products</Link></li>
            <li><Link to="/about" className="hover:text-[var(--brand-orange)]">About</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--brand-orange)]">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-[var(--brand-orange)]" />{CONTACT.address}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-[var(--brand-orange)]" /><a href={CONTACT.phoneHref} className="hover:text-white">{CONTACT.phone}</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-[var(--brand-orange)]" /><a href={`mailto:${CONTACT.email}`} className="hover:text-white">{CONTACT.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} UG Technology Store. All rights reserved.
      </div>
    </footer>
  );
}
