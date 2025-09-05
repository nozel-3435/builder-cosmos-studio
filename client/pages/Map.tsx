import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KaraMap from "../components/maps/KaraMap";
import MapComponent from "../components/MapComponent";
import {
  MapPin,
  Store,
  Truck,
  Filter,
  Search,
  Grid,
  List,
  Star,
  Clock,
  Navigation,
  Users,
  Plus,
} from "lucide-react";

const Map = () => {
  const [viewMode, setViewMode] = useState<
    "merchants" | "delivery" | "overview" | "interactive"
  >("interactive");
  const navigate = useNavigate();
  const [selectedMerchant, setSelectedMerchant] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [listView, setListView] = useState(false);

  // Sample merchant data for list view
  const merchants = [
    {
      id: 1,
      name: "Boutique Kara Centre",
      category: "Mode & Vêtements",
      address: "Avenue de l'Indépendance, Centre-ville",
      distance: "0.2 km",
      rating: 4.5,
      status: "ouvert",
      deliveryTime: "15-30 min",
    },
    {
      id: 2,
      name: "Marché des Saveurs",
      category: "Alimentation",
      address: "Quartier Kpéwa",
      distance: "1.2 km",
      rating: 4.2,
      status: "ouvert",
      deliveryTime: "20-35 min",
    },
    {
      id: 3,
      name: "Tech Solutions Kara",
      category: "Électronique",
      address: "Zone Commerciale Tchré",
      distance: "2.1 km",
      rating: 4.7,
      status: "fermé",
      deliveryTime: "Non disponible",
    },
    {
      id: 4,
      name: "Pharmacie Ramco",
      category: "Santé & Beauté",
      address: "Carrefour Ramco",
      distance: "1.8 km",
      rating: 4.8,
      status: "ouvert",
      deliveryTime: "10-25 min",
    },
  ];

  const filteredMerchants = merchants.filter(
    (merchant) =>
      merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Carte de Kara
                </h1>
                <p className="text-gray-600">
                  Découvrez les commerçants et services près de vous
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("interactive")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "interactive"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Plus className="h-4 w-4 inline mr-1" />
                  Interactive
                </button>
                <button
                  onClick={() => setViewMode("overview")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "overview"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Vue générale
                </button>
                <button
                  onClick={() => setViewMode("merchants")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "merchants"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Store className="h-4 w-4 inline mr-1" />
                  Commerçants
                </button>
                <button
                  onClick={() => setViewMode("delivery")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "delivery"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Truck className="h-4 w-4 inline mr-1" />
                  Livraisons
                </button>
              </div>

              {/* Layout Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setListView(false)}
                  className={`p-2 rounded-md transition-colors ${
                    !listView
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setListView(true)}
                  className={`p-2 rounded-md transition-colors ${
                    listView
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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          className={`grid ${listView ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-6`}
        >
          {/* Search and Filters */}
          <div className={`${listView ? "order-1" : "order-1"} space-y-4`}>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un commerçant ou une catégorie..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Catégorie
                      </label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                        <option>Toutes</option>
                        <option>Alimentation</option>
                        <option>Mode & Vêtements</option>
                        <option>Électronique</option>
                        <option>Santé & Beauté</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Distance
                      </label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                        <option>Toutes</option>
                        <option>Moins de 1 km</option>
                        <option>1-3 km</option>
                        <option>3-5 km</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Statut
                      </label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                        <option>Tous</option>
                        <option>Ouvert</option>
                        <option>Fermé</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Note
                      </label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                        <option>Toutes</option>
                        <option>4+ étoiles</option>
                        <option>3+ étoiles</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Merchant List (when in list view) */}
            {listView && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900">
                    Commerçants à proximité ({filteredMerchants.length})
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {filteredMerchants.map((merchant) => (
                    <div
                      key={merchant.id}
                      onClick={() => setSelectedMerchant(merchant.id)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedMerchant === merchant.id
                          ? "bg-blue-50 border-r-4 border-blue-500"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium text-gray-900">
                              {merchant.name}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                merchant.status === "ouvert"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {merchant.status === "ouvert"
                                ? "Ouvert"
                                : "Fermé"}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {merchant.category}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Navigation className="h-3 w-3" />
                              <span>{merchant.distance}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span>{merchant.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{merchant.deliveryTime}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          className="ml-4 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/stores");
                          }}
                        >
                          Voir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Map */}
          <div
            className={`${listView ? "order-2" : "order-2"} ${viewMode === "interactive" ? "col-span-full" : ""}`}
          >
            {viewMode === "interactive" ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Carte Interactive LinkaMarket
                    </h2>
                    <p className="text-gray-600">
                      Cliquez sur la carte pour ajouter votre position et
                      découvrir les commerçants, clients et livreurs autour de
                      vous.
                    </p>
                  </div>

                  {/* Filtres rapides pour la carte interactive */}
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-sm font-medium text-gray-700">
                      Afficher :
                    </span>
                    <button
                      onClick={() => setSearchQuery("")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        searchQuery === ""
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Users className="h-4 w-4 inline mr-1" />
                      Tous
                    </button>
                    <button
                      onClick={() => setSearchQuery("merchant")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        searchQuery === "merchant"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Store className="h-4 w-4 inline mr-1" />
                      Commerçants
                    </button>
                    <button
                      onClick={() => setSearchQuery("delivery")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        searchQuery === "delivery"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Truck className="h-4 w-4 inline mr-1" />
                      Livreurs
                    </button>
                    <button
                      onClick={() => setSearchQuery("client")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        searchQuery === "client"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Users className="h-4 w-4 inline mr-1" />
                      Clients
                    </button>
                  </div>
                </div>

                <MapComponent
                  height="650px"
                  center={[9.5511, 1.1901]}
                  zoom={13}
                  showAddButton={true}
                  filterByRole={
                    searchQuery === "merchant"
                      ? "merchant"
                      : searchQuery === "delivery"
                        ? "delivery"
                        : searchQuery === "client"
                          ? "client"
                          : null
                  }
                />
              </div>
            ) : (
              <div className="h-[600px] bg-white rounded-lg shadow-sm overflow-hidden">
                <KaraMap
                  viewMode={viewMode}
                  selectedMerchant={selectedMerchant}
                  showUserLocation={true}
                  onMerchantSelect={setSelectedMerchant}
                />
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Store className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-sm text-gray-600">Commerçants ouverts</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Truck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-sm text-gray-600">Livreurs actifs</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">18 min</p>
                <p className="text-sm text-gray-600">Temps moyen livraison</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Quartiers couverts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
