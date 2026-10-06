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

  // Hero Parallax & Scale-down Scroll Effect
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.92]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0.3]);
  const heroGridY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
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
    { rotate: -3, y: -40, x: -15, zIndex: 3 },
    { rotate: 3, y: 120, x: 25, zIndex: 2 },
    { rotate: -2, y: 280, x: 0, zIndex: 1 },
  ];

  const carouselProjects = [...projects, ...projects];

  return (
    <main className="relative bg-[var(--bg-primary,#06070a)] w-full max-w-[100vw] overflow-x-clip">
      {/* ══════════════════════════════════
          HERO SECTION (STICKY STACKING)
          ══════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="sticky top-0 h-auto lg:h-screen z-[1] will-change-transform"
      >
        <motion.div
          style={{ y: heroGridY }}
          className="absolute -inset-[15%] w-[100%] h-[100%] pointer-events-none z-0 opacity-[0.12]"
        >
          <div className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:70px_70px]" />
        </motion.div>
        <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_center,transparent_15%,var(--bg-primary,#06070a)_85%)]" />

        <div className="container relative z-[2] min-h-[100svh] grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-[2.5rem] lg:gap-[3.5rem] items-center pt-[calc(var(--nav-height,80px)+2rem)] pb-16 overflow-hidden">
          <div className="flex flex-col gap-[1.4rem]">
            <motion.div {...stagger(0)}>
              <div className="inline-flex items-center gap-[0.6rem] px-4 py-[0.4rem] rounded-full text-[0.7rem] text-[var(--text-secondary,#94a3b8)] tracking-[0.05em] self-start glass">
                <span className="w-[7px] h-[7px] rounded-full bg-[var(--accent,#facc15)] shrink-0 animate-pulse" />
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
                className="w-[180px] sm:w-[320px] h-auto"
              />
            </motion.div>

            <motion.div
              className="mono text-[clamp(1rem,2.5vw,1.3rem)] text-[var(--accent,#facc15)] tracking-[0.02em] opacity-85 -mt-[0.2rem]"
              {...stagger(2)}
            >
              <TypewriterSubtitle />
            </motion.div>

            <motion.p
              className="font-mono text-[clamp(0.85rem,1.8vw,1rem)] text-[var(--text-secondary,#94a3b8)] leading-[1.8] max-w-[52ch]"
              {...stagger(3)}
            >
              I build things for the web — from fast, clean UIs to scalable
              backends. I care about craft, performance, and shipping things
              that feel good to use.
            </motion.p>

            <motion.div
              className="flex gap-[0.75rem] flex-wrap"
              {...stagger(4)}
            >
              <a href="#projects" className="btn btn-primary">
                see my work ↓
              </a>
              <Link href="/contact" className="btn btn-ghost">
                reach me ↗
              </Link>
            </motion.div>

            <motion.div
              className="flex items-center gap-0 mt-[0.5rem] flex-wrap row-gap-[0.75rem]"
              {...stagger(5)}
            >
              {[
                { val: "5+", label: "projects" },
                { val: "1+", label: "years exp" },
                { val: "∞", label: "coffee" },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-[1.5rem]">
                  {i > 0 && (
                    <div className="w-[1px] h-[38px] bg-[var(--glass-border,rgba(255,255,255,0.1))] mx-[1.5rem]" />
                  )}
                  <div className="flex flex-col gap-[0.15rem]">
                    <span className="stat__val mono text-[1.5rem] font-bold text-[var(--text-primary,#f8fafc)] leading-none">
                      {s.val}
                    </span>
                    <span className="stat__label mono text-[0.62rem] text-[var(--text-muted,#64748b)] tracking-[0.1em] uppercase">
                      {s.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            style={{ y: cardsY }}
            className="relative h-[440px] lg:h-[480px] w-full flex justify-center items-start [perspective:1200px]"
          >
            {heroCards.map((project, idx) => {
              const pos = stackPositions[idx % stackPositions.length];
              return (
                <motion.div
                  key={project.id}
                  className="group absolute w-[300px] sm:w-[330px] p-[0.85rem] rounded-[1rem] bg-[rgba(18,22,32,0.55)] backdrop-blur-[16px] border border-[rgba(255,255,255,0.08)] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] cursor-pointer transition-all duration-300 hover:bg-[rgba(22,28,40,0.75)] hover:border-[rgba(250,204,21,0.45)] hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.8),0_0_30px_rgba(250,204,21,0.12),inset_0_1px_0_rgba(255,255,255,0.2)]"
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
                  <div className="flex items-center justify-between mb-[0.65rem] px-[0.2rem]">
                    <div className="flex gap-[0.35rem]">
                      <span className="w-[6px] h-[6px] rounded-full bg-[rgba(255,255,255,0.25)]" />
                      <span className="w-[6px] h-[6px] rounded-full bg-[rgba(255,255,255,0.25)]" />
                      <span className="w-[6px] h-[6px] rounded-full bg-[rgba(255,255,255,0.25)]" />
                    </div>
                    <span className="text-[0.6rem] text-[var(--text-muted,#64748b)] tracking-[0.08em] uppercase mono">
                      0{idx + 1} // {project.category || "PROJECT"}
                    </span>
                  </div>

                  <div className="relative w-full aspect-[16/9] rounded-[0.65rem] overflow-hidden bg-[#090c12] border border-[rgba(255,255,255,0.05)]">
                    <Image
                      src={project.image || "/assets/placeholder.jpg"}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      style={{ objectFit: "cover" }}
                      priority
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.12)_0%,transparent_40%)] pointer-events-none" />
                  </div>

                  <div className="flex items-center justify-between pt-[0.65rem] px-[0.2rem]">
                    <h4 className="text-[0.88rem] font-semibold text-[var(--text-primary,#f8fafc)] -tracking-[0.01em]">
                      {project.title}
                    </h4>
                    <span className="text-[0.8rem] text-[var(--text-muted,#64748b)] transition-all duration-250 ease-out group-hover:text-[var(--accent,#facc15)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px] mono">
                      ↗
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════
          CONTENT OVERLAY WRAPPER (Z-INDEX HIGH)
          ══════════════════════════════ */}
      <div className="relative z-[10] bg-[var(--bg-primary,#06070a)] shadow-[0_-40px_80px_rgba(0,0,0,0.9)] border-t border-[rgba(255,255,255,0.08)]">
        {/* INFINITE PINTEREST CAROUSEL */}
        <section
          id="projects"
          className="py-20 pb-12 bg-[var(--bg-primary,#06070a)] overflow-hidden"
        >
          <div className="container">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[0.7rem] text-[var(--text-muted,#64748b)] tracking-[0.08em] mono">
                  01 // EXHIBITION
                </span>
                <span className="text-[0.7rem] text-[var(--text-muted,#64748b)] tracking-[0.08em] mono">
                  [{projects.length} WORKS · INFINITE STREAM]
                </span>
              </div>
              <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-medium text-[var(--text-primary,#f8fafc)] -tracking-[0.02em]">
                Selected Works
              </h2>
            </motion.div>
          </div>

          <div className="group/wrap w-full max-w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-6 w-max animate-[marquee_35s_linear_infinite] group-hover/wrap:[animation-play-state:paused]">
              {carouselProjects.map((project, idx) => {
                const originalIndex = idx % projects.length;
                const isActive = project.id === activeProjectId;
                return (
                  <div
                    key={`${project.id}-${idx}`}
                    className={`group/card w-[310px] shrink-0 cursor-pointer rounded-[0.85rem] overflow-hidden bg-[rgba(255,255,255,0.02)] border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[rgba(250,204,21,0.4)] hover:shadow-[0_16px_32px_-10px_rgba(0,0,0,0.6)] ${
                      isActive
                        ? "border-[var(--accent,#facc15)]"
                        : "border-[rgba(255,255,255,0.06)]"
                    }`}
                    onClick={() => setActiveProjectId(project.id)}
                  >
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#0d1117]">
                      <Image
                        src={project.image || "/assets/placeholder.jpg"}
                        alt={project.title}
                        width={400}
                        height={500}
                        className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-105"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,7,10,0.8)_0%,transparent_40%)] opacity-0 group-hover/card:opacity-100 flex items-end justify-between p-4 transition-opacity duration-300">
                        <span className="text-[0.65rem] text-white tracking-[0.05em] mono">
                          No. 0{originalIndex + 1}
                        </span>
                        <span className="text-[0.85rem] text-[var(--accent,#facc15)] mono">
                          ↗
                        </span>
                      </div>
                    </div>

                    <div className="p-[0.85rem_1rem]">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-[0.9rem] font-medium text-[var(--text-primary,#f8fafc)] -tracking-[0.01em]">
                          {project.title}
                        </h3>
                        {project.category && (
                          <span className="text-[0.62rem] text-[var(--text-muted,#64748b)] tracking-[0.05em] uppercase mono">
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
                    className="mt-12 pt-8 border-t border-dashed border-[rgba(255,255,255,0.1)]"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center justify-between text-[0.72rem] text-[var(--accent,#facc15)] tracking-[0.08em] mb-6 mono">
                      <span>// EXHIBIT DETAILS — NO. 0{currentIndex + 1}</span>

                      <div className="flex items-center gap-[0.6rem]">
                        <button
                          onClick={handlePrev}
                          className="bg-transparent border-none text-[var(--accent,#facc15)] cursor-pointer text-[0.72rem] tracking-[0.05em] opacity-80 transition-all hover:opacity-100 hover:-translate-y-[1px] mono"
                          aria-label="Previous project"
                        >
                          ← Prev
                        </button>
                        <span className="text-[rgba(255,255,255,0.2)]">/</span>
                        <button
                          onClick={handleNext}
                          className="bg-transparent border-none text-[var(--accent,#facc15)] cursor-pointer text-[0.72rem] tracking-[0.05em] opacity-80 transition-all hover:opacity-100 hover:-translate-y-[1px] mono"
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

        {/* PRE-FOOTER CTA SECTION */}
        <section className="relative py-20 lg:py-28 lg:pb-20 bg-[var(--bg-primary,#06070a)] border-t border-[rgba(255,255,255,0.06)] overflow-hidden">
          <div className="container">
            <motion.div
              className="flex items-center gap-6 mb-16"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[0.68rem] text-[var(--text-muted,#64748b)] tracking-[0.1em] uppercase mono">
                02 // NEXT STEP
              </span>
              <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.08)]" />
              <span className="text-[0.68rem] text-[var(--accent,#facc15)] tracking-[0.1em] uppercase mono">
                AVAILABLE FOR Q4/Q1
              </span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-end">
              <motion.div
                className="flex flex-col gap-[1.25rem]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className="text-[0.75rem] text-[var(--text-muted,#64748b)] tracking-[0.12em] mono">
                  // DONE WITH LOOKING?
                </span>
                <h2 className="text-[clamp(2.5rem,5.5vw,4.2rem)] font-semibold text-[var(--text-primary,#f8fafc)] leading-[1.05] -tracking-[0.03em]">
                  Let’s start <br />
                  <span className="text-[var(--accent,#facc15)] italic font-normal">
                    building together.
                  </span>
                </h2>
                <p className="text-[clamp(0.85rem,1.5vw,0.95rem)] text-[var(--text-secondary,#94a3b8)] leading-[1.7] max-w-[46ch] mt-2 mono">
                  Have a project in mind, an idea to refine, or just want to
                  discuss software craft? Drop a line and let’s shape something
                  exceptional.
                </p>
              </motion.div>

              <motion.div
                className="p-[1.75rem] rounded-[1.25rem] bg-[rgba(18,22,32,0.55)] backdrop-blur-[16px] border border-[rgba(255,255,255,0.08)] flex flex-col gap-[1.5rem] transition-all duration-300 hover:border-[rgba(250,204,21,0.3)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] glass"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.75,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="flex items-center justify-between text-[0.68rem] text-[var(--text-muted,#64748b)] tracking-[0.05em] mono">
                  <span className="inline-flex items-center gap-[0.55rem]">
                    <span
                      className={`w-[7px] h-[7px] rounded-full shrink-0 ${
                        isBusinessHours
                          ? "bg-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse"
                          : "bg-[#f59e0b]"
                      }`}
                    />
                    <span>
                      SURABAYA, ID (UTC+7):{" "}
                      <strong className="text-[var(--text-primary,#f8fafc)] font-mono">
                        {surabayaTime || "--:--:--"}
                      </strong>
                    </span>
                  </span>
                </div>

                <div className="flex flex-col gap-[0.4rem]">
                  <p className="text-[0.8rem] text-[var(--text-secondary,#94a3b8)]">
                    {isBusinessHours
                      ? "Currently awake & active for inquiries"
                      : "Currently resting, but drop a line anytime!"}
                  </p>
                  <a
                    href="mailto:t.paramaditya@gmail.com"
                    className="group/mail text-[1.1rem] font-medium text-[var(--text-primary,#f8fafc)] no-underline inline-flex items-center gap-[0.4rem] transition-colors duration-200 hover:text-[var(--accent,#facc15)] mono"
                  >
                    t.paramaditya@gmail.com{" "}
                    <span className="transition-transform duration-200 group-hover/mail:translate-x-[3px] group-hover/mail:-translate-y-[3px]">
                      ↗
                    </span>
                  </a>
                </div>

                <div className="flex items-center justify-between gap-4 pt-4 border-t border-dashed border-[rgba(255,255,255,0.1)]">
                  <Link
                    href="/contact"
                    className="btn btn-primary px-[1.25rem] py-[0.6rem] text-[0.8rem]"
                  >
                    contact me ↓
                  </Link>
                  <span className="text-[0.65rem] text-[var(--text-muted,#64748b)] mono">
                    avg response: &lt; 24h
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          ref={footerRef}
          className="relative border-t border-[var(--glass-border,rgba(255,255,255,0.1))] py-14 pb-10 mt-0 overflow-hidden"
        >
          <motion.div
            style={{ y: footerGridY }}
            className="absolute -inset-[15%] w-[130%] h-[130%] pointer-events-none z-0 opacity-[0.12]"
          >
            <div className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:70px_70px]" />
          </motion.div>
          <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_center,transparent_15%,var(--bg-primary,#06070a)_85%)]" />

          <motion.div
            style={{ y: footerContentY }}
            className="container relative z-[2]"
          >
            <div className="flex items-end justify-between gap-8 flex-wrap mb-6">
              <div className="flex flex-col gap-[0.3rem]">
                <Image
                  src="/assets/logo-white.png"
                  alt="Ditya Logo"
                  width={69.5}
                  height={30}
                  sizes="100vw"
                  className="h-auto"
                />
              </div>
              <div className="flex gap-[1.75rem] flex-wrap">
                <a
                  href="https://github.com/prmditya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.72rem] text-[var(--text-muted,#64748b)] tracking-[0.05em] transition-colors duration-200 hover:text-[var(--accent,#facc15)] mono"
                >
                  github ↗
                </a>
                <a
                  href="mailto:t.paramaditya@gmail.com"
                  className="text-[0.72rem] text-[var(--text-muted,#64748b)] tracking-[0.05em] transition-colors duration-200 hover:text-[var(--accent,#facc15)] mono"
                >
                  email ↗
                </a>
                <Link
                  href="/contact"
                  className="text-[0.72rem] text-[var(--text-muted,#64748b)] tracking-[0.05em] transition-colors duration-200 hover:text-[var(--accent,#facc15)] mono"
                >
                  contact ↗
                </Link>
              </div>
            </div>
            <div className="h-[1px] bg-[var(--glass-border,rgba(255,255,255,0.1))] mb-[1.25rem]" />

            <p className="text-[0.68rem] text-[var(--text-muted,#64748b)] tracking-[0.04em] mono">
              © {new Date().getFullYear()} Ditya
            </p>
          </motion.div>
        </footer>
      </div>
    </main>
  );
}
