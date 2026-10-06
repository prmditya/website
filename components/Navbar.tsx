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
    <div
      className={`fixed top-0 inset-x-0 z-[100] flex flex-col items-center p-4 pointer-events-none transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled ? "pt-3" : "pt-4"
      }`}
    >
      <motion.header
        className={`pointer-events-auto w-full rounded-full border bg-transparent p-2 px-3 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] max-sm:bg-[#0d1017]/82 max-sm:backdrop-blur-xl max-sm:backdrop-saturate-180 max-sm:border-white/12 ${
          scrolled
            ? "max-w-[500px] py-[0.4rem] px-[0.6rem] bg-[#0d1017]/82 backdrop-blur-xl backdrop-saturate-180 border-white/12 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] max-sm:max-w-none"
            : "max-w-[1100px] border-transparent shadow-none"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex w-full items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-rotate-12 hover:scale-105 ${
              !scrolled ? "bg-[#facc15]" : "bg-transparent"
            }`}
          >
            <Image
              src="/assets/profile-head.png"
              alt="Ditya profile"
              width={40}
              height={40}
              priority
              className="h-full w-full rounded-full object-cover"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="ml-4 flex flex-1 items-center justify-between max-sm:hidden">
            <div
              className={`flex items-center gap-1.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                scrolled ? "mx-auto" : "ml-auto mr-1"
              }`}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono rounded-full px-3.5 py-1.5 text-[0.8rem] tracking-wider text-[#94a3b8] transition-colors duration-200 hover:bg-white/6 hover:text-[#f8fafc]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              className={`font-mono shrink-0 rounded-full text-[0.78rem] font-medium transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                scrolled
                  ? "bg-[#facc15] px-4 py-1.5 font-semibold !text-[#0d1017] border border-[#facc15] hover:bg-[#eab308] hover:border-[#eab308] hover:shadow-[0_4px_12px_rgba(250,204,21,0.25)]"
                  : "bg-white/4 px-4 py-1.5 text-[#f8fafc] border border-white/12 hover:bg-white/10 hover:border-white/25"
              }`}
            >
              reach me ↗
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="hidden flex-col gap-1.25 p-2 bg-transparent border-none cursor-pointer max-sm:flex"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[2px] w-5 rounded-[2px] bg-[#94a3b8] transition-transform duration-300 opacity-100 ${
                menuOpen ? "translate-x-[5px] translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 rounded-[2px] bg-[#94a3b8] transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[2px] w-5 rounded-[2px] bg-[#94a3b8] transition-transform duration-300 opacity-100 ${
                menuOpen
                  ? "translate-x-[5px] -translate-y-[5px] -rotate-45"
                  : ""
              }`}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="pointer-events-auto mt-2 flex w-full max-w-[500px] flex-col gap-1 rounded-2xl border border-white/10 bg-[#0d1017]/90 p-3 backdrop-blur-xl"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono rounded-xl px-4 py-3 text-[0.85rem] text-[#94a3b8] transition-colors duration-200 hover:bg-white/6 hover:text-[#f8fafc]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="font-mono mt-1 rounded-xl bg-[#facc15] px-4 py-3 text-center text-[0.85rem] font-semibold text-[#0d1017] transition-colors duration-200 hover:bg-[#eab308]"
              onClick={() => setMenuOpen(false)}
            >
              reach me ↗
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
