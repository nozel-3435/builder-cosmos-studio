import React from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  theme?: "commerce" | "delivery" | "minimal" | "organic";
  intensity?: "subtle" | "medium" | "vibrant";
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  theme = "commerce",
  intensity = "subtle",
  className = "",
}) => {
  const getThemeElements = () => {
    switch (theme) {
      case "commerce":
        return (
          <>
            {/* Shopping Icons */}
            <motion.circle
              cx="10%"
              cy="20%"
              r="2"
              fill="#6FCF97"
              opacity="0.3"
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
            <motion.rect
              x="70%"
              y="15%"
              width="3"
              height="3"
              fill="#F2994A"
              opacity="0.4"
              animate={{
                rotate: [0, 45, 0],
                x: [0, -25, 0],
                y: [0, 15, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M85,80 Q90,75 95,80 Q90,85 85,80"
              fill="#6FCF97"
              opacity="0.2"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </>
        );

      case "delivery":
        return (
          <>
            {/* Delivery themed elements */}
            <motion.circle
              cx="15%"
              cy="70%"
              r="1.5"
              fill="#6FCF97"
              opacity="0.4"
              animate={{
                x: [0, 50, 100, 0],
                y: [0, -10, 0, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M20,30 L25,35 L20,40 L15,35 Z"
              fill="#F2994A"
              opacity="0.3"
              animate={{
                x: [0, 60, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </>
        );

      case "minimal":
        return (
          <>
            <motion.circle
              cx="80%"
              cy="30%"
              r="1"
              fill="#6FCF97"
              opacity="0.5"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        );

      case "organic":
        return (
          <>
            <motion.path
              d="M20,50 Q40,30 60,50 Q40,70 20,50"
              fill="none"
              stroke="#6FCF97"
              strokeWidth="0.5"
              opacity="0.3"
              animate={{
                pathLength: [0, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        );

      default:
        return null;
    }
  };

  const getIntensityProps = () => {
    switch (intensity) {
      case "subtle":
        return { opacity: 0.6, scale: 0.8 };
      case "medium":
        return { opacity: 0.8, scale: 1 };
      case "vibrant":
        return { opacity: 1, scale: 1.2 };
      default:
        return { opacity: 0.6, scale: 0.8 };
    }
  };

  const intensityProps = getIntensityProps();

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
    >
      {/* Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-linka-green/5 via-transparent to-linka-orange/5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* SVG Pattern Layer */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        initial={{ opacity: 0 }}
        animate={{ opacity: intensityProps.opacity }}
        transition={{ duration: 2 }}
      >
        <defs>
          <linearGradient id="bgGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6FCF97" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#F2994A" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#6FCF97" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="bgGradient2">
            <stop offset="0%" stopColor="#6FCF97" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Base layer */}
        <rect width="100%" height="100%" fill="url(#bgGradient1)" />

        {/* Floating geometric shapes */}
        <motion.g
          animate={{ scale: intensityProps.scale }}
          transition={{ duration: 1 }}
        >
          {getThemeElements()}

          {/* Additional floating elements */}
          <motion.circle
            cx="90%"
            cy="90%"
            r="8"
            fill="url(#bgGradient2)"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.circle
            cx="5%"
            cy="95%"
            r="4"
            fill="url(#bgGradient2)"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </motion.g>

        {/* Subtle connecting lines */}
        <motion.g opacity="0.1">
          <motion.path
            d="M0,50 Q25,25 50,50 Q75,75 100,50"
            fill="none"
            stroke="#6FCF97"
            strokeWidth="0.5"
            animate={{
              pathLength: [0, 1, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.g>
      </motion.svg>

      {/* Overlay particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-linka-green rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
