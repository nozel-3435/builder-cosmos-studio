import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/supabase";

// Types pour TypeScript
type Tables = Database["public"]["Tables"];
export type Product = Tables["products"]["Row"] & {
  category_name?: string;
  category_icon?: string;
  subcategory_name?: string;
  store_name?: string;
  store_location?: string;
  average_rating?: number;
  review_count?: number;
  favorite_count?: number;
};

export type Category = Tables["categories"]["Row"];
export type Subcategory = Tables["subcategories"]["Row"];
export type Order = Tables["orders"]["Row"];
export type OrderItem = Tables["order_items"]["Row"];
export type Delivery = Tables["deliveries"]["Row"];
export type Review = Tables["reviews"]["Row"];
export type CartItem = Tables["cart_items"]["Row"];
export type Favorite = Tables["favorites"]["Row"];

// ============================================================================
// SERVICES PRODUITS
// ============================================================================

export const productService = {
  // Obtenir tous les produits avec statistiques
  async getProducts(filters?: {
    category?: string;
    subcategory?: string;
    search?: string;
    inStockOnly?: boolean;
    minPrice?: number;
    maxPrice?: number;
    isPopular?: boolean;
    isFeatured?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Product[]> {
    let query = supabase
      .from("products_with_stats")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.category) {
      query = query.ilike("category_name", `%${filters.category}%`);
    }

    if (filters?.subcategory) {
      query = query.ilike("subcategory_name", `%${filters.subcategory}%`);
    }

    if (filters?.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`,
      );
    }

    if (filters?.inStockOnly) {
      query = query.eq("in_stock", true);
    }

    if (filters?.minPrice) {
      query = query.gte("price", filters.minPrice);
    }

    if (filters?.maxPrice) {
      query = query.lte("price", filters.maxPrice);
    }

    if (filters?.isPopular) {
      query = query.eq("is_popular", true);
    }

    if (filters?.isFeatured) {
      query = query.eq("is_featured", true);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(
        filters.offset,
        filters.offset + (filters.limit || 10) - 1,
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Erreur lors de la récupération des produits:", error);
      throw error;
    }

    return data || [];
  },

  // Obtenir un produit par ID
  async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from("products_with_stats")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Erreur lors de la récupération du produit:", error);
      return null;
    }

    return data;
  },

  // Recherche de produits
  async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabase.rpc("search_products", {
      search_query: query,
    });

    if (error) {
      console.error("Erreur lors de la recherche:", error);
      throw error;
    }

    return data || [];
  },

  // Obtenir les produits populaires
  async getPopularProducts(limit: number = 10): Promise<Product[]> {
    return this.getProducts({
      isPopular: true,
      inStockOnly: true,
      limit,
    });
  },

  // Obtenir les produits en vedette
  async getFeaturedProducts(limit: number = 10): Promise<Product[]> {
    return this.getProducts({
      isFeatured: true,
      inStockOnly: true,
      limit,
    });
  },

  // Créer un produit (commerçants)
  async createProduct(
    productData: Tables["products"]["Insert"],
  ): Promise<Product> {
    const { data, error } = await supabase
      .from("products")
      .insert(productData)
      .select()
      .single();

    if (error) {
      console.error("Erreur lors de la création du produit:", error);
      throw error;
    }

    return data;
  },

  // Mettre à jour un produit
  async updateProduct(
    id: string,
    updates: Tables["products"]["Update"],
  ): Promise<Product> {
    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Erreur lors de la mise à jour du produit:", error);
      throw error;
    }

    return data;
  },

  // Supprimer un produit
  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Erreur lors de la suppression du produit:", error);
      throw error;
    }
  },
};

// ============================================================================
// SERVICES CATÉGORIES
// ============================================================================

export const categoryService = {
  // Obtenir toutes les catégories
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
      throw error;
    }

    return data || [];
  },

  // Obtenir les sous-catégories d'une catégorie
  async getSubcategories(categoryId: string): Promise<Subcategory[]> {
    const { data, error } = await supabase
      .from("subcategories")
      .select("*")
      .eq("category_id", categoryId)
      .order("name");

    if (error) {
      console.error(
        "Erreur lors de la récupération des sous-catégories:",
        error,
      );
      throw error;
    }

    return data || [];
  },
};

// ============================================================================
// SERVICES PANIER
// ============================================================================

export const cartService = {
  // Obtenir le panier de l'utilisateur
  async getCartItems(
    userId: string,
  ): Promise<(CartItem & { product: Product })[]> {
    const { data, error } = await supabase
      .from("cart_items")
      .select(
        `
        *,
        product:products_with_stats(*)
      `,
      )
      .eq("customer_id", userId);

    if (error) {
      console.error("Erreur lors de la récupération du panier:", error);
      throw error;
    }

    return data || [];
  },

  // Ajouter un article au panier
  async addToCart(
    userId: string,
    productId: string,
    quantity: number = 1,
  ): Promise<CartItem> {
    // Vérifier si l'article existe déjà
    const { data: existing } = await supabase
      .from("cart_items")
      .select("*")
      .eq("customer_id", userId)
      .eq("product_id", productId)
      .single();

    if (existing) {
      // Mettre à jour la quantité
      return this.updateCartItemQuantity(
        existing.id,
        existing.quantity + quantity,
      );
    }

    // Ajouter nouvel article
    const { data, error } = await supabase
      .from("cart_items")
      .insert({
        customer_id: userId,
        product_id: productId,
        quantity,
      })
      .select()
      .single();

    if (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      throw error;
    }

    return data;
  },

  // Mettre à jour la quantité d'un article
  async updateCartItemQuantity(
    itemId: string,
    quantity: number,
  ): Promise<CartItem> {
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", itemId)
      .select()
      .single();

    if (error) {
      console.error("Erreur lors de la mise à jour de la quantité:", error);
      throw error;
    }

    return data;
  },

  // Supprimer un article du panier
  async removeFromCart(itemId: string): Promise<void> {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", itemId);

    if (error) {
      console.error("Erreur lors de la suppression du panier:", error);
      throw error;
    }
  },

  // Vider le panier
  async clearCart(userId: string): Promise<void> {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("customer_id", userId);

    if (error) {
      console.error("Erreur lors du vidage du panier:", error);
      throw error;
    }
  },
};

// ============================================================================
// SERVICES FAVORIS
// ============================================================================

export const favoriteService = {
  // Obtenir les favoris de l'utilisateur
  async getFavorites(
    userId: string,
  ): Promise<(Favorite & { product: Product })[]> {
    const { data, error } = await supabase
      .from("favorites")
      .select(
        `
        *,
        product:products_with_stats(*)
      `,
      )
      .eq("customer_id", userId);

    if (error) {
      console.error("Erreur lors de la récupération des favoris:", error);
      throw error;
    }

    return data || [];
  },

  // Ajouter aux favoris
  async addToFavorites(userId: string, productId: string): Promise<Favorite> {
    const { data, error } = await supabase
      .from("favorites")
      .insert({
        customer_id: userId,
        product_id: productId,
      })
      .select()
      .single();

    if (error) {
      console.error("Erreur lors de l'ajout aux favoris:", error);
      throw error;
    }

    return data;
  },

  // Supprimer des favoris
  async removeFromFavorites(userId: string, productId: string): Promise<void> {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("customer_id", userId)
      .eq("product_id", productId);

    if (error) {
      console.error("Erreur lors de la suppression des favoris:", error);
      throw error;
    }
  },

  // Vérifier si un produit est en favori
  async isFavorite(userId: string, productId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from("favorites")
      .select("id")
      .eq("customer_id", userId)
      .eq("product_id", productId)
      .single();

    return data !== null && !error;
  },
};

// ============================================================================
// SERVICES COMMANDES
// ============================================================================

export const orderService = {
  // Créer une commande
  async createOrder(orderData: {
    customer_id: string;
    items: Array<{ product_id: string; quantity: number; unit_price: number }>;
    delivery_address: string;
    delivery_phone: string;
    delivery_instructions?: string;
    payment_method: "tmoney" | "flooz" | "card" | "cash";
    delivery_fee: number;
  }): Promise<Order> {
    // Calculer le total
    const subtotal = orderData.items.reduce(
      (sum, item) => sum + item.quantity * item.unit_price,
      0,
    );
    const total = subtotal + orderData.delivery_fee;

    // Créer la commande
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_id: orderData.customer_id,
        total_amount: total,
        payment_method: orderData.payment_method,
        delivery_address: orderData.delivery_address,
        delivery_phone: orderData.delivery_phone,
        delivery_instructions: orderData.delivery_instructions,
        delivery_fee: orderData.delivery_fee,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Erreur lors de la création de la commande:", orderError);
      throw orderError;
    }

    // Ajouter les articles de commande
    const orderItems = orderData.items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.quantity * item.unit_price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error(
        "Erreur lors de l'ajout des articles de commande:",
        itemsError,
      );
      throw itemsError;
    }

    // Créer la livraison
    const { error: deliveryError } = await supabase.from("deliveries").insert({
      order_id: order.id,
      pickup_address: "Adresse du commerçant", // À adapter selon le commerçant
      delivery_address: orderData.delivery_address,
      delivery_fee: orderData.delivery_fee,
      driver_commission: orderData.delivery_fee * 0.7, // 70% pour le livreur
    });

    if (deliveryError) {
      console.error(
        "Erreur lors de la création de la livraison:",
        deliveryError,
      );
      throw deliveryError;
    }

    return order;
  },

  // Obtenir les commandes d'un utilisateur
  async getUserOrders(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("customer_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erreur lors de la récupération des commandes:", error);
      throw error;
    }

    return data || [];
  },

  // Obtenir une commande avec ses articles
  async getOrderWithItems(orderId: string) {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          *,
          product:products(*)
        )
      `,
      )
      .eq("id", orderId)
      .single();

    if (error) {
      console.error("Erreur lors de la récupération de la commande:", error);
      throw error;
    }

    return data;
  },

  // Mettre à jour le statut d'une commande
  async updateOrderStatus(
    orderId: string,
    status: Database["public"]["Tables"]["orders"]["Row"]["status"],
  ): Promise<Order> {
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId)
      .select()
      .single();

    if (error) {
      console.error(
        "Erreur lors de la mise à jour du statut de commande:",
        error,
      );
      throw error;
    }

    return data;
  },
};

