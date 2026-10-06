"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "home", href: "/" },
  { label: "projects", href: "/#projects" },
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
      <div
        className={`navbar-wrapper${scrolled ? " navbar-wrapper--scrolled" : ""}`}
      >
        <motion.header
          className={`navbar${scrolled ? " navbar--scrolled" : ""}`}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="navbar__inner">
            {/* Logo */}
            <Link
              href="/"
              className={`navbar__logo${!scrolled ? " navbar__logo--hero" : ""}`}
            >
              <Image
                src="/assets/profile-head.png"
                alt="Ditya profile"
                width={40}
                height={40}
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="navbar__links">
              <div
                className={`navbar__nav-items${scrolled ? " navbar__nav-items--scrolled" : ""}`}
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="navbar__link mono"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/contact"
                className={`btn navbar__cta mono${scrolled ? " navbar__cta--scrolled" : ""}`}
              >
                reach me ↗
              </Link>
            </nav>

            {/* Mobile Hamburger */}
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
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
              <Link
                href="/contact"
                className="mobile-menu__link mobile-menu__link--cta mono"
                onClick={() => setMenuOpen(false)}
              >
                reach me ↗
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem 1rem 0;
          pointer-events: none;
          transition: padding 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .navbar-wrapper--scrolled {
          padding-top: 0.75rem;
        }

        .navbar {
          pointer-events: auto;
          width: 100%;
          max-width: 1100px;
          padding: 0.5rem 0.75rem;
          border-radius: 9999px;
          background: transparent;
          border: 1px solid transparent;
          box-shadow: 0 0 0 transparent;
          transition: 
            max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            padding 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            background-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            backdrop-filter 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .navbar--scrolled {
          max-width: 500px;
          padding: 0.4rem 0.6rem;
          background: rgba(13, 16, 23, 0.82);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
        }

        .navbar__inner {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar__logo {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          background: transparent;
          transition: background-color 0.35s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
        }

        .navbar__logo--hero {
          background-color: #facc15;
        }

        .navbar__logo:hover {
          transform: rotate(-12deg) scale(1.05);
        }

        .navbar__logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .navbar__links {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-grow: 1;
          margin-left: 1rem;
        }

        .navbar__nav-items {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin-left: auto;
          margin-right: 0.25rem;
          transition: margin 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .navbar__nav-items--scrolled {
          margin: 0 auto;
        }

        .navbar__link {
          padding: 0.45rem 0.95rem;
          font-size: 0.8rem;
          letter-spacing: 0.04em;
          color: var(--text-secondary, #94a3b8);
          border-radius: 9999px;
          transition: color 0.2s, background 0.2s;
        }

        .navbar__link:hover {
          color: var(--text-primary, #f8fafc);
          background: rgba(255, 255, 255, 0.06);
        }

        .navbar__cta {
          padding: 0.45rem 1rem;
          font-size: 0.78rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-primary, #f8fafc);
          font-weight: 500;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
        }

        .navbar__cta:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.25);
        }

        .navbar__cta--scrolled {
          background: #facc15;
          color: #0d1017;
          border-color: #facc15;
          font-weight: 600;
        }

        .navbar__cta--scrolled:hover {
          background: #eab308;
          border-color: #eab308;
          box-shadow: 0 4px 12px rgba(250, 204, 21, 0.25);
        }

        .navbar__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 8px;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .bar {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--text-secondary, #94a3b8);
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
        }

        .bar--open:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .bar--open:nth-child(2) { opacity: 0; }
        .bar--open:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

        .mobile-menu {
          pointer-events: auto;
          width: 100%;
          max-width: 500px;
          margin-top: 0.5rem;
          border-radius: 1.25rem;
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          background: rgba(13, 16, 23, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-menu__link {
          padding: 0.75rem 1rem;
          font-size: 0.85rem;
          color: var(--text-secondary, #94a3b8);
          border-radius: 0.75rem;
          transition: color 0.2s, background 0.2s;
        }

        .mobile-menu__link:hover {
          color: var(--text-primary, #f8fafc);
          background: rgba(255, 255, 255, 0.06);
        }

        .mobile-menu__link--cta {
          background: #facc15;
          color: #0d1017;
          font-weight: 600;
          text-align: center;
          margin-top: 0.25rem;
        }

        .mobile-menu__link--cta:hover {
          background: #eab308;
          color: #0d1017;
        }

        /* Khusus Layar Mobile (< 640px) */
        @media (max-width: 640px) {
          .navbar__links {
            display: none !important;
          }

          .navbar__hamburger {
            display: flex !important;
          }

          .navbar {
            background: rgba(13, 16, 23, 0.82) !important;
            backdrop-filter: blur(20px) saturate(180%) !important;
            -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
            border-color: rgba(255, 255, 255, 0.12) !important;
          }

          .navbar--scrolled {
            max-width: 100% !important;
          }
        }
      `}</style>
    </>
  );
}
