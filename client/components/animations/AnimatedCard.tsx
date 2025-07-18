import React from "react";
import { motion } from "framer-motion";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: "lift" | "glow" | "scale" | "rotate" | "none";
  delay?: number;
  clickable?: boolean;
  onClick?: () => void;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = "",
  hoverEffect = "lift",
  delay = 0,
  clickable = false,
  onClick,
}) => {
  const getHoverVariants = () => {
    switch (hoverEffect) {
      case "lift":
        return {
          hover: {
            y: -8,
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
          },
          tap: {
            y: -4,
            scale: 1.01,
          },
        };

      case "glow":
        return {
          hover: {
            boxShadow: "0 0 30px rgba(111, 207, 151, 0.3)",
            borderColor: "#6FCF97",
            transition: {
              duration: 0.3,
              ease: "easeInOut",
            },
          },
        };

      case "scale":
        return {
          hover: {
            scale: 1.05,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
          },
          tap: {
            scale: 0.98,
          },
        };

      case "rotate":
        return {
          hover: {
            rotateY: 5,
            rotateX: 5,
            scale: 1.02,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
          },
        };

      case "none":
      default:
        return { hover: undefined, tap: undefined };
    }
  };

  const initialVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut" as const,
      },
    },
  };

  const hoverVariants = getHoverVariants();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={initialVariants}
      whileHover={hoverVariants.hover || undefined}
      whileTap={hoverVariants.tap || undefined}
      onClick={clickable ? onClick : undefined}
      className={`
        relative bg-white rounded-lg overflow-hidden transition-all duration-300
        ${clickable ? "cursor-pointer" : ""}
        ${className}
      `}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Inner content with backdrop */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.2 }}
      >
        {children}
      </motion.div>

      {/* Hover backdrop effect */}
      {hoverEffect !== "none" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-linka-green/5 to-linka-orange/5 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Animated border for glow effect */}
      {hoverEffect === "glow" && (
        <motion.div
          className="absolute inset-0 border-2 border-transparent rounded-lg"
          whileHover={{
            borderColor: "#6FCF97",
            boxShadow: "inset 0 0 20px rgba(111, 207, 151, 0.1)",
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default AnimatedCard;
