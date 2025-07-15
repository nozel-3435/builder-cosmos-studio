import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { popularProducts, categories } from "@/data/products";
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
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marie",
    },
    {
      name: "Jean-Baptiste Traore",
      role: "Commerçant",
      content:
        "Grâce à LinkaMarket, mes ventes ont augmenté de 40%. L'interface est simple et efficace.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jean",
    },
    {
      name: "Aminata Diallo",
      role: "Livreuse",
      content:
        "LinkaDrop me permet de gérer mes livraisons facilement et d'augmenter mes revenus.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aminata",
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
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Marché africain traditionnel"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-linka-green/30 via-white/80 to-linka-orange/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Bienvenue sur <span className="text-linka-green">Linka</span>
              <span className="text-linka-orange">Market</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              La plateforme qui connecte clients, commerçants et livreurs pour
              une expérience d'achat moderne et fluide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <>
                  <Link
                    to="/register"
                    className="bg-linka-green text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-linka-green/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Commencer maintenant
                  </Link>
                  <Link
                    to="/products"
                    className="bg-white text-linka-green border-2 border-linka-green px-8 py-4 rounded-xl text-lg font-semibold hover:bg-linka-green hover:text-white transition-all duration-300"
                  >
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
              Trouvez exactement ce que vous cherchez dans nos catégories variées
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
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
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
                      <span className="text-xl font-bold text-linka-green">
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
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="w-12 h-12 bg-linka-green/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-linka-green" />
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
                  <span>+225 XX XX XX XX</span>
                </div>
                <p>contact@linkamarket.com</p>
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