import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import LandingNavigation from "../components/navigation/LandingNavigation";
import {
  ArrowRight,
  Smartphone,
  ShoppingBag,
  Truck,
  CreditCard,
  Star,
  Users,
  Zap,
  Shield,
  MapPin,
  Heart,
  CheckCircle,
  Play,
  Package,
  TrendingUp,
  Award,
  ChevronRight,
} from "lucide-react";

const LandingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [language, setLanguage] = useState("fr");
  const [theme, setTheme] = useState("light");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Typewriter effect for slogan
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Commandez, Vendez, Livrez... en un clic.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Testimonials data
  const testimonials = [
    {
      name: "Marie Kouassi",
      role: "Cliente",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=marie",
      content:
        "LinkaMarket a révolutionné ma façon de faire mes courses. Je trouve tout en un clic !",
      rating: 5,
    },
    {
      name: "Jean-Baptiste Traore",
      role: "Commerçant",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=jean",
      content:
        "Mes ventes ont augmenté de 300% depuis que j'ai rejoint LinkaMarket !",
      rating: 5,
    },
    {
      name: "Aminata Diallo",
      role: "Livreuse",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=aminata",
      content:
        "LinkaDrop me permet de gagner plus tout en servant ma communauté.",
      rating: 5,
    },
  ];

  // Stats data
  const stats = [
    { number: "10,000+", label: "Utilisateurs actifs", icon: Users },
    { number: "500+", label: "Commerçants partenaires", icon: ShoppingBag },
    { number: "50,000+", label: "Commandes livrées", icon: Package },
    { number: "98%", label: "Taux de satisfaction", icon: Heart },
  ];

  // Modules data
  const modules = [
    {
      name: "LinkaDrop",
      title: "Livraison Express",
      description: "Livraisons ultra-rapides par des livreurs locaux vérifiés",
      icon: Truck,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Livraison en 30min",
        "Suivi en temps réel",
        "Livreurs certifiés",
      ],
    },
    {
      name: "LinkaPharma",
      title: "Santé & Bien-être",
      description: "Médicaments et produits de santé livrés à domicile",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      features: [
        "Pharmacies agréées",
        "Conseils experts",
        "Ordonnances sécurisées",
      ],
    },
    {
      name: "LinkaPay",
      title: "Paiements Sécurisés",
      description: "Solution de paiement mobile intégrée et sécurisée",
      icon: CreditCard,
      color: "from-purple-500 to-pink-500",
      features: [
        "TMoney & Flooz",
        "Paiement en ligne",
        "Transactions sécurisées",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <LandingNavigation
        language={language}
        theme={theme}
        onLanguageChange={() => setLanguage(language === "fr" ? "en" : "fr")}
        onThemeChange={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0fdf4" />
              <stop offset="50%" stopColor="#f9fafb" />
              <stop offset="100%" stopColor="#fef7ed" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad1)" />

          {/* Floating Elements */}
          <motion.circle
            cx="100"
            cy="200"
            r="3"
            fill="#6FCF97"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.circle
            cx="300"
            cy="400"
            r="2"
            fill="#10b981"
            animate={{
              x: [0, -80, 0],
              y: [0, 80, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.circle
            cx="700"
            cy="150"
            r="4"
            fill="#8b5cf6"
            animate={{
              x: [0, 60, 0],
              y: [0, 120, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Animated Logo */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-md rounded-2xl px-8 py-4 shadow-xl">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
                >
                  <ShoppingBag className="h-6 w-6 text-white" />
                </motion.div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LinkaMarket
                </span>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              La marketplace{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                intelligente
              </span>
              <br />
              de votre quartier
            </motion.h1>

            {/* Typewriter Slogan */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 h-8"
            >
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="inline-block w-0.5 h-6 bg-blue-600 ml-1"
              />
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mb-12"
            >
              <Link
                to="/register"
                className="group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <span>Rejoindre l'écosystème</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Link>
            </motion.div>

            {/* Hero Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex items-center justify-center mb-3">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Split Screen Presentation */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative mx-auto w-64 h-[500px] bg-gradient-to-b from-gray-900 to-gray-700 rounded-[3rem] p-3">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  <div className="h-full bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center justify-center p-6">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="text-center"
                    >
                      <ShoppingBag className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        LinkaMarket App
                      </h3>
                      <p className="text-sm text-gray-600">
                        Votre marketplace mobile
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Floating Product Icons */}
              <motion.div
                animate={{
                  x: [0, 20, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"
              >
                <Smartphone className="h-6 w-6 text-blue-600" />
              </motion.div>
              <motion.div
                animate={{
                  x: [0, -15, 0],
                  y: [0, 15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute bottom-10 -left-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"
              >
                <Package className="h-6 w-6 text-green-600" />
              </motion.div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Une plateforme,{" "}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  trois univers
                </span>
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed">
                LinkaMarket connecte intelligemment les clients, commerçants et
                livreurs de Kara dans un écosystème digital innovant. Découvrez
                une nouvelle façon de consommer local.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Users,
                    title: "Communauté locale",
                    desc: "Renforcez les liens de votre quartier",
                  },
                  {
                    icon: Zap,
                    title: "Livraison express",
                    desc: "Vos commandes en moins de 30 minutes",
                  },
                  {
                    icon: Shield,
                    title: "Paiements sécurisés",
                    desc: "Transactions protégées et fiables",
                  },
                ].map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
              >
                <Play className="h-5 w-5" />
                <span>Voir la démo</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              L'écosystème{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                évolutif
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des modules interconnectés qui s'adaptent aux besoins de votre
              communauté
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {modules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                  }}
                  className="group cursor-pointer"
                >
                  <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                    />

                    {/* Icon */}
                    <div className="relative mb-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {module.name}
                      </h3>
                      <h4 className="text-lg font-semibold text-gray-700 mb-3">
                        {module.title}
                      </h4>
                      <p className="text-gray-600 mb-6">{module.description}</p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      {module.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm text-gray-600">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <ChevronRight className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ils nous font{" "}
              <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                confiance
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez ce que notre communauté dit de LinkaMarket
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-6 w-6 text-yellow-400 fill-current"
                      />
                    ),
                  )}
                </div>

                <blockquote className="text-xl md:text-2xl text-gray-900 font-medium mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-600">
                      {testimonials[currentTestimonial].role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à révolutionner votre quartier ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui ont déjà choisi
              LinkaMarket pour transformer leur façon de consommer local.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                Commencer maintenant
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
                Voir la démo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold">LinkaMarket</span>
              </div>
              <p className="text-gray-400">
                La marketplace intelligente qui connecte votre quartier.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produits</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkaMarket
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkaDrop
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkaPharma
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkaPay
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Centre d'aide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Télécharger l'app</h4>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block bg-gray-800 hover:bg-gray-700 rounded-lg p-3 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-6 w-6" />
                    <div>
                      <div className="text-xs text-gray-400">
                        Télécharger sur
                      </div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="block bg-gray-800 hover:bg-gray-700 rounded-lg p-3 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-6 w-6" />
                    <div>
                      <div className="text-xs text-gray-400">
                        Disponible sur
                      </div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LinkaMarket. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
