import React from "react";
import { motion } from "framer-motion";

interface MinimalPageTransitionProps {
  children: React.ReactNode;
}

const MinimalPageTransition: React.FC<MinimalPageTransitionProps> = ({
  children,
}) => {
  // Check if user prefers reduced motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.15,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default MinimalPageTransition;
