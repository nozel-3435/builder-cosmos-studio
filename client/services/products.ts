import { supabase, type Database } from "@/lib/supabase";

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

export const productsService = {
  async getProducts(filters: ProductFilter = {}): Promise<{ data: Product[]; count: number }> {
    try {
      let query = supabase
        .from('products_with_stats')
        .select('*', { count: 'exact' });

      if (filters.category) query = query.eq('category_id', filters.category);
      if (filters.subcategory) query = query.eq('subcategory_id', filters.subcategory);
      if (filters.merchantId) query = query.eq('merchant_id', filters.merchantId);
      if (filters.priceMin !== undefined) query = query.gte('price', filters.priceMin);
      if (filters.priceMax !== undefined) query = query.lte('price', filters.priceMax);
      if (filters.inStock !== undefined) query = query.eq('in_stock', filters.inStock);
      if (filters.isPopular !== undefined) query = query.eq('is_popular', filters.isPopular);
      if (filters.isFeatured !== undefined) query = query.eq('is_featured', filters.isFeatured);
      if (filters.search) query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,tags.cs.{${filters.search}}`);
      if (filters.tags && filters.tags.length > 0) query = query.overlaps('tags', filters.tags);

      if (filters.sortBy) {
        const column = filters.sortBy === 'rating' ? 'average_rating' : filters.sortBy;
        query = query.order(column, { ascending: filters.sortOrder === 'asc' });
      } else {
        query = query.order('is_popular', { ascending: false }).order('created_at', { ascending: false });
      }

      if (filters.limit) query = query.limit(filters.limit);
      if (filters.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1);

      const { data, error, count } = await query;
      if (error) throw new Error(error.message);

      return { data: (data as any) || [], count: count || 0 };
    } catch (error) {
      console.error('Get products error:', error);
      throw new Error('Erreur lors de la récupération des produits');
    }
  },

  async getProduct(id: string): Promise<Product | null> {
    try {
      const { data, error } = await supabase
        .from('products_with_stats')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if ((error as any).code === 'PGRST116') return null;
        throw new Error(error.message);
      }
      return data as any;
    } catch (error) {
      console.error('Get product error:', error);
      throw new Error('Erreur lors de la récupération du produit');
    }
  },

  async searchProducts(queryText: string, filters: Omit<ProductFilter, 'search'> = {}): Promise<{ data: Product[]; count: number }> {
    try {
      const { data, error } = await supabase.rpc('search_products', { search_query: queryText });
      if (error) throw new Error(error.message);

      let filtered = (data as any[]) || [];
      if (filters.category) filtered = filtered.filter((p: any) => p.category_id === filters.category);
      if (filters.priceMin !== undefined) filtered = filtered.filter((p: any) => p.price >= filters.priceMin!);
      if (filters.priceMax !== undefined) filtered = filtered.filter((p: any) => p.price <= filters.priceMax!);

      return { data: filtered as any, count: filtered.length };
    } catch (error) {
      console.error('Search products error:', error);
      throw new Error('Erreur lors de la recherche');
    }
  },

  async getProductsByCategory(categoryId: string, filters: Omit<ProductFilter, 'category'> = {}): Promise<{ data: Product[]; count: number }> {
    return this.getProducts({ ...filters, category: categoryId });
  },

  async getPopularProducts(limit: number = 10): Promise<Product[]> {
    const result = await this.getProducts({ isPopular: true, inStock: true, limit, sortBy: 'created_at', sortOrder: 'desc' });
    return result.data;
  },

  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    const result = await this.getProducts({ isFeatured: true, inStock: true, limit, sortBy: 'created_at', sortOrder: 'desc' });
    return result.data;
  },

  async createProduct(productData: CreateProductData): Promise<Product> {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data as any;
    } catch (error) {
      console.error('Create product error:', error);
      throw new Error('Erreur lors de la création du produit');
    }
  },

  async updateProduct(updateData: UpdateProductData): Promise<Product> {
    try {
      const { id, ...updates } = updateData;
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data as any;
    } catch (error) {
      console.error('Update product error:', error);
      throw new Error('Erreur lors de la mise à jour du produit');
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw new Error(error.message);
    } catch (error) {
      console.error('Delete product error:', error);
      throw new Error('Erreur lors de la suppression du produit');
    }
  },

  async getCategories(): Promise<Array<{ id: string; name: string; icon: string; description?: string }>> {
    try {
      const { data, error } = await supabase.from('categories').select('*').order('name');
      if (error) throw new Error(error.message);
      return (data as any) || [];
    } catch (error) {
      console.error('Get categories error:', error);
      throw new Error('Erreur lors de la récupération des catégories');
    }
  },

  async getSubcategories(categoryId: string): Promise<Array<{ id: string; name: string; category_id: string }>> {
    try {
      const { data, error } = await supabase
        .from('subcategories')
        .select('*')
        .eq('category_id', categoryId)
        .order('name');
      if (error) throw new Error(error.message);
      return (data as any) || [];
    } catch (error) {
      console.error('Get subcategories error:', error);
      throw new Error('Erreur lors de la récupération des sous-catégories');
    }
  },
};
