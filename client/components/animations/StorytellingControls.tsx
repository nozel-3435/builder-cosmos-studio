import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Play, Pause, RotateCcw, Zap } from "lucide-react";

const StorytellingControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [intensity, setIntensity] = useState<"subtle" | "medium" | "vibrant">(
    "medium",
  );

  const toggleAnimations = () => {
    setAnimationsEnabled(!animationsEnabled);
    document.documentElement.style.setProperty(
      "--animation-play-state",
      animationsEnabled ? "paused" : "running",
    );
  };

  const changeIntensity = () => {
    const intensities: Array<"subtle" | "medium" | "vibrant"> = [
      "subtle",
      "medium",
      "vibrant",
    ];
    const currentIndex = intensities.indexOf(intensity);
    const nextIndex = (currentIndex + 1) % intensities.length;
    setIntensity(intensities[nextIndex]);

    // Apply intensity changes
    const root = document.documentElement;
    root.classList.remove(
      "intensity-subtle",
      "intensity-medium",
      "intensity-vibrant",
    );
    root.classList.add(`intensity-${intensities[nextIndex]}`);
  };

  const resetAnimations = () => {
    // Remove all enhancement classes and re-trigger
    const enhancedElements = document.querySelectorAll(
      ".auto-enhanced, .storytelling-enhanced",
    );
    enhancedElements.forEach((element) => {
      element.classList.remove("auto-enhanced", "storytelling-enhanced");
    });

    // Trigger re-enhancement
    setTimeout(() => {
      window.dispatchEvent(new Event("storytelling-reset"));
    }, 100);
  };

  const controlVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <>
      {/* Main FAB */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        variants={controlVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-r from-linka-green to-linka-orange text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Settings className="h-6 w-6" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Controls Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 min-w-[200px]">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Contrôles Animation
              </h3>

              <div className="space-y-3">
                {/* Animation Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Animations</span>
                  <motion.button
                    onClick={toggleAnimations}
                    className={`p-2 rounded-lg transition-colors ${
                      animationsEnabled
                        ? "bg-linka-green text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {animationsEnabled ? (
                      <Play className="h-4 w-4" />
                    ) : (
                      <Pause className="h-4 w-4" />
                    )}
                  </motion.button>
                </div>

                {/* Intensity Control */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    Intensité ({intensity})
                  </span>
                  <motion.button
                    onClick={changeIntensity}
                    className="p-2 bg-linka-orange text-white rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Zap className="h-4 w-4" />
                  </motion.button>
                </div>

                {/* Reset Button */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Reset</span>
                  <motion.button
                    onClick={resetAnimations}
                    className="p-2 bg-gray-600 text-white rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Contrôlez l'expérience d'animation
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global styles for intensity control */}
      <style>{`
        .intensity-subtle {
          --animation-duration-multiplier: 1.5;
          --animation-scale-multiplier: 0.5;
        }

        .intensity-medium {
          --animation-duration-multiplier: 1;
          --animation-scale-multiplier: 1;
        }

        .intensity-vibrant {
          --animation-duration-multiplier: 0.7;
          --animation-scale-multiplier: 1.5;
        }

        * {
          animation-play-state: var(--animation-play-state, running);
        }
      `}</style>
    </>
  );
};

export default StorytellingControls;
