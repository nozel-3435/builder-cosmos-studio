import React, { useState } from "react";
import AdminRouteWrapper from "@/components/admin/AdminRouteWrapper";
import BackButton from "@/components/ui/BackButton";
import {
  Package,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  MoreVertical,
  CheckCircle,
  Clock,
  X,
  AlertTriangle,
  Star,
  Image,
  Tag,
  DollarSign,
} from "lucide-react";

interface AdminProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  category: string;
  subcategory: string;
  images: string[];
  status: "active" | "inactive" | "pending" | "rejected";
  merchant: {
    id: string;
    name: string;
    email: string;
    verified: boolean;
  };
  rating: number;
  reviewCount: number;
  sales: number;
  dateAdded: string;
  dateModified: string;
  featured: boolean;
  tags: string[];
  dimensions?: string;
  weight?: string;
  sku: string;
}

const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(
    null,
  );
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Données simulées de produits
  const products: AdminProduct[] = [
    {
      id: "1",
      name: "Riz parfumé premium 5kg",
      description:
        "Riz de qualité premium, cultivé localement. Grains longs et parfumés, idéal pour tous vos plats.",
      price: 3500,
      originalPrice: 4000,
      stock: 45,
      category: "Alimentation",
      subcategory: "Céréales",
      images: [
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1598632640487-0d58cd2cd82b?w=300&h=300&fit=crop",
      ],
      status: "active",
      merchant: {
        id: "m1",
        name: "Marché Central",
        email: "marche@example.com",
        verified: true,
      },
      rating: 4.8,
      reviewCount: 156,
      sales: 234,
      dateAdded: "2024-01-15T09:00:00",
      dateModified: "2024-01-20T14:30:00",
      featured: true,
      tags: ["bio", "local", "premium"],
      weight: "5kg",
      sku: "RIZ-PREM-5KG-001",
    },
    {
      id: "2",
      name: "Samsung Galaxy A54",
      description:
        "Smartphone Samsung Galaxy A54 avec écran Super AMOLED, triple caméra et batterie longue durée.",
      price: 150000,
      stock: 12,
      category: "Électronique",
      subcategory: "Smartphones",
      images: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      ],
      status: "active",
      merchant: {
        id: "m2",
        name: "Tech Store CI",
        email: "tech@example.com",
        verified: true,
      },
      rating: 4.6,
      reviewCount: 89,
      sales: 23,
      dateAdded: "2024-01-18T11:15:00",
      dateModified: "2024-01-19T16:45:00",
      featured: false,
      tags: ["smartphone", "android", "samsung"],
      dimensions: "15.8 x 7.6 x 0.8 cm",
      weight: "202g",
      sku: "SAM-A54-BLK-128",
    },
    {
      id: "3",
      name: "Robe traditionnelle Kente",
      description:
        "Magnifique robe traditionnelle en tissu Kente authentique, taillée sur mesure.",
      price: 45000,
      stock: 8,
      category: "Mode",
      subcategory: "Vêtements traditionnels",
      images: [
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop",
      ],
      status: "pending",
      merchant: {
        id: "m3",
        name: "Atelier Wax",
        email: "wax@example.com",
        verified: false,
      },
      rating: 4.9,
      reviewCount: 34,
      sales: 12,
      dateAdded: "2024-01-20T08:30:00",
      dateModified: "2024-01-20T08:30:00",
      featured: false,
      tags: ["traditionnel", "kente", "fait-main"],
      sku: "KENTE-ROBE-TM-001",
    },
  ];

  const categories = [
    "Alimentation",
    "Électronique",
    "Mode",
    "Beauté",
    "Maison",
    "Sports",
    "Automobile",
    "Services",
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "inactive":
        return <Clock className="w-4 h-4 text-gray-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "rejected":
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Actif";
      case "inactive":
        return "Inactif";
      case "pending":
        return "En attente";
      case "rejected":
        return "Rejeté";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || product.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR");
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on products:`, selectedProducts);
    // Ici vous ajouteriez la logique pour les actions en masse
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const productsContent = (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <BackButton to="/admin" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <Package className="w-8 h-8 text-linka-green" />
                <span>Mod��ration des Produits</span>
              </h1>
              <p className="text-gray-600 mt-2">
                Gérez et modérez tous les produits de la plateforme
              </p>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, commerçant ou SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent min-w-64"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
              >
                <option value="all">Toutes les catégories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
                <option value="pending">En attente</option>
                <option value="rejected">Rejeté</option>
              </select>
            </div>

            {selectedProducts.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedProducts.length} sélectionné(s)
                </span>
                <button
                  onClick={() => handleBulkAction("approve")}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                >
                  Approuver
                </button>
                <button
                  onClick={() => handleBulkAction("reject")}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                >
                  Rejeter
                </button>
              </div>
            )}

            <div className="text-sm text-gray-600">
              {filteredProducts.length} produit(s) trouvé(s)
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                    className="w-4 h-4 text-linka-green border-gray-300 rounded focus:ring-linka-green"
                  />
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}
                  >
                    {getStatusIcon(product.status)}
                    <span className="ml-1">
                      {getStatusLabel(product.status)}
                    </span>
                  </span>
                </div>
                {product.featured && (
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center px-2 py-1 bg-linka-orange text-white text-xs font-medium rounded">
                      <Star className="w-3 h-3 mr-1" />
                      Vedette
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      Stock: {product.stock}
                    </div>
                    <div className="text-xs text-gray-500">
                      SKU: {product.sku}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({product.reviewCount})
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {product.sales} ventes
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {product.merchant.name}
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500">
                        {product.category}
                      </span>
                      {product.merchant.verified && (
                        <CheckCircle className="w-3 h-3 text-blue-500" />
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(product.dateAdded)}
                  </div>
                </div>

                {/* Tags */}
                {product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="flex items-center space-x-1 text-linka-green hover:text-linka-green/80 text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Détails</span>
                  </button>

                  {product.status === "pending" && (
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors">
                        Approuver
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors">
                        Rejeter
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Détails du produit
                  </h2>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Product Images */}
                  <div>
                    <div className="mb-4">
                      <img
                        src={selectedProduct.images[0]}
                        alt={selectedProduct.name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    {selectedProduct.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {selectedProduct.images.slice(1).map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${selectedProduct.name} ${index + 2}`}
                            className="w-full h-16 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {selectedProduct.name}
                      </h3>
                      <p className="text-gray-600">
                        {selectedProduct.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Prix:</span>
                        <div className="font-semibold text-lg">
                          {formatCurrency(selectedProduct.price)}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Stock:</span>
                        <div className="font-semibold">
                          {selectedProduct.stock} unités
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">
                          Catégorie:
                        </span>
                        <div className="font-semibold">
                          {selectedProduct.category}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">
                          Sous-catégorie:
                        </span>
                        <div className="font-semibold">
                          {selectedProduct.subcategory}
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-500">Commerçant:</span>
                      <div className="font-semibold">
                        {selectedProduct.merchant.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {selectedProduct.merchant.email}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Note:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-semibold">
                            {selectedProduct.rating}
                          </span>
                          <span className="text-gray-600">
                            ({selectedProduct.reviewCount} avis)
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Ventes:</span>
                        <div className="font-semibold">
                          {selectedProduct.sales}
                        </div>
                      </div>
                    </div>

                    {selectedProduct.status === "pending" && (
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                          Approuver le produit
                        </button>
                        <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                          Rejeter le produit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return <AdminRouteWrapper>{productsContent}</AdminRouteWrapper>;
};

export default AdminProducts;