// ============================================================================
// SERVICES LIVRAISONS
// ============================================================================

export const deliveryService = {
  // Obtenir les livraisons disponibles
  async getAvailableDeliveries(): Promise<Delivery[]> {
    const { data, error } = await supabase
      .from("deliveries")
      .select("*")
      .eq("status", "pending")
      .is("driver_id", null)
      .order("created_at");

    if (error) {
      console.error(
        "Erreur lors de la récupération des livraisons disponibles:",
        error,
      );
      throw error;
    }

    return data || [];
  },

  // Obtenir les livraisons d'un livreur
  async getDriverDeliveries(
    driverId: string,
    status?: string,
  ): Promise<Delivery[]> {
    let query = supabase
      .from("deliveries")
      .select("*")
      .eq("driver_id", driverId);

    if (status) {
      query = query.eq("status", status);
    }

    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error(
        "Erreur lors de la récupération des livraisons du livreur:",
        error,
      );
      throw error;
    }

    return data || [];
  },

  // Assigner une livraison à un livreur
  async assignDelivery(
    deliveryId: string,
    driverId: string,
  ): Promise<Delivery> {
    const { data, error } = await supabase
      .from("deliveries")
      .update({
        driver_id: driverId,
        status: "assigned",
      })
      .eq("id", deliveryId)
      .select()
      .single();

    if (error) {
      console.error("Erreur lors de l'assignation de la livraison:", error);
      throw error;
    }

    return data;
  },

  // Mettre à jour le statut d'une livraison
  async updateDeliveryStatus(
    deliveryId: string,
    status: Database["public"]["Tables"]["deliveries"]["Row"]["status"],
    additionalData?: {
      pickup_time?: string;
      delivery_time?: string;
      notes?: string;
    },
  ): Promise<Delivery> {
    const updateData: any = { status };

    if (additionalData?.pickup_time) {
      updateData.pickup_time = additionalData.pickup_time;
    }

    if (additionalData?.delivery_time) {
      updateData.delivery_time = additionalData.delivery_time;
    }

    if (additionalData?.notes) {
      updateData.notes = additionalData.notes;
    }

    const { data, error } = await supabase
      .from("deliveries")
      .update(updateData)
      .eq("id", deliveryId)
      .select()
      .single();

    if (error) {
      console.error(
        "Erreur lors de la mise à jour du statut de livraison:",
        error,
      );
      throw error;
    }

    return data;
  },
};

