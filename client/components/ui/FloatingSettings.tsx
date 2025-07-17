import React, { useState, useEffect } from "react";
import {
  Settings,
  Globe,
  Palette,
  Volume2,
  VolumeX,
  Monitor,
  Sun,
  Moon,
  X,
  Bell,
  BellOff,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingSettingsProps {
  className?: string;
}

const FloatingSettings: React.FC<FloatingSettingsProps> = ({
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    language: "fr",
    theme: "system",
    sound: true,
    notifications: true,
    animations: true,
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("linka_settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("linka_settings", JSON.stringify(settings));

    // Apply theme
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (settings.theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // System theme
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    // Apply animations preference
    if (!settings.animations) {
      document.documentElement.style.setProperty("--animation-duration", "0ms");
    } else {
      document.documentElement.style.removeProperty("--animation-duration");
    }
  }, [settings]);

  const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];

  const themes = [
    { value: "light", name: "Clair", icon: Sun },
    { value: "dark", name: "Sombre", icon: Moon },
    { value: "system", name: "Système", icon: Monitor },
  ];

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className={`fixed bottom-6 right-6 z-50 ${className}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-14 h-14 bg-linka-green hover:bg-linka-green/90 text-white rounded-full shadow-lg 
            hover:shadow-xl transition-all duration-300 flex items-center justify-center
            ${isOpen ? "rotate-180" : "hover:rotate-12"}
          `}
          aria-label="Paramètres"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Settings className="w-6 h-6" />
          )}
        </button>
      </motion.div>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
              initial={{
                scale: 0,
                opacity: 0,
                transformOrigin: "bottom right",
              }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="bg-linka-green text-white p-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Paramètres
                </h3>
              </div>

              {/* Settings Content */}
              <div className="p-4 space-y-6 max-h-96 overflow-y-auto">
                {/* Language Selection */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-4 h-4 text-linka-green" />
                    <span className="text-sm font-medium text-gray-700">
                      Langue
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => updateSetting("language", lang.code)}
                        className={`
                          flex items-center gap-3 p-3 rounded-lg border transition-colors
                          ${
                            settings.language === lang.code
                              ? "border-linka-green bg-linka-green/5 text-linka-green"
                              : "border-gray-200 hover:border-gray-300"
                          }
                        `}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme Selection */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Palette className="w-4 h-4 text-linka-green" />
                    <span className="text-sm font-medium text-gray-700">
                      Thème
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {themes.map((theme) => {
                      const Icon = theme.icon;
                      return (
                        <button
                          key={theme.value}
                          onClick={() => updateSetting("theme", theme.value)}
                          className={`
                            flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors
                            ${
                              settings.theme === theme.value
                                ? "border-linka-green bg-linka-green/5 text-linka-green"
                                : "border-gray-200 hover:border-gray-300"
                            }
                          `}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs font-medium">
                            {theme.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Toggle Settings */}
                <div className="space-y-4">
                  {/* Sound */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {settings.sound ? (
                        <Volume2 className="w-4 h-4 text-linka-green" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm font-medium text-gray-700">
                        Sons
                      </span>
                    </div>
                    <button
                      onClick={() => updateSetting("sound", !settings.sound)}
                      className={`
                        relative w-11 h-6 rounded-full transition-colors
                        ${settings.sound ? "bg-linka-green" : "bg-gray-300"}
                      `}
                    >
                      <div
                        className={`
                          absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                          ${settings.sound ? "translate-x-6" : "translate-x-1"}
                        `}
                      />
                    </button>
                  </div>

                  {/* Notifications */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {settings.notifications ? (
                        <Bell className="w-4 h-4 text-linka-green" />
                      ) : (
                        <BellOff className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm font-medium text-gray-700">
                        Notifications
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        updateSetting("notifications", !settings.notifications)
                      }
                      className={`
                        relative w-11 h-6 rounded-full transition-colors
                        ${settings.notifications ? "bg-linka-green" : "bg-gray-300"}
                      `}
                    >
                      <div
                        className={`
                          absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                          ${settings.notifications ? "translate-x-6" : "translate-x-1"}
                        `}
                      />
                    </button>
                  </div>

                  {/* Animations */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={settings.animations ? { rotate: 360 } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Settings className="w-4 h-4 text-linka-green" />
                      </motion.div>
                      <span className="text-sm font-medium text-gray-700">
                        Animations
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        updateSetting("animations", !settings.animations)
                      }
                      className={`
                        relative w-11 h-6 rounded-full transition-colors
                        ${settings.animations ? "bg-linka-green" : "bg-gray-300"}
                      `}
                    >
                      <div
                        className={`
                          absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                          ${settings.animations ? "translate-x-6" : "translate-x-1"}
                        `}
                      />
                    </button>
                  </div>
                </div>

                {/* Version Info */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-center text-xs text-gray-500">
                    <p>LinkaMarket v1.0.0</p>
                    <p>Made with ❤️ en Côte d'Ivoire</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingSettings;
