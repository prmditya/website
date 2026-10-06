"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const contacts = [
  {
    id: "github",
    label: "GitHub",
    handle: "@prmditya",
    desc: "Code & open source",
    href: "https://github.com/prmditya",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    id: "email",
    label: "Email",
    handle: "t.paramaditya@gmail.com",
    desc: "For serious inquiries",
    href: "mailto:t.paramaditya@gmail.com",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "prmdtya",
    desc: "Professional network",
    href: "https://linkedin.com/in/prmdtya",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <main>
      <section className="min-h-[100svh] flex items-start pt-[calc(var(--nav-height)+3rem)]">
        <div className="container">
          {/* Header */}
          <motion.div
            className="flex flex-col gap-2.5 max-w-[520px] mb-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="section-label">// reach me</p>
            <h1 className="section-title">
              Let&apos;s talk<span className="text-[var(--accent)]">.</span>
            </h1>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-1">
              Whether you have a project in mind, a question, or just want to
              say hi — my inbox is open. Pick your preferred channel below.
            </p>
          </motion.div>

          {/* Contact cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {contacts.map((c, i) => (
              <motion.a
                key={c.id}
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group relative flex flex-col gap-4 p-6 rounded-[var(--radius-lg)] text-[var(--text-primary)] no-underline cursor-pointer glass glass-hover transition-all duration-250 ease-out"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-[var(--accent)] opacity-85">{c.icon}</div>
                <div className="flex flex-col gap-1">
                  <p className="mono text-[11px] text-[var(--text-muted)] tracking-widest uppercase">
                    {c.label}
                  </p>
                  <p className="font-[var(--font-sans)] text-base font-bold -tracking-[0.01em]">
                    {c.handle}
                  </p>
                  <p className="mono text-[11.5px] text-[var(--text-muted)] tracking-wider mt-0.5">
                    {c.desc}
                  </p>
                </div>
                <div className="absolute top-5 right-5 text-sm text-[var(--text-muted)] transition-all duration-200 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </div>
              </motion.a>
            ))}
          </div>

          {/* Optional email note */}
          <motion.div
            className="flex flex-col gap-2 p-5 sm:p-6 rounded-[var(--radius-md)] glass"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mono text-[var(--accent)] text-xs">
              // prefer email?
            </span>
            <p className="text-[var(--text-secondary)] text-[13.5px] leading-relaxed">
              Send me a message at{" "}
              <a
                href="mailto:t.paramaditya@gmail.com"
                className="text-[var(--accent)] underline underline-offset-[3px]"
              >
                t.paramaditya@gmail.com
              </a>{" "}
              — I usually respond within 24 hours.
            </p>
          </motion.div>

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-8"
          >
            <Link href="/" className="btn btn-ghost">
              ← back home
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
