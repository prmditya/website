"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectDetail from "@/components/ProjectDetail";
import { projects } from "@/data/projects";
import Link from "next/link";
import Image from "next/image";
import TypewriterSubtitle from "@/components/TypeWriterSubtitle";

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
  const [surabayaTime, setSurabayaTime] = useState<string>("");
  const [isBusinessHours, setIsBusinessHours] = useState<boolean>(true);

  // Real-time Clock Surabaya (WIB / Asia/Jakarta)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat("en-GB", options);
      const timeStr = formatter.format(now);
      setSurabayaTime(timeStr);

      const hourStr = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "numeric",
        hour12: false,
      }).format(now);
      const hour = parseInt(hourStr, 10);
      setIsBusinessHours(hour >= 8 && hour < 22);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // References for tracking scroll position
  const heroRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // Hero Parallax Scroll
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroGridY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroContentY = useTransform(heroScroll, [0, 1], ["0%", "-15%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.85], [1, 0]);
  const cardsY = useTransform(heroScroll, [0, 1], ["0px", "-60px"]);

  // Footer Parallax Scroll
  const { scrollYProgress: footerScroll } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const footerGridY = useTransform(footerScroll, [0, 1], ["-15%", "0%"]);
  const footerContentY = useTransform(footerScroll, [0, 1], ["20px", "0px"]);

  const heroCards = projects.slice(0, 3);
  const stackPositions = [
    { rotate: -3, y: 0, x: -15, zIndex: 3 },
    { rotate: 3, y: 110, x: 25, zIndex: 2 },
    { rotate: -2, y: 220, x: 0, zIndex: 1 },
  ];

  // Duplikasi daftar project agar animasi marquee carousel berjalan smooth tanpa jeda
  const carouselProjects = [...projects, ...projects];

  return (
    <main>
      {/* ══════════════════════════════════
          HERO WITH PARALLAX & HUD CARDS
          ══════════════════════════════════ */}
      <section ref={heroRef} className="hero">
        <motion.div style={{ y: heroGridY }} className="grid-bg">
          <div className="grid-pattern" />
        </motion.div>
        <div className="grid-mask" />

        <motion.div
          style={{ y: heroContentY, opacity: heroOpacity }}
          className="container hero-container"
        >
          <div className="hero-content">
            <motion.div {...stagger(0)}>
              <div className="hero-badge glass">
                <span className="hero-badge__dot" />
                <span className="mono">available for work</span>
              </div>
            </motion.div>

            <motion.div {...stagger(1)}>
              <Image
                src="/assets/logo-white.png"
                alt="Ditya Logo"
                width={347}
                height={150}
                sizes="100vw"
                className="w-[260px] sm:w-[320px] h-auto"
              />
            </motion.div>

            <motion.div className="hero-sub mono" {...stagger(2)}>
              <TypewriterSubtitle />
            </motion.div>

            <motion.p className="hero-bio" {...stagger(3)}>
              I build things for the web — from fast, clean UIs to scalable
              backends. I care about craft, performance, and shipping things
              that feel good to use.
            </motion.p>

            <motion.div className="hero-actions" {...stagger(4)}>
              <a href="#projects" className="btn btn-primary">
                see my work ↓
              </a>
              <Link href="/contact" className="btn btn-ghost">
                reach me ↗
              </Link>
            </motion.div>

            <motion.div className="hero-stats" {...stagger(5)}>
              {[
                { val: "5+", label: "projects" },
                { val: "1+", label: "years exp" },
                { val: "∞", label: "coffee" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                  }}
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

          <motion.div style={{ y: cardsY }} className="hero-card-deck">
            {heroCards.map((project, idx) => {
              const pos = stackPositions[idx % stackPositions.length];
              return (
                <motion.div
                  key={project.id}
                  className="hud-card"
                  initial={{ opacity: 0, y: pos.y + 30, rotate: pos.rotate }}
                  animate={{
                    opacity: 1,
                    y: pos.y,
                    x: pos.x,
                    rotate: pos.rotate,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.25 + idx * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    scale: 1.04,
                    rotate: 0,
                    x: pos.x,
                    y: pos.y - 10,
                    zIndex: 50,
                    transition: { duration: 0.25 },
                  }}
                  style={{ zIndex: pos.zIndex }}
                  onClick={() => {
                    setActiveProjectId(project.id);
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <div className="hud-card__top">
                    <div className="hud-card__dots">
                      <span className="hud-dot" />
                      <span className="hud-dot" />
                      <span className="hud-dot" />
                    </div>
                    <span className="hud-card__tag mono">
                      0{idx + 1} // {project.category || "PROJECT"}
                    </span>
                  </div>

                  <div className="hud-card__image-wrap">
                    <Image
                      src={project.image || "/assets/placeholder.jpg"}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      style={{ objectFit: "cover" }}
                      priority
                    />
                    <div className="hud-card__glare" />
                  </div>

                  <div className="hud-card__bottom">
                    <h4 className="hud-card__title">{project.title}</h4>
                    <span className="hud-card__arrow mono">↗</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════
          INFINITE PINTEREST CAROUSEL
          ══════════════════════════════════ */}
      <section id="projects" className="pinterest-gallery">
        <div className="container">
          <motion.div
            className="gallery-header"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="gallery-header__top">
              <span className="gallery-tag mono">01 // EXHIBITION</span>
              <span className="gallery-count mono">
                [{projects.length} WORKS · INFINITE STREAM]
              </span>
            </div>
            <h2 className="gallery-title">Selected Works</h2>
          </motion.div>
        </div>

        {/* Carousel Container dengan Hover-Pause */}
        <div className="infinite-carousel-wrap">
          <div className="infinite-carousel-track">
            {carouselProjects.map((project, idx) => {
              const originalIndex = idx % projects.length;
              const isActive = project.id === activeProjectId;
              return (
                <div
                  key={`${project.id}-${idx}`}
                  className={`pin-card ${isActive ? "pin-card--active" : ""}`}
                  onClick={() => setActiveProjectId(project.id)}
                >
                  <div className="pin-card__frame">
                    <Image
                      src={project.image || "/assets/placeholder.jpg"}
                      alt={project.title}
                      width={400}
                      height={500}
                      className="pin-card__img"
                    />
                    <div className="pin-card__overlay">
                      <span className="pin-card__index mono">
                        No. 0{originalIndex + 1}
                      </span>
                      <span className="pin-card__arrow mono">↗</span>
                    </div>
                  </div>

                  <div className="pin-card__caption">
                    <div className="pin-card__meta">
                      <h3 className="pin-card__title">{project.title}</h3>
                      {project.category && (
                        <span className="pin-card__cat mono">
                          {project.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Plakat Detail Karya Terpilih */}
        <div className="container">
          {activeProjectId &&
            (() => {
              const currentIndex = projects.findIndex(
                (p) => p.id === activeProjectId,
              );
              const activeProject = projects[currentIndex] || projects[0];

              const handlePrev = () => {
                const prevIdx =
                  (currentIndex - 1 + projects.length) % projects.length;
                setActiveProjectId(projects[prevIdx].id);
              };

              const handleNext = () => {
                const nextIdx = (currentIndex + 1) % projects.length;
                setActiveProjectId(projects[nextIdx].id);
              };

              return (
                <motion.div
                  key={activeProjectId}
                  className="pin-detail-wrapper"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Header Bar dengan Tombol Navigasi Next/Prev */}
                  <div className="pin-detail-bar mono">
                    <span>// EXHIBIT DETAILS — NO. 0{currentIndex + 1}</span>

                    <div className="pin-detail-nav">
                      <button
                        onClick={handlePrev}
                        className="nav-btn mono"
                        aria-label="Previous project"
                      >
                        ← Prev
                      </button>
                      <span className="nav-divider">/</span>
                      <button
                        onClick={handleNext}
                        className="nav-btn mono"
                        aria-label="Next project"
                      >
                        Next →
                      </button>
                    </div>
                  </div>

                  <ProjectDetail project={activeProject} />
                </motion.div>
              );
            })()}
        </div>
      </section>

      {/* ══════════════════════════════════
          PRE-FOOTER CTA SECTION (WITH SURABAYA TIME)
          ══════════════════════════════════ */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-eyebrow-row"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="cta-step mono">02 // NEXT STEP</span>
            <div className="cta-divider-line" />
            <span className="cta-availability mono">AVAILABLE FOR Q4/Q1</span>
          </motion.div>

          <div className="cta-main">
            <motion.div
              className="cta-text-wrapper"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="cta-subheading mono">// DONE WITH LOOKING?</span>
              <h2 className="cta-headline">
                Let’s start <br />
                <span className="cta-headline__accent">building together.</span>
              </h2>
              <p className="cta-bio mono">
                Have a project in mind, an idea to refine, or just want to
                discuss software craft? Drop a line and let’s shape something
                exceptional.
              </p>
            </motion.div>

            <motion.div
              className="cta-card glass"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.75,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Header Card dengan Live Surabaya Clock */}
              <div className="cta-card__header mono">
                <span className="cta-card__time-badge">
                  <span
                    className={`cta-card__dot ${
                      isBusinessHours
                        ? "cta-card__dot--active"
                        : "cta-card__dot--idle"
                    }`}
                  />
                  <span>
                    SURABAYA, ID (UTC+7):{" "}
                    <strong className="cta-card__clock">
                      {surabayaTime || "--:--:--"}
                    </strong>
                  </span>
                </span>
              </div>

              <div className="cta-card__body">
                <p className="cta-card__prompt">
                  {isBusinessHours
                    ? "Currently awake & active for inquiries"
                    : "Currently resting, but drop a line anytime!"}
                </p>
                <a
                  href="mailto:hello@thoriq.dev"
                  className="cta-email-link mono"
                >
                  hello@thoriq.dev <span className="cta-email-arrow">↗</span>
                </a>
              </div>

              <div className="cta-card__footer">
                <Link href="/contact" className="btn btn-primary cta-btn">
                  contact me ↓
                </Link>
                <span className="cta-response-time mono">
                  avg response: &lt; 24h
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FOOTER WITH PARALLAX & GRID BG
          ══════════════════════════════════ */}
      <footer ref={footerRef} className="site-footer">
        <motion.div style={{ y: footerGridY }} className="grid-bg">
          <div className="grid-pattern" />
        </motion.div>
        <div className="grid-mask" />

        <motion.div
          style={{ y: footerContentY }}
          className="container footer-content"
        >
          <div className="footer-inner">
            <div className="footer-left">
              <Image
                src="/assets/logo-white.png"
                alt="Ditya Logo"
                width={69.5}
                height={30}
                sizes="100vw"
                className="h-auto"
              />
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
        </motion.div>
      </footer>

      <style>{`
        /* ── Grid & Mask Styles ── */
        .grid-bg {
          position: absolute;
          inset: -15%;
          width: 130%;
          height: 130%;
          pointer-events: none;
          z-index: 0;
          opacity: 0.12;
        }

        .grid-pattern {
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.35) 1px, transparent 1px);
          background-size: 70px 70px;
        }

        .grid-mask {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background: radial-gradient(
            circle at center,
            transparent 15%,
            var(--bg-primary, #06070a) 85%
          );
        }

        /* ── Hero Split Layout ── */
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding-top: calc(var(--nav-height, 80px) + 2rem);
          padding-bottom: 4rem;
          overflow: hidden;
        }

        .hero-container {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 3.5rem;
          align-items: center;
          width: 100%;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-pill, 9999px);
          font-size: 0.7rem;
          color: var(--text-secondary, #94a3b8);
          letter-spacing: 0.05em;
          align-self: flex-start;
        }

        .hero-badge__dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent, #facc15);
          flex-shrink: 0;
          animation: pulse-dot 2.4s ease-in-out infinite;
        }

        .hero-sub {
          font-size: clamp(1rem, 2.5vw, 1.3rem);
          color: var(--accent, #facc15);
          letter-spacing: 0.02em;
          opacity: 0.85;
          margin-top: -0.2rem;
        }

        .hero-bio {
          font-family: var(--font-mono), monospace;
          font-size: clamp(0.85rem, 1.8vw, 1rem);
          color: var(--text-secondary, #94a3b8);
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
          color: var(--text-primary, #f8fafc);
          line-height: 1;
        }

        .stat__label {
          font-size: 0.62rem;
          color: var(--text-muted, #64748b);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .stat-divider {
          width: 1px;
          height: 38px;
          background: var(--glass-border, rgba(255, 255, 255, 0.1));
          margin-inline: 1.5rem;
        }

        /* ── Modern Glassmorphic HUD Deck ── */
        .hero-card-deck {
          position: relative;
          height: 480px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          perspective: 1200px;
        }

        .hud-card {
          position: absolute;
          width: 330px;
          padding: 0.85rem;
          border-radius: 1rem;
          background: rgba(18, 22, 32, 0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 
            0 20px 40px -15px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }

        .hud-card:hover {
          background: rgba(22, 28, 40, 0.75);
          border-color: rgba(250, 204, 21, 0.45);
          box-shadow: 
            0 25px 50px -10px rgba(0, 0, 0, 0.8),
            0 0 30px rgba(250, 204, 21, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .hud-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.65rem;
          padding-inline: 0.2rem;
        }

        .hud-card__dots {
          display: flex;
          gap: 0.35rem;
        }

        .hud-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
        }

        .hud-card__tag {
          font-size: 0.6rem;
          color: var(--text-muted, #64748b);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hud-card__image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 0.65rem;
          overflow: hidden;
          background: #090c12;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .hud-card__glare {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            125deg,
            rgba(255, 255, 255, 0.12) 0%,
            transparent 40%
          );
          pointer-events: none;
        }

        .hud-card__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.65rem;
          padding-inline: 0.2rem;
        }

        .hud-card__title {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary, #f8fafc);
          letter-spacing: -0.01em;
        }

        .hud-card__arrow {
          font-size: 0.8rem;
          color: var(--text-muted, #64748b);
          transition: transform 0.25s ease, color 0.25s ease;
        }

        .hud-card:hover .hud-card__arrow {
          color: var(--accent, #facc15);
          transform: translate(2px, -2px);
        }

        /* ── Infinite Pinterest Carousel ── */
        .pinterest-gallery {
          padding-block: 5rem 3rem;
          background: var(--bg-primary, #06070a);
          overflow: hidden;
        }

        .gallery-header {
          margin-bottom: 2rem;
        }

        .gallery-header__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .gallery-tag,
        .gallery-count {
          font-size: 0.7rem;
          color: var(--text-muted, #64748b);
          letter-spacing: 0.08em;
        }

        .gallery-title {
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 500;
          color: var(--text-primary, #f8fafc);
          letter-spacing: -0.02em;
        }

        .infinite-carousel-wrap {
          width: 100%;
          overflow: hidden;
          padding-block: 1rem;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }

        .infinite-carousel-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marquee 35s linear infinite;
        }

        .infinite-carousel-wrap:hover .infinite-carousel-track {
          animation-play-state: paused;
        }

.pin-detail-wrapper {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
}

.pin-detail-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.72rem;
  color: var(--accent, #facc15);
  letter-spacing: 0.08em;
  margin-bottom: 1.5rem;
}

.pin-detail-nav {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.nav-btn {
  background: transparent;
  border: none;
  color: var(--accent, #facc15);
  cursor: pointer;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  opacity: 0.8;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.nav-btn:hover {
  opacity: 1;
  transform: translateY(-1px);
}

.nav-divider {
  color: rgba(255, 255, 255, 0.2);
}

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .pin-card {
          width: 310px;
          flex-shrink: 0;
          cursor: pointer;
          border-radius: 0.85rem;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
        }

        .pin-card:hover {
          transform: translateY(-6px);
          border-color: rgba(250, 204, 21, 0.4);
          box-shadow: 0 16px 32px -10px rgba(0, 0, 0, 0.6);
        }

        .pin-card--active {
          border-color: var(--accent, #facc15);
        }

        .pin-card__frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: #0d1117;
        }

        .pin-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pin-card:hover .pin-card__img {
          transform: scale(1.05);
        }

        .pin-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(6, 7, 10, 0.8) 0%,
            transparent 40%
          );
          opacity: 0;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 1rem;
          transition: opacity 0.3s ease;
        }

        .pin-card:hover .pin-card__overlay {
          opacity: 1;
        }

        .pin-card__index {
          font-size: 0.65rem;
          color: #fff;
          letter-spacing: 0.05em;
        }

        .pin-card__arrow {
          font-size: 0.85rem;
          color: var(--accent, #facc15);
        }

        .pin-card__caption {
          padding: 0.85rem 1rem;
        }

        .pin-card__meta {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .pin-card__title {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-primary, #f8fafc);
          letter-spacing: -0.01em;
        }

        .pin-card__cat {
          font-size: 0.62rem;
          color: var(--text-muted, #64748b);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .pin-detail-wrapper {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px dashed rgba(255, 255, 255, 0.1);
        }

        .pin-detail-bar {
          font-size: 0.68rem;
          color: var(--accent, #facc15);
          letter-spacing: 0.08em;
          margin-bottom: 1.5rem;
        }

        /* ── Pre-Footer CTA with Live Surabaya Clock ── */
        .cta-section {
          position: relative;
          padding-block: 7rem 5rem;
          background: var(--bg-primary, #06070a);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }

        .cta-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .cta-step,
        .cta-availability {
          font-size: 0.68rem;
          color: var(--text-muted, #64748b);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .cta-availability {
          color: var(--accent, #facc15);
        }

        .cta-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
        }

        .cta-main {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 4rem;
          align-items: flex-end;
        }

        .cta-text-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .cta-subheading {
          font-size: 0.75rem;
          color: var(--text-muted, #64748b);
          letter-spacing: 0.12em;
        }

        .cta-headline {
          font-size: clamp(2.5rem, 5.5vw, 4.2rem);
          font-weight: 600;
          color: var(--text-primary, #f8fafc);
          line-height: 1.05;
          letter-spacing: -0.03em;
        }

        .cta-headline__accent {
          color: var(--accent, #facc15);
          font-style: italic;
          font-weight: 400;
        }

        .cta-bio {
          font-size: clamp(0.85rem, 1.5vw, 0.95rem);
          color: var(--text-secondary, #94a3b8);
          line-height: 1.7;
          max-width: 46ch;
          margin-top: 0.5rem;
        }

        .cta-card {
          padding: 1.75rem;
          border-radius: 1.25rem;
          background: rgba(18, 22, 32, 0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .cta-card:hover {
          border-color: rgba(250, 204, 21, 0.3);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);
        }

        .cta-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.68rem;
          color: var(--text-muted, #64748b);
          letter-spacing: 0.05em;
        }

        .cta-card__time-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
        }

        .cta-card__dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .cta-card__dot--active {
          background: #22c55e;
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.6);
          animation: pulse-dot 2s infinite;
        }

        .cta-card__dot--idle {
          background: #f59e0b;
        }

        .cta-card__clock {
          color: var(--text-primary, #f8fafc);
          font-family: var(--font-mono), monospace;
        }

        .cta-card__body {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .cta-card__prompt {
          font-size: 0.8rem;
          color: var(--text-secondary, #94a3b8);
        }

        .cta-email-link {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--text-primary, #f8fafc);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          transition: color 0.2s ease;
        }

        .cta-email-link:hover {
          color: var(--accent, #facc15);
        }

        .cta-email-arrow {
          transition: transform 0.2s ease;
        }

        .cta-email-link:hover .cta-email-arrow {
          transform: translate(3px, -3px);
        }

        .cta-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px dashed rgba(255, 255, 255, 0.1);
        }

        .cta-btn {
          padding: 0.6rem 1.25rem;
          font-size: 0.8rem;
        }

        .cta-response-time {
          font-size: 0.65rem;
          color: var(--text-muted, #64748b);
        }

        @media (max-width: 992px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .hero-card-deck {
            height: 440px;
          }

          .hud-card {
            width: 300px;
          }

          .cta-main {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .cta-section {
            padding-block: 5rem 3.5rem;
          }
        }

        /* ── Footer ── */
        .site-footer {
          position: relative;
          border-top: 1px solid var(--glass-border, rgba(255, 255, 255, 0.1));
          padding-block: 3.5rem 2.5rem;
          margin-top: 0;
          overflow: hidden;
        }

        .footer-content {
          position: relative;
          z-index: 2;
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
          color: var(--text-primary, #f8fafc);
          letter-spacing: -0.01em;
        }

        .footer-copy {
          font-size: 0.68rem;
          color: var(--text-muted, #64748b);
          letter-spacing: 0.04em;
        }

        .footer-links {
          display: flex;
          gap: 1.75rem;
          flex-wrap: wrap;
        }

        .footer-link {
          font-size: 0.72rem;
          color: var(--text-muted, #64748b);
          letter-spacing: 0.05em;
          transition: color 0.2s;
        }

        .footer-link:hover { color: var(--accent, #facc15); }

        .footer-line {
          height: 1px;
          background: var(--glass-border, rgba(255, 255, 255, 0.1));
          margin-bottom: 1.25rem;
        }

        .footer-tagline {
          font-size: 0.68rem;
          color: var(--text-muted, #64748b);
          letter-spacing: 0.04em;
          opacity: 0.6;
        }
      `}</style>
    </main>
  );
}
