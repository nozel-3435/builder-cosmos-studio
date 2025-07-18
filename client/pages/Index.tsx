import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { popularProducts, categories } from "@/data/products";
import AnimationWrapper from "../components/animations/AnimationWrapper";
import AnimatedCard from "../components/animations/AnimatedCard";
import InteractiveButton from "../components/animations/InteractiveButton";
import AnimatedIcon from "../components/animations/AnimatedIcon";
import {
  Search,
  Store,
  Truck,
  ShoppingBag,
  MapPin,
  Clock,
  Shield,
  Star,
  ArrowRight,
  Phone,
  CreditCard,
  Heart,
  ShoppingCart,
} from "lucide-react";

// Lazy load MapComponent to avoid initial loading issues
const MapComponent = React.lazy(() => import("../components/MapComponent"));

const HomePage = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Search,
      title: "Recherche facile",
      description:
        "Trouvez tous types de produits avec notre moteur de recherche intelligent",
    },
    {
      icon: Store,
      title: "Boutiques locales",
      description:
        "Découvrez les commerçants de votre quartier et soutenez l'économie locale",
    },
    {
      icon: Truck,
      title: "Livraison rapide",
      description:
        "LinkaDrop assure des livraisons rapides et fiables partout en ville",
    },
    {
      icon: CreditCard,
      title: "Paiements sécurisés",
      description:
        "TMoney, Flooz, carte bancaire - payez comme vous voulez en toute sécurité",
    },
    {
      icon: MapPin,
      title: "Suivi en temps réel",
      description:
        "Suivez votre commande en temps réel depuis la préparation jusqu'à la livraison",
    },
    {
      icon: Shield,
      title: "100% sécurisé",
      description:
        "Vos données et transactions sont protégées par les dernières technologies",
    },
  ];

  const testimonials = [
    {
      name: "Marie Kouassi",
      role: "Cliente",
      content:
        "LinkaMarket a révolutionné ma façon de faire mes courses. Je trouve tout ce dont j'ai besoin en un clic !",
      avatar: "https://randomuser.me/api/portraits/women/75.jpg",
    },
    {
      name: "Jean-Baptiste Traore",
      role: "Commerçant",
      content:
        "Grâce à LinkaMarket, mes ventes ont augmenté de 40%. L'interface est simple et efficace.",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    },
    {
      name: "Aminata Diallo",
      role: "Livreuse",
      content:
        "LinkaDrop me permet de gérer mes livraisons facilement et d'augmenter mes revenus.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Produits disponibles" },
    { number: "500+", label: "Commerçants partenaires" },
    { number: "50,000+", label: "Clients satisfaits" },
    { number: "98%", label: "Taux de satisfaction" },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Africains effectuant des transactions au marché"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-linka-green/20 via-white/85 to-linka-orange/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Bienvenue sur <span className="text-gradient">Linka</span>
                <span className="text-linka-orange">Market</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                La plateforme qui connecte clients, commerçants et livreurs pour
                une expérience d'achat moderne et fluide
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!user ? (
                  <>
                    <Link to="/register" className="btn-primary text-lg">
                      Commencer maintenant
                    </Link>
                    <Link to="/products" className="btn-secondary text-lg">
                      Explorer les produits
                    </Link>
                  </>
                ) : (
                  <>
                    {user.role === "client" && (
                      <Link
                        to="/products"
                        className="bg-linka-green text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-linka-green/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Explorer les produits
                      </Link>
                    )}
                    {user.role === "merchant" && (
                      <Link
                        to="/merchant"
                        className="bg-linka-green text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-linka-green/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Tableau de bord
                      </Link>
                    )}
                    {user.role === "delivery" && (
                      <Link
                        to="/delivery"
                        className="bg-linka-green text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-linka-green/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Mes livraisons
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Hero Image/Graphic */}
            <div className="mt-16 flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-linka-green to-linka-orange rounded-full flex items-center justify-center shadow-2xl">
                  <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-32 h-32 text-linka-green" />
                  </div>
                </div>
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-linka-orange rounded-full flex items-center justify-center shadow-lg">
                  <Store className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-linka-green rounded-full flex items-center justify-center shadow-lg">
                  <Truck className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-linka-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-linka-green mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explorez nos catégories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trouvez exactement ce que vous cherchez dans nos catégories
              variées
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {categories.slice(0, 10).map((category, index) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group bg-linka-gray-50 rounded-xl p-6 text-center hover:bg-linka-green hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-white/90">
                  {category.productCount} produits
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-linka-green text-white px-6 py-3 rounded-lg hover:bg-linka-green/90 transition-colors"
            >
              <span>Voir toutes les catégories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-20 bg-linka-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Produits les plus demandés
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les produits préférés de nos clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {popularProducts.slice(0, 8).map((product) => (
              <div key={product.id} className="product-card card-hover group">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount && (
                    <div className="absolute top-3 left-3 bg-linka-orange text-white px-2 py-1 rounded-full text-xs font-semibold">
                      -{product.discount}%
                    </div>
                  )}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-linka-green font-medium bg-linka-green/10 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{product.store}</p>
                  <p className="text-xs text-gray-500 mb-3">
                    {product.storeLocation}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-col">
                      <span className="price-tag">
                        {product.price.toLocaleString()} FCFA
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {product.originalPrice.toLocaleString()} FCFA
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating}
                      </span>
                      <span className="text-xs text-gray-400 ml-1">
                        ({product.reviewCount})
                      </span>
                    </div>
                  </div>

                  <button
                    disabled={!product.inStock}
                    className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      product.inStock
                        ? "bg-linka-green text-white hover:bg-linka-green/90"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>
                      {product.inStock ? "Ajouter au panier" : "Non disponible"}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-linka-green text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-linka-green/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Voir tous les produits</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir LinkaMarket ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une plateforme complète conçue pour simplifier votre expérience
              d'achat et de vente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card group">
                  <div className="feature-icon">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-linka-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trois étapes simples pour une expérience d'achat exceptionnelle
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-linka-green rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Recherchez
              </h3>
              <p className="text-gray-600">
                Trouvez vos produits préférés parmi notre large sélection de
                commerçants locaux
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-linka-orange rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Commandez
              </h3>
              <p className="text-gray-600">
                Ajoutez vos articles au panier et payez en toute sécurité avec
                votre méthode préférée
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-linka-green rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Recevez
              </h3>
              <p className="text-gray-600">
                LinkaDrop livre votre commande rapidement à l'adresse de votre
                choix
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des milliers de personnes font déjà confiance à LinkaMarket
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-linka-gray-50 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-linka-orange fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-linka-green to-linka-orange">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à rejoindre LinkaMarket ?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Rejoignez des milliers d'utilisateurs qui font déjà confiance à
            notre plateforme
          </p>
          {!user && (
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 bg-white text-linka-green px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Créer mon compte</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>

      {/* Carte Interactive Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Découvrez votre quartier
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explorez les commerçants, livreurs et services disponibles à Kara.
              Cliquez sur la carte pour ajouter votre position et connecter-vous
              avec votre communauté locale.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-linka-green to-linka-orange text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Carte Interactive de Kara
                  </h3>
                  <p className="text-white/90">
                    Connectez-vous avec votre communauté locale
                  </p>
                </div>
                <MapPin className="w-12 h-12 text-white/80" />
              </div>
            </div>

            <div className="p-6">
              {/* Wrap MapComponent in Suspense for lazy loading */}
              <React.Suspense
                fallback={
                  <div className="h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-linka-green mx-auto mb-2"></div>
                      <p className="text-gray-600">Chargement de la carte...</p>
                    </div>
                  </div>
                }
              >
                <ErrorBoundary
                  fallback={
                    <div className="h-[500px] bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">
                          Carte temporairement indisponible
                        </h3>
                        <p className="text-blue-600 text-sm mb-4">
                          La carte interactive sera disponible bientôt
                        </p>
                        <Link
                          to="/map"
                          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                          <MapPin className="w-4 h-4" />
                          <span>Voir la page carte</span>
                        </Link>
                      </div>
                    </div>
                  }
                >
                  <MapComponent
                    height="500px"
                    center={[9.5511, 1.1901]} // Centre de Kara
                    zoom={13}
                    showAddButton={true}
                    filterByRole={null}
                  />
                </ErrorBoundary>
              </React.Suspense>
            </div>

            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-sm">👤</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Clients</h4>
                  <p className="text-sm text-gray-600">
                    Points de rencontre et zones résidentielles
                  </p>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-sm">🏪</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Commerçants</h4>
                  <p className="text-sm text-gray-600">
                    Boutiques, marchés et services
                  </p>
                </div>

                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-sm">🚚</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Livreurs</h4>
                  <p className="text-sm text-gray-600">
                    Services de livraison rapide
                  </p>
                </div>
              </div>

              <div className="text-center mt-6">
                <Link
                  to="/map"
                  className="inline-flex items-center space-x-2 bg-linka-green text-white px-6 py-3 rounded-lg hover:bg-linka-green/90 transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Voir la carte complète</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-linka-green to-linka-orange rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <span className="text-xl font-bold">
                  Linka<span className="text-linka-green">Market</span>
                </span>
              </div>
              <p className="text-gray-400">
                La plateforme qui révolutionne le commerce local
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produits</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/products" className="hover:text-white">
                    Tous les produits
                  </Link>
                </li>
                <li>
                  <Link to="/stores" className="hover:text-white">
                    Boutiques
                  </Link>
                </li>
                <li>
                  <Link to="/landing" className="hover:text-white">
                    Landing moderne
                  </Link>
                </li>
                <li>LinkaDrop</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Centre d'aide</li>
                <li>Contact</li>
                <li>FAQ</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+228 90 10 93 97</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+228 91 58 95 00</span>
                </div>
                <p>imenanozel@gmail.com</p>
                <div className="pt-2">
                  <p className="text-sm text-gray-500">WhatsApp disponible</p>
                </div>
                <div className="flex space-x-3 pt-2">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.553 3.5 13.297 3.5 11.987s.698-2.566 1.626-3.704c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928 1.138 1.626 2.394 1.626 3.704s-.698 2.566-1.626 3.704c-.875.807-2.026 1.297-3.323 1.297z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
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

export default HomePage;
