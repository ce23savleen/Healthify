"use client"

import Link from "next/link"
import { Leaf, Heart, Mail, MapPin, Phone, ArrowUp } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Top Wave Divider */}
      <div className="absolute top-0 left-0 right-0" style={{ transform: "translateY(-1px)" }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80 Z"
            fill="#064e3b"
          />
        </svg>
      </div>

      {/* Main Footer */}
      <div
        className="pt-20 pb-8 relative"
        style={{
          background: "linear-gradient(180deg, #064e3b, #053328)",
        }}
      >
        {/* Background Decorations */}
        <div className="absolute top-16 right-16 w-48 h-48 rounded-full opacity-5 blur-3xl" style={{ background: "#6ee7b7" }} />
        <div className="absolute bottom-16 left-16 w-32 h-32 rounded-full opacity-5 blur-3xl" style={{ background: "#a7f3d0" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="space-y-5">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Healthify</span>
              </Link>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(167,243,208,0.6)" }}>
                Your trusted platform for natural home remedies. Discover safe, effective, and time-tested solutions for everyday health.
              </p>
              <div className="flex gap-3">
                {["X", "In", "Fb", "YT"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      color: "#a7f3d0",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: "Browse Ailments", href: "/browse-ailments" },
                  { label: "Explore Community", href: "/explore-community" },
                  { label: "Consult a Doctor", href: "/consult-doctor" },
                  { label: "Health Blogs", href: "/blogs" },
                  { label: "Share Remedy", href: "/share-remedy" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-300 hover:translate-x-1 inline-block"
                      style={{ color: "rgba(167,243,208,0.6)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#a7f3d0" }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(167,243,208,0.6)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Support</h4>
              <ul className="space-y-3">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  { label: "FAQ", href: "#" },
                  { label: "Privacy Policy", href: "#" },
                  { label: "Terms of Service", href: "#" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-300"
                      style={{ color: "rgba(167,243,208,0.6)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#a7f3d0" }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(167,243,208,0.6)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#6ee7b7" }} />
                  <span className="text-sm" style={{ color: "rgba(167,243,208,0.6)" }}>hello@healthify.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#6ee7b7" }} />
                  <span className="text-sm" style={{ color: "rgba(167,243,208,0.6)" }}>+91 98765 43210</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#6ee7b7" }} />
                  <span className="text-sm" style={{ color: "rgba(167,243,208,0.6)" }}>Mumbai, Maharashtra, India</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div
            className="rounded-2xl p-5 mb-8"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p className="text-xs leading-relaxed text-center" style={{ color: "rgba(167,243,208,0.4)" }}>
              <strong className="text-emerald-300/60">Disclaimer:</strong> The information provided on Healthify is for educational purposes only and is not intended
              as medical advice. Home remedies should not replace professional medical treatment. Always consult with a
              qualified healthcare provider before starting any new treatment.
            </p>
          </div>

          {/* Bottom Bar */}
          <div
            className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-xs flex items-center gap-1.5" style={{ color: "rgba(167,243,208,0.4)" }}>
              © 2025 Healthify. Made with
              <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
              for better health
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <ArrowUp className="w-4 h-4 text-emerald-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
