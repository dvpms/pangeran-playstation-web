"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * ScrollReveal Component
 * Animasi reveal saat elemen masuk viewport (scroll)
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {string} props.animation - Type of animation: 'fadeInUp', 'fadeInLeft', 'fadeInRight', 'fadeIn' (default: 'fadeInUp')
 * @param {number} props.duration - Duration in seconds (default: 0.6)
 * @param {string} props.className - Additional CSS classes
 */
export default function ScrollReveal({
  children,
  animation = "fadeInUp",
  duration = 0.6,
  className,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const animationVariants = {
    fadeInUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 },
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  const variant = animationVariants[animation] || animationVariants.fadeInUp;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
      transition={{
        duration,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
