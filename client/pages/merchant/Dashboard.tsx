import { useAuth } from "@/contexts/AuthContext";
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Eye,
  Plus,
} from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const MerchantDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: "Produits en stock",
      value: "24",
      change: "+2 cette semaine",
      icon: Package,
      color: "bg-blue-500",
    },
    {
      label: "Commandes en attente",
      value: "8",
      change: "+3 aujourd'hui",
      icon: ShoppingCart,
      color: "bg-linka-orange",
    },
    {
      label: "Revenus du mois",
      value: "245,000 FCFA",
      change: "+12% vs mois dernier",
      icon: DollarSign,
      color: "bg-linka-green",
    },
    {
      label: "Vues de la boutique",
      value: "1,234",
      change: "+45 cette semaine",
      icon: Eye,
      color: "bg-purple-500",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "Marie Kouassi",
      items: "Riz premium x2",
      amount: "5,000 FCFA",
      status: "En attente",
      time: "Il y a 2h",
    },
    {
      id: "#ORD-002",
      customer: "Jean Tano",
      items: "Smartphone + Accessoires",
      amount: "175,000 FCFA",
      status: "Confirmée",
      time: "Il y a 4h",
    },
    {
      id: "#ORD-003",
      customer: "Aminata Diallo",
      items: "Robe africaine",
      amount: "35,000 FCFA",
      status: "Livrée",
      time: "Hier",
    },
  ];

  const topProducts = [
    { name: "Riz local premium", sales: 145, revenue: "362,500 FCFA" },
    { name: "Smartphone Samsung", sales: 12, revenue: "1,800,000 FCFA" },
    { name: "Huile de palme", sales: 89, revenue: "178,000 FCFA" },
  ];

  return (
    <div className="min-h-screen bg-linka-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tableau de bord - {user?.businessName || "Ma Boutique"}
          </h1>
          <p className="text-gray-600 mt-2">
            Gérez votre boutique et suivez vos performances
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-linka-green" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-xs text-linka-green">{stat.change}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Commandes récentes
                </h2>
                <button className="text-linka-green hover:text-linka-green/80 text-sm font-medium">
                  Voir toutes
                </button>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          {order.id}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "En attente"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "Confirmée"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.items}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold text-linka-green">
                        {order.amount}
                      </p>
                      <p className="text-xs text-gray-500">{order.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Produits les plus vendus
              </h2>

              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {product.sales} ventes
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-linka-green">
                        {product.revenue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Actions rapides
              </h2>

              <div className="space-y-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-linka-green hover:text-white hover:border-linka-green transition-all">
                      <Plus className="w-5 h-5" />
                      <span>Ajouter un produit</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Ajouter un produit à votre boutique</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-linka-green hover:text-white hover:border-linka-green transition-all">
                      <Package className="w-5 h-5" />
                      <span>Gérer l'inventaire</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Gérer vos stocks et produits</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-linka-green hover:text-white hover:border-linka-green transition-all">
                      <Eye className="w-5 h-5" />
                      <span>Voir ma boutique</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Aperçu de votre boutique</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
