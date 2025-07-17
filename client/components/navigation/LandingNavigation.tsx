import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Menu,
  X,
  Globe,
  Sun,
  Moon,
  ChevronDown,
  Zap,
  Shield,
  Users,
} from "lucide-react";

interface LandingNavigationProps {
  language: string;
  theme: string;
  onLanguageChange: () => void;
  onThemeChange: () => void;
}

const LandingNavigation: React.FC<LandingNavigationProps> = ({
  language,
  theme,
  onLanguageChange,
  onThemeChange,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const products = [
    {
      name: "LinkaMarket",
      description: "Marketplace locale intelligente",
      icon: ShoppingBag,
      color: "text-blue-600",
    },
    {
      name: "LinkaDrop",
      description: "Livraison express ultra-rapide",
      icon: Zap,
      color: "text-green-600",
    },
    {
      name: "LinkaPharma",
      description: "Santé & bien-être à domicile",
      icon: Shield,
      color: "text-purple-600",
    },
    {
      name: "LinkaPay",
      description: "Paiements sécurisés et simples",
      icon: Users,
      color: "text-pink-600",
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-10 h-10 bg-gradient-to-br from-linka-green to-linka-orange rounded-lg flex items-center justify-center"
            >
              <ShoppingBag className="h-5 w-5 text-white" />
            </motion.div>
            <span
              className={`text-xl font-bold transition-colors ${
                isScrolled ? "text-gray-900" : "text-white drop-shadow-md"
              }`}
            >
              LinkaMarket
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProductsMenuOpen(!isProductsMenuOpen)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-linka-green hover:bg-linka-green/10"
                    : "text-white hover:text-linka-green/70"
                }`}
              >
                <span>Produits</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              <AnimatePresence>
                {isProductsMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4"
                    onMouseLeave={() => setIsProductsMenuOpen(false)}
                  >
                    <div className="grid grid-cols-1 gap-3">
                      {products.map((product) => {
                        const IconComponent = product.icon;
                        return (
                          <a
                            key={product.name}
                            href="#"
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                          >
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white">
                              <IconComponent
                                className={`h-5 w-5 ${product.color}`}
                              />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {product.description}
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#about"
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  : "text-white hover:text-blue-200"
              }`}
            >
              À propos
            </a>

            <a
              href="#contact"
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  : "text-white hover:text-blue-200"
              }`}
            >
              Contact
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLanguageChange}
              className={`flex items-center space-x-1 p-2 rounded-lg transition-colors ${
                isScrolled
                  ? "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  : "text-white hover:text-blue-200"
              }`}
              title={
                language === "fr" ? "Switch to English" : "Passer en français"
              }
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">
                {language.toUpperCase()}
              </span>
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onThemeChange}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled
                  ? "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  : "text-white hover:text-purple-200"
              }`}
              title={
                theme === "light"
                  ? "Activer le mode sombre"
                  : "Activer le mode clair"
              }
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </motion.button>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/login"
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                }`}
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                S'inscrire
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? "text-gray-600 hover:text-gray-900" : "text-white"
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 border border-gray-200"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Products */}
                <div>
                  <div className="font-medium text-gray-900 mb-3">Produits</div>
                  <div className="space-y-2 pl-4">
                    {products.map((product) => {
                      const IconComponent = product.icon;
                      return (
                        <a
                          key={product.name}
                          href="#"
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <IconComponent
                            className={`h-4 w-4 ${product.color}`}
                          />
                          <span className="text-gray-700">{product.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Links */}
                <a
                  href="#about"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                >
                  À propos
                </a>
                <a
                  href="#contact"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                >
                  Contact
                </a>

                {/* Mobile CTA */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    S'inscrire
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default LandingNavigation;
