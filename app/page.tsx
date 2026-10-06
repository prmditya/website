"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCarousel from "@/components/ProjectCarousel";
import ProjectDetail from "@/components/ProjectDetail";
import { projects } from "@/data/projects";
import Link from "next/link";

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.75,
    delay: i * 0.09,
    ease: [0.16, 1, 0.3, 1] as const,
  },
});

export default function HomePage() {
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);

  return (
    <main>
      {/* ══════════════════════════════════
          HERO
          ══════════════════════════════════ */}
      <section className="hero">
        <div className="container">
          {/* Status pill */}
          <motion.div {...stagger(0)}>
            <div className="hero-badge glass">
              <span className="hero-badge__dot" />
              <span className="mono">available for work</span>
            </div>
          </motion.div>

          {/* Big name */}
          <motion.h1 className="hero-display" {...stagger(1)}>
            thoriq<span className="accent">.</span>
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.p className="hero-sub mono" {...stagger(2)}>
            &gt; full-stack developer<span className="blink">_</span>
          </motion.p>

          {/* Bio */}
          <motion.p className="hero-bio" {...stagger(3)}>
            I build things for the web — from fast, clean UIs to scalable
            backends. I care about craft, performance, and shipping things that
            feel good to use.
          </motion.p>

          {/* CTA buttons */}
          <motion.div className="hero-actions" {...stagger(4)}>
            <a href="#projects" className="btn btn-primary">
              see my work ↓
            </a>
            <Link href="/contact" className="btn btn-ghost">
              reach me ↗
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div className="hero-stats" {...stagger(5)}>
            {[
              { val: "5+", label: "projects" },
              { val: "2+", label: "years exp" },
              { val: "∞", label: "coffee" },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
              >
                {i > 0 && <div className="stat-divider" />}
                <div className="stat">
                  <span className="stat__val mono">{s.val}</span>
                  <span className="stat__label mono">{s.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Decorative glow orb */}
        <motion.div
          className="hero-orb"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </section>

      {/* ══════════════════════════════════
          PROJECTS
          ══════════════════════════════════ */}
      <section id="projects">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="section-label">// selected work</p>
            <h2 className="section-title">
              Projects<span style={{ color: "var(--accent)" }}>.</span>
            </h2>
            <p className="section-desc mono">
              drag to explore · click to dive in
            </p>
          </motion.div>

          <ProjectCarousel
            activeId={activeProjectId}
            onSelect={setActiveProjectId}
          />
          <ProjectDetail activeId={activeProjectId} />
        </div>
      </section>

      {/* ══════════════════════════════════
          FOOTER
          ══════════════════════════════════ */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-left">
              <p className="footer-logo mono">
                <span style={{ color: "var(--accent)", opacity: 0.7 }}>[</span>
                thoriq
                <span style={{ color: "var(--accent)", opacity: 0.7 }}>]</span>
              </p>
              <p className="footer-copy mono">
                © {new Date().getFullYear()} · built with next.js &amp; framer
                motion
              </p>
            </div>
            <div className="footer-links">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link mono"
              >
                github ↗
              </a>
              <a href="mailto:hello@thoriq.dev" className="footer-link mono">
                email ↗
              </a>
              <Link href="/contact" className="footer-link mono">
                contact ↗
              </Link>
            </div>
          </div>
          <div className="footer-line" />
          <p className="footer-tagline mono">
            // making the web a little less boring, one commit at a time.
          </p>
        </div>
      </footer>

      <style>{`
        /* ── Hero ───────────────────────── */
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding-top: calc(var(--nav-height) + 2rem);
          overflow: hidden;
        }

        .hero .container {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
          position: relative;
          z-index: 1;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-pill);
          font-size: 0.7rem;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
          align-self: flex-start;
        }

        .hero-badge__dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
          animation: pulse-dot 2.4s ease-in-out infinite;
        }

        .hero-sub {
          font-size: clamp(1rem, 2.5vw, 1.3rem);
          color: var(--accent);
          letter-spacing: 0.02em;
          opacity: 0.85;
          margin-top: -0.5rem;
        }

        .hero-bio {
          font-family: var(--font-mono), monospace;
          font-size: clamp(0.85rem, 1.8vw, 1rem);
          color: var(--text-secondary);
          line-height: 1.8;
          max-width: 52ch;
        }

        .hero-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 0;
          margin-top: 0.5rem;
          flex-wrap: wrap;
          row-gap: 0.75rem;
        }

        .stat {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .stat__val {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
        }

        .stat__label {
          font-size: 0.62rem;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .stat-divider {
          width: 1px;
          height: 38px;
          background: var(--glass-border);
          margin-inline: 1.5rem;
        }

        /* Decorative glow orb */
        .hero-orb {
          position: absolute;
          right: -12%;
          top: 50%;
          transform: translateY(-50%);
          width: min(560px, 55vw);
          height: min(560px, 55vw);
          border-radius: 50%;
          background: radial-gradient(
            circle at 40% 40%,
            rgba(245, 200, 66, 0.07),
            rgba(139, 92, 246, 0.05) 45%,
            transparent 70%
          );
          pointer-events: none;
          filter: blur(48px);
        }

        /* ── Section Header ─────────────── */
        .section-header {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 3rem;
        }

        .section-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          margin-top: 0.2rem;
        }

        /* ── Footer ─────────────────────── */
        .site-footer {
          border-top: 1px solid var(--glass-border);
          padding-block: 3rem 2.5rem;
          margin-top: 2rem;
        }

        .footer-inner {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .footer-left {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .footer-logo {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .footer-copy {
          font-size: 0.68rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }

        .footer-links {
          display: flex;
          gap: 1.75rem;
          flex-wrap: wrap;
        }

        .footer-link {
          font-size: 0.72rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          transition: color 0.2s;
        }

        .footer-link:hover { color: var(--accent); }

        .footer-line {
          height: 1px;
          background: var(--glass-border);
          margin-bottom: 1.25rem;
        }

        .footer-tagline {
          font-size: 0.68rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
          opacity: 0.6;
        }
      `}</style>
    </main>
  );
}
