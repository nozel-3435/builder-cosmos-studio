import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnimatedIconProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg" | "xl";
  animation?: "bounce" | "rotate" | "pulse" | "shake" | "float" | "none";
  color?: string;
  hoverColor?: string;
  className?: string;
  delay?: number;
  trigger?: "hover" | "view" | "always" | "none";
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon: Icon,
  size = "md",
  animation = "bounce",
  color = "currentColor",
  hoverColor,
  className = "",
  delay = 0,
  trigger = "hover",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const getAnimationVariants = () => {
    switch (animation) {
      case "bounce":
        return {
          initial: { y: 0 },
          animate: {
            y: [-2, 0, -2],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay,
            },
          },
          hover: {
            y: [-4, 0, -4],
            transition: {
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut" as const,
            },
          },
        };

      case "rotate":
        return {
          initial: { rotate: 0 },
          animate: {
            rotate: 360,
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "linear" as const,
              delay,
            },
          },
          hover: {
            rotate: 360,
            transition: {
              duration: 0.8,
              ease: "easeInOut" as const,
            },
          },
        };

      case "pulse":
        return {
          initial: { scale: 1 },
          animate: {
            scale: [1, 1.1, 1],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay,
            },
          },
          hover: {
            scale: 1.2,
            transition: {
              duration: 0.3,
              ease: "easeInOut" as const,
            },
          },
        };

      case "shake":
        return {
          initial: { x: 0 },
          animate: {
            x: [-1, 1, -1, 1, 0],
            transition: {
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut" as const,
              delay,
            },
          },
          hover: {
            x: [-2, 2, -2, 2, 0],
            transition: {
              duration: 0.4,
              ease: "easeInOut" as const,
            },
          },
        };

      case "float":
        return {
          initial: { y: 0 },
          animate: {
            y: [-3, 3, -3],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay,
            },
          },
          hover: {
            y: [-5, 5, -5],
            scale: 1.1,
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" as const,
            },
          },
        };

      case "none":
      default:
        return {
          initial: {},
          animate: {},
          hover: {
            scale: 1.1,
            transition: {
              duration: 0.2,
              ease: "easeInOut" as const,
            },
          },
        };
    }
  };

  const variants = getAnimationVariants();

  const getTriggerProps = () => {
    switch (trigger) {
      case "always":
        return {
          initial: variants.initial,
          animate: variants.animate,
          whileHover: variants.hover,
        };
      case "hover":
        return {
          initial: variants.initial,
          whileHover: variants.hover,
        };
      case "view":
        return {
          initial: variants.initial,
          whileInView: variants.animate,
          viewport: { once: false },
          whileHover: variants.hover,
        };
      case "none":
        return {};
      default:
        return {
          initial: variants.initial,
          whileHover: variants.hover,
        };
    }
  };

  const triggerProps = getTriggerProps();

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      {...triggerProps}
    >
      <Icon
        className={`${sizeClasses[size]} transition-colors duration-300`}
        style={{
          color: color,
        }}
        onMouseEnter={(e) => {
          if (hoverColor) {
            e.currentTarget.style.color = hoverColor;
          }
        }}
        onMouseLeave={(e) => {
          if (hoverColor) {
            e.currentTarget.style.color = color;
          }
        }}
      />
    </motion.div>
  );
};

export default AnimatedIcon;
