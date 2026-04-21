"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * StaggerContainer Component
 * Container untuk animasi stagger (bertahap) saat masuk viewport
 * Children akan muncul satu per satu dengan delay
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate (should be multiple items)
 * @param {number} props.staggerDelay - Delay between each child animation in seconds (default: 0.1)
 * @param {number} props.duration - Duration of each animation in seconds (default: 0.5)
 * @param {string} props.className - Additional CSS classes for container
 */
export default function StaggerContainer({
  children,
  staggerDelay = 0.1,
  duration = 0.5,
  className,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children && (
            <motion.div variants={itemVariants}>
              {children}
            </motion.div>
          )}
    </motion.div>
  );
}
