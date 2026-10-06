"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TITLES = [
  "full-stack developer",
  "software engineer",
  "kitten lover ᨐฅ",
  "vibe coder (╯'□')╯︵ ┻━┻",
];

export default function TypewriterSubtitle() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = TITLES[titleIndex];

    // Smooth timing delays
    let delay = isDeleting ? 35 : 75;

    if (!isDeleting && displayText === currentFullText) {
      // Pause at full word before starting deletion
      delay = 2200;
    } else if (isDeleting && displayText === "") {
      // Small pause before typing next word
      delay = 400;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % TITLES.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <p className="hero-sub mono inline-flex items-center">
      <span className="mr-2">&gt;⠀</span>
      <span>{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="text-[var(--accent)] font-bold ml-0.5"
      >
        _
      </motion.span>
    </p>
  );
}
