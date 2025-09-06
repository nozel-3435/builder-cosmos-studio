import React, { useState } from "react";
import { Link } from "react-router-dom";
import KaraMap from "../components/maps/KaraMap";
import {
  Store,
  MapPin,
  Star,
  Clock,
  Phone,
  Filter,
  Search,
  Grid,
  List,
  Shield,
  Truck,
  Heart,
  Eye,
  Navigation,
  Package,
  Users,
  TrendingUp,
  Award,
} from "lucide-react";

interface MerchantStore {
  id: number;
  name: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  image: string;
  banner: string;
  rating: number;
  reviewCount: number;
  totalProducts: number;
  totalOrders: number;
  isVerified: boolean;
  isOpen: boolean;
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  features: string[];
  lat: number;
  lng: number;
  joinDate: string;
  deliveryZones: string[];
  averageDeliveryTime: string;
  minimumOrder?: number;
  deliveryFee: number;
  products?: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
    inStock: boolean;
  }>;
}

const Stores = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [showOnlyOpen, setShowOnlyOpen] = useState(false);
  const [showOnlyVerified, setShowOnlyVerified] = useState(false);

  // Sample merchant stores data
  const merchantStores: MerchantStore[] = [
    {
      id: 1,
      name: "Tech Solutions Kara",
      category: "Électronique",
      description:
        "Votre spécialiste en électronique et informatique à Kara. Smartphones, ordinateurs, accessoires et réparations.",
      address: "Avenue de l'Indépendance, Centre-ville",
      phone: "+228 90 12 34 56",
      email: "contact@techsolutions-kara.tg",
      image: "/api/placeholder/400/300",
      banner: "/api/placeholder/800/300",
      rating: 4.7,
      reviewCount: 156,
      totalProducts: 245,
      totalOrders: 1204,
      isVerified: true,
      isOpen: true,
      lat: 9.5515,
      lng: 1.1812,
      joinDate: "2023-03-15",
      deliveryZones: ["Centre-ville", "Kpéwa", "Tchré"],
      averageDeliveryTime: "25-40 min",
      minimumOrder: 10000,
      deliveryFee: 1500,
      openingHours: {
        monday: "8h00 - 18h00",
        tuesday: "8h00 - 18h00",
        wednesday: "8h00 - 18h00",
        thursday: "8h00 - 18h00",
        friday: "8h00 - 18h00",
        saturday: "9h00 - 17h00",
        sunday: "Fermé",
      },
      features: [
        "Livraison rapide",
        "Garantie produits",
        "Service après-vente",
        "Paiement mobile",
      ],
      products: [
        {
          id: 1,
          name: "Samsung Galaxy A54",
          price: 289000,
          image: "/api/placeholder/100/100",
          inStock: true,
        },
        {
          id: 2,
          name: "iPhone 13",
          price: 450000,
          image: "/api/placeholder/100/100",
          inStock: true,
        },
        {
          id: 3,
          name: "AirPods Pro",
          price: 125000,
          image: "/api/placeholder/100/100",
          inStock: false,
        },
      ],
    },
    {
      id: 2,
      name: "Marché des Saveurs",
      category: "Alimentation",
      description:
        "Produits frais, épices locales et spécialités togolaises. Votre marché de confiance depuis 15 ans.",
      address: "Quartier Kpéwa",
      phone: "+228 91 23 45 67",
      email: "marchesaveurs@gmail.com",
      image: "/api/placeholder/400/300",
      banner: "/api/placeholder/800/300",
      rating: 4.5,
      reviewCount: 89,
      totalProducts: 178,
      totalOrders: 856,
      isVerified: true,
      isOpen: true,
      lat: 9.5625,
      lng: 1.189,
      joinDate: "2023-01-20",
      deliveryZones: ["Kpéwa", "Centre-ville", "Kassena"],
      averageDeliveryTime: "15-30 min",
      deliveryFee: 1000,
      openingHours: {
        monday: "6h00 - 19h00",
        tuesday: "6h00 - 19h00",
        wednesday: "6h00 - 19h00",
        thursday: "6h00 - 19h00",
        friday: "6h00 - 19h00",
        saturday: "6h00 - 20h00",
        sunday: "7h00 - 17h00",
      },
      features: [
        "Produits frais",
        "Livraison même jour",
        "Produits bio",
        "Prix compétitifs",
      ],
    },
    {
      id: 3,
      name: "Boutique Kara Centre",
      category: "Mode & Vêtements",
      description:
        "Mode africaine contemporaine et traditionnelle. Vêtements sur mesure et accessoires de qualité.",
      address: "Place du Marché Central",
      phone: "+228 92 34 56 78",
      email: "boutique.kara.centre@yahoo.fr",
      image: "/api/placeholder/400/300",
      banner: "/api/placeholder/800/300",
      rating: 4.3,
      reviewCount: 67,
      totalProducts: 123,
      totalOrders: 445,
      isVerified: false,
      isOpen: false,
      lat: 9.5445,
      lng: 1.1734,
      joinDate: "2023-06-10",
      deliveryZones: ["Centre-ville", "Tchré"],
      averageDeliveryTime: "30-45 min",
      minimumOrder: 25000,
      deliveryFee: 2000,
      openingHours: {
        monday: "9h00 - 17h00",
        tuesday: "9h00 - 17h00",
        wednesday: "9h00 - 17h00",
        thursday: "9h00 - 17h00",
        friday: "9h00 - 17h00",
        saturday: "10h00 - 16h00",
        sunday: "Fermé",
      },
      features: [
        "Sur mesure",
        "Mode traditionnelle",
        "Accessoires",
        "Conseil style",
      ],
    },
    {
      id: 4,
      name: "Pharmacie Ramco",
      category: "Santé & Beauté",
      description:
        "Votre pharmacie de proximité. Médicaments, produits de beauté et conseils santé personnalisés.",
      address: "Carrefour Ramco",
      phone: "+228 93 45 67 89",
      email: "pharmacie.ramco@gmail.com",
      image: "/api/placeholder/400/300",
      banner: "/api/placeholder/800/300",
      rating: 4.8,
      reviewCount: 234,
      totalProducts: 567,
      totalOrders: 1890,
      isVerified: true,
      isOpen: true,
      lat: 9.538,
      lng: 1.1656,
      joinDate: "2023-02-08",
      deliveryZones: ["Ramco", "Centre-ville", "Kétao"],
      averageDeliveryTime: "20-35 min",
      deliveryFee: 1000,
      openingHours: {
        monday: "7h00 - 20h00",
        tuesday: "7h00 - 20h00",
        wednesday: "7h00 - 20h00",
        thursday: "7h00 - 20h00",
        friday: "7h00 - 20h00",
        saturday: "8h00 - 19h00",
        sunday: "9h00 - 17h00",
      },
      features: [
        "Pharmacien qualifié",
        "Livraison urgente",
        "Conseils gratuits",
        "Ordonnances",
      ],
    },
    {
      id: 5,
      name: "Artisanat Kassena",
      category: "Artisanat Local",
      description:
        "Art et artisanat traditionnel togolais. Sculptures, poteries, textiles et objets décoratifs authentiques.",
      address: "Village Kassena",
      phone: "+228 94 56 78 90",
      email: "artisanat.kassena@tg.com",
      image: "/api/placeholder/400/300",
      banner: "/api/placeholder/800/300",
      rating: 4.6,
      reviewCount: 45,
      totalProducts: 89,
      totalOrders: 178,
      isVerified: true,
      isOpen: true,
      lat: 9.5678,
      lng: 1.1923,
      joinDate: "2023-04-22",
      deliveryZones: ["Kassena", "Agbala", "Centre-ville"],
      averageDeliveryTime: "45-60 min",
      minimumOrder: 15000,
      deliveryFee: 2500,
      openingHours: {
        monday: "8h00 - 17h00",
        tuesday: "8h00 - 17h00",
        wednesday: "8h00 - 17h00",
        thursday: "8h00 - 17h00",
        friday: "8h00 - 17h00",
        saturday: "9h00 - 16h00",
        sunday: "Fermé",
      },
      features: [
        "Produits authentiques",
        "Commandes personnalisées",
        "Livraison soignée",
        "Art local",
      ],
    },
  ];

  const categories = [
    {
      value: "all",
      label: "Toutes les catégories",
      count: merchantStores.length,
    },
    {
      value: "Électronique",
      label: "Électronique",
      count: merchantStores.filter((s) => s.category === "Électronique").length,
    },
    {
      value: "Alimentation",
      label: "Alimentation",
      count: merchantStores.filter((s) => s.category === "Alimentation").length,
    },
    {
      value: "Mode & Vêtements",
      label: "Mode & Vêtements",
      count: merchantStores.filter((s) => s.category === "Mode & Vêtements")
        .length,
    },
    {
      value: "Santé & Beauté",
      label: "Santé & Beauté",
      count: merchantStores.filter((s) => s.category === "Santé & Beauté")
        .length,
    },
    {
      value: "Artisanat Local",
      label: "Artisanat Local",
      count: merchantStores.filter((s) => s.category === "Artisanat Local")
        .length,
    },
  ];

  // Filter stores
  const filteredStores = merchantStores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || store.category === selectedCategory;
    const matchesOpen = !showOnlyOpen || store.isOpen;
    const matchesVerified = !showOnlyVerified || store.isVerified;

    return matchesSearch && matchesCategory && matchesOpen && matchesVerified;
  });

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Store className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Boutiques Partenaires
                </h1>
                <p className="text-gray-600">
                  Découvrez nos {merchantStores.length} commerçants partenaires
                  à Kara
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "list"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "map"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <MapPin className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une boutique..."
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
                  {category.label} ({category.count})
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showOnlyOpen}
                  onChange={(e) => setShowOnlyOpen(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Ouvert</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showOnlyVerified}
                  onChange={(e) => setShowOnlyVerified(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Certifié</span>
              </label>
            </div>
          </div>

          {/* Category Quick Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.slice(1).map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {viewMode === "map" ? (
          <div
            className="bg-white rounded-lg shadow-sm overflow-hidden"
            style={{ height: "600px" }}
          >
            <KaraMap
              viewMode="merchants"
              selectedMerchant={selectedStore}
              showUserLocation={true}
              onMerchantSelect={setSelectedStore}
            />
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
            }
          >
            {filteredStores.map((store) => (
              <div
                key={store.id}
                className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                {/* Store Image */}
                <div
                  className={`relative ${
                    viewMode === "list" ? "w-64 h-48" : "h-48"
                  }`}
                >
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex space-x-2">
                    {store.isVerified && (
                      <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <Shield className="h-3 w-3" />
                        <span>Certifié</span>
                      </div>
                    )}
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        store.isOpen
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {store.isOpen ? "Ouvert" : "Fermé"}
                    </div>
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Store Info */}
                <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {store.name}
                      </h3>
                      <p className="text-sm text-blue-600 font-medium">
                        {store.category}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">
                        {store.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({store.reviewCount})
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {store.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{store.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Livraison: {store.averageDeliveryTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Truck className="h-4 w-4" />
                      <span>
                        Frais de livraison: {formatPrice(store.deliveryFee)}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {store.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                    {store.features.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        +{store.features.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Store Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {store.totalProducts}
                      </div>
                      <div className="text-xs text-gray-600">Produits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {store.totalOrders}
                      </div>
                      <div className="text-xs text-gray-600">Commandes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {new Date().getFullYear() -
                          new Date(store.joinDate).getFullYear()}
                        ans
                      </div>
                      <div className="text-xs text-gray-600">Partenaire</div>
                    </div>
                  </div>

                  {/* Sample Products */}
                  {store.products && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Produits populaires
                      </h4>
                      <div className="flex space-x-2">
                        {store.products.slice(0, 3).map((product) => (
                          <div
                            key={product.id}
                            className="flex-1 bg-gray-50 rounded-lg p-2"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-12 object-cover rounded mb-1"
                            />
                            <div className="text-xs text-gray-700 line-clamp-1">
                              {product.name}
                            </div>
                            <div className="text-xs font-bold text-blue-600">
                              {formatPrice(product.price)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Visiter la boutique
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Phone className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Partnership CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Vous êtes commerçant à Kara ?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Rejoignez notre réseau de partenaires et développez votre activité
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Plus de clients</h3>
                <p className="text-sm opacity-90">
                  Accédez à notre base de 50,000+ clients
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Croissance rapide</h3>
                <p className="text-sm opacity-90">
                  +40% de ventes en moyenne pour nos partenaires
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Support dédié</h3>
                <p className="text-sm opacity-90">
                  Formation et accompagnement personnalisé
                </p>
              </div>
            </div>
            <Link to="/register/merchant" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Devenir partenaire
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Store className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {merchantStores.length}
                </p>
                <p className="text-sm text-gray-600">Boutiques</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {merchantStores.filter((s) => s.isVerified).length}
                </p>
                <p className="text-sm text-gray-600">Certifiées</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {merchantStores.filter((s) => s.isOpen).length}
                </p>
                <p className="text-sm text-gray-600">Ouvertes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {merchantStores.reduce(
                    (sum, store) => sum + store.totalProducts,
                    0,
                  )}
                </p>
                <p className="text-sm text-gray-600">Produits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stores;
