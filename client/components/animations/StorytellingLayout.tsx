import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useStorytellingAnimation } from "../../hooks/useStorytellingAnimation";

interface StorytellingLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const StorytellingLayout: React.FC<StorytellingLayoutProps> = ({
  children,
  className = "",
}) => {
  // Use the storytelling animation hook
  const { enhanceElement } = useStorytellingAnimation({
    enableHoverEffects: true,
    enableScrollAnimations: true,
    enableIconAnimations: true,
    delay: 150,
  });

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return; // Skip all animations if user prefers reduced motion
    }

    // Minimal essential enhancements only
    const enhanceEssentialElements = () => {
      // Only add basic hover effects to primary buttons
      const primaryButtons = document.querySelectorAll(
        'button[class*="bg-linka-green"], button[class*="bg-linka-orange"], .btn-primary',
      );
      primaryButtons.forEach((button) => {
        if (!button.classList.contains("enhanced")) {
          button.classList.add(
            "enhanced",
            "transition-transform",
            "duration-200",
          );

          button.addEventListener("mouseenter", () => {
            button.style.transform = "scale(1.02)";
          });

          button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
          });
        }
      });

      // Only add subtle hover to product cards
      const productCards = document.querySelectorAll(
        '.product-card, [class*="product"]',
      );
      productCards.forEach((card) => {
        if (!card.classList.contains("enhanced") && card.children.length > 0) {
          card.classList.add("enhanced", "transition-shadow", "duration-200");

          card.addEventListener("mouseenter", () => {
            card.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
          });

          card.addEventListener("mouseleave", () => {
            card.style.boxShadow = "";
          });
        }
      });
    };

    // Run enhancement with minimal delay
    const timer = setTimeout(enhanceEssentialElements, 50);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`storytelling-layout ${className}`}
    >
      {children}

      <style jsx>{`
        /* Respect user preferences for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .storytelling-layout *,
          .storytelling-layout *::before,
          .storytelling-layout *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        /* Minimal essential styles */
        .enhanced {
          transition: transform 0.2s ease;
        }

        /* Smooth scrolling only if not reduced motion */
        .storytelling-layout {
          scroll-behavior: smooth;
        }

        /* Simplified custom scrollbar */
        .storytelling-layout::-webkit-scrollbar {
          width: 6px;
        }

        .storytelling-layout::-webkit-scrollbar-track {
          background: #f8f9fa;
        }

        .storytelling-layout::-webkit-scrollbar-thumb {
          background: #6fcf97;
          border-radius: 3px;
        }

        .storytelling-layout::-webkit-scrollbar-thumb:hover {
          background: #5bb882;
        }
      `}</style>
    </motion.div>
  );
};

export default StorytellingLayout;
