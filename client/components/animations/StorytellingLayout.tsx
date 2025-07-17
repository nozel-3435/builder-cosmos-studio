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
  useEffect(() => {
    // Auto-enhance existing elements when component mounts
    const enhanceExistingElements = () => {
      // Add hover effects to buttons
      const buttons = document.querySelectorAll(
        'button, [role="button"], .btn-primary, .btn-secondary',
      );
      buttons.forEach((button) => {
        if (!button.classList.contains("enhanced")) {
          button.classList.add(
            "enhanced",
            "transform",
            "transition-all",
            "duration-300",
          );

          button.addEventListener("mouseenter", () => {
            button.classList.add("scale-105", "-translate-y-1", "shadow-lg");
          });

          button.addEventListener("mouseleave", () => {
            button.classList.remove("scale-105", "-translate-y-1", "shadow-lg");
          });

          button.addEventListener("mousedown", () => {
            button.classList.add("scale-95");
          });

          button.addEventListener("mouseup", () => {
            button.classList.remove("scale-95");
          });
        }
      });

      // Add hover effects to cards
      const cards = document.querySelectorAll(
        '.bg-white, .product-card, [class*="rounded"], [class*="shadow"]',
      );
      cards.forEach((card) => {
        if (!card.classList.contains("enhanced") && card.children.length > 0) {
          card.classList.add("enhanced", "transition-all", "duration-300");

          card.addEventListener("mouseenter", () => {
            card.classList.add("shadow-xl", "-translate-y-1");
          });

          card.addEventListener("mouseleave", () => {
            card.classList.remove("shadow-xl", "-translate-y-1");
          });
        }
      });

      // Add scroll animations to sections
      const sections = document.querySelectorAll(
        "section, .section, .container",
      );
      sections.forEach((section, index) => {
        if (!section.classList.contains("enhanced")) {
          section.classList.add("enhanced");

          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add(
                    "animate-in",
                    "slide-in-from-bottom-4",
                    "fade-in",
                    "duration-700",
                  );
                  entry.target.style.animationDelay = `${index * 100}ms`;
                }
              });
            },
            { threshold: 0.1, rootMargin: "-50px" },
          );

          observer.observe(section);
        }
      });

      // Add floating animation to icons
      const icons = document.querySelectorAll('svg, [class*="icon"], .lucide');
      icons.forEach((icon, index) => {
        if (!icon.classList.contains("enhanced") && icon.parentElement) {
          icon.classList.add(
            "enhanced",
            "transition-transform",
            "duration-300",
          );

          // Add subtle floating animation
          const delay = index * 200;
          icon.style.animation = `floating 3s ease-in-out infinite ${delay}ms`;

          icon.addEventListener("mouseenter", () => {
            icon.style.transform = "scale(1.1) rotate(5deg)";
          });

          icon.addEventListener("mouseleave", () => {
            icon.style.transform = "scale(1) rotate(0deg)";
          });
        }
      });

      // Add shimmer effect to loading states
      const loadingElements = document.querySelectorAll(
        '[class*="loading"], [class*="skeleton"], .animate-pulse',
      );
      loadingElements.forEach((element) => {
        if (!element.classList.contains("enhanced")) {
          element.classList.add("enhanced", "relative", "overflow-hidden");

          const shimmer = document.createElement("div");
          shimmer.className =
            "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer";
          element.appendChild(shimmer);
        }
      });
    };

    // Run enhancement after a short delay to ensure DOM is ready
    const timer = setTimeout(enhanceExistingElements, 100);

    // Also run on window load to catch any dynamically loaded content
    window.addEventListener("load", enhanceExistingElements);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", enhanceExistingElements);
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
        @keyframes floating {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-in {
          animation-fill-mode: both;
        }

        @keyframes slide-in-from-bottom {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .slide-in-from-bottom-4 {
          animation-name: slide-in-from-bottom;
        }

        .fade-in {
          animation-name: fade-in;
        }

        .duration-700 {
          animation-duration: 700ms;
        }

        /* Enhanced hover states */
        .enhanced:hover {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Smooth scrolling */
        .storytelling-layout {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        .storytelling-layout::-webkit-scrollbar {
          width: 8px;
        }

        .storytelling-layout::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        .storytelling-layout::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6fcf97, #f2994a);
          border-radius: 4px;
        }

        .storytelling-layout::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #5bb882, #e8873f);
        }
      `}</style>
    </motion.div>
  );
};

export default StorytellingLayout;
