import React, { useState } from "react";
import {
  Package,
  Star,
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  Filter,
  Search,
  Download,
  Eye,
  TrendingUp,
  Award,
  Target,
  BarChart3,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface DeliveryRecord {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    rating?: number;
    comment?: string;
  };
  merchant: {
    name: string;
    address: string;
  };
  deliveryAddress: {
    street: string;
    neighborhood: string;
  };
  completedAt: string;
  deliveryFee: number;
  distance: string;
  deliveryTime: string; // Time taken to complete
  rating: number;
  status: "completed" | "cancelled" | "failed";
  totalValue: number;
  tips?: number;
  weatherCondition?: string;
  specialNotes?: string;
}

const DeliveryHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Sample delivery history data
  const deliveryHistory: DeliveryRecord[] = [
    {
      id: "DEL-2024-045",
      orderNumber: "ORD-2024-145",
      customer: {
        name: "Marie Kouassi",
        phone: "+228 90 12 34 56",
        rating: 5,
        comment: "Très rapide et professionnel !",
      },
      merchant: {
        name: "Tech Solutions Kara",
        address: "Centre-ville",
      },
      deliveryAddress: {
        street: "Rue des Palmiers",
        neighborhood: "Kpéwa",
      },
      completedAt: "2024-01-15T14:30:00Z",
      deliveryFee: 2500,
      distance: "3.2 km",
      deliveryTime: "18 min",
      rating: 5,
      status: "completed",
      totalValue: 289000,
      tips: 1000,
      weatherCondition: "Ensoleillé",
    },
    {
      id: "DEL-2024-044",
      orderNumber: "ORD-2024-144",
      customer: {
        name: "Kofi Mensah",
        phone: "+228 92 34 56 78",
        rating: 4,
        comment: "Bonne livraison, merci",
      },
      merchant: {
        name: "Marché des Saveurs",
        address: "Kpéwa",
      },
      deliveryAddress: {
        street: "Boulevard du Benin",
        neighborhood: "Centre-ville",
      },
      completedAt: "2024-01-15T11:45:00Z",
      deliveryFee: 1500,
      distance: "2.8 km",
      deliveryTime: "15 min",
      rating: 4,
      status: "completed",
      totalValue: 71000,
      weatherCondition: "Nuageux",
    },
    {
      id: "DEL-2024-043",
      orderNumber: "ORD-2024-143",
      customer: {
        name: "Aminata Diallo",
        phone: "+228 93 45 67 89",
      },
      merchant: {
        name: "Pharmacie Ramco",
        address: "Ramco",
      },
      deliveryAddress: {
        street: "Avenue de l'Unité",
        neighborhood: "Tchré",
      },
      completedAt: "2024-01-14T16:20:00Z",
      deliveryFee: 2000,
      distance: "4.1 km",
      deliveryTime: "25 min",
      rating: 3,
      status: "completed",
      totalValue: 45000,
      specialNotes: "Livraison retardée - embouteillage",
    },
    {
      id: "DEL-2024-042",
      orderNumber: "ORD-2024-142",
      customer: {
        name: "Jean-Baptiste Traore",
        phone: "+228 94 56 78 90",
      },
      merchant: {
        name: "Boutique Kara Centre",
        address: "Centre-ville",
      },
      deliveryAddress: {
        street: "Quartier résidentiel",
        neighborhood: "Kassena",
      },
      completedAt: "2024-01-14T09:15:00Z",
      deliveryFee: 0,
      distance: "1.5 km",
      deliveryTime: "0 min",
      rating: 0,
      status: "cancelled",
      totalValue: 35000,
      specialNotes: "Client non disponible - commande annulée",
    },
    {
      id: "DEL-2024-041",
      orderNumber: "ORD-2024-141",
      customer: {
        name: "Fatou Kone",
        phone: "+228 95 67 89 01",
        rating: 5,
        comment: "Parfait comme toujours !",
      },
      merchant: {
        name: "Artisanat Kassena",
        address: "Kassena",
      },
      deliveryAddress: {
        street: "Route de Lama",
        neighborhood: "Agbala",
      },
      completedAt: "2024-01-13T15:30:00Z",
      deliveryFee: 3000,
      distance: "5.7 km",
      deliveryTime: "32 min",
      rating: 5,
      status: "completed",
      totalValue: 125000,
      tips: 2000,
      weatherCondition: "Ensoleillé",
    },
  ];

  // Filter deliveries
  const filteredDeliveries = deliveryHistory.filter((delivery) => {
    const matchesSearch =
      delivery.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.customer.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      delivery.merchant.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || delivery.status === statusFilter;

    // Date filtering would be implemented here based on dateFilter
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    totalDeliveries: deliveryHistory.length,
    completedDeliveries: deliveryHistory.filter((d) => d.status === "completed")
      .length,
    totalEarnings: deliveryHistory.reduce(
      (sum, d) => sum + d.deliveryFee + (d.tips || 0),
      0,
    ),
    averageRating:
      deliveryHistory
        .filter((d) => d.rating > 0)
        .reduce((sum, d) => sum + d.rating, 0) /
      deliveryHistory.filter((d) => d.rating > 0).length,
    totalDistance: deliveryHistory.reduce(
      (sum, d) => sum + parseFloat(d.distance),
      0,
    ),
    successRate:
      (deliveryHistory.filter((d) => d.status === "completed").length /
        deliveryHistory.length) *
      100,
  };

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

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "failed":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Terminée";
      case "cancelled":
        return "Annulée";
      case "failed":
        return "Échouée";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Historique des Livraisons
                </h1>
                <p className="text-gray-600">
                  Consultez vos performances et revenus
                </p>
              </div>
            </div>

            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {stats.totalDeliveries}
                </p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {stats.completedDeliveries}
                </p>
                <p className="text-sm text-gray-600">Terminées</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">
                  {formatPrice(stats.totalEarnings)}
                </p>
                <p className="text-sm text-gray-600">Revenus</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {stats.averageRating.toFixed(1)}
                </p>
                <p className="text-sm text-gray-600">Note moyenne</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <MapPin className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {stats.totalDistance.toFixed(1)} km
                </p>
                <p className="text-sm text-gray-600">Distance</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Target className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {stats.successRate.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600">Taux de réussite</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="completed">Terminées</option>
              <option value="cancelled">Annulées</option>
              <option value="failed">Échouées</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Toutes les dates</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
            </select>

            <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Plus de filtres</span>
            </button>
          </div>
        </div>

        {/* Delivery History List */}
        <div className="space-y-4">
          {filteredDeliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {delivery.status === "completed" ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : delivery.status === "cancelled" ? (
                          <XCircle className="h-5 w-5 text-red-600" />
                        ) : (
                          <Package className="h-5 w-5 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {delivery.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(delivery.completedAt)} à{" "}
                          {formatTime(delivery.completedAt)}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        delivery.status,
                      )}`}
                    >
                      {getStatusLabel(delivery.status)}
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {formatPrice(delivery.deliveryFee + (delivery.tips || 0))}
                    </div>
                    {delivery.tips && (
                      <div className="text-sm text-gray-600">
                        (incl. {formatPrice(delivery.tips)} pourboire)
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">
                      Client
                    </h4>
                    <p className="text-sm text-gray-700">
                      {delivery.customer.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {delivery.deliveryAddress.street},{" "}
                      {delivery.deliveryAddress.neighborhood}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">
                      Commerçant
                    </h4>
                    <p className="text-sm text-gray-700">
                      {delivery.merchant.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {delivery.merchant.address}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">
                      Performance
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        {delivery.deliveryTime}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        {delivery.distance}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">
                      Évaluation
                    </h4>
                    {delivery.rating > 0 ? (
                      <div className="flex items-center space-x-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < delivery.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({delivery.rating}/5)
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Non évaluée</span>
                    )}
                  </div>
                </div>

                {delivery.customer.comment && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>Commentaire client:</strong>{" "}
                      {delivery.customer.comment}
                    </p>
                  </div>
                )}

                {delivery.specialNotes && (
                  <div className="bg-yellow-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> {delivery.specialNotes}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>
                      Valeur commande: {formatPrice(delivery.totalValue)}
                    </span>
                    {delivery.weatherCondition && (
                      <span>Météo: {delivery.weatherCondition}</span>
                    )}
                  </div>

                  <button className="flex items-center space-x-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                    <span>Détails</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Résumé des performances
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stats.successRate.toFixed(1)}%
              </div>
              <p className="text-sm text-gray-600">Taux de réussite</p>
              <div className="mt-2 flex items-center justify-center space-x-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-xs text-green-600">+2.1% ce mois</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {(stats.totalDistance / stats.totalDeliveries).toFixed(1)} km
              </div>
              <p className="text-sm text-gray-600">Distance moyenne</p>
              <div className="mt-2 flex items-center justify-center space-x-1">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="text-xs text-blue-600">
                  Efficacité optimale
                </span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {formatPrice(stats.totalEarnings / stats.totalDeliveries)}
              </div>
              <p className="text-sm text-gray-600">Revenu moyen</p>
              <div className="mt-2 flex items-center justify-center space-x-1">
                <Award className="h-4 w-4 text-purple-500" />
                <span className="text-xs text-purple-600">Top performer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryHistory;
