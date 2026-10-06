"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const techList = project.tech || [];
  const liveLink = (project as Project & { live?: string }).live;
  const slug = project.title
    ? project.title.toLowerCase().replace(/\s+/g, "-")
    : "project";
  const fig = String(project.id).padStart(2, "0");

  // Fall back to NO SIGNAL screen if image fails or is missing
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [project.id]);

  const showImage = Boolean(project.image) && !imgFailed;
  const isGif = project.image?.toLowerCase().endsWith(".gif") ?? false;

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="pd-card"
    >
      {/* Left: Content details */}
      <div className="pd-content">
        <div className="pd-header">
          <div className="pd-icon">
            <span role="img" aria-label="folder">
              📁
            </span>
          </div>
          <div>
            <span className="pd-tag mono">PROJECT DETAIL</span>
            <h3 className="pd-title">{project.title}</h3>
          </div>
        </div>

        <p className="pd-desc mono">{project.longDescription}</p>

        <div className="pd-stack">
          <span className="pd-stack-title mono">// tech stack</span>
          <div className="pd-tags">
            {techList.map((t) => (
              <span key={t} className="pd-badge mono">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="pd-actions">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="pd-btn pd-btn--github mono"
            >
              <span>🐱</span> github
            </a>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="pd-btn pd-btn--live mono"
            >
              live ↗
            </a>
          )}
        </div>
      </div>

      {/* Right: Overlapping terminal preview */}
      <figure className="pd-figure">
        <div className="pd-window">
          <div className="pd-bar mono">
            <span className="pd-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="pd-path">~/projects/{slug}/preview</span>
          </div>

          <div className="pd-screen">
            {showImage && project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                className="pd-screen-img"
                unoptimized={isGif}
                onError={() => setImgFailed(true)}
              />
            ) : (
              <div className="pd-nosignal mono">
                <span>NO SIGNAL</span>
                <small>
                  preview not found<span className="pd-cursor">_</span>
                </small>
              </div>
            )}
            <div className="pd-scanlines" />
          </div>
        </div>

        <figcaption className="pd-caption mono">
          fig. {fig} — {project.title}
        </figcaption>
      </figure>

      <style jsx>{`
        :global(.pd-card) {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 3rem;
          width: 100%;
          padding: 2.75rem;
          box-sizing: border-box;
          align-items: center;
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.07);
          background-color: #0b0d12;
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.045) 1px,
            transparent 1px
          );
          background-size: 18px 18px;
          overflow: visible;
        }

        .pd-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          min-width: 0;
        }

        .pd-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .pd-icon {
          font-size: 1.4rem;
          background: rgba(250, 204, 21, 0.1);
          border: 1px solid rgba(250, 204, 21, 0.2);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          flex-shrink: 0;
        }

        .pd-tag {
          display: block;
          font-size: 0.65rem;
          color: #facc15;
          letter-spacing: 0.1em;
          margin-bottom: 0.2rem;
        }

        .pd-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
          line-height: 1.2;
        }

        .pd-desc {
          font-size: 0.85rem;
          color: #94a3b8;
          line-height: 1.75;
          margin: 0;
        }

        .pd-stack {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .pd-stack-title {
          font-size: 0.7rem;
          color: #facc15;
          letter-spacing: 0.05em;
        }

        .pd-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .pd-badge {
          font-size: 0.72rem;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          background: rgba(250, 204, 21, 0.08);
          color: #facc15;
          border: 1px solid rgba(250, 204, 21, 0.25);
        }

        .pd-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .pd-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .pd-btn--github {
          background: rgba(255, 255, 255, 0.06);
          color: #f8fafc;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .pd-btn--github:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .pd-btn--live {
          background: #facc15;
          color: #0d1117;
          font-weight: 600;
          box-shadow: 0 4px 20px rgba(250, 204, 21, 0.3);
        }
        .pd-btn--live:hover {
          background: #eab308;
          transform: translateY(-1px);
        }

        /* Overlapping terminal window */
        .pd-figure {
          position: relative;
          margin: -2.5rem -1.5rem -1rem 0;
          z-index: 2;
        }

        .pd-window {
          position: relative;
          border-radius: 0.9rem;
          background: #0f1219;
          border: 1px solid rgba(255, 255, 255, 0.12);
          overflow: hidden;
          transform: rotate(1.6deg);
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 35px 70px -25px rgba(0, 0, 0, 0.95);
        }

        .pd-figure::before {
          content: "";
          position: absolute;
          inset: 0;
          border: 1px dashed rgba(250, 204, 21, 0.45);
          border-radius: 0.9rem;
          transform: translate(14px, 14px) rotate(1.6deg);
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
        }

        .pd-figure:hover .pd-window {
          transform: rotate(0deg) translateY(-4px);
        }
        .pd-figure:hover::before {
          transform: translate(10px, 10px) rotate(0deg);
        }

        .pd-bar {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          padding: 0.65rem 0.9rem;
          background: #151922;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          font-size: 0.68rem;
          color: #64748b;
        }

        .pd-dots {
          display: flex;
          gap: 0.4rem;
        }
        .pd-dots i {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #334155;
        }
        .pd-dots i:nth-child(1) {
          background: #f87171;
        }
        .pd-dots i:nth-child(2) {
          background: #facc15;
        }
        .pd-dots i:nth-child(3) {
          background: #4ade80;
        }

        .pd-path {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pd-screen {
          position: relative;
          aspect-ratio: 16 / 11;
          background: #0a0c10;
          overflow: hidden;
        }

        .pd-screen :global(.pd-screen-img) {
          object-fit: cover;
          object-position: top;
        }

        .pd-scanlines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0,
            rgba(0, 0, 0, 0) 2px,
            rgba(0, 0, 0, 0.16) 3px
          );
          box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.55);
        }

        .pd-nosignal {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #facc15;
        }
        .pd-nosignal span {
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: 0.3em;
        }
        .pd-nosignal small {
          font-size: 0.7rem;
          color: #64748b;
        }
        .pd-cursor {
          animation: pd-blink 1s steps(2, start) infinite;
        }
        @keyframes pd-blink {
          to {
            visibility: hidden;
          }
        }

        .pd-caption {
          margin-top: 1.4rem;
          text-align: right;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #475569;
        }

        @media (max-width: 900px) {
          :global(.pd-card) {
            grid-template-columns: minmax(0, 1fr);
            width: 100%;
            gap: 2rem;
            padding: 1.5rem;
          }
          .pd-figure {
            margin: 0;
          }
          .pd-window,
          .pd-figure:hover .pd-window {
            transform: none;
          }
          .pd-figure::before {
            display: none;
          }
          .pd-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </motion.div>
  );
}
