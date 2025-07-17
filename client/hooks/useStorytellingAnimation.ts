import { useEffect } from "react";

interface UseStorytellingAnimationOptions {
  enableHoverEffects?: boolean;
  enableScrollAnimations?: boolean;
  enableIconAnimations?: boolean;
  delay?: number;
}

export const useStorytellingAnimation = (
  options: UseStorytellingAnimationOptions = {},
) => {
  const {
    enableHoverEffects = true,
    enableScrollAnimations = true,
    enableIconAnimations = true,
    delay = 100,
  } = options;

  useEffect(() => {
    const timer = setTimeout(() => {
      // Enhance buttons with hover effects
      if (enableHoverEffects) {
        const buttons = document.querySelectorAll(
          'button, .btn-primary, .btn-secondary, [role="button"]',
        );
        buttons.forEach((button) => {
          if (!button.classList.contains("storytelling-enhanced")) {
            button.classList.add(
              "storytelling-enhanced",
              "storytelling-button",
            );
          }
        });

        // Enhance cards
        const cards = document.querySelectorAll(
          '.bg-white, .product-card, [class*="shadow"], [class*="rounded-lg"]',
        );
        cards.forEach((card) => {
          if (
            !card.classList.contains("storytelling-enhanced") &&
            card.children.length > 0
          ) {
            card.classList.add("storytelling-enhanced", "storytelling-card");
          }
        });
      }

      // Add scroll-triggered animations
      if (enableScrollAnimations) {
        const observerOptions = {
          threshold: 0.1,
          rootMargin: "-20px",
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              if (!element.classList.contains("storytelling-animated")) {
                element.classList.add(
                  "storytelling-animated",
                  "storytelling-enter",
                );
                observer.unobserve(element);
              }
            }
          });
        }, observerOptions);

        // Observe sections and major content blocks
        const elementsToAnimate = document.querySelectorAll(
          "section, .section, .container, .max-w-7xl, .grid, .flex-col, .space-y-4, .space-y-6, .space-y-8",
        );

        elementsToAnimate.forEach((element, index) => {
          if (!element.classList.contains("storytelling-observed")) {
            element.classList.add("storytelling-observed");
            (element as HTMLElement).style.animationDelay = `${index * 50}ms`;
            observer.observe(element);
          }
        });

        // Stagger animations for lists and grids
        const lists = document.querySelectorAll(
          ".grid, .flex, .space-x-4, .space-x-6, .space-x-8",
        );
        lists.forEach((list) => {
          if (!list.classList.contains("storytelling-stagger-enhanced")) {
            list.classList.add(
              "storytelling-stagger-enhanced",
              "storytelling-stagger",
            );
          }
        });
      }

      // Enhance icons with floating animations
      if (enableIconAnimations) {
        const icons = document.querySelectorAll(
          'svg, .lucide, [class*="icon"]',
        );
        icons.forEach((icon, index) => {
          if (
            !icon.classList.contains("storytelling-enhanced") &&
            icon.parentElement
          ) {
            icon.classList.add("storytelling-enhanced", "storytelling-icon");

            // Add random floating animation with delay
            const shouldFloat = Math.random() > 0.7; // Only some icons float
            if (shouldFloat) {
              (icon as HTMLElement).style.animationDelay = `${index * 200}ms`;
              icon.classList.add("storytelling-float");
            }
          }
        });
      }

      // Auto-enhance form elements
      const inputs = document.querySelectorAll("input, textarea, select");
      inputs.forEach((input) => {
        if (!input.classList.contains("storytelling-enhanced")) {
          input.classList.add("storytelling-enhanced");

          input.addEventListener("focus", () => {
            input.parentElement?.classList.add("scale-105", "shadow-lg");
          });

          input.addEventListener("blur", () => {
            input.parentElement?.classList.remove("scale-105", "shadow-lg");
          });
        }
      });

      // Add hover effects to images
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        if (!img.classList.contains("storytelling-enhanced")) {
          img.classList.add(
            "storytelling-enhanced",
            "transition-transform",
            "duration-300",
          );

          img.addEventListener("mouseenter", () => {
            img.style.transform = "scale(1.05)";
          });

          img.addEventListener("mouseleave", () => {
            img.style.transform = "scale(1)";
          });
        }
      });

      // Enhance navigation links
      const navLinks = document.querySelectorAll("nav a, .nav-link");
      navLinks.forEach((link) => {
        if (!link.classList.contains("storytelling-enhanced")) {
          link.classList.add(
            "storytelling-enhanced",
            "transition-all",
            "duration-300",
          );

          link.addEventListener("mouseenter", () => {
            link.classList.add("text-linka-green", "transform", "scale-105");
          });

          link.addEventListener("mouseleave", () => {
            link.classList.remove("text-linka-green", "transform", "scale-105");
          });
        }
      });
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [enableHoverEffects, enableScrollAnimations, enableIconAnimations, delay]);

  // Return utility functions
  return {
    addStorytellingClass: (element: HTMLElement, className: string) => {
      if (!element.classList.contains("storytelling-enhanced")) {
        element.classList.add("storytelling-enhanced", className);
      }
    },

    triggerAnimation: (element: HTMLElement, animationType: string) => {
      element.classList.add(`storytelling-${animationType}`);
      setTimeout(() => {
        element.classList.remove(`storytelling-${animationType}`);
      }, 1000);
    },

    enhanceElement: (selector: string, className: string) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        if (!element.classList.contains("storytelling-enhanced")) {
          element.classList.add("storytelling-enhanced", className);
        }
      });
    },
  };
};

export default useStorytellingAnimation;
