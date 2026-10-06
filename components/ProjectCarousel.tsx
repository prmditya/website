"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

interface ProjectCarouselProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export default function ProjectCarousel({
  activeId,
  onSelect,
}: ProjectCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="carousel-wrapper">
      {/* Fade edges */}
      <div className="carousel-fade carousel-fade--left" />
      <div className="carousel-fade carousel-fade--right" />

      <motion.div
        ref={trackRef}
        className="carousel-track"
        drag="x"
        dragConstraints={trackRef}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            isActive={activeId === project.id}
            index={index}
            onClick={() => {
              if (!isDragging) {
                onSelect(project.id);
                // Scroll to detail section smoothly
                setTimeout(() => {
                  document
                    .getElementById("project-detail")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 50);
              }
            }}
          />
        ))}
      </motion.div>

      <style>{`
        .carousel-wrapper {
          position: relative;
          margin-inline: calc(-1 * clamp(1.25rem, 5vw, 2.5rem));
          overflow: hidden;
        }

        .carousel-track {
          display: flex;
          gap: 1rem;
          padding: 1.5rem clamp(1.25rem, 5vw, 2.5rem);
          width: max-content;
          user-select: none;
        }

        .carousel-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }

        .carousel-fade--left {
          left: 0;
          background: linear-gradient(to right, var(--bg-base), transparent);
        }

        .carousel-fade--right {
          right: 0;
          background: linear-gradient(to left, var(--bg-base), transparent);
        }
      `}</style>
    </div>
  );
}
