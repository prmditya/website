"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

export default function ProjectCard({
  project,
  isActive,
  onClick,
  index,
}: ProjectCardProps) {
  return (
    <motion.button
      className={`project-card glass glass-hover${isActive ? " project-card--active" : ""}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="project-card__emoji">{project.emoji}</div>
      <div className="project-card__body">
        <div className="project-card__header">
          <span className="project-card__year mono">{project.year}</span>
          {isActive && <span className="project-card__active-dot" />}
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.shortDescription}</p>
        <div className="project-card__tags">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="tag">+{project.tech.length - 3}</span>
          )}
        </div>
      </div>
      <div className="project-card__arrow">↗</div>

      <style>{`
        .project-card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          width: 280px;
          min-width: 280px;
          text-align: left;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          color: var(--text-primary);
          transition:
            background 0.25s var(--ease-out),
            border-color 0.25s var(--ease-out),
            box-shadow 0.25s var(--ease-out);
        }

        .project-card--active {
          background: rgba(110, 231, 183, 0.06) !important;
          border-color: rgba(110, 231, 183, 0.25) !important;
          box-shadow: 0 0 32px rgba(110, 231, 183, 0.1), inset 0 0 0 1px rgba(110, 231, 183, 0.15) !important;
        }

        /* Inner glow shimmer on active */
        .project-card--active::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 50% at 10% 0%, rgba(110, 231, 183, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .project-card__emoji {
          font-size: 2rem;
          line-height: 1;
        }

        .project-card__body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .project-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .project-card__year {
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }

        .project-card__active-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px var(--accent);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.85); }
        }

        .project-card__title {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--text-primary);
        }

        .project-card__desc {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-top: 0.35rem;
        }

        .project-card__arrow {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          transition: color 0.2s, transform 0.2s;
        }

        .project-card:hover .project-card__arrow {
          color: var(--accent);
          transform: translate(2px, -2px);
        }
      `}</style>
    </motion.button>
  );
}
