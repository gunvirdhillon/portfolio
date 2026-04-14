"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

type MotionStaggerProps = {
  children: ReactNode;
  className?: string;
};

export function MotionStagger({ children, className }: MotionStaggerProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : 0.08,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type MotionItemProps = {
  children: ReactNode;
  className?: string;
};

export function MotionItem({ children, className }: MotionItemProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduced
          ? { opacity: 1, y: 0 }
          : { opacity: 1, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
