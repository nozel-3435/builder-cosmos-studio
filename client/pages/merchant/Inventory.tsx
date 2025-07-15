import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { products } from "@/data/products";
import {
  Package,
  Search,
  Filter,
  Edit3,
  Trash2,
  Plus,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff,
  DollarSign,
  Box,
  Archive,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

interface InventoryItem {
  id: number;
  name: string;
  price: number;
  stockQuantity: number;
  category: string;
  subcategory?: string;
  inStock: boolean;
  isPopular: boolean;
  isFeatured: boolean;
  createdAt: string;
  sales: number;
  views: number;
  image: string;
}

const Inventory = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Simuler les données d'inventaire du commerçant
  const merchantProducts: InventoryItem[] = useMemo(() => {
    return products
      .filter((product) => product.store === user?.businessName)
      .map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        stockQuantity: Math.floor(Math.random() * 100) + 10,
        category: product.category,
        subcategory: product.subcategory,
        inStock: product.inStock,
        isPopular: product.isPopular || false,
        isFeatured: product.isFeatured || false,
        createdAt: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        sales: Math.floor(Math.random() * 200),
        views: Math.floor(Math.random() * 1000) + 100,
        image: product.image,
      }));
  }, [user?.businessName]);

  // Filtrer et trier les produits
  const filteredProducts = useMemo(() => {
    let result = merchantProducts;

    // Recherche
    if (searchQuery.trim()) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filtrer par catégorie
    if (selectedCategory !== "all") {
      result = result.filter((product) =>
        product.category.toLowerCase().includes(selectedCategory.toLowerCase()),
      );
    }

    // Filtrer par statut
    switch (filterBy) {
      case "in-stock":
        result = result.filter((product) => product.inStock);
        break;
      case "out-of-stock":
        result = result.filter((product) => !product.inStock);
        break;
      case "low-stock":
        result = result.filter((product) => product.stockQuantity < 10);
        break;
      case "popular":
        result = result.filter((product) => product.isPopular);
        break;
      case "featured":
        result = result.filter((product) => product.isFeatured);
        break;
    }

    // Trier
    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "stock":
        result.sort((a, b) => b.stockQuantity - a.stockQuantity);
        break;
      case "sales":
        result.sort((a, b) => b.sales - a.sales);
        break;
      case "views":
        result.sort((a, b) => b.views - a.views);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
    }

    return result;
  }, [merchantProducts, searchQuery, selectedCategory, filterBy, sortBy]);

  // Statistiques
  const stats = useMemo(() => {
    const totalProducts = merchantProducts.length;
    const inStockProducts = merchantProducts.filter((p) => p.inStock).length;
    const lowStockProducts = merchantProducts.filter(
      (p) => p.stockQuantity < 10,
    ).length;
    const totalValue = merchantProducts.reduce(
      (sum, p) => sum + p.price * p.stockQuantity,
      0,
    );

    return {
      totalProducts,
      inStockProducts,
      lowStockProducts,
      outOfStockProducts: totalProducts - inStockProducts,
      totalValue,
    };
  }, [merchantProducts]);

  const categories = Array.from(
    new Set(merchantProducts.map((p) => p.category)),
  );

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredProducts.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredProducts.map((p) => p.id));
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedItems.length === 0) {
      toast.error("Aucun produit sélectionné");
      return;
    }

    try {
      switch (action) {
        case "delete":
          if (
            confirm(
              `Êtes-vous sûr de vouloir supprimer ${selectedItems.length} produit(s) ?`,
            )
          ) {
            // Simuler la suppression
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success(`${selectedItems.length} produit(s) supprimé(s)`);
            setSelectedItems([]);
          }
          break;
        case "feature":
          await new Promise((resolve) => setTimeout(resolve, 1000));
          toast.success(`${selectedItems.length} produit(s) mis en vedette`);
          setSelectedItems([]);
          break;
        case "unfeature":
          await new Promise((resolve) => setTimeout(resolve, 1000));
          toast.success(
            `${selectedItems.length} produit(s) retiré(s) de la vedette`,
          );
          setSelectedItems([]);
          break;
        case "hide":
          await new Promise((resolve) => setTimeout(resolve, 1000));
          toast.success(`${selectedItems.length} produit(s) masqué(s)`);
          setSelectedItems([]);
          break;
      }
    } catch (error) {
      toast.error("Erreur lors de l'action groupée");
    }
  };

  const updateStock = async (productId: number, newStock: number) => {
    try {
      // Simuler la mise à jour du stock
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Stock mis à jour");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du stock");
    }
  };

  if (user?.role !== "merchant") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Accès non autorisé
          </h1>
          <p className="text-gray-600">
            Cette page est réservée aux commerçants.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linka-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Package className="w-8 h-8 text-linka-green" />
            <span>Gestion d'inventaire</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Gérez vos produits et votre stock facilement
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total produits</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalProducts}
                </p>
              </div>
              <Box className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En stock</p>
                <p className="text-2xl font-bold text-linka-green">
                  {stats.inStockProducts}
                </p>
              </div>
              <Package className="w-8 h-8 text-linka-green" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stock faible</p>
                <p className="text-2xl font-bold text-linka-orange">
                  {stats.lowStockProducts}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-linka-orange" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rupture</p>
                <p className="text-2xl font-bold text-red-500">
                  {stats.outOfStockProducts}
                </p>
              </div>
              <Archive className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Valeur totale</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalValue.toLocaleString()} F
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-linka-green" />
            </div>
          </div>
        </div>

        {/* Contrôles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
                />
              </div>
            </div>

            {/* Filtres */}
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
              >
                <option value="all">Toutes catégories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
              >
                <option value="all">Tous les statuts</option>
                <option value="in-stock">En stock</option>
                <option value="out-of-stock">Rupture de stock</option>
                <option value="low-stock">Stock faible</option>
                <option value="popular">Populaires</option>
                <option value="featured">En vedette</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green"
              >
                <option value="name">Nom A-Z</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="stock">Stock décroissant</option>
                <option value="sales">Ventes décroissantes</option>
                <option value="views">Vues décroissantes</option>
                <option value="newest">Plus récents</option>
              </select>
            </div>

            <Link
              to="/merchant/add-product"
              className="px-6 py-3 bg-linka-green text-white rounded-lg hover:bg-linka-green/90 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter</span>
            </Link>
          </div>

          {/* Actions groupées */}
          {selectedItems.length > 0 && (
            <div className="mt-4 p-4 bg-linka-green/10 rounded-lg flex items-center justify-between">
              <span className="text-sm text-gray-700">
                {selectedItems.length} produit(s) sélectionné(s)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction("feature")}
                  className="px-3 py-2 bg-linka-green text-white text-sm rounded-lg hover:bg-linka-green/90"
                >
                  Mettre en vedette
                </button>
                <button
                  onClick={() => handleBulkAction("hide")}
                  className="px-3 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600"
                >
                  Masquer
                </button>
                <button
                  onClick={() => handleBulkAction("delete")}
                  className="px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tableau des produits */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedItems.length === filteredProducts.length &&
                        filteredProducts.length > 0
                      }
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-linka-green focus:ring-linka-green"
                    />
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-900">
                    Produit
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-900">
                    Prix
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-900">
                    Stock
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-900">
                    Statut
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-900">
                    Ventes
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-900">
                    Vues
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(product.id)}
                        onChange={() => handleSelectItem(product.id)}
                        className="rounded border-gray-300 text-linka-green focus:ring-linka-green"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.category}
                            {product.subcategory && ` → ${product.subcategory}`}
                          </div>
                          <div className="flex space-x-2 mt-1">
                            {product.isPopular && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Populaire
                              </span>
                            )}
                            {product.isFeatured && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Vedette
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.price.toLocaleString()} FCFA
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={product.stockQuantity}
                          onChange={(e) =>
                            updateStock(product.id, parseInt(e.target.value))
                          }
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-linka-green"
                        />
                        <RefreshCw className="w-4 h-4 text-gray-400 cursor-pointer hover:text-linka-green" />
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          product.inStock
                            ? product.stockQuantity < 10
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.inStock
                          ? product.stockQuantity < 10
                            ? "Stock faible"
                            : "En stock"
                          : "Rupture"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium text-gray-900">
                          {product.sales}
                        </span>
                        {product.sales > 50 ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {product.views}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toast.info("Modification du produit")}
                          className="p-2 text-gray-400 hover:text-linka-green"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toast.info("Voir les statistiques")}
                          className="p-2 text-gray-400 hover:text-blue-500"
                        >
                          <BarChart3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toast.info("Masquer le produit")}
                          className="p-2 text-gray-400 hover:text-yellow-500"
                        >
                          <EyeOff className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            confirm("Supprimer ce produit ?") &&
                            toast.success("Produit supprimé")
                          }
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun produit trouvé
              </h3>
              <p className="text-gray-500 mb-6">
                Modifiez vos critères de recherche ou ajoutez votre premier
                produit.
              </p>
              <Link
                to="/merchant/add-product"
                className="inline-flex items-center space-x-2 bg-linka-green text-white px-6 py-3 rounded-lg hover:bg-linka-green/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un produit</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
