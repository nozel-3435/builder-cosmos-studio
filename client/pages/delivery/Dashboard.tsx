import { useAuth } from "@/contexts/AuthContext";
import {
  Truck,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  Navigation,
  Phone,
} from "lucide-react";

const DeliveryDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: "Livraisons aujourd'hui",
      value: "12",
      change: "+3 vs hier",
      icon: Truck,
      color: "bg-linka-orange",
    },
    {
      label: "Revenus du jour",
      value: "18,000 FCFA",
      change: "+2,500 FCFA",
      icon: DollarSign,
      color: "bg-linka-green",
    },
    {
      label: "Distance parcourue",
      value: "45 km",
      change: "Aujourd'hui",
      icon: MapPin,
      color: "bg-blue-500",
    },
    {
      label: "Temps moyen",
      value: "28 min",
      change: "Par livraison",
      icon: Clock,
      color: "bg-purple-500",
    },
  ];

  const activeDeliveries = [
    {
      id: "#DEL-001",
      orderId: "#ORD-145",
      customer: "Marie Kouassi",
      address: "Cocody, Riviera 3",
      distance: "2.3 km",
      items: "Riz premium x2",
      amount: "5,000 FCFA",
      commission: "500 FCFA",
      status: "En cours",
      estimatedTime: "15 min",
      phone: "+225 XX XX XX XX",
    },
    {
      id: "#DEL-002",
      orderId: "#ORD-146",
      customer: "Jean Tano",
      address: "Plateau, Zone 4",
      distance: "4.1 km",
      items: "Smartphone + Accessoires",
      amount: "175,000 FCFA",
      commission: "8,750 FCFA",
      status: "À récupérer",
      estimatedTime: "25 min",
      phone: "+225 XX XX XX XX",
    },
  ];

  const todayHistory = [
    {
      id: "#DEL-098",
      customer: "Aminata Diallo",
      address: "Marcory, Zone 4",
      completedAt: "14:30",
      commission: "750 FCFA",
      rating: 5,
    },
    {
      id: "#DEL-097",
      customer: "Kofi Asante",
      address: "Treichville, Rue 12",
      completedAt: "13:15",
      commission: "600 FCFA",
      rating: 4,
    },
    {
      id: "#DEL-096",
      customer: "Fatou Bamba",
      address: "Adjamé, Marché",
      completedAt: "11:45",
      commission: "450 FCFA",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-linka-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tableau de bord - LinkaDrop
          </h1>
          <p className="text-gray-600 mt-2">
            Bonjour {user?.name}, gérez vos livraisons en cours
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
          {/* Active Deliveries */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Livraisons actives ({activeDeliveries.length})
                </h2>
                <button className="bg-linka-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-linka-orange/90 transition-colors">
                  Actualiser
                </button>
              </div>

              <div className="space-y-6">
                {activeDeliveries.map((delivery, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-semibold text-gray-900">
                            {delivery.id}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              delivery.status === "En cours"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {delivery.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {delivery.customer}
                        </h3>
                        <div className="flex items-center space-x-1 text-gray-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{delivery.address}</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm">{delivery.distance}</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {delivery.items}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-linka-green">
                          {delivery.commission}
                        </p>
                        <p className="text-sm text-gray-500">Commission</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">
                            ~{delivery.estimatedTime}
                          </span>
                        </div>
                        <button className="flex items-center space-x-1 text-linka-green hover:text-linka-green/80">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">Appeler</span>
                        </button>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                          <Navigation className="w-4 h-4" />
                          <span>Naviguer</span>
                        </button>
                        {delivery.status === "En cours" && (
                          <button className="flex items-center space-x-2 bg-linka-green text-white px-4 py-2 rounded-lg hover:bg-linka-green/90 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Marquer livrée</span>
                          </button>
                        )}
                        {delivery.status === "À récupérer" && (
                          <button className="flex items-center space-x-2 bg-linka-orange text-white px-4 py-2 rounded-lg hover:bg-linka-orange/90 text-sm">
                            <Truck className="w-4 h-4" />
                            <span>Récupérée</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {activeDeliveries.length === 0 && (
                <div className="text-center py-12">
                  <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucune livraison active
                  </h3>
                  <p className="text-gray-600">
                    Les nouvelles livraisons apparaîtront ici
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Today's History */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Livraisons d'aujourd'hui
              </h2>

              <div className="space-y-4">
                {todayHistory.map((delivery, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-100 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">
                        {delivery.id}
                      </span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < delivery.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {delivery.customer}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      {delivery.address}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {delivery.completedAt}
                      </span>
                      <span className="text-sm font-semibold text-linka-green">
                        {delivery.commission}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 text-linka-green hover:text-linka-green/80 text-sm font-medium">
                Voir l'historique complet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
