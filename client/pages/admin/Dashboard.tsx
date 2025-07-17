import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminLogin from "@/components/auth/AdminLogin";
import AdvancedCharts from "@/components/admin/AdvancedCharts";
import BackButton from "@/components/ui/BackButton";
import { products } from "@/data/products";
import {
  Users,
  Package,
  ShoppingCart,
  Truck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  Calendar,
  MapPin,
  Store,
} from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("7d");
  const [refreshing, setRefreshing] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Données simulées pour l'administration
  const adminStats = useMemo(() => {
    const totalUsers = 2847;
    const totalMerchants = 156;
    const totalDeliveryDrivers = 89;
    const totalClients = totalUsers - totalMerchants - totalDeliveryDrivers;
    const totalProducts = products.length * 20; // Simuler plus de produits
    const totalOrders = 1234;
    const totalRevenue = 15750000; // En FCFA
    const platformCommission = totalRevenue * 0.05; // 5% de commission

    return {
      users: {
        total: totalUsers,
        clients: totalClients,
        merchants: totalMerchants,
        drivers: totalDeliveryDrivers,
        newThisWeek: 45,
        growth: 12.5,
      },
      products: {
        total: totalProducts,
        active: Math.floor(totalProducts * 0.85),
        pending: Math.floor(totalProducts * 0.1),
        inactive: Math.floor(totalProducts * 0.05),
        newThisWeek: 67,
        growth: 8.3,
      },
      orders: {
        total: totalOrders,
        completed: Math.floor(totalOrders * 0.8),
        pending: Math.floor(totalOrders * 0.15),
        cancelled: Math.floor(totalOrders * 0.05),
        todayOrders: 23,
        growth: 15.2,
      },
      revenue: {
        total: totalRevenue,
        commission: platformCommission,
        avgOrderValue: Math.floor(totalRevenue / totalOrders),
        growth: 22.1,
        thisMonth: Math.floor(totalRevenue * 0.3),
      },
      deliveries: {
        total: 1156,
        completed: 1089,
        inProgress: 45,
        failed: 22,
        avgTime: 32, // minutes
        growth: 18.5,
      },
    };
  }, []);

  const recentActivities = [
    {
      id: 1,
      type: "order",
      message: "Nouvelle commande #ORD-1245 - 25,000 FCFA",
      time: "Il y a 2 min",
      icon: ShoppingCart,
      color: "text-linka-green",
    },
    {
      id: 2,
      type: "merchant",
      message: "Nouveau commerçant inscrit: Tech Store Plus",
      time: "Il y a 15 min",
      icon: Store,
      color: "text-blue-500",
    },
    {
      id: 3,
      type: "delivery",
      message: "Livraison complétée #DEL-789",
      time: "Il y a 32 min",
      icon: Truck,
      color: "text-linka-orange",
    },
    {
      id: 4,
      type: "alert",
      message: "Stock faible détecté: Riz premium (5 unités)",
      time: "Il y a 1h",
      icon: AlertTriangle,
      color: "text-red-500",
    },
    {
      id: 5,
      type: "user",
      message: "10 nouveaux clients aujourd'hui",
      time: "Il y a 2h",
      icon: Users,
      color: "text-purple-500",
    },
  ];

  const topMerchants = [
    {
      name: "Marché Central",
      sales: 450000,
      orders: 89,
      rating: 4.8,
      growth: 15.3,
    },
    {
      name: "Tech Store CI",
      sales: 380000,
      orders: 67,
      rating: 4.9,
      growth: 22.1,
    },
    {
      name: "Bio Market",
      sales: 320000,
      orders: 78,
      rating: 4.7,
      growth: 8.5,
    },
    {
      name: "Fashion Boutique Wax",
      sales: 290000,
      orders: 56,
      rating: 4.6,
      growth: 12.8,
    },
  ];

  useEffect(() => {
    // Check if admin is already authenticated in this session
    const checkAdminAuth = () => {
      const isAuthenticated = sessionStorage.getItem("admin_authenticated");
      const timestamp = sessionStorage.getItem("admin_timestamp");

      if (isAuthenticated && timestamp) {
        // Check if session is still valid (24 hours)
        const sessionAge = Date.now() - parseInt(timestamp);
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours

        if (sessionAge < maxAge) {
          setIsAdminAuthenticated(true);
        } else {
          // Clear expired session
          sessionStorage.removeItem("admin_authenticated");
          sessionStorage.removeItem("admin_timestamp");
        }
      }
      setIsLoading(false);
    };

    checkAdminAuth();
  }, []);

  const handleAdminAuthenticated = () => {
    setIsAdminAuthenticated(true);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simuler le rechargement des données
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-linka-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification...</p>
        </div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return <AdminLogin onAuthenticated={handleAdminAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-linka-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <BarChart3 className="w-8 h-8 text-linka-green" />
                <span>Administration LinkaMarket</span>
              </h1>
              <p className="text-gray-600 mt-2">
                Vue d'ensemble de la plateforme et gestion globale
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
              >
                <option value="24h">Dernières 24h</option>
                <option value="7d">7 derniers jours</option>
                <option value="30d">30 derniers jours</option>
                <option value="90d">3 derniers mois</option>
              </select>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-linka-green text-white rounded-lg hover:bg-linka-green/90 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                />
                <span>Actualiser</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Utilisateurs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-500">
                  +{adminStats.users.growth}%
                </span>
              </div>
            </div>
            <div className="mb-2">
              <div className="text-2xl font-bold text-gray-900">
                {adminStats.users.total.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Utilisateurs</div>
            </div>
            <div className="text-xs text-gray-500">
              +{adminStats.users.newThisWeek} cette semaine
            </div>
          </div>

          {/* Produits */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-linka-green/10 rounded-lg">
                <Package className="w-6 h-6 text-linka-green" />
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-500">
                  +{adminStats.products.growth}%
                </span>
              </div>
            </div>
            <div className="mb-2">
              <div className="text-2xl font-bold text-gray-900">
                {adminStats.products.total.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Produits</div>
            </div>
            <div className="text-xs text-gray-500">
              +{adminStats.products.newThisWeek} cette semaine
            </div>
          </div>

          {/* Commandes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-linka-orange/10 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-linka-orange" />
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-500">
                  +{adminStats.orders.growth}%
                </span>
              </div>
            </div>
            <div className="mb-2">
              <div className="text-2xl font-bold text-gray-900">
                {adminStats.orders.total.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Commandes</div>
            </div>
            <div className="text-xs text-gray-500">
              {adminStats.orders.todayOrders} aujourd'hui
            </div>
          </div>

          {/* Revenus */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-500">
                  +{adminStats.revenue.growth}%
                </span>
              </div>
            </div>
            <div className="mb-2">
              <div className="text-2xl font-bold text-gray-900">
                {(adminStats.revenue.total / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-600">FCFA Volume</div>
            </div>
            <div className="text-xs text-gray-500">
              {(adminStats.revenue.commission / 1000).toFixed(0)}k commission
            </div>
          </div>

          {/* Livraisons */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-500">
                  +{adminStats.deliveries.growth}%
                </span>
              </div>
            </div>
            <div className="mb-2">
              <div className="text-2xl font-bold text-gray-900">
                {adminStats.deliveries.total.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Livraisons</div>
            </div>
            <div className="text-xs text-gray-500">
              {adminStats.deliveries.avgTime}min en moyenne
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Graphiques et Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Aperçu des performances */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Aperçu des performances
                </h2>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <PieChart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-linka-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-linka-green">
                    {(
                      (adminStats.orders.completed / adminStats.orders.total) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                  <div className="text-sm text-gray-600">
                    Commandes complétées
                  </div>
                </div>
                <div className="text-center p-4 bg-linka-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {adminStats.revenue.avgOrderValue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    Panier moyen (FCFA)
                  </div>
                </div>
                <div className="text-center p-4 bg-linka-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-linka-orange">
                    {(
                      (adminStats.deliveries.completed /
                        adminStats.deliveries.total) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                  <div className="text-sm text-gray-600">
                    Livraisons réussies
                  </div>
                </div>
                <div className="text-center p-4 bg-linka-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {adminStats.deliveries.avgTime}
                  </div>
                  <div className="text-sm text-gray-600">Temps moy. (min)</div>
                </div>
              </div>

              <div className="h-64 bg-linka-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                  <p>Graphiques analytiques</p>
                  <p className="text-sm">À implémenter avec Chart.js</p>
                </div>
              </div>
            </div>

            {/* Top Commerçants */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Top Commerçants
                </h2>
                <Link
                  to="/admin/merchants"
                  className="text-linka-green hover:text-linka-green/80 text-sm font-medium"
                >
                  Voir tous
                </Link>
              </div>

              <div className="space-y-4">
                {topMerchants.map((merchant, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-linka-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-linka-green/10 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-linka-green">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {merchant.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {merchant.orders} commandes • ⭐ {merchant.rating}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {merchant.sales.toLocaleString()} FCFA
                      </div>
                      <div className="text-sm text-green-600 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />+
                        {merchant.growth}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar avec activités récentes */}
          <div className="space-y-6">
            {/* Actions rapides */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Actions rapides
              </h3>
              <div className="space-y-3">
                <Link
                  to="/admin/users"
                  className="block w-full bg-linka-green text-white px-4 py-3 rounded-lg hover:bg-linka-green/90 transition-colors text-center"
                >
                  Gérer les utilisateurs
                </Link>
                <Link
                  to="/admin/products"
                  className="block w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors text-center"
                >
                  Modérer les produits
                </Link>
                <Link
                  to="/admin/orders"
                  className="block w-full bg-linka-orange text-white px-4 py-3 rounded-lg hover:bg-linka-orange/90 transition-colors text-center"
                >
                  Suivre les commandes
                </Link>
                <button className="block w-full bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                  Exporter les données
                </button>
              </div>
            </div>

            {/* Activités récentes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Activités récentes
                </h3>
                <button className="text-linka-green hover:text-linka-green/80 text-sm">
                  Voir tout
                </button>
              </div>

              <div className="space-y-3">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <div className={`p-2 rounded-lg bg-gray-100`}>
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Alertes système */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Alertes système
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-800">
                      5 produits en rupture de stock
                    </p>
                    <p className="text-xs text-yellow-600">
                      Intervention requise
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">
                      Sauvegarde quotidienne OK
                    </p>
                    <p className="text-xs text-green-600">Dernière: 03:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-800">
                      Maintenance programmée
                    </p>
                    <p className="text-xs text-blue-600">
                      Dimanche 02:00 - 04:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
