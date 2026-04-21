"use client";

import { motion } from "framer-motion";

/**
 * AnimatedButton Component
 * Button dengan hover dan tap effect menggunakan Framer Motion
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.hoverScale - Scale on hover (default: 1.05)
 * @param {number} props.tapScale - Scale on tap (default: 0.95)
 * @param {string} props.type - Button type (default: 'button')
 * @param {boolean} props.disabled - Button disabled state
 */
export default function AnimatedButton({
  children,
  onClick,
  className,
  hoverScale = 1.05,
  tapScale = 0.95,
  type = "button",
  disabled = false,
  ...props
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: hoverScale } : {}}
      whileTap={!disabled ? { scale: tapScale } : {}}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
