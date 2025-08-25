import { supabase, isDemoMode } from "@/lib/supabase";
import type { Database } from "@/lib/supabase";

export type Product = Database['public']['Tables']['products']['Row'] & {
  category_name?: string;
  category_icon?: string;
  subcategory_name?: string;
  store_name?: string;
  store_location?: string;
  average_rating?: number;
  review_count?: number;
  favorite_count?: number;
};

export interface ProductFilter {
  category?: string;
  subcategory?: string;
  priceMin?: number;
  priceMax?: number;
  search?: string;
  tags?: string[];
  inStock?: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
  merchantId?: string;
  sortBy?: 'name' | 'price' | 'rating' | 'created_at' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image_url: string;
  gallery_images?: string[];
  category_id: string;
  subcategory_id?: string;
  merchant_id: string;
  in_stock?: boolean;
  stock_quantity?: number;
  tags?: string[];
  is_popular?: boolean;
  is_featured?: boolean;
  discount_percentage?: number;
  weight?: number;
  dimensions?: string;
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string;
}

// Demo data for non-Supabase mode
const demoProducts: Product[] = [
  {
    id: "demo-1",
    name: "Smartphone Samsung Galaxy A54",
    description: "Smartphone dernière génération avec appareil photo 50MP, 128GB de stockage et batterie longue durée.",
    price: 85000,
    original_price: 95000,
    image_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    gallery_images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"],
    category_id: "cat-electronics",
    subcategory_id: "subcat-phones",
    merchant_id: "merchant-1",
    in_stock: true,
    stock_quantity: 15,
    tags: ["smartphone", "samsung", "android", "photo"],
    is_popular: true,
    is_featured: false,
    discount_percentage: 10,
    weight: 0.2,
    dimensions: "15x7x0.8 cm",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category_name: "Électronique",
    category_icon: "📱",
    subcategory_name: "Smartphones",
    store_name: "TechZone Kara",
    store_location: "Centre-ville, Kara",
    average_rating: 4.5,
    review_count: 23,
    favorite_count: 45
  },
  {
    id: "demo-2",
    name: "Riz jasmin parfumé 25kg",
    description: "Riz jasmin de qualité supérieure, importé de Thaïlande. Parfait pour vos repas familiaux.",
    price: 12500,
    image_url: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400",
    category_id: "cat-food",
    subcategory_id: "subcat-cereals",
    merchant_id: "merchant-2",
    in_stock: true,
    stock_quantity: 50,
    tags: ["riz", "céréales", "25kg", "thaïlande"],
    is_popular: true,
    is_featured: true,
    weight: 25,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category_name: "Alimentaire",
    category_icon: "🍽️",
    subcategory_name: "Céréales & Légumineuses",
    store_name: "Marché Central",
    store_location: "Quartier Kpéwa, Kara",
    average_rating: 4.8,
    review_count: 67,
    favorite_count: 89
  },
  {
    id: "demo-3",
    name: "Robe Wax africaine",
    description: "Belle robe en tissu wax authentique, taille unique, parfaite pour les occasions spéciales.",
    price: 15000,
    original_price: 18000,
    image_url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    category_id: "cat-fashion",
    subcategory_id: "subcat-women",
    merchant_id: "merchant-3",
    in_stock: true,
    stock_quantity: 8,
    tags: ["robe", "wax", "africaine", "femme"],
    is_popular: false,
    is_featured: true,
    discount_percentage: 17,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category_name: "Mode & Vêtements",
    category_icon: "👗",
    subcategory_name: "Vêtements Femme",
    store_name: "Boutique Elegance",
    store_location: "Avenue de l'Indépendance, Kara",
    average_rating: 4.3,
    review_count: 12,
    favorite_count: 28
  }
];

const demoCategories = [
  { id: "cat-electronics", name: "Électronique", icon: "📱" },
  { id: "cat-food", name: "Alimentaire", icon: "🍽️" },
  { id: "cat-fashion", name: "Mode & Vêtements", icon: "���" },
  { id: "cat-home", name: "Maison & Décoration", icon: "🏠" },
  { id: "cat-beauty", name: "Santé & Beauté", icon: "💊" }
];

