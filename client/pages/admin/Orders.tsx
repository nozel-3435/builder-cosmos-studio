import React, { useState } from "react";
import AdminRouteWrapper from "@/components/admin/AdminRouteWrapper";
import BackButton from "@/components/ui/BackButton";
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  MoreVertical,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  MapPin,
  User,
  Calendar,
  DollarSign,
  Phone,
} from "lucide-react";

interface AdminOrder {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  merchant: {
    name: string;
    address: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "shipping"
    | "delivered"
    | "cancelled";
  total: number;
  deliveryFee: number;
  commission: number;
  orderDate: string;
  deliveryDate?: string;
  deliveryAddress: string;
  deliveryDriver?: {
    name: string;
    phone: string;
    vehicle: string;
  };
  paymentMethod: string;
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
}

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  // Données simulées de commandes
  const orders: AdminOrder[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      customer: {
        name: "Marie Kouassi",
        email: "marie@example.com",
        phone: "+225 07 123 456",
        avatar: "https://randomuser.me/api/portraits/women/75.jpg",
      },
      merchant: {
        name: "Marché Central",
        address: "Plateau, Abidjan",
      },
      items: [
        {
          name: "Riz parfumé 5kg",
          quantity: 2,
          price: 3500,
          image:
            "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=80&h=80&fit=crop",
        },
        {
          name: "Huile de palme 1L",
          quantity: 1,
          price: 1200,
          image:
            "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=80&h=80&fit=crop",
        },
      ],
      status: "shipping",
      total: 8200,
      deliveryFee: 1500,
      commission: 410,
      orderDate: "2024-01-20T10:30:00",
      deliveryDate: "2024-01-20T14:00:00",
      deliveryAddress: "Cocody, Riviera 2, Rue des Jardins",
      deliveryDriver: {
        name: "Kouadio Yves",
        phone: "+225 05 987 654",
        vehicle: "Moto - ABC 123",
      },
      paymentMethod: "Mobile Money (Orange)",
      paymentStatus: "completed",
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      customer: {
        name: "Jean Baptiste",
        email: "jean@example.com",
        phone: "+225 01 567 890",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      },
      merchant: {
        name: "Tech Store CI",
        address: "Marcory, Zone 4",
      },
      items: [
        {
          name: "Casque Bluetooth",
          quantity: 1,
          price: 25000,
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop",
        },
      ],
      status: "confirmed",
      total: 25000,
      deliveryFee: 2000,
      commission: 1250,
      orderDate: "2024-01-20T15:45:00",
      deliveryAddress: "Yopougon, Selmer, Marché",
      paymentMethod: "Flooz",
      paymentStatus: "completed",
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      customer: {
        name: "Aminata Diallo",
        email: "aminata@example.com",
        phone: "+225 09 876 543",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      merchant: {
        name: "Bio Market",
        address: "Adjamé, Rue 12",
      },
      items: [
        {
          name: "Légumes bio",
          quantity: 1,
          price: 4500,
          image:
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=80&h=80&fit=crop",
        },
      ],
      status: "cancelled",
      total: 4500,
      deliveryFee: 1000,
      commission: 225,
      orderDate: "2024-01-19T09:15:00",
      deliveryAddress: "Treichville, Rue 15",
      paymentMethod: "Carte bancaire",
      paymentStatus: "refunded",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case "preparing":
        return <Package className="w-4 h-4 text-orange-500" />;
      case "shipping":
        return <Truck className="w-4 h-4 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "cancelled":
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "confirmed":
        return "Confirmée";
      case "preparing":
        return "En préparation";
      case "shipping":
        return "En livraison";
      case "delivered":
        return "Livrée";
      case "cancelled":
        return "Annulée";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "preparing":
        return "bg-orange-100 text-orange-800";
      case "shipping":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.merchant.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    const matchesPaymentStatus =
      selectedPaymentStatus === "all" ||
      order.paymentStatus === selectedPaymentStatus;

    return matchesSearch && matchesStatus && matchesPaymentStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("fr-FR");
  };

  const ordersContent = (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <BackButton to="/admin" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <ShoppingCart className="w-8 h-8 text-linka-green" />
                <span>Gestion des Commandes</span>
              </h1>
              <p className="text-gray-600 mt-2">
                Suivez et gérez toutes les commandes de la plateforme
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher par numéro, client ou commerçant..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent min-w-64"
                />
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmée</option>
                <option value="preparing">En préparation</option>
                <option value="shipping">En livraison</option>
                <option value="delivered">Livrée</option>
                <option value="cancelled">Annulée</option>
              </select>

              <select
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
              >
                <option value="all">Tous les paiements</option>
                <option value="completed">Payé</option>
                <option value="pending">En attente</option>
                <option value="failed">Échoué</option>
                <option value="refunded">Remboursé</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredOrders.length} commande(s) trouvée(s)
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commande
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commerçant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paiement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.orderNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.items.length} article(s)
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={order.customer.avatar}
                          alt={order.customer.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {order.customer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.merchant.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.merchant.address}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="ml-1">
                          {getStatusLabel(order.status)}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}
                      >
                        {order.paymentStatus === "completed"
                          ? "Payé"
                          : order.paymentStatus === "pending"
                            ? "En attente"
                            : order.paymentStatus === "failed"
                              ? "Échoué"
                              : "Remboursé"}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {order.paymentMethod}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(order.total)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Commission: {formatCurrency(order.commission)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.orderDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-linka-green hover:text-linka-green/80 flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Voir</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Détails de la commande {selectedOrder.orderNumber}
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Order Info */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Informations commande
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Numéro:</span>
                          <span className="font-medium">
                            {selectedOrder.orderNumber}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">
                            {formatDate(selectedOrder.orderDate)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Statut:</span>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}
                          >
                            {getStatusIcon(selectedOrder.status)}
                            <span className="ml-1">
                              {getStatusLabel(selectedOrder.status)}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Articles commandés
                      </h3>
                      <div className="space-y-3">
                        {selectedOrder.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                Quantité: {item.quantity} ×{" "}
                                {formatCurrency(item.price)}
                              </div>
                            </div>
                            <div className="font-semibold text-gray-900">
                              {formatCurrency(item.quantity * item.price)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Customer & Delivery Info */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Informations client
                      </h3>
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={selectedOrder.customer.avatar}
                          alt={selectedOrder.customer.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {selectedOrder.customer.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {selectedOrder.customer.email}
                          </div>
                          <div className="text-sm text-gray-600">
                            {selectedOrder.customer.phone}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Livraison
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-gray-600">Adresse:</span>
                          <div className="font-medium">
                            {selectedOrder.deliveryAddress}
                          </div>
                        </div>
                        {selectedOrder.deliveryDriver && (
                          <div>
                            <span className="text-gray-600">Livreur:</span>
                            <div className="font-medium">
                              {selectedOrder.deliveryDriver.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {selectedOrder.deliveryDriver.phone} -{" "}
                              {selectedOrder.deliveryDriver.vehicle}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Récapitulatif
                      </h3>
                      <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between">
                          <span>Sous-total:</span>
                          <span>
                            {formatCurrency(
                              selectedOrder.total - selectedOrder.deliveryFee,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Livraison:</span>
                          <span>
                            {formatCurrency(selectedOrder.deliveryFee)}
                          </span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-semibold">Total:</span>
                          <span className="font-semibold">
                            {formatCurrency(selectedOrder.total)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Commission LinkaMarket:
                          </span>
                          <span className="text-sm text-gray-600">
                            {formatCurrency(selectedOrder.commission)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return <AdminRouteWrapper>{ordersContent}</AdminRouteWrapper>;
};

export default AdminOrders;
