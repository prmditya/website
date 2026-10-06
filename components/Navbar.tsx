"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "home", href: "/" },
  { label: "projects", href: "/#projects" },
  { label: "reach me", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`navbar${scrolled ? " navbar--scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="navbar__inner">
          {/* Logo */}
          <Link href="/" className="navbar__logo">
            <span className="navbar__logo-bracket mono">[</span>
            <span className="navbar__logo-name">thoriq</span>
            <span className="navbar__logo-bracket mono">]</span>
          </Link>

          {/* Desktop nav */}
          <nav className="navbar__links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="navbar__link mono"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-ghost navbar__cta">
              reach me ↗
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`bar${menuOpen ? " bar--open" : ""}`} />
            <span className={`bar${menuOpen ? " bar--open" : ""}`} />
            <span className={`bar${menuOpen ? " bar--open" : ""}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu glass"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-menu__link mono"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1rem 0;
          transition: background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease;
        }
        .navbar--scrolled {
          background: rgba(8, 10, 15, 0.7);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid var(--glass-border);
        }
        .navbar__inner {
          width: 100%;
          max-width: 1100px;
          margin-inline: auto;
          padding-inline: clamp(1.25rem, 5vw, 2.5rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 0;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          transition: color 0.2s;
        }
        .navbar__logo:hover { color: var(--accent); }
        .navbar__logo-bracket {
          color: var(--accent);
          font-size: 1.1rem;
          opacity: 0.7;
        }
        .navbar__logo-name {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 1rem;
          margin-inline: 2px;
        }
        .navbar__links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .navbar__link {
          padding: 0.45rem 0.85rem;
          font-size: 0.75rem;
          letter-spacing: 0.04em;
          color: var(--text-secondary);
          border-radius: var(--radius-pill);
          transition: color 0.2s, background 0.2s;
        }
        .navbar__link:hover {
          color: var(--text-primary);
          background: var(--glass-bg);
        }
        .navbar__cta {
          margin-left: 0.5rem;
          font-size: 0.74rem;
        }
        .navbar__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 4px;
        }
        .bar {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--text-secondary);
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
        }
        .bar--open:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .bar--open:nth-child(2) { opacity: 0; }
        .bar--open:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

        .mobile-menu {
          position: fixed;
          top: var(--nav-height);
          left: 1rem;
          right: 1rem;
          z-index: 99;
          border-radius: var(--radius-md);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .mobile-menu__link {
          padding: 0.8rem 1rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          transition: color 0.2s, background 0.2s;
          letter-spacing: 0.04em;
        }
        .mobile-menu__link:hover {
          color: var(--text-primary);
          background: var(--glass-bg);
        }

        @media (max-width: 640px) {
          .navbar__links { display: none; }
          .navbar__hamburger { display: flex; }
        }
      `}</style>
    </>
  );
}