export const productsService = {
  /**
   * Get all products with filters and pagination
   */
  async getProducts(filters: ProductFilter = {}): Promise<{ data: Product[]; count: number }> {
    if (isDemoMode) {
      return this.getProductsDemo(filters);
    }

    try {
      let query = supabase
        .from('products_with_stats')
        .select('*', { count: 'exact' });

      // Apply filters
      if (filters.category) {
        query = query.eq('category_id', filters.category);
      }

      if (filters.subcategory) {
        query = query.eq('subcategory_id', filters.subcategory);
      }

      if (filters.merchantId) {
        query = query.eq('merchant_id', filters.merchantId);
      }

      if (filters.priceMin !== undefined) {
        query = query.gte('price', filters.priceMin);
      }

      if (filters.priceMax !== undefined) {
        query = query.lte('price', filters.priceMax);
      }

      if (filters.inStock !== undefined) {
        query = query.eq('in_stock', filters.inStock);
      }

      if (filters.isPopular !== undefined) {
        query = query.eq('is_popular', filters.isPopular);
      }

      if (filters.isFeatured !== undefined) {
        query = query.eq('is_featured', filters.isFeatured);
      }

      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,tags.cs.{${filters.search}}`);
      }

      if (filters.tags && filters.tags.length > 0) {
        query = query.overlaps('tags', filters.tags);
      }

      // Apply sorting
      if (filters.sortBy) {
        const column = filters.sortBy === 'rating' ? 'average_rating' : filters.sortBy;
        query = query.order(column, { ascending: filters.sortOrder === 'asc' });
      } else {
        // Default sorting: popular first, then by creation date
        query = query.order('is_popular', { ascending: false })
                    .order('created_at', { ascending: false });
      }

      // Apply pagination
      if (filters.limit) {
        query = query.limit(filters.limit);
      }

      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1);
      }

      const { data, error, count } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return { 
        data: data || [], 
        count: count || 0 
      };
    } catch (error) {
      console.error("Get products error:", error);
      throw new Error("Erreur lors de la récupération des produits");
    }
  },

  /**
   * Get a single product by ID
   */
  async getProduct(id: string): Promise<Product | null> {
    if (isDemoMode) {
      return demoProducts.find(p => p.id === id) || null;
    }

    try {
      const { data, error } = await supabase
        .from('products_with_stats')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Product not found
        }
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error("Get product error:", error);
      throw new Error("Erreur lors de la récupération du produit");
    }
  },

  /**
   * Search products with full-text search
   */
  async searchProducts(query: string, filters: Omit<ProductFilter, 'search'> = {}): Promise<{ data: Product[]; count: number }> {
    if (isDemoMode) {
      return this.searchProductsDemo(query, filters);
    }

    try {
      const { data, error } = await supabase
        .rpc('search_products', { search_query: query });

      if (error) {
        throw new Error(error.message);
      }

      // Apply additional filters if needed
      let filteredData = data || [];

      if (filters.category) {
        filteredData = filteredData.filter((p: any) => p.category_id === filters.category);
      }

      if (filters.priceMin !== undefined) {
        filteredData = filteredData.filter((p: any) => p.price >= filters.priceMin!);
      }

      if (filters.priceMax !== undefined) {
        filteredData = filteredData.filter((p: any) => p.price <= filters.priceMax!);
      }

      return { 
        data: filteredData, 
        count: filteredData.length 
      };
    } catch (error) {
      console.error("Search products error:", error);
      throw new Error("Erreur lors de la recherche");
    }
  },

  /**
   * Get products by category
   */
  async getProductsByCategory(categoryId: string, filters: Omit<ProductFilter, 'category'> = {}): Promise<{ data: Product[]; count: number }> {
    return this.getProducts({ ...filters, category: categoryId });
  },

  /**
   * Get popular products
   */
  async getPopularProducts(limit: number = 10): Promise<Product[]> {
    const result = await this.getProducts({ 
      isPopular: true, 
      inStock: true,
      limit,
      sortBy: 'created_at',
      sortOrder: 'desc'
    });
    return result.data;
  },

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    const result = await this.getProducts({ 
      isFeatured: true, 
      inStock: true,
      limit,
      sortBy: 'created_at',
      sortOrder: 'desc'
    });
    return result.data;
  },

  /**
   * Create a new product (for merchants)
   */
  async createProduct(productData: CreateProductData): Promise<Product> {
    if (isDemoMode) {
      const newProduct: Product = {
        ...productData,
        id: `demo-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        average_rating: 0,
        review_count: 0,
        favorite_count: 0
      };
      demoProducts.push(newProduct);
      return newProduct;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error("Create product error:", error);
      throw new Error("Erreur lors de la création du produit");
    }
  },

  /**
   * Update a product
   */
  async updateProduct(updateData: UpdateProductData): Promise<Product> {
    if (isDemoMode) {
      const index = demoProducts.findIndex(p => p.id === updateData.id);
      if (index === -1) {
        throw new Error("Produit non trouvé");
      }
      
      const updatedProduct = {
        ...demoProducts[index],
        ...updateData,
        updated_at: new Date().toISOString()
      };
      demoProducts[index] = updatedProduct;
      return updatedProduct;
    }

    try {
      const { id, ...updates } = updateData;
      
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error("Update product error:", error);
      throw new Error("Erreur lors de la mise à jour du produit");
    }
  },

  /**
   * Delete a product
   */
  async deleteProduct(id: string): Promise<void> {
    if (isDemoMode) {
      const index = demoProducts.findIndex(p => p.id === id);
      if (index !== -1) {
        demoProducts.splice(index, 1);
      }
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Delete product error:", error);
      throw new Error("Erreur lors de la suppression du produit");
    }
  },

  /**
   * Get all categories
   */
  async getCategories(): Promise<Array<{ id: string; name: string; icon: string; description?: string }>> {
    if (isDemoMode) {
      return demoCategories;
    }

    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error("Get categories error:", error);
      throw new Error("Erreur lors de la récupération des catégories");
    }
  },

  /**
   * Get subcategories for a category
   */
  async getSubcategories(categoryId: string): Promise<Array<{ id: string; name: string; category_id: string }>> {
    if (isDemoMode) {
      // Return demo subcategories based on category
      const subcategories = [
        { id: "subcat-phones", name: "Smartphones", category_id: "cat-electronics" },
        { id: "subcat-computers", name: "Ordinateurs", category_id: "cat-electronics" },
        { id: "subcat-cereals", name: "Céréales & Légumineuses", category_id: "cat-food" },
        { id: "subcat-fruits", name: "Fruits & Légumes", category_id: "cat-food" },
        { id: "subcat-women", name: "Vêtements Femme", category_id: "cat-fashion" },
        { id: "subcat-men", name: "Vêtements Homme", category_id: "cat-fashion" }
      ];
      return subcategories.filter(s => s.category_id === categoryId);
    }

    try {
      const { data, error } = await supabase
        .from('subcategories')
        .select('*')
        .eq('category_id', categoryId)
        .order('name');

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error("Get subcategories error:", error);
      throw new Error("Erreur lors de la récupération des sous-catégories");
    }
  },

  // Private helper methods for demo mode
  private getProductsDemo(filters: ProductFilter): { data: Product[]; count: number } {
    let filteredProducts = [...demoProducts];

    // Apply filters
    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => p.category_id === filters.category);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    if (filters.priceMin !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= filters.priceMin!);
    }

    if (filters.priceMax !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= filters.priceMax!);
    }

    if (filters.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.in_stock === filters.inStock);
    }

    if (filters.isPopular !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.is_popular === filters.isPopular);
    }

    if (filters.isFeatured !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.is_featured === filters.isFeatured);
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredProducts.sort((a, b) => {
        const aVal = filters.sortBy === 'rating' ? (a.average_rating || 0) : (a as any)[filters.sortBy!];
        const bVal = filters.sortBy === 'rating' ? (b.average_rating || 0) : (b as any)[filters.sortBy!];
        
        if (filters.sortOrder === 'desc') {
          return bVal > aVal ? 1 : -1;
        }
        return aVal > bVal ? 1 : -1;
      });
    }

    // Apply pagination
    const offset = filters.offset || 0;
    const limit = filters.limit || filteredProducts.length;
    const paginatedProducts = filteredProducts.slice(offset, offset + limit);

    return {
      data: paginatedProducts,
      count: filteredProducts.length
    };
  },

  private searchProductsDemo(query: string, filters: Omit<ProductFilter, 'search'>): { data: Product[]; count: number } {
    return this.getProductsDemo({ ...filters, search: query });
  }
};
