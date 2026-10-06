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
  image: string;
  category?: string;
}

export const projects: Project[] = [
  {
    id: "project-one",
    title: "Kampoeng Tani",
    shortDescription:
      "Webapp for managing agricultural IoT devices and monitoring farm data in real-time.",
    longDescription:
      "A comprehensive platform for farmers to monitor soil moisture, temperature, and crop health using IoT sensors. The webapp provides real-time analytics, device management, and automated alerts for optimal farm management.",
    tech: ["Next.js", "PostgreSQL", "FastAPI"],
    github: "https://github.com/prmditya/kampoeng-tani",
    emoji: "🌾",
    year: "2025",
    image: "/assets/projects/kampoeng-tani.png",
  },
  {
    id: "project-two",
    title: "Mesh LoRa Based Wildfire Detection System",
    shortDescription:
      "A wireless sensor network for detecting and reporting wildfires in real-time.",
    longDescription:
      "An IoT-based system that uses a mesh network of LoRa-enabled sensors to detect smoke and heat signatures. The system transmits data to a central hub, which then alerts emergency responders and generates reports for analysis.",
    tech: ["ESP32", "LoRa", "Python", "LoRaMesher"],
    github: "https://github.com/prmditya/wildfire-loramesh-system",
    emoji: "🔥",
    year: "2026",
    image: "/assets/projects/wildfire-detection.jpg",
  },
  {
    id: "project-three",
    title: "Freewrite",
    shortDescription: "CLI based freewriting tool for writers.",
    longDescription:
      "A command-line interface tool that helps writers practice freewriting. It provides a distraction-free environment, tracks writing sessions, and offers prompts to inspire creativity. Built with Node.js and supports multiple platforms.",
    tech: ["Rust"],
    github: "https://github.com/prmditya/freewrite",
    emoji: "📝",
    year: "2025",
    image: "/assets/projects/freewrite.png",
  },
  {
    id: "project-four",
    title: "Smart Lele",
    shortDescription:
      "An IoT-based smart catfish water quality control system and monitoring dashboard.",
    longDescription:
      "A complete solution for aquaculture farmers to monitor and control water quality parameters such as pH, temperature, and dissolved oxygen. The system uses IoT sensors connected to a microcontroller that sends data to a cloud dashboard for real-time monitoring and alerts.",
    tech: ["ESP32", "Arduino", "Amazon Web Services"],
    github: "https://github.com/prmditya/smart-lele",
    emoji: "🐟",
    year: "2025",
    image: "/assets/projects/smart-lele.png",
  },
  {
    id: "project-five",
    title: "Phish Guard",
    shortDescription:
      "A website that can detect phishing websites and provide a safe browsing experience.",
    longDescription:
      "Phish Guard is a web application that helps users identify and avoid phishing websites. It uses advanced algorithms to analyze website content, URLs, and other indicators to determine the likelihood of a site being malicious. The platform provides real-time alerts and recommendations for safe browsing, helping users protect their personal information and online security.",
    tech: ["Flask", "Scikit-Learn", "Vanilla Web"],
    github: "https://github.com/prmditya/phish-guard",
    live: "https://phish-guard-ctlj.onrender.com/",
    emoji: "🛡️",
    year: "2025",
    image: "/assets/projects/phish-guard.png",
  },
];
