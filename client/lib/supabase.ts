import { createClient } from "@supabase/supabase-js";

// Configuration Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validation des variables d'environnement
if (
  !supabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl === "YOUR_SUPABASE_URL" ||
  supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY"
) {
  console.warn(
    "⚠️ Variables d'environnement Supabase manquantes. Utilisation du mode démonstration.",
  );
}

// Créer le client Supabase avec des valeurs par défaut valides si nécessaire
const defaultUrl = "https://demo.supabase.co"; // URL valide par défaut
const defaultKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDE3NjkzNDIsImV4cCI6MTk1NzM0NTM0Mn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE"; // Clé de démo valide

export const supabase = createClient(
  supabaseUrl && supabaseUrl !== "YOUR_SUPABASE_URL" ? supabaseUrl : defaultUrl,
  supabaseAnonKey && supabaseAnonKey !== "YOUR_SUPABASE_ANON_KEY"
    ? supabaseAnonKey
    : defaultKey,
);

// Types pour TypeScript
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: "client" | "merchant" | "delivery";
          avatar_url?: string;
          phone?: string;
          created_at: string;
          updated_at: string;
          // Champs spécifiques aux commerçants
          business_name?: string;
          business_address?: string;
          business_description?: string;
          business_phone?: string;
          // Champs spécifiques aux livreurs
          vehicle_type?: string;
          delivery_zone?: string;
          driver_license?: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role: "client" | "merchant" | "delivery";
          avatar_url?: string;
          phone?: string;
          business_name?: string;
          business_address?: string;
          business_description?: string;
          business_phone?: string;
          vehicle_type?: string;
          delivery_zone?: string;
          driver_license?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: "client" | "merchant" | "delivery";
          avatar_url?: string;
          phone?: string;
          business_name?: string;
          business_address?: string;
          business_description?: string;
          business_phone?: string;
          vehicle_type?: string;
          delivery_zone?: string;
          driver_license?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          icon: string;
          description?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          icon: string;
          description?: string;
        };
        Update: {
          id?: string;
          name?: string;
          icon?: string;
          description?: string;
        };
      };
      subcategories: {
        Row: {
          id: string;
          name: string;
          category_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category_id: string;
        };
        Update: {
          id?: string;
          name?: string;
          category_id?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          original_price?: number;
          image_url: string;
          gallery_images?: string[];
          category_id: string;
          subcategory_id?: string;
          merchant_id: string;
          in_stock: boolean;
          stock_quantity?: number;
          tags?: string[];
          is_popular: boolean;
          is_featured: boolean;
          discount_percentage?: number;
          weight?: number;
          dimensions?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
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
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          original_price?: number;
          image_url?: string;
          gallery_images?: string[];
          category_id?: string;
          subcategory_id?: string;
          merchant_id?: string;
          in_stock?: boolean;
          stock_quantity?: number;
          tags?: string[];
          is_popular?: boolean;
          is_featured?: boolean;
          discount_percentage?: number;
          weight?: number;
          dimensions?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          customer_id: string;
          total_amount: number;
          status:
            | "pending"
            | "confirmed"
            | "preparing"
            | "ready"
            | "delivering"
            | "delivered"
            | "cancelled";
          payment_method: "tmoney" | "flooz" | "card" | "cash";
          payment_status: "pending" | "paid" | "failed" | "refunded";
          delivery_address: string;
          delivery_phone: string;
          delivery_instructions?: string;
          delivery_fee: number;
          estimated_delivery_time?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          total_amount: number;
          status?:
            | "pending"
            | "confirmed"
            | "preparing"
            | "ready"
            | "delivering"
            | "delivered"
            | "cancelled";
          payment_method: "tmoney" | "flooz" | "card" | "cash";
          payment_status?: "pending" | "paid" | "failed" | "refunded";
          delivery_address: string;
          delivery_phone: string;
          delivery_instructions?: string;
          delivery_fee: number;
          estimated_delivery_time?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          total_amount?: number;
          status?:
            | "pending"
            | "confirmed"
            | "preparing"
            | "ready"
            | "delivering"
            | "delivered"
            | "cancelled";
          payment_method?: "tmoney" | "flooz" | "card" | "cash";
          payment_status?: "pending" | "paid" | "failed" | "refunded";
          delivery_address?: string;
          delivery_phone?: string;
          delivery_instructions?: string;
          delivery_fee?: number;
          estimated_delivery_time?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          unit_price: number;
          total_price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          unit_price: number;
          total_price: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          unit_price?: number;
          total_price?: number;
        };
      };
      deliveries: {
        Row: {
          id: string;
          order_id: string;
          driver_id?: string;
          status:
            | "pending"
            | "assigned"
            | "picked_up"
            | "in_transit"
            | "delivered"
            | "failed";
          pickup_address: string;
          delivery_address: string;
          pickup_time?: string;
          delivery_time?: string;
          delivery_fee: number;
          driver_commission?: number;
          distance_km?: number;
          estimated_duration_minutes?: number;
          notes?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          driver_id?: string;
          status?:
            | "pending"
            | "assigned"
            | "picked_up"
            | "in_transit"
            | "delivered"
            | "failed";
          pickup_address: string;
          delivery_address: string;
          pickup_time?: string;
          delivery_time?: string;
          delivery_fee: number;
          driver_commission?: number;
          distance_km?: number;
          estimated_duration_minutes?: number;
          notes?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          driver_id?: string;
          status?:
            | "pending"
            | "assigned"
            | "picked_up"
            | "in_transit"
            | "delivered"
            | "failed";
          pickup_address?: string;
          delivery_address?: string;
          pickup_time?: string;
          delivery_time?: string;
          delivery_fee?: number;
          driver_commission?: number;
          distance_km?: number;
          estimated_duration_minutes?: number;
          notes?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          customer_id: string;
          rating: number;
          comment?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          customer_id: string;
          rating: number;
          comment?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          customer_id?: string;
          rating?: number;
          comment?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          customer_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          product_id: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          product_id?: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          customer_id: string;
          product_id: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          product_id: string;
          quantity: number;
        };
        Update: {
          id?: string;
          customer_id?: string;
          product_id?: string;
          quantity?: number;
        };
      };
      locations: {
        Row: {
          id: string;
          user_id?: string;
          role: "client" | "merchant" | "delivery";
          name: string;
          latitude: number;
          longitude: number;
          address?: string;
          phone?: string;
          description?: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          role: "client" | "merchant" | "delivery";
          name: string;
          latitude: number;
          longitude: number;
          address?: string;
          phone?: string;
          description?: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: "client" | "merchant" | "delivery";
          name?: string;
          latitude?: number;
          longitude?: number;
          address?: string;
          phone?: string;
          description?: string;
          is_active?: boolean;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
