"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { ReactNode } from "react";

export default function GlowWrapper({ children, className = "" }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(350px circle at ${x}px ${y}px, rgba(212, 175, 55, 0.24), transparent 75%)`;

  return (
    <div
      className={`relative isolate overflow-hidden ${className}`}
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - bounds.left);
        y.set(event.clientY - bounds.top);
        opacity.set(1);
      }}
      onPointerLeave={() => opacity.set(0)}
      onPointerCancel={() => opacity.set(0)}
    >
      {children}
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10" style={{ background, opacity }} />
    </div>
  );
}
