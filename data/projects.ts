export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  tech: string[];
  github?: string;
  live?: string;
  emoji: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: "project-one",
    title: "Project One",
    shortDescription:
      "A full-stack web app for managing tasks with a clean, minimalist interface.",
    longDescription:
      "Built from scratch as a weekend project. This app lets teams track progress without the overhead of enterprise tools. Focused on speed, simplicity, and keyboard-first navigation. Backend in Node.js + PostgreSQL, frontend in React.",
    tech: ["React", "Node.js", "PostgreSQL", "TypeScript"],
    github: "https://github.com",
    live: "https://example.com",
    emoji: "🗂️",
    year: "2024",
  },
  {
    id: "project-two",
    title: "Project Two",
    shortDescription:
      "Real-time data dashboard with websocket support and animated charts.",
    longDescription:
      "Designed for monitoring live metrics across distributed systems. The dashboard supports multiple data sources and updates in real-time via WebSockets. Built custom chart components for performance and minimal bundle size.",
    tech: ["Next.js", "WebSocket", "D3.js", "Prisma"],
    github: "https://github.com",
    emoji: "📊",
    year: "2024",
  },
  {
    id: "project-three",
    title: "Project Three",
    shortDescription:
      "CLI tool that automates repetitive dev workflows with a simple config file.",
    longDescription:
      "Tired of repeating the same shell commands across projects, I built a small CLI utility that reads a YAML config and chains tasks together. Supports hooks, parallelism, and optional notifications.",
    tech: ["Go", "YAML", "Shell", "GitHub Actions"],
    github: "https://github.com",
    emoji: "⚡",
    year: "2023",
  },
  {
    id: "project-four",
    title: "Project Four",
    shortDescription:
      "Mobile app for tracking personal finances with smart categorization.",
    longDescription:
      "A React Native app that connects to bank exports and uses rule-based categorization to build monthly spending reports. Includes trend charts and a weekly summary notification system.",
    tech: ["React Native", "Expo", "SQLite", "Python"],
    github: "https://github.com",
    live: "https://example.com",
    emoji: "💰",
    year: "2023",
  },
  {
    id: "project-five",
    title: "Project Five",
    shortDescription:
      "Open-source plugin for extending VS Code with AI-assisted code review.",
    longDescription:
      "A VS Code extension that integrates with local LLMs (via Ollama) or OpenAI to provide contextual code review comments directly in the editor. Supports custom review rulesets and inline diff suggestions.",
    tech: ["TypeScript", "VS Code API", "Ollama", "OpenAI API"],
    github: "https://github.com",
    emoji: "🤖",
    year: "2025",
  },
];
