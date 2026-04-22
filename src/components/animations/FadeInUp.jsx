"use client";

import { motion } from "framer-motion";

/**
 * FadeInUp Component
 * Animasi fade + slide up saat component mount
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {number} props.delay - Delay in seconds (default: 0)
 * @param {number} props.duration - Duration in seconds (default: 0.5)
 */
export default function FadeInUp({
  children,
  delay = 0,
  duration = 0.5,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
