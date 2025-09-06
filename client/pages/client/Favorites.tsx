import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Filter,
  Search,
  Grid,
  List,
  Trash2,
  Eye,
  MapPin,
  Clock,
  Package,
} from "lucide-react";

interface FavoriteProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  merchantName: string;
  merchantLocation: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  addedDate: string;
  discount?: number;
}

const Favorites = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Sample favorite products
  const favoriteProducts: FavoriteProduct[] = [
    {
      id: 1,
      name: "Smartphone Samsung Galaxy A54",
      price: 289000,
      originalPrice: 325000,
      image: "/api/placeholder/300/300",
      category: "Électronique",
      merchantName: "Tech Solutions Kara",
      merchantLocation: "Centre-ville",
      rating: 4.5,
      reviewCount: 24,
      inStock: true,
      addedDate: "2024-01-15",
      discount: 11,
    },
    {
      id: 2,
      name: "Robe Traditionnelle Kente",
      price: 45000,
      image: "/api/placeholder/300/300",
      category: "Mode & Vêtements",
      merchantName: "Boutique Kara Centre",
      merchantLocation: "Kpéwa",
      rating: 4.8,
      reviewCount: 12,
      inStock: true,
      addedDate: "2024-01-10",
    },
    {
      id: 3,
      name: "Huile de Palme Bio 1L",
      price: 3500,
      originalPrice: 4000,
      image: "/api/placeholder/300/300",
      category: "Alimentation",
      merchantName: "Marché des Saveurs",
      merchantLocation: "Tchré",
      rating: 4.3,
      reviewCount: 45,
      inStock: false,
      addedDate: "2024-01-08",
      discount: 12,
    },
    {
      id: 4,
      name: "Produits de Beauté Set",
      price: 25000,
      image: "/api/placeholder/300/300",
      category: "Santé & Beauté",
      merchantName: "Pharmacie Ramco",
      merchantLocation: "Ramco",
      rating: 4.6,
      reviewCount: 18,
      inStock: true,
      addedDate: "2024-01-05",
    },
    {
      id: 5,
      name: "Chaussures de Sport Nike",
      price: 125000,
      originalPrice: 145000,
      image: "/api/placeholder/300/300",
      category: "Mode & Vêtements",
      merchantName: "Sports Store Kara",
      merchantLocation: "Centre-ville",
      rating: 4.4,
      reviewCount: 31,
      inStock: true,
      addedDate: "2024-01-02",
      discount: 14,
    },
    {
      id: 6,
      name: "Ordinateur Portable Dell",
      price: 450000,
      image: "/api/placeholder/300/300",
      category: "Électronique",
      merchantName: "Computer Zone",
      merchantLocation: "Kassena",
      rating: 4.7,
      reviewCount: 9,
      inStock: true,
      addedDate: "2023-12-28",
    },
  ];

  const categories = [
    { value: "all", label: "Toutes les catégories" },
    { value: "Électronique", label: "Électronique" },
    { value: "Mode & Vêtements", label: "Mode & Vêtements" },
    { value: "Alimentation", label: "Alimentation" },
    { value: "Santé & Beauté", label: "Santé & Beauté" },
  ];

  const sortOptions = [
    { value: "recent", label: "Plus récents" },
    { value: "price-low", label: "Prix croissant" },
    { value: "price-high", label: "Prix décroissant" },
    { value: "rating", label: "Mieux notés" },
    { value: "name", label: "Nom A-Z" },
  ];

  // Filter and sort products
  const filteredProducts = favoriteProducts
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "recent":
        default:
          return (
            new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
          );
      }
    });

  const handleSelectItem = (productId: number) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredProducts.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredProducts.map((p) => p.id));
    }
  };

  const handleRemoveSelected = () => {
    setSelectedItems([]);
    // Here you would normally call an API to remove the items
  };

  const requireAuth = (action: string) => {
    if (!user) {
      toast.warning(`Veuillez vous connecter pour ${action}.`);
      const redirect = encodeURIComponent(window.location.pathname + window.location.search);
      navigate(`/login?redirect=${redirect}`);
      return false;
    }
    return true;
  };

  const handleAddToCart = (productId: number) => {
    if (!requireAuth("ajouter au panier")) return;
    toast.success("Produit ajouté au panier");
    console.log(`Added product ${productId} to cart`);
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Heart className="h-6 w-6 text-red-600 fill-current" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Mes Favoris
                </h1>
                <p className="text-gray-600">
                  {favoriteProducts.length} produits sauvegardés
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {selectedItems.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {selectedItems.length} sélectionné(s)
                  </span>
                  <button
                    onClick={handleRemoveSelected}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}

              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
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
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              onClick={handleSelectAll}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {selectedItems.length === filteredProducts.length
                ? "Tout désélectionner"
                : "Tout sélectionner"}
            </button>
          </div>
        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun favori trouvé
            </h3>
            <p className="text-gray-600">
              {searchQuery || selectedCategory !== "all"
                ? "Aucun produit ne correspond à vos critères de recherche."
                : "Vous n'avez pas encore ajouté de produits à vos favoris."}
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                {/* Selection Checkbox */}
                <div className="absolute top-3 left-3 z-10">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(product.id)}
                    onChange={() => handleSelectItem(product.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>

                {/* Product Image */}
                <div
                  className={`relative ${
                    viewMode === "list" ? "w-32 h-32" : "h-48"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.discount && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      -{product.discount}%
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-medium">
                        Stock épuisé
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 line-clamp-2">
                      {product.name}
                    </h3>
                    <button onClick={() => {
                      if (!requireAuth("gérer vos favoris")) return;
                      toast.success("Favori mis à jour");
                    }} className="p-1 text-red-500 hover:bg-red-50 rounded">
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">
                    {product.category}
                  </p>

                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.reviewCount})
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                    <MapPin className="h-3 w-3" />
                    <span>{product.merchantName}</span>
                    <span>•</span>
                    <span>{product.merchantLocation}</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    <Clock className="h-3 w-3 inline mr-1" />
                    Ajouté le {formatDate(product.addedDate)}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={!product.inStock}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        product.inStock
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>
                        {product.inStock ? "Ajouter au panier" : "Indisponible"}
                      </span>
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        {filteredProducts.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium text-gray-900 mb-4">Actions rapides</h3>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => { if (!requireAuth("ajouter au panier")) return; toast.success("Produits ajoutés au panier"); }} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <ShoppingCart className="h-4 w-4" />
                <span>Tout ajouter au panier</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="h-4 w-4" />
                <span>Partager ma liste</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Package className="h-4 w-4" />
                <span>Créer une commande groupée</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
