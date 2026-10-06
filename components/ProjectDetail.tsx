"use client";

import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";

interface ProjectDetailProps {
  activeId: string;
}

export default function ProjectDetail({ activeId }: ProjectDetailProps) {
  const project = projects.find((p) => p.id === activeId) ?? projects[0];

  return (
    <div id="project-detail" className="project-detail-wrapper">
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          className="project-detail glass"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top bar */}
          <div className="detail-topbar">
            <span className="detail-emoji">{project.emoji}</span>
            <div className="detail-header">
              <p className="section-label mono">project detail</p>
              <h2 className="detail-title">{project.title}</h2>
            </div>
            <span className="detail-year mono">{project.year}</span>
          </div>

          {/* Divider */}
          <div className="detail-divider" />

          {/* Description */}
          <p className="detail-desc">{project.longDescription}</p>

          {/* Tech stack */}
          <div className="detail-section">
            <p className="detail-section-label mono">// tech stack</p>
            <div className="detail-tags">
              {project.tech.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {(project.github || project.live) && (
            <div className="detail-links">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  github
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  live ↗
                </a>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <style>{`
        .project-detail-wrapper {
          padding-top: 2rem;
        }

        .project-detail {
          border-radius: var(--radius-lg);
          padding: clamp(1.5rem, 4vw, 2.5rem);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .detail-topbar {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
        }

        .detail-emoji {
          font-size: 2.5rem;
          line-height: 1;
          flex-shrink: 0;
        }

        .detail-header {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .detail-title {
          font-family: var(--font-sans);
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .detail-year {
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          flex-shrink: 0;
          padding-top: 0.4rem;
        }

        .detail-divider {
          height: 1px;
          background: var(--glass-border);
        }

        .detail-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.75;
          max-width: 72ch;
        }

        .detail-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .detail-section-label {
          font-size: 0.7rem;
          color: var(--accent);
          opacity: 0.7;
          letter-spacing: 0.06em;
        }

        .detail-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .detail-links {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}
