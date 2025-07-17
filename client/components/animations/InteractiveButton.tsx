import React from "react";
import { motion } from "framer-motion";

interface InteractiveButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  href?: string;
  as?: "button" | "a" | "div";
}

const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  type = "button",
  href,
  as = "button",
}) => {
  const baseClasses =
    "relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 transform-gpu overflow-hidden";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-linka-green to-linka-orange text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-white text-linka-green border-2 border-linka-green hover:bg-linka-green hover:text-white",
    outline:
      "border-2 border-gray-300 text-gray-700 hover:border-linka-green hover:text-linka-green",
    ghost: "text-gray-700 hover:bg-gray-100",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const hoverVariants = {
    hover: {
      scale: 1.02,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
    tap: {
      scale: 0.98,
      y: 0,
    },
  };

  const shimmerVariants = {
    initial: { x: "-100%" },
    hover: {
      x: "100%",
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const Component =
    as === "a" ? motion.a : as === "div" ? motion.div : motion.button;

  const props = {
    className: `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
      disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
    }`,
    whileHover: disabled ? {} : "hover",
    whileTap: disabled ? {} : "tap",
    variants: hoverVariants,
    onClick: disabled ? undefined : onClick,
    ...(as === "button" && { type, disabled }),
    ...(as === "a" && href && { href }),
  };

  return (
    <Component {...props}>
      {/* Shimmer effect */}
      {!disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          variants={shimmerVariants}
          initial="initial"
          whileHover="hover"
        />
      )}

      {/* Ripple effect container */}
      <motion.div
        className="relative z-10 flex items-center justify-center space-x-2"
        initial={{ opacity: 1 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </Component>
  );
};

export default InteractiveButton;
