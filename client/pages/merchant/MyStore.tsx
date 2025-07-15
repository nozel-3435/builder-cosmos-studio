import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { products } from "@/data/products";
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Star,
  Package,
  Eye,
  Heart,
  Share2,
  Edit3,
  Camera,
  Clock,
  TrendingUp,
  Users,
  MessageCircle,
  ShoppingBag,
  Award,
  Calendar,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";

const MyStore = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);

  // Données simulées de la boutique
  const storeData = useMemo(() => {
    const storeProducts = products.filter(
      (product) => product.store === user?.businessName,
    );

    const totalSales = Math.floor(Math.random() * 1000) + 500;
    const totalRevenue = storeProducts.reduce(
      (sum, p) => sum + p.price * (Math.floor(Math.random() * 50) + 10),
      0,
    );

    return {
      name: user?.businessName || "Ma Boutique",
      description:
        user?.businessDescription ||
        "Votre boutique sur LinkaMarket - Découvrez nos produits de qualité",
      address: user?.businessAddress || "Abidjan, Côte d'Ivoire",
      phone: user?.businessPhone || user?.phone || "+225 XX XX XX XX",
      email: user?.email || "",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${user?.businessName}&backgroundColor=6FCF97`,
      coverImage:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
      rating: 4.8,
      reviewCount: Math.floor(Math.random() * 200) + 100,
      followers: Math.floor(Math.random() * 1000) + 500,
      products: storeProducts,
      totalSales,
      totalRevenue,
      joinedDate: "2023-03-15",
      isVerified: true,
      responseTime: "2 heures",
      responseRate: 98,
    };
  }, [user]);

  const stats = [
    {
      label: "Produits actifs",
      value: storeData.products.length,
      icon: Package,
      color: "text-blue-500",
    },
    {
      label: "Ventes totales",
      value: storeData.totalSales,
      icon: ShoppingBag,
      color: "text-linka-green",
    },
    {
      label: "Abonnés",
      value: storeData.followers,
      icon: Users,
      color: "text-purple-500",
    },
    {
      label: "Note moyenne",
      value: storeData.rating.toFixed(1),
      icon: Star,
      color: "text-yellow-500",
    },
  ];

  const recentReviews = [
    {
      id: 1,
      customer: "Marie K.",
      rating: 5,
      comment: "Excellente boutique ! Produits de qualité et livraison rapide.",
      date: "2024-01-15",
      product: "Riz local premium",
    },
    {
      id: 2,
      customer: "Jean T.",
      rating: 4,
      comment:
        "Très satisfait de mon achat. Le service client est très réactif.",
      date: "2024-01-12",
      product: "Ananas Victoria",
    },
    {
      id: 3,
      customer: "Fatou D.",
      rating: 5,
      comment: "Je recommande vivement cette boutique !",
      date: "2024-01-10",
      product: "Bananes plantains",
    },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: storeData.name,
        text: storeData.description,
        url: window.location.href,
      });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Share
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié dans le presse-papiers");
    }
  };

  const handleEditStore = () => {
    setIsEditing(true);
    toast.info("Mode édition activé");
  };

  if (user?.role !== "merchant") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Accès non autorisé
          </h1>
          <p className="text-gray-600">
            Cette page est réservée aux commerçants.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linka-gray-50">
      {/* Cover Image et Header */}
      <div className="relative">
        <div
          className="h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${storeData.coverImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={handleShare}
              className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleEditStore}
              className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
            >
              <Edit3 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profil de la boutique */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 -mt-16">
            <div className="relative">
              <img
                src={storeData.avatar}
                alt={storeData.name}
                className="w-32 h-32 rounded-xl border-4 border-white shadow-lg bg-white"
              />
              <button className="absolute bottom-2 right-2 w-8 h-8 bg-linka-green text-white rounded-full flex items-center justify-center hover:bg-linka-green/90 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 bg-white rounded-xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {storeData.name}
                    </h1>
                    {storeData.isVerified && (
                      <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                        <Award className="w-4 h-4" />
                        <span>Vérifié</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{storeData.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{storeData.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{storeData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Membre depuis{" "}
                        {new Date(storeData.joinedDate).toLocaleDateString(
                          "fr-FR",
                          { year: "numeric", month: "long" },
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">
                      {storeData.rating}
                    </span>
                    <span className="text-gray-500">
                      ({storeData.reviewCount} avis)
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Répond en {storeData.responseTime}
                  </div>
                  <div className="text-sm text-gray-600">
                    Taux de réponse: {storeData.responseRate}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {typeof stat.value === "number" && stat.value > 1000
                        ? `${(stat.value / 1000).toFixed(1)}k`
                        : stat.value}
                    </p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Onglets */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Vue d'ensemble", icon: TrendingUp },
                { id: "products", label: "Produits", icon: Package },
                { id: "reviews", label: "Avis clients", icon: MessageCircle },
                { id: "analytics", label: "Analyses", icon: TrendingUp },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-linka-green text-linka-green"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Vue d'ensemble */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Performances récentes */}
                  <div className="bg-linka-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Performances du mois
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          Chiffre d'affaires
                        </span>
                        <span className="font-semibold text-linka-green">
                          {storeData.totalRevenue.toLocaleString()} FCFA
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Commandes</span>
                        <span className="font-semibold">
                          {Math.floor(storeData.totalSales / 10)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Nouveaux clients</span>
                        <span className="font-semibold">
                          {Math.floor(Math.random() * 50) + 20}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions rapides */}
                  <div className="bg-linka-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Actions rapides
                    </h3>
                    <div className="space-y-3">
                      <Link
                        to="/merchant/add-product"
                        className="block w-full bg-linka-green text-white px-4 py-3 rounded-lg hover:bg-linka-green/90 transition-colors text-center"
                      >
                        Ajouter un produit
                      </Link>
                      <Link
                        to="/merchant/products"
                        className="block w-full bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-center"
                      >
                        Gérer l'inventaire
                      </Link>
                      <button
                        onClick={() => toast.info("Promotion créée")}
                        className="block w-full bg-linka-orange text-white px-4 py-3 rounded-lg hover:bg-linka-orange/90 transition-colors"
                      >
                        Créer une promotion
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Produits */}
            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Mes produits ({storeData.products.length})
                  </h3>
                  <Link
                    to="/merchant/add-product"
                    className="bg-linka-green text-white px-4 py-2 rounded-lg hover:bg-linka-green/90 transition-colors"
                  >
                    Ajouter un produit
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {storeData.products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h4>
                        <p className="text-linka-green font-bold text-lg">
                          {product.price.toLocaleString()} FCFA
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">
                              {product.rating}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {Math.floor(Math.random() * 500) + 100}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Avis clients */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Avis clients récents
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">
                      {storeData.rating}
                    </span>
                    <span className="text-gray-500">
                      ({storeData.reviewCount} avis)
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-linka-green/10 rounded-full flex items-center justify-center">
                            <span className="text-linka-green font-semibold">
                              {review.customer.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {review.customer}
                            </p>
                            <p className="text-sm text-gray-500">
                              {review.product}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">"{review.comment}"</p>
                      <p className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Analyses de performance
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-linka-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Ventes par mois
                    </h4>
                    <div className="text-center py-8 text-gray-500">
                      <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                      <p>Graphique des ventes à venir</p>
                    </div>
                  </div>
                  <div className="bg-linka-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Produits populaires
                    </h4>
                    <div className="space-y-3">
                      {storeData.products.slice(0, 3).map((product, index) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-700">
                            {index + 1}. {product.name}
                          </span>
                          <span className="text-sm font-semibold text-linka-green">
                            {Math.floor(Math.random() * 100) + 20} ventes
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStore;
