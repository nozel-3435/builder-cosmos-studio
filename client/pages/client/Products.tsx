import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  products,
  categories,
  searchProducts,
  getProductsByCategory,
  type Product,
} from "@/data/products";
import {
  Search,
  Filter,
  Grid,
  List,
  ShoppingCart,
  Heart,
  Star,
  ChevronDown,
  X,
  SlidersHorizontal,
} from "lucide-react";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    searchParams.get("subcategory") || "all",
  );
  const [priceRange, setPriceRange] = useState({
    min: "",
    max: "",
  });
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filtrer et trier les produits
  const filteredProducts = useMemo(() => {
    let result = products;

    // Recherche par texte
    if (searchQuery.trim()) {
      result = searchProducts(searchQuery);
    }

    // Filtrer par catégorie
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter((product) =>
        product.category.toLowerCase().includes(selectedCategory.toLowerCase()),
      );
    }

    // Filtrer par sous-catégorie
    if (selectedSubcategory && selectedSubcategory !== "all") {
      result = result.filter((product) =>
        product.subcategory
          ?.toLowerCase()
          .includes(selectedSubcategory.toLowerCase()),
      );
    }

    // Filtrer par prix
    if (priceRange.min) {
      result = result.filter(
        (product) => product.price >= parseInt(priceRange.min),
      );
    }
    if (priceRange.max) {
      result = result.filter(
        (product) => product.price <= parseInt(priceRange.max),
      );
    }

    // Filtrer par disponibilité
    if (inStockOnly) {
      result = result.filter((product) => product.inStock);
    }

    // Trier
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "popular":
      default:
        result.sort((a, b) => {
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          return b.reviewCount - a.reviewCount;
        });
        break;
    }

    return result;
  }, [
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    priceRange,
    sortBy,
    inStockOnly,
  ]);

  // Obtenir les sous-catégories pour la catégorie sélectionnée
  const subcategories = useMemo(() => {
    if (selectedCategory === "all") return [];
    const category = categories.find((cat) =>
      cat.name.toLowerCase().includes(selectedCategory.toLowerCase()),
    );
    return category?.subcategories || [];
  }, [selectedCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory("all");
    const params = new URLSearchParams(searchParams);
    if (category !== "all") {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.delete("subcategory");
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedSubcategory("all");
    setPriceRange({ min: "", max: "" });
    setInStockOnly(false);
    setSearchParams({});
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <div
      className={`bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group ${
        viewMode === "list" ? "flex" : ""
      }`}
    >
      <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              viewMode === "list" ? "h-32" : "h-48"
            }`}
          />
          {product.discount && (
            <div className="absolute top-3 left-3 bg-linka-orange text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{product.discount}%
            </div>
          )}
          <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          {product.isPopular && (
            <div className="absolute bottom-3 left-3 bg-linka-green text-white px-2 py-1 rounded-full text-xs font-semibold">
              Populaire
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex-1">
        <div className="mb-2">
          <span className="text-xs text-linka-green font-medium bg-linka-green/10 px-2 py-1 rounded-full">
            {product.subcategory || product.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-card-foreground mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-1">{product.store}</p>
        <p className="text-xs text-muted-foreground/80 mb-3">
          {product.storeLocation}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-linka-green">
              {product.price.toLocaleString()} FCFA
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice.toLocaleString()} FCFA
              </span>
            )}
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-muted-foreground ml-1">
              {product.rating}
            </span>
            <span className="text-xs text-muted-foreground/70 ml-1">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {viewMode === "list" && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        <button
          disabled={!product.inStock}
          className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            product.inStock
              ? "bg-linka-green text-white hover:bg-linka-green/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>
            {product.inStock ? "Ajouter au panier" : "Non disponible"}
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Catalogue de produits
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} produits disponibles
            {selectedCategory !== "all" &&
              ` dans ${categories.find((cat) => cat.id === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Search and Controls */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-input bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-background text-foreground border border-input rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
              >
                <option value="popular">Plus populaires</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="rating">Mieux notés</option>
                <option value="name">Ordre alphabétique</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-linka-green text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-lg ${
                  viewMode === "list"
                    ? "bg-linka-green text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-input bg-background text-foreground rounded-lg hover:bg-muted/50"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filtres</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Catégorie
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full bg-background text-foreground border border-input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-linka-green"
                  >
                    <option value="all">Toutes les catégories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.productCount})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subcategory Filter */}
                {subcategories.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Sous-catégorie
                    </label>
                    <select
                      value={selectedSubcategory}
                      onChange={(e) => setSelectedSubcategory(e.target.value)}
                      className="w-full bg-background text-foreground border border-input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-linka-green"
                    >
                      <option value="all">Toutes</option>
                      {subcategories.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Prix (FCFA)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, min: e.target.value })
                      }
                      className="w-full bg-background text-foreground border border-input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-linka-green"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, max: e.target.value })
                      }
                      className="w-full bg-background text-foreground border border-input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-linka-green"
                    />
                  </div>
                </div>

                {/* Stock Filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Disponibilité
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="rounded border-input text-linka-green focus:ring-linka-green"
                    />
                    <span className="text-sm text-foreground">
                      En stock uniquement
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 px-4 py-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                  <span>Effacer les filtres</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                selectedCategory === "all"
                  ? "border-linka-green bg-linka-green text-white"
                  : "border-gray-300 hover:border-linka-green hover:text-linka-green"
              }`}
            >
              Tous
            </button>
            {categories.slice(0, 8).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                  selectedCategory === category.id
                    ? "border-linka-green bg-linka-green text-white"
                    : "border-gray-300 hover:border-linka-green hover:text-linka-green"
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-linka-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun produit trouvé
            </h2>
            <p className="text-gray-600 mb-6">
              Essayez de modifier vos critères de recherche
            </p>
            <button
              onClick={clearFilters}
              className="bg-linka-green text-white px-6 py-3 rounded-lg hover:bg-linka-green/90 transition-colors"
            >
              Effacer les filtres
            </button>
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
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredProducts.length > 0 && filteredProducts.length >= 20 && (
          <div className="text-center mt-12">
            <button className="bg-linka-green text-white px-8 py-3 rounded-lg hover:bg-linka-green/90 transition-colors">
              Charger plus de produits
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
