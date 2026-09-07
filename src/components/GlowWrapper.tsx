"use client";

import { motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

type GlowWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export default function GlowWrapper({ children, className = "" }: GlowWrapperProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Update mouse position on mousemove
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      x.set(clientX);
      y.set(clientY);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  // Create a radial gradient CSS string that follows the mouse
  const glowStyle = useMotionTemplate`
    radial-gradient(
      circle at ${x}px ${y}px,
      rgba(221, 200, 152, 0.15) 0%,
      rgba(221, 200, 152, 0) 40%
    );
  `;

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={{ background: glowStyle }}
    >
      {children}
    </motion.div>
  );
}