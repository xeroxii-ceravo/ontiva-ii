"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;

    const syncPreference = () => {
      lenis?.destroy();
      lenis = undefined;
      if (preference.matches) return;

      lenis = new Lenis({
        autoRaf: true,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        // Keep drawers and other independently scrolling regions native.
        prevent: (node) => node.getAttribute("role") === "dialog",
      });
    };

    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => {
      preference.removeEventListener("change", syncPreference);
      lenis?.destroy();
    };
  }, []);

  // No layout wrapper: fixed navigation and drawers retain viewport positioning.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
