import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminRouteWrapper from "@/components/admin/AdminRouteWrapper";
import BackButton from "@/components/ui/BackButton";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Calendar,
  Download,
  Filter,
  Eye,
  Target,
  Globe,
  Clock,
  Star,
} from "lucide-react";

const AdminAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  // Données simulées d'analytics
  const analyticsData = {
    overview: {
      totalRevenue: 15750000,
      totalOrders: 1234,
      totalUsers: 2847,
      totalProducts: 3120,
      conversionRate: 3.2,
      avgOrderValue: 12762,
      customerRetention: 68.5,
      platformGrowth: 22.3,
    },
    revenueBreakdown: [
      { category: "Alimentation", amount: 6300000, percentage: 40 },
      { category: "Électronique", amount: 4725000, percentage: 30 },
      { category: "Mode", amount: 2362500, percentage: 15 },
      { category: "Beauté", amount: 1575000, percentage: 10 },
      { category: "Autre", amount: 787500, percentage: 5 },
    ],
    topPerformers: {
      merchants: [
        { name: "Marché Central", revenue: 450000, orders: 89, growth: 15.3 },
        { name: "Tech Store CI", revenue: 380000, orders: 67, growth: 22.1 },
        { name: "Bio Market", revenue: 320000, orders: 78, growth: 8.5 },
      ],
      products: [
        { name: "Riz parfumé 5kg", sales: 156, revenue: 468000 },
        { name: "Samsung Galaxy A54", sales: 23, revenue: 345000 },
        { name: "Huile de palme bio", sales: 234, revenue: 234000 },
      ],
      regions: [
        { name: "Plateau", orders: 342, revenue: 4100000 },
        { name: "Cocody", orders: 289, revenue: 3200000 },
        { name: "Yopougon", orders: 267, revenue: 2890000 },
      ],
    },
  };

  const periods = [
    { value: "7d", label: "7 derniers jours" },
    { value: "30d", label: "30 derniers jours" },
    { value: "90d", label: "3 derniers mois" },
    { value: "1y", label: "1 an" },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
  };

  const analyticsContent = (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <BackButton to="/admin" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <BarChart3 className="w-8 h-8 text-linka-green" />
                <span>Analytics Avancées</span>
              </h1>
              <p className="text-gray-600 mt-2">
                Analyse détaillée des performances de la plateforme
              </p>
            </div>
          </div>

          {/* Period Selector */}
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-500">+22.3%</span>
              </div>
            </div>
            <div className="mb-2">
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(analyticsData.overview.totalRevenue)}
              </div>
              <div className="text-sm text-gray-600">Revenus totaux</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-500">+15.2%</span>
              </div>
            </div>
            <div className="mb-2">
              <div className="text-2xl font-bold text-gray-900">
                {analyticsData.overview.totalOrders.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Commandes totales</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-500">+12.5%</span>
              </div>
            </div>
            <div className="mb-2">
              <div className="text-2xl font-bold text-gray-900">
                {analyticsData.overview.totalUsers.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Utilisateurs actifs</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-linka-orange/10 rounded-lg">
                <Target className="w-6 h-6 text-linka-orange" />
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-500">+0.8%</span>
              </div>
            </div>
            <div className="mb-2">
              <div className="text-2xl font-bold text-gray-900">
                {analyticsData.overview.conversionRate}%
              </div>
              <div className="text-sm text-gray-600">Taux de conversion</div>
            </div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Répartition des revenus par catégorie
            </h3>
            <div className="space-y-4">
              {analyticsData.revenueBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: [
                          "#6FCF97",
                          "#F2994A",
                          "#3B82F6",
                          "#8B5CF6",
                          "#EF4444",
                        ][index],
                      }}
                    />
                    <span className="font-medium text-gray-900">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {formatCurrency(item.amount)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Métriques clés
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">
                    Panier moyen
                  </span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  {formatCurrency(analyticsData.overview.avgOrderValue)}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">
                    Rétention client
                  </span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  {analyticsData.overview.customerRetention}%
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">
                    Croissance plateforme
                  </span>
                </div>
                <span className="text-xl font-bold text-green-600">
                  +{analyticsData.overview.platformGrowth}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Top Merchants */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Top Commerçants
            </h3>
            <div className="space-y-4">
              {analyticsData.topPerformers.merchants.map((merchant, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-linka-green/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-linka-green">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {merchant.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {merchant.orders} commandes
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {formatCurrency(merchant.revenue)}
                    </div>
                    <div className="text-sm text-green-600">
                      +{merchant.growth}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Top Produits
            </h3>
            <div className="space-y-4">
              {analyticsData.topPerformers.products.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {product.sales} ventes
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {formatCurrency(product.revenue)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Regions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Top Régions
            </h3>
            <div className="space-y-4">
              {analyticsData.topPerformers.regions.map((region, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Globe className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {region.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {region.orders} commandes
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {formatCurrency(region.revenue)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return <AdminRouteWrapper>{analyticsContent}</AdminRouteWrapper>;
};

export default AdminAnalytics;
