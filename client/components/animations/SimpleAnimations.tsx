import React from "react";
import { motion } from "framer-motion";

// Simplified animation components with minimal animations as requested by user

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = "",
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

interface SlideInProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
}) => {
  const getInitial = () => {
    switch (direction) {
      case "up":
        return { y: 20, opacity: 0 };
      case "down":
        return { y: -20, opacity: 0 };
      case "left":
        return { x: 20, opacity: 0 };
      case "right":
        return { x: -20, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  className = "",
  delay = 0,
}) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.2, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  className = "",
}) => (
  <motion.div
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2 }}
    className={className}
  >
    {children}
  </motion.div>
);
