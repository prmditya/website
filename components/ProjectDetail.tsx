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
              {/* SVG Official GitHub Logo */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>github</span>
            </a>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="pd-btn pd-btn--live mono"
            >
              <span>live demo</span> ↗
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
            <span className="pd-path">~/projects/{slug}</span>
            <span className="pd-fig-tag">FIG. {fig}</span>
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
          </div>
        </div>
      </figure>

      <style jsx>{`
        :global(.pd-card) {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: 2.5rem;
          width: 100%;
          padding: 2.5rem;
          box-sizing: border-box;
          align-items: center;
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background-color: #0b0d12;
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.04) 1px,
            transparent 1px
          );
          background-size: 18px 18px;
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
          gap: 0.5rem;
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
          border-color: rgba(255, 255, 255, 0.25);
        }

        .pd-btn--live {
          background: #facc15;
          color: #0d1117;
          font-weight: 600;
          box-shadow: 0 4px 20px rgba(250, 204, 21, 0.25);
        }
        .pd-btn--live:hover {
          background: #eab308;
          transform: translateY(-1px);
        }

        /* Overlapping terminal window */
        .pd-figure {
          position: relative;
          margin: 0;
          z-index: 2;
        }

        .pd-window {
          position: relative;
          border-radius: 0.85rem;
          background: #0f1219;
          border: 1px solid rgba(255, 255, 255, 0.12);
          overflow: hidden;
          box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.8);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .pd-figure::before {
          content: "";
          position: absolute;
          inset: -6px;
          border: 1px dashed rgba(250, 204, 21, 0.3);
          border-radius: 1.1rem;
          pointer-events: none;
          z-index: -1;
          transition: border-color 0.3s ease;
        }

        .pd-figure:hover .pd-window {
          transform: translateY(-3px);
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9);
        }

        .pd-figure:hover::before {
          border-color: rgba(250, 204, 21, 0.6);
        }

        .pd-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0.9rem;
          background: #141822;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.7rem;
          color: #64748b;
        }

        .pd-dots {
          display: flex;
          gap: 0.4rem;
          align-items: center;
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
          color: #94a3b8;
          font-size: 0.68rem;
          margin-left: 0.5rem;
          margin-right: auto;
        }

        .pd-fig-tag {
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          color: #facc15;
          background: rgba(250, 204, 21, 0.1);
          padding: 0.15rem 0.5rem;
          border-radius: 0.3rem;
          border: 1px solid rgba(250, 204, 21, 0.2);
          flex-shrink: 0;
        }

        .pd-screen {
          position: relative;
          aspect-ratio: 16 / 10;
          background: #0a0c10;
          overflow: hidden;
        }

        .pd-screen :global(.pd-screen-img) {
          object-fit: cover;
          object-position: top;
          transition: transform 0.4s ease;
        }

        .pd-figure:hover .pd-screen :global(.pd-screen-img) {
          transform: scale(1.02);
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

        @media (max-width: 900px) {
          :global(.pd-card) {
            grid-template-columns: minmax(0, 1fr);
            width: 100%;
            gap: 2rem;
            padding: 1.5rem;
          }
          .pd-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </motion.div>
  );
}
