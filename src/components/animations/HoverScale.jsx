"use client";

import { motion } from "framer-motion";

/**
 * HoverScale Component
 * Elemen dengan scale effect saat hover
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {number} props.scale - Scale value on hover (default: 1.1)
 * @param {number} props.duration - Duration in seconds (default: 0.3)
 * @param {string} props.className - Additional CSS classes
 */
export default function HoverScale({
  children,
  scale = 1.1,
  duration = 0.3,
  className,
}) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
