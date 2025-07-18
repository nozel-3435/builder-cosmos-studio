import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AutoEnhancer = () => {
  const location = useLocation();

  useEffect(() => {
    const enhancePageElements = () => {
      // Enhanced product cards
      const productCards = document.querySelectorAll(
        '[class*="product"], .bg-white, [class*="shadow"], [class*="rounded"]',
      );
      productCards.forEach((card, index) => {
        if (
          !card.classList.contains("auto-enhanced") &&
          card.children.length > 0
        ) {
          card.classList.add(
            "auto-enhanced",
            "transition-all",
            "duration-300",
            "transform",
            "hover:shadow-xl",
            "hover:-translate-y-2",
            "hover:scale-[1.02]",
          );

          // Add staggered entrance animation
          (card as HTMLElement).style.animationDelay = `${index * 100}ms`;
          card.classList.add("opacity-0", "translate-y-8");

          // Trigger entrance animation
          setTimeout(
            () => {
              card.classList.remove("opacity-0", "translate-y-8");
              card.classList.add("opacity-100", "translate-y-0");
            },
            index * 100 + 200,
          );
        }
      });

      // Enhanced buttons
      const buttons = document.querySelectorAll("button, .btn");
      buttons.forEach((button) => {
        if (!button.classList.contains("auto-enhanced")) {
          button.classList.add(
            "auto-enhanced",
            "transition-all",
            "duration-300",
            "transform",
            "hover:scale-105",
            "hover:-translate-y-1",
            "active:scale-95",
            "relative",
            "overflow-hidden",
          );

          // Add ripple effect
          button.addEventListener("click", function (e) {
            const ripple = document.createElement("span");
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = (e as MouseEvent).clientX - rect.left - size / 2;
            const y = (e as MouseEvent).clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + "px";
            ripple.style.left = x + "px";
            ripple.style.top = y + "px";
            ripple.classList.add(
              "absolute",
              "bg-white",
              "opacity-30",
              "rounded-full",
              "animate-ping",
              "pointer-events-none",
            );

            button.appendChild(ripple);

            setTimeout(() => {
              ripple.remove();
            }, 600);
          });
        }
      });

      // Enhanced form inputs
      const inputs = document.querySelectorAll("input, textarea, select");
      inputs.forEach((input) => {
        if (!input.classList.contains("auto-enhanced")) {
          input.classList.add(
            "auto-enhanced",
            "transition-all",
            "duration-300",
            "focus:ring-2",
            "focus:ring-linka-green",
            "focus:border-linka-green",
          );

          const wrapper = input.parentElement;
          if (wrapper) {
            input.addEventListener("focus", () => {
              wrapper.classList.add("scale-105", "shadow-lg");
            });

            input.addEventListener("blur", () => {
              wrapper.classList.remove("scale-105", "shadow-lg");
            });
          }
        }
      });

      // Enhanced navigation links
      const navLinks = document.querySelectorAll("nav a, .nav-link, header a");
      navLinks.forEach((link) => {
        if (!link.classList.contains("auto-enhanced")) {
          link.classList.add(
            "auto-enhanced",
            "transition-all",
            "duration-300",
            "relative",
            "overflow-hidden",
          );

          // Add underline effect
          const underline = document.createElement("span");
          underline.className =
            "absolute bottom-0 left-0 w-0 h-0.5 bg-linka-green transition-all duration-300";
          link.appendChild(underline);

          link.addEventListener("mouseenter", () => {
            underline.style.width = "100%";
            link.classList.add("text-linka-green");
          });

          link.addEventListener("mouseleave", () => {
            underline.style.width = "0%";
            link.classList.remove("text-linka-green");
          });
        }
      });

      // Enhanced images with loading effects
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        if (!img.classList.contains("auto-enhanced")) {
          img.classList.add(
            "auto-enhanced",
            "transition-all",
            "duration-300",
            "hover:scale-105",
          );

          // Add loading shimmer
          if (!img.complete) {
            img.style.backgroundColor = "#f3f4f6";
            img.style.backgroundImage =
              "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)";
            img.style.backgroundSize = "200% 100%";
            img.style.animation = "shimmer 1.5s infinite";

            img.addEventListener("load", () => {
              img.style.backgroundColor = "";
              img.style.backgroundImage = "";
              img.style.animation = "";
            });
          }
        }
      });

      // Enhanced icons with micro-interactions
      const icons = document.querySelectorAll("svg, .lucide");
      icons.forEach((icon, index) => {
        if (!icon.classList.contains("auto-enhanced")) {
          icon.classList.add(
            "auto-enhanced",
            "transition-all",
            "duration-300",
            "hover:scale-110",
            "hover:rotate-12",
          );

          // Add subtle floating animation to some icons
          if (Math.random() > 0.8) {
            (icon as HTMLElement).style.animation =
              `float 3s ease-in-out infinite ${index * 200}ms`;
          }
        }
      });

      // Enhanced sections with scroll-triggered animations
      const sections = document.querySelectorAll(
        "section, .section, main > div",
      );
      sections.forEach((section, index) => {
        if (!section.classList.contains("auto-enhanced")) {
          section.classList.add("auto-enhanced");

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
                  (entry.target as HTMLElement).style.animationDelay = `${
                    index * 100
                  }ms`;
                  observer.unobserve(entry.target);
                }
              });
            },
            {
              threshold: 0.1,
              rootMargin: "-50px",
            },
          );

          observer.observe(section);
        }
      });

      // Enhanced statistics and number counters
      const statsElements = document.querySelectorAll(
        '[class*="stat"], [class*="number"], .text-2xl, .text-3xl',
      );
      statsElements.forEach((stat) => {
        if (
          !stat.classList.contains("auto-enhanced") &&
          /^\d+/.test(stat.textContent || "")
        ) {
          stat.classList.add("auto-enhanced");

          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const element = entry.target as HTMLElement;
                  const finalValue = parseInt(
                    element.textContent?.replace(/\D/g, "") || "0",
                  );
                  let currentValue = 0;
                  const increment = finalValue / 30; // 30 frames animation

                  const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                      currentValue = finalValue;
                      clearInterval(counter);
                    }
                    element.textContent =
                      element.textContent?.replace(
                        /^\d+/,
                        Math.floor(currentValue).toString(),
                      ) || "";
                  }, 50);

                  observer.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.5 },
          );

          observer.observe(stat);
        }
      });
    };

    // Run enhancement after DOM updates
    const timer = setTimeout(enhancePageElements, 200);

    return () => clearTimeout(timer);
  }, [location.pathname]); // Re-run when route changes

  // Add global CSS animations
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
      }
      
      @keyframes slide-in-from-bottom-4 {
        from {
          opacity: 0;
          transform: translateY(16px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .animate-in {
        animation-fill-mode: both;
      }
      
      .slide-in-from-bottom-4 {
        animation-name: slide-in-from-bottom-4;
      }
      
      .fade-in {
        animation-name: fade-in;
      }
      
      .duration-700 {
        animation-duration: 700ms;
      }
    `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default AutoEnhancer;
