import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  Package,
  CheckCircle,
  AlertCircle,
  Truck,
  User,
  Star,
  Route,
  Timer,
  DollarSign,
  Camera,
  RefreshCw,
  Store,
  ArrowLeft,
} from "lucide-react";

interface ActiveDelivery {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    avatar: string;
  };
  merchant: {
    name: string;
    address: string;
    phone: string;
  };
  deliveryAddress: {
    street: string;
    neighborhood: string;
    instructions?: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  items: Array<{
    id: number;
    name: string;
    quantity: number;
    price: number;
  }>;
  status:
    | "assigned"
    | "pickup_arrived"
    | "picked_up"
    | "in_transit"
    | "delivered";
  assignedAt: string;
  estimatedDelivery: string;
  totalValue: number;
  deliveryFee: number;
  distance: string;
  estimatedTime: string;
  specialInstructions?: string;
  priority: "normal" | "urgent" | "express";
}

const ActiveDeliveries = () => {
  const [activeDeliveries, setActiveDeliveries] = useState<ActiveDelivery[]>([
    {
      id: "DEL-2024-001",
      orderNumber: "ORD-2024-156",
      customer: {
        name: "Marie Kouassi",
        phone: "+228 90 12 34 56",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marie",
      },
      merchant: {
        name: "Tech Solutions Kara",
        address: "Avenue de l'Indépendance, Centre-ville",
        phone: "+228 91 23 45 67",
      },
      deliveryAddress: {
        street: "Rue des Palmiers, Maison 15",
        neighborhood: "Kpéwa",
        instructions: "Maison bleue avec portail blanc, sonner 2 fois",
        coordinates: { lat: 9.5625, lng: 1.189 },
      },
      items: [
        { id: 1, name: "Samsung Galaxy A54", quantity: 1, price: 289000 },
        { id: 2, name: "Étui de protection", quantity: 1, price: 12000 },
      ],
      status: "assigned",
      assignedAt: "2024-01-15T09:30:00Z",
      estimatedDelivery: "2024-01-15T11:00:00Z",
      totalValue: 301000,
      deliveryFee: 2500,
      distance: "3.2 km",
      estimatedTime: "15 min",
      priority: "normal",
    },
    {
      id: "DEL-2024-002",
      orderNumber: "ORD-2024-157",
      customer: {
        name: "Kofi Mensah",
        phone: "+228 92 34 56 78",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kofi",
      },
      merchant: {
        name: "Marché des Saveurs",
        address: "Quartier Kpéwa",
        phone: "+228 93 45 67 89",
      },
      deliveryAddress: {
        street: "Boulevard du Benin, Résidence Harmonie Apt 3B",
        neighborhood: "Centre-ville",
        instructions: "Interphone au nom de MENSAH",
        coordinates: { lat: 9.5515, lng: 1.1812 },
      },
      items: [
        { id: 3, name: "Riz parfumé 5kg", quantity: 2, price: 25000 },
        { id: 4, name: "Huile de palme 1L", quantity: 3, price: 7000 },
      ],
      status: "picked_up",
      assignedAt: "2024-01-15T08:45:00Z",
      estimatedDelivery: "2024-01-15T10:30:00Z",
      totalValue: 71000,
      deliveryFee: 1500,
      distance: "2.8 km",
      estimatedTime: "12 min",
      priority: "express",
      specialInstructions: "Produits frais - livraison prioritaire",
    },
  ]);

  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);

  const statusLabels = {
    assigned: "Assignée",
    pickup_arrived: "Arrivé au point de retrait",
    picked_up: "Récupérée",
    in_transit: "En route",
    delivered: "Livrée",
  };

  const statusColors = {
    assigned: "bg-blue-100 text-blue-800",
    pickup_arrived: "bg-yellow-100 text-yellow-800",
    picked_up: "bg-orange-100 text-orange-800",
    in_transit: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
  };

  const priorityColors = {
    normal: "bg-gray-100 text-gray-800",
    urgent: "bg-orange-100 text-orange-800",
    express: "bg-red-100 text-red-800",
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const updateDeliveryStatus = (
    deliveryId: string,
    newStatus: ActiveDelivery["status"],
  ) => {
    setActiveDeliveries((prev) =>
      prev.map((delivery) =>
        delivery.id === deliveryId
          ? { ...delivery, status: newStatus }
          : delivery,
      ),
    );
  };

  const getNextStatus = (currentStatus: ActiveDelivery["status"]) => {
    const statusFlow = [
      "assigned",
      "pickup_arrived",
      "picked_up",
      "in_transit",
      "delivered",
    ];
    const currentIndex = statusFlow.indexOf(currentStatus);
    return currentIndex < statusFlow.length - 1
      ? statusFlow[currentIndex + 1]
      : null;
  };

  const getNextStatusLabel = (currentStatus: ActiveDelivery["status"]) => {
    const nextStatus = getNextStatus(currentStatus);
    if (!nextStatus) return null;

    const labels = {
      pickup_arrived: "Marquer arrivé",
      picked_up: "Marquer récupéré",
      in_transit: "Marquer en route",
      delivered: "Marquer livré",
    };

    return labels[nextStatus as keyof typeof labels];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Livraisons Actives
                </h1>
                <p className="text-gray-600">
                  {activeDeliveries.length} livraison(s) en cours
                </p>
              </div>
            </div>

            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <RefreshCw className="h-4 w-4" />
              <span>Actualiser</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {activeDeliveries.length}
                </p>
                <p className="text-sm text-gray-600">Actives</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {formatPrice(
                    activeDeliveries.reduce((sum, d) => sum + d.deliveryFee, 0),
                  )}
                </p>
                <p className="text-sm text-gray-600">Revenus potentiels</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Route className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {activeDeliveries
                    .reduce((sum, d) => sum + parseFloat(d.distance), 0)
                    .toFixed(1)}{" "}
                  km
                </p>
                <p className="text-sm text-gray-600">Distance totale</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Timer className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {
                    activeDeliveries.filter((d) => d.priority === "express")
                      .length
                  }
                </p>
                <p className="text-sm text-gray-600">Express</p>
              </div>
            </div>
          </div>
        </div>

        {/* Deliveries List */}
        {activeDeliveries.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune livraison active
            </h3>
            <p className="text-gray-600">
              Vous n'avez actuellement aucune livraison assignée.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                {/* Delivery Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {delivery.orderNumber}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Assigné à {formatTime(delivery.assignedAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            statusColors[delivery.status]
                          }`}
                        >
                          {statusLabels[delivery.status]}
                        </span>
                        {delivery.priority !== "normal" && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              priorityColors[delivery.priority]
                            }`}
                          >
                            {delivery.priority === "express"
                              ? "Express"
                              : "Urgent"}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {formatPrice(delivery.deliveryFee)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {delivery.distance} • {delivery.estimatedTime}
                      </div>
                    </div>
                  </div>

                  {/* Progress Steps */}
                  <div className="flex items-center space-x-2 mb-4">
                    {[
                      "assigned",
                      "pickup_arrived",
                      "picked_up",
                      "in_transit",
                      "delivered",
                    ].map((step, index) => {
                      const isActive =
                        [
                          "assigned",
                          "pickup_arrived",
                          "picked_up",
                          "in_transit",
                          "delivered",
                        ].indexOf(delivery.status) >= index;
                      return (
                        <div key={step} className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full transition-colors ${
                              isActive ? "bg-blue-600" : "bg-gray-300"
                            }`}
                          />
                          {index < 4 && (
                            <div
                              className={`w-8 h-0.5 transition-colors ${
                                isActive ? "bg-blue-600" : "bg-gray-300"
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery Details */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Merchant Info */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Point de retrait
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Store className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">
                            {delivery.merchant.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">
                            {delivery.merchant.address}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">
                            {delivery.merchant.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Client</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">
                            {delivery.customer.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">
                            {delivery.customer.phone}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">
                            {delivery.deliveryAddress.street},{" "}
                            {delivery.deliveryAddress.neighborhood}
                          </span>
                        </div>
                        {delivery.deliveryAddress.instructions && (
                          <div className="mt-2 p-2 bg-yellow-50 rounded-md">
                            <p className="text-xs text-yellow-800">
                              <strong>Instructions:</strong>{" "}
                              {delivery.deliveryAddress.instructions}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Livraison
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">
                            Estimée: {formatTime(delivery.estimatedDelivery)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">
                            {delivery.items.length} article(s)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">
                            Valeur: {formatPrice(delivery.totalValue)}
                          </span>
                        </div>
                        {delivery.specialInstructions && (
                          <div className="mt-2 p-2 bg-blue-50 rounded-md">
                            <p className="text-xs text-blue-800">
                              <strong>Note:</strong>{" "}
                              {delivery.specialInstructions}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Articles à livrer
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      {delivery.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center py-1"
                        >
                          <span className="text-sm text-gray-700">
                            {item.name} x{item.quantity}
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {getNextStatusLabel(delivery.status) && (
                      <button
                        onClick={() => {
                          const nextStatus = getNextStatus(delivery.status);
                          if (nextStatus)
                            updateDeliveryStatus(delivery.id, nextStatus);
                        }}
                        className="btn-primary text-sm"
                      >
                        {getNextStatusLabel(delivery.status)}
                      </button>
                    )}

                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      <Navigation className="h-4 w-4" />
                      <span>GPS Navigation</span>
                    </button>

                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      <Phone className="h-4 w-4" />
                      <span>Appeler client</span>
                    </button>

                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      <MessageCircle className="h-4 w-4" />
                      <span>Message</span>
                    </button>

                    {delivery.status === "in_transit" && (
                      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        <Camera className="h-4 w-4" />
                        <span>Photo de livraison</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveDeliveries;
