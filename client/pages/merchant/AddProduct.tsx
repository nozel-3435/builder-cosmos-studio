import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { categories } from "@/data/products";
import {
  Upload,
  X,
  Plus,
  Package,
  DollarSign,
  Tag,
  Image as ImageIcon,
  Info,
  Save,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  category: string;
  subcategory: string;
  stockQuantity: string;
  weight: string;
  dimensions: string;
  tags: string[];
  images: File[];
  imageUrls: string[];
}

const AddProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    subcategory: "",
    stockQuantity: "",
    weight: "",
    dimensions: "",
    tags: [],
    images: [],
    imageUrls: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  useEffect(() => {
    if (formData.category) {
      const category = categories.find((cat) => cat.id === formData.category);
      setSelectedCategory(category);
      if (category && !category.subcategories.includes(formData.subcategory)) {
        setFormData({ ...formData, subcategory: "" });
      }
    }
  }, [formData.category]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 5) {
      toast.error("Maximum 5 images autorisées");
      return;
    }

    // Créer des URLs temporaires pour prévisualisation
    const newImageUrls = files.map((file) => URL.createObjectURL(file));

    setFormData({
      ...formData,
      images: [...formData.images, ...files],
      imageUrls: [...formData.imageUrls, ...newImageUrls],
    });
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newImageUrls = formData.imageUrls.filter((_, i) => i !== index);

    // Libérer l'URL temporaire
    URL.revokeObjectURL(formData.imageUrls[index]);

    setFormData({
      ...formData,
      images: newImages,
      imageUrls: newImageUrls,
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation
      if (!formData.name.trim()) {
        throw new Error("Le nom du produit est requis");
      }
      if (!formData.description.trim()) {
        throw new Error("La description est requise");
      }
      if (!formData.price || parseFloat(formData.price) <= 0) {
        throw new Error("Le prix doit être supérieur à 0");
      }
      if (!formData.category) {
        throw new Error("La catégorie est requise");
      }
      if (!formData.stockQuantity || parseInt(formData.stockQuantity) < 0) {
        throw new Error("La quantité en stock est requise");
      }
      if (formData.images.length === 0) {
        throw new Error("Au moins une image est requise");
      }

      // Simuler l'upload d'images et la création du produit
      // En production, ici vous uploaderiez les images vers Supabase Storage
      // et créeriez le produit via l'API

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newProduct = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice
          ? parseFloat(formData.originalPrice)
          : undefined,
        category: formData.category,
        subcategory: formData.subcategory || undefined,
        stockQuantity: parseInt(formData.stockQuantity),
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        dimensions: formData.dimensions || undefined,
        tags: formData.tags,
        inStock: parseInt(formData.stockQuantity) > 0,
        isPopular: false,
        isFeatured: false,
        storeLocation: user?.businessAddress || "",
        store: user?.businessName || "Ma Boutique",
        rating: 0,
        reviewCount: 0,
        // En production, ici seraient les vraies URLs des images uploadées
        image: formData.imageUrls[0] || "/placeholder.svg",
        gallery: formData.imageUrls.slice(1),
      };

      console.log("Nouveau produit créé:", newProduct);

      toast.success("Produit ajouté avec succès !");
      navigate("/merchant/products");
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
      toast.error(
        error instanceof Error ? error.message : "Erreur lors de l'ajout",
      );
    } finally {
      setIsLoading(false);
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/merchant")}
            className="flex items-center space-x-2 text-linka-green hover:text-linka-green/80 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au tableau de bord</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Package className="w-8 h-8 text-linka-green" />
            <span>Ajouter un nouveau produit</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Ajoutez vos produits à votre boutique LinkaMarket
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informations de base */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Info className="w-5 h-5" />
              <span>Informations de base</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nom du produit *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                  placeholder="Ex: Riz local premium - Sac 25kg"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                  placeholder="Décrivez votre produit en détail..."
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Catégorie *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedCategory &&
                selectedCategory.subcategories.length > 0 && (
                  <div>
                    <label
                      htmlFor="subcategory"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Sous-catégorie
                    </label>
                    <select
                      id="subcategory"
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                    >
                      <option value="">Sélectionnez une sous-catégorie</option>
                      {selectedCategory.subcategories.map((sub: string) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
            </div>
          </div>

          {/* Prix et stock */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Prix et stock</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Prix de vente (FCFA) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                  placeholder="2500"
                />
              </div>

              <div>
                <label
                  htmlFor="originalPrice"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Prix original (FCFA)
                  <span className="text-xs text-gray-500 ml-2">
                    (pour promotions)
                  </span>
                </label>
                <input
                  type="number"
                  id="originalPrice"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                  placeholder="3000"
                />
              </div>

              <div>
                <label
                  htmlFor="stockQuantity"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Quantité en stock *
                </label>
                <input
                  type="number"
                  id="stockQuantity"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                  placeholder="50"
                />
              </div>

              <div>
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Poids (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  min="0"
                  step="0.001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                  placeholder="25"
                />
              </div>

              <div>
                <label
                  htmlFor="dimensions"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Dimensions
                </label>
                <input
                  type="text"
                  id="dimensions"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                  placeholder="50x30x20 cm"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <ImageIcon className="w-5 h-5" />
              <span>Images du produit</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="images"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">
                        Cliquez pour uploader
                      </span>{" "}
                      ou glissez-déposez
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG ou JPEG (MAX. 5 images)
                    </p>
                  </div>
                  <input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {formData.imageUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {formData.imageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Produit ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-1 left-1 bg-linka-green text-white text-xs px-2 py-1 rounded">
                          Principal
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Tag className="w-5 h-5" />
              <span>Tags de recherche</span>
            </h2>

            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTag())
                  }
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-linka-green focus:border-transparent"
                  placeholder="Ajoutez des mots-clés (ex: bio, local, premium)"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-6 py-3 bg-linka-green text-white rounded-lg hover:bg-linka-green/90 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter</span>
                </button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 bg-linka-green/10 text-linka-green px-3 py-1 rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-linka-green hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/merchant")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-linka-green text-white rounded-lg hover:bg-linka-green/90 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Ajout en cours...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Ajouter le produit</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
