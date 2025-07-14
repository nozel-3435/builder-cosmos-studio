import { useState } from "react";
import { Search, Filter, Grid, List, ShoppingCart, Heart } from "lucide-react";

const Products = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock product data
  const products = [
    {
      id: 1,
      name: "Riz local premium",
      price: 2500,
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300",
      category: "Alimentaire",
      store: "Marché Central",
      rating: 4.5,
      inStock: true,
    },
    {
      id: 2,
      name: "Smartphone Samsung",
      price: 150000,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300",
      category: "Électronique",
      store: "Tech Store",
      rating: 4.8,
      inStock: true,
    },
    {
      id: 3,
      name: "Robe africaine",
      price: 35000,
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300",
      category: "Mode",
      store: "Fashion Boutique",
      rating: 4.3,
      inStock: false,
    },
  ];

  const categories = [
    "Tous",
    "Alimentaire",
    "Électronique",
    "Mode",
    "Maison",
    "Santé",
    "Sport",
  ];

  return (
    <div className="min-h-screen bg-linka-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tous les produits
          </h1>
          <p className="text-gray-600">
            Découvrez notre large sélection de produits de qualité
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-linka-green text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${
                  viewMode === "list"
                    ? "bg-linka-green text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Button */}
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filtres</span>
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 text-sm rounded-full border border-gray-300 hover:border-linka-green hover:text-linka-green transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full object-cover ${
                    viewMode === "list" ? "h-32" : "h-48"
                  }`}
                />
              </div>

              <div className="p-4 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <button className="text-gray-400 hover:text-red-500">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-2">{product.store}</p>
                <p className="text-xs text-linka-green mb-3">
                  {product.category}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-linka-green">
                    {product.price.toLocaleString()} FCFA
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600 ml-1">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <button
                  disabled={!product.inStock}
                  className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    product.inStock
                      ? "bg-linka-green text-white hover:bg-linka-green/90"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>
                    {product.inStock ? "Ajouter au panier" : "Non disponible"}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-linka-green text-white px-8 py-3 rounded-lg hover:bg-linka-green/90 transition-colors">
            Charger plus de produits
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
