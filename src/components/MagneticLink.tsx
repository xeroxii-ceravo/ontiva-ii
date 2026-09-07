"use client";

import Link from "next/link";
import { motion, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

interface MagneticLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function MagneticLink({
  href,
  children,
  className,
}: MagneticLinkProps) {
  const x = useSpring(0, { stiffness: 180, damping: 22, mass: 0.3 });
  const y = useSpring(0, { stiffness: 180, damping: 22, mass: 0.3 });
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  function move(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      reset();
      return;
    }
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(
      Math.max(
        -8,
        Math.min(8, (event.clientX - bounds.left - bounds.width / 2) * 0.12),
      ),
    );
    y.set(
      Math.max(
        -6,
        Math.min(6, (event.clientY - bounds.top - bounds.height / 2) * 0.12),
      ),
    );
  }

  return (
    <div
      className="inline-flex"
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onBlur={reset}
    >
      <motion.div
        className="motion-magnetic"
        style={{ x, y }}
        whileHover={{ opacity: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <Link href={href} className={className}>
          {children}
        </Link>
      </motion.div>
    </div>
  );
}