// ============================================================================
// SERVICES AVIS
// ============================================================================

export const reviewService = {
  // Obtenir les avis d'un produit
  async getProductReviews(productId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from("reviews")
      .select(
        `
        *,
        customer:profiles(full_name, avatar_url)
      `,
      )
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erreur lors de la récupération des avis:", error);
      throw error;
    }

    return data || [];
  },

  // Ajouter un avis
  async addReview(
    productId: string,
    customerId: string,
    rating: number,
    comment?: string,
  ): Promise<Review> {
    const { data, error } = await supabase
      .from("reviews")
      .insert({
        product_id: productId,
        customer_id: customerId,
        rating,
        comment,
      })
      .select()
      .single();

    if (error) {
      console.error("Erreur lors de l'ajout de l'avis:", error);
      throw error;
    }

    return data;
  },

  // Mettre à jour un avis
  async updateReview(
    reviewId: string,
    rating: number,
    comment?: string,
  ): Promise<Review> {
    const { data, error } = await supabase
      .from("reviews")
      .update({ rating, comment })
      .eq("id", reviewId)
      .select()
      .single();

    if (error) {
      console.error("Erreur lors de la mise à jour de l'avis:", error);
      throw error;
    }

    return data;
  },

  // Supprimer un avis
  async deleteReview(reviewId: string): Promise<void> {
    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", reviewId);

    if (error) {
      console.error("Erreur lors de la suppression de l'avis:", error);
      throw error;
    }
  },
};

// ============================================================================
// SERVICES STATISTIQUES
// ============================================================================

export const statsService = {
  // Statistiques commerçant
  async getMerchantStats(merchantId: string) {
    const { data, error } = await supabase
      .from("merchant_stats")
      .select("*")
      .eq("merchant_id", merchantId)
      .single();

    if (error) {
      console.error(
        "Erreur lors de la récupération des statistiques commerçant:",
        error,
      );
      return null;
    }

    return data;
  },

  // Statistiques livreur
  async getDeliveryStats(driverId: string) {
    const { data, error } = await supabase
      .from("delivery_stats")
      .select("*")
      .eq("driver_id", driverId)
      .single();

    if (error) {
      console.error(
        "Erreur lors de la récupération des statistiques livreur:",
        error,
      );
      return null;
    }

    return data;
  },
};
