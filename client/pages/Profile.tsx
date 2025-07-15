import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Store,
  Truck,
  Edit3,
  Settings,
  Shield,
  Bell,
  Calendar,
  Star,
  Package,
  TrendingUp,
  Award,
  Clock,
  Eye,
  Heart,
  ShoppingCart,
  Target,
  BarChart3,
} from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Accès non autorisé
          </h1>
          <p className="text-gray-600">
            Vous devez être connecté pour accéder à cette page.
          </p>
        </div>
      </div>
    );
  }

  // Sample data for stats (would come from API in real app)
  const getUserStats = () => {
    switch (user.role) {
      case "client":
        return {
          totalOrders: 24,
          totalSpent: 485000,
          favoriteProducts: 12,
          memberSince: "2023-06-15",
          loyaltyPoints: 1250,
        };
      case "merchant":
        return {
          totalProducts: 156,
          totalSales: 2450000,
          totalOrders: 445,
          rating: 4.6,
          memberSince: "2023-03-10",
        };
      case "delivery":
        return {
          totalDeliveries: 234,
          totalEarnings: 185000,
          rating: 4.8,
          activeMonths: 8,
          memberSince: "2023-04-20",
        };
      default:
        return {};
    }
  };

  const stats = getUserStats();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const tabs = [
    { id: "overview", label: "Vue d'ensemble", icon: User },
    { id: "activity", label: "Activité", icon: BarChart3 },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-lg text-gray-600 capitalize mb-2">
                  {user.role === "client"
                    ? "Client LinkaMarket"
                    : user.role === "merchant"
                      ? "Commerçant Partenaire"
                      : user.role === "delivery"
                        ? "Livreur LinkaDrop"
                        : "Administrateur"}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Membre depuis{" "}
                      {formatDate(stats.memberSince || "2023-01-01")}
                    </span>
                  </div>
                  {user.role === "merchant" && (
                    <div className="flex items-center space-x-1">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-600">Boutique certifiée</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                to="/editable-profile"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                <span>Modifier le profil</span>
              </Link>
              <Link
                to="/settings"
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Settings className="h-5 w-5 text-gray-600" />
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {user.role === "client" && (
                <>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.totalOrders}
                        </p>
                        <p className="text-sm text-gray-600">Commandes</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatPrice(stats.totalSpent)}
                        </p>
                        <p className="text-sm text-gray-600">Total dépensé</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Heart className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.favoriteProducts}
                        </p>
                        <p className="text-sm text-gray-600">Favoris</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Award className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.loyaltyPoints}
                        </p>
                        <p className="text-sm text-gray-600">Points fidélité</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {user.role === "merchant" && (
                <>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.totalProducts}
                        </p>
                        <p className="text-sm text-gray-600">Produits</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatPrice(stats.totalSales)}
                        </p>
                        <p className="text-sm text-gray-600">Ventes totales</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <ShoppingCart className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.totalOrders}
                        </p>
                        <p className="text-sm text-gray-600">Commandes</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Star className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.rating}/5
                        </p>
                        <p className="text-sm text-gray-600">Note moyenne</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {user.role === "delivery" && (
                <>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Truck className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.totalDeliveries}
                        </p>
                        <p className="text-sm text-gray-600">Livraisons</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatPrice(stats.totalEarnings)}
                        </p>
                        <p className="text-sm text-gray-600">Revenus totaux</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Star className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.rating}/5
                        </p>
                        <p className="text-sm text-gray-600">Note moyenne</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Clock className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.activeMonths}
                        </p>
                        <p className="text-sm text-gray-600">Mois actifs</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Informations personnelles
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{user.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">Kara, Togo</span>
                  </div>
                </div>
              </div>

              {/* Role-specific information */}
              {user.role === "merchant" && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Informations commerciales
                  </h3>
                  <div className="space-y-4">
                    {user.businessName && (
                      <div className="flex items-center space-x-3">
                        <Store className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">
                          {user.businessName}
                        </span>
                      </div>
                    )}
                    {user.businessAddress && (
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">
                          {user.businessAddress}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-green-500" />
                      <span className="text-green-600">Boutique certifiée</span>
                    </div>
                  </div>
                </div>
              )}

              {user.role === "delivery" && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Informations de livraison
                  </h3>
                  <div className="space-y-4">
                    {user.vehicleType && (
                      <div className="flex items-center space-x-3">
                        <Truck className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700 capitalize">
                          {user.vehicleType}
                        </span>
                      </div>
                    )}
                    {user.deliveryZone && (
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">
                          {user.deliveryZone}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="text-yellow-600">Livreur étoile</span>
                    </div>
                  </div>
                </div>
              )}

              {user.role === "client" && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Préférences d'achat
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">Électronique, Mode</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">Centre-ville, Kpéwa</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-blue-500" />
                      <span className="text-blue-600">Client VIP</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Activité récente
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    Nouvelle commande #ORD-2024-001
                  </p>
                  <p className="text-sm text-gray-600">Il y a 2 heures</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Star className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    Nouvelle évaluation 5 étoiles
                  </p>
                  <p className="text-sm text-gray-600">Il y a 1 jour</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Heart className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    Produit ajouté aux favoris
                  </p>
                  <p className="text-sm text-gray-600">Il y a 3 jours</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Paramètres du compte
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Notifications</h4>
                  <p className="text-sm text-gray-600">
                    Gérer vos préférences de notification
                  </p>
                </div>
                <Link
                  to="/settings"
                  className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                >
                  <span>Configurer</span>
                  <Eye className="h-4 w-4" />
                </Link>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Sécurité</h4>
                  <p className="text-sm text-gray-600">
                    Mot de passe et authentification
                  </p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                  <span>Modifier</span>
                  <Shield className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Confidentialité</h4>
                  <p className="text-sm text-gray-600">
                    Contrôler la visibilité de votre profil
                  </p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                  <span>Gérer</span>
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Actions rapides
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user.role === "client" && (
              <>
                <Link
                  to="/orders"
                  className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Package className="h-6 w-6 text-blue-600" />
                  <span className="font-medium text-blue-900">
                    Mes commandes
                  </span>
                </Link>
                <Link
                  to="/favorites"
                  className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Heart className="h-6 w-6 text-red-600" />
                  <span className="font-medium text-red-900">Mes favoris</span>
                </Link>
              </>
            )}
            {user.role === "merchant" && (
              <>
                <Link
                  to="/merchant/add-product"
                  className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <Package className="h-6 w-6 text-green-600" />
                  <span className="font-medium text-green-900">
                    Ajouter produit
                  </span>
                </Link>
                <Link
                  to="/merchant/store"
                  className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Store className="h-6 w-6 text-blue-600" />
                  <span className="font-medium text-blue-900">Ma boutique</span>
                </Link>
              </>
            )}
            <Link
              to="/editable-profile"
              className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Edit3 className="h-6 w-6 text-gray-600" />
              <span className="font-medium text-gray-900">Modifier profil</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Settings className="h-6 w-6 text-purple-600" />
              <span className="font-medium text-purple-900">Paramètres</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
