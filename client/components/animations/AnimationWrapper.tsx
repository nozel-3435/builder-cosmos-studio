import React from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

interface AnimationWrapperProps {
  children: React.ReactNode;
  type?:
    | "fadeIn"
    | "slideUp"
    | "slideLeft"
    | "slideRight"
    | "zoom"
    | "flipUp"
    | "staggerChildren";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
  staggerDelay?: number;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  type = "fadeIn",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
  threshold = 0.1,
  staggerDelay = 0.1,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: "easeOut" as const,
        },
      },
    },
    slideUp: {
      hidden: { opacity: 0, y: 60 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration,
          delay,
          ease: "easeOut" as const,
        },
      },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 60 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration,
          delay,
          ease: "easeOut" as const,
        },
      },
    },
    slideRight: {
      hidden: { opacity: 0, x: -60 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration,
          delay,
          ease: "easeOut" as const,
        },
      },
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: "easeOut" as const,
        },
      },
    },
    flipUp: {
      hidden: { opacity: 0, rotateX: -90 },
      visible: {
        opacity: 1,
        rotateX: 0,
        transition: {
          duration,
          delay,
          ease: "easeOut" as const,
        },
      },
    },
    staggerChildren: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: delay,
        },
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[type]}
      className={className}
    >
      {type === "staggerChildren"
        ? React.Children.map(children, (child, index) => (
            <motion.div key={index} variants={childVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
};

export default AnimationWrapper;
