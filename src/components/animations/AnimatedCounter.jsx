"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * AnimatedCounter Component
 * Number counter yang berjalan dari 0 ke nilai target saat elemen masuk viewport
 * @param {Object} props
 * @param {number} props.from - Start value (default: 0)
 * @param {number} props.to - End value (required)
 * @param {number} props.duration - Duration in seconds (default: 2)
 * @param {string} props.suffix - Text to append after number (e.g., 'k', '+')
 * @param {string} props.className - Additional CSS classes
 */
export default function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = "",
  className,
  format = (value) => Math.floor(value),
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => format(latest));

  useEffect(() => {
    let animation;

    if (isInView) {
      animation = animate(count, to, {
        duration,
        ease: "easeOut",
      });
    }

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [isInView, count, to, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
      {suffix}
    </motion.span>
  );
}
