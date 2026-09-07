"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

interface LuxuryDrawerProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  fullScreen?: boolean;
}

/** Native modal semantics keep background content inert and keyboard focus inside. */
export default function LuxuryDrawer({ open, title, onClose, children, fullScreen = false }: LuxuryDrawerProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const overflow = document.documentElement.style.overflow;
    element?.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = overflow;
    };
  }, [open]);

  return (
    <dialog
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      data-lenis-prevent
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 text-white backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <AnimatePresence onExitComplete={() => { if (!open) dialog.current?.close(); }}>
        {open && (
          <motion.div key="drawer" className="relative flex h-full justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.2 }}>
            <button type="button" tabIndex={-1} aria-label={`Close ${title}`} onClick={onClose} className="absolute inset-0" />
            <motion.div
              initial={{ x: reduced ? 0 : "100%" }} animate={{ x: 0 }} exit={{ x: reduced ? 0 : "100%" }}
              transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex h-full w-full flex-col border-l border-zinc-800 bg-[#0a0a0a] ${fullScreen ? "" : "sm:max-w-lg"}`}
            >
              <header className="flex shrink-0 items-center justify-between gap-4 border-b border-zinc-800 p-5 sm:p-6">
                <h2 id={headingId} className="font-serif text-2xl">{title}</h2>
                <button type="button" autoFocus aria-label={`Close ${title}`} onClick={onClose} className="flex size-11 items-center justify-center text-amber-300 hover:text-white"><X size={20} /></button>
              </header>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-6">{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}
