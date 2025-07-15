import React, { useState } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  MapPin,
  Star,
  Download,
  RefreshCw,
  Filter,
  Search,
  Eye,
  MessageCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface OrderItem {
  id: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  merchantName: string;
}

interface Order {
  id: string;
  date: string;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "shipping"
    | "delivered"
    | "cancelled";
  total: number;
  items: OrderItem[];
  merchantName: string;
  deliveryAddress: string;
  deliveryTime?: string;
  trackingNumber?: string;
  deliveryDriver?: {
    name: string;
    phone: string;
    rating: number;
  };
  estimatedDelivery?: string;
  canRate?: boolean;
  canCancel?: boolean;
}

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  // Sample orders data
  const orders: Order[] = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15T10:30:00Z",
      status: "delivered",
      total: 125000,
      merchantName: "Tech Solutions Kara",
      deliveryAddress: "Centre-ville, Kara",
      deliveryTime: "2024-01-16T14:30:00Z",
      trackingNumber: "LK2024001",
      canRate: true,
      items: [
        {
          id: 1,
          productName: "Smartphone Samsung Galaxy A54",
          productImage: "/api/placeholder/80/80",
          quantity: 1,
          price: 289000,
          merchantName: "Tech Solutions Kara",
        },
        {
          id: 2,
          productName: "Étui de protection",
          productImage: "/api/placeholder/80/80",
          quantity: 1,
          price: 12000,
          merchantName: "Tech Solutions Kara",
        },
      ],
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-14T09:15:00Z",
      status: "shipping",
      total: 78000,
      merchantName: "Marché des Saveurs",
      deliveryAddress: "Quartier Kpéwa, Kara",
      trackingNumber: "LK2024002",
      estimatedDelivery: "2024-01-15T16:00:00Z",
      deliveryDriver: {
        name: "Kofi Mensah",
        phone: "+228 90 12 34 56",
        rating: 4.8,
      },
      items: [
        {
          id: 3,
          productName: "Huile de Palme Bio 1L",
          productImage: "/api/placeholder/80/80",
          quantity: 2,
          price: 7000,
          merchantName: "Marché des Saveurs",
        },
        {
          id: 4,
          productName: "Riz parfumé 5kg",
          productImage: "/api/placeholder/80/80",
          quantity: 1,
          price: 25000,
          merchantName: "Marché des Saveurs",
        },
        {
          id: 5,
          productName: "Haricots secs 2kg",
          productImage: "/api/placeholder/80/80",
          quantity: 3,
          price: 15000,
          merchantName: "Marché des Saveurs",
        },
      ],
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-13T15:45:00Z",
      status: "preparing",
      total: 45000,
      merchantName: "Boutique Kara Centre",
      deliveryAddress: "Tchré, Kara",
      canCancel: true,
      items: [
        {
          id: 6,
          productName: "Robe Traditionnelle Kente",
          productImage: "/api/placeholder/80/80",
          quantity: 1,
          price: 45000,
          merchantName: "Boutique Kara Centre",
        },
      ],
    },
    {
      id: "ORD-2024-004",
      date: "2024-01-12T11:20:00Z",
      status: "cancelled",
      total: 85000,
      merchantName: "Electronics Hub",
      deliveryAddress: "Ramco, Kara",
      items: [
        {
          id: 7,
          productName: "Casque Bluetooth",
          productImage: "/api/placeholder/80/80",
          quantity: 1,
          price: 35000,
          merchantName: "Electronics Hub",
        },
        {
          id: 8,
          productName: "Chargeur rapide",
          productImage: "/api/placeholder/80/80",
          quantity: 2,
          price: 25000,
          merchantName: "Electronics Hub",
        },
      ],
    },
  ];

  const statusLabels = {
    pending: "En attente",
    confirmed: "Confirmée",
    preparing: "En préparation",
    shipping: "En livraison",
    delivered: "Livrée",
    cancelled: "Annulée",
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    preparing: "bg-purple-100 text-purple-800",
    shipping: "bg-orange-100 text-orange-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusIcons = {
    pending: Clock,
    confirmed: CheckCircle,
    preparing: Package,
    shipping: Truck,
    delivered: CheckCircle,
    cancelled: XCircle,
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId],
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusProgress = (status: string) => {
    const statuses = [
      "pending",
      "confirmed",
      "preparing",
      "shipping",
      "delivered",
    ];
    const currentIndex = statuses.indexOf(status);
    return currentIndex >= 0 ? ((currentIndex + 1) / statuses.length) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Mes Commandes
                </h1>
                <p className="text-gray-600">
                  Suivez vos commandes et livraisons
                </p>
              </div>
            </div>

            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <RefreshCw className="h-4 w-4" />
              <span>Actualiser</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une commande..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmée</option>
              <option value="preparing">En préparation</option>
              <option value="shipping">En livraison</option>
              <option value="delivered">Livrée</option>
              <option value="cancelled">Annulée</option>
            </select>

            <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Plus de filtres</span>
            </button>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune commande trouvée
            </h3>
            <p className="text-gray-600">
              {searchQuery || statusFilter !== "all"
                ? "Aucune commande ne correspond à vos critères."
                : "Vous n'avez pas encore passé de commande."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const StatusIcon = statusIcons[order.status];
              const isExpanded = expandedOrders.includes(order.id);

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => toggleOrderExpansion(order.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          )}
                        </button>

                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <StatusIcon className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Commande {order.id}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {formatDate(order.date)} • {order.merchantName}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {formatPrice(order.total)}
                          </div>
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              statusColors[order.status]
                            }`}
                          >
                            {statusLabels[order.status]}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          {order.deliveryDriver && (
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                              <MessageCircle className="h-4 w-4" />
                            </button>
                          )}
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {order.status !== "cancelled" && (
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${getStatusProgress(order.status)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="p-6">
                      {/* Order Items */}
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-4">
                          Articles commandés ({order.items.length})
                        </h4>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                            >
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">
                                  {item.productName}
                                </h5>
                                <p className="text-sm text-gray-600">
                                  Quantité: {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="font-medium text-gray-900">
                                  {formatPrice(item.price * item.quantity)}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {formatPrice(item.price)} / unité
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">
                            Adresse de livraison
                          </h4>
                          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                            <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-gray-900">
                                {order.deliveryAddress}
                              </p>
                              {order.estimatedDelivery && (
                                <p className="text-sm text-gray-600 mt-1">
                                  Livraison estimée:{" "}
                                  {formatDate(order.estimatedDelivery)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {order.deliveryDriver && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">
                              Livreur assigné
                            </h4>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-900">
                                  {order.deliveryDriver.name}
                                </span>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="text-sm text-gray-600">
                                    {order.deliveryDriver.rating}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600">
                                {order.deliveryDriver.phone}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Tracking */}
                      {order.trackingNumber && (
                        <div className="mb-6">
                          <h4 className="font-medium text-gray-900 mb-3">
                            Suivi de commande
                          </h4>
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Truck className="h-5 w-5 text-blue-600" />
                              <span className="text-sm text-gray-700">
                                Numéro de suivi:
                              </span>
                              <span className="font-mono text-sm font-medium text-blue-600">
                                {order.trackingNumber}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        {order.canCancel && (
                          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                            Annuler la commande
                          </button>
                        )}
                        {order.canRate && (
                          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                            Noter cette commande
                          </button>
                        )}
                        {order.status === "delivered" && (
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            Racheter
                          </button>
                        )}
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          Contacter le vendeur
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Order Summary Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.length}
                </p>
                <p className="text-sm text-gray-600">Total commandes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter((o) => o.status === "delivered").length}
                </p>
                <p className="text-sm text-gray-600">Livrées</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Truck className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter((o) => o.status === "shipping").length}
                </p>
                <p className="text-sm text-gray-600">En cours</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter((o) => o.status === "cancelled").length}
                </p>
                <p className="text-sm text-gray-600">Annulées</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
