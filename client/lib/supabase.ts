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

// Vérifier si on est en mode démonstration
export const isDemoMode =
  !supabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl === "YOUR_SUPABASE_URL" ||
  supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY" ||
  supabaseUrl === defaultUrl;

// Service de démonstration pour les locations
export const demoLocationsService = {
  async select() {
    return {
      data: [
        {
          id: "demo-1",
          role: "merchant",
          name: "Boutique Kara Centre",
          latitude: 9.5511,
          longitude: 1.1901,
          address:
            "Avenue de l'Indépendance, Centre-ville, Kara, Région de la Kara",
          phone: "+228 90 12 34 56",
          description:
            "Vêtements et accessoires de mode. Ouvert 8h-18h du lundi au samedi.",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_id: null,
        },
        {
          id: "demo-2",
          role: "merchant",
          name: "Marché Central Kara",
          latitude: 9.5525,
          longitude: 1.1885,
          address: "Quartier Kpéwa, Commune de Kara",
          phone: "+228 91 23 45 67",
          description:
            "Grand marché traditionnel. Produits locaux, céréales, légumes frais.",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_id: null,
        },
        {
          id: "demo-3",
          role: "merchant",
          name: "Pharmacie Tchré",
          latitude: 9.5495,
          longitude: 1.192,
          address: "Quartier Tchré, Kara",
          phone: "+228 92 34 56 78",
          description:
            "Pharmacie moderne avec garde 24h/24. Médicaments et produits de santé.",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_id: null,
        },
        {
          id: "demo-4",
          role: "merchant",
          name: "Restaurant Savana",
          latitude: 9.554,
          longitude: 1.1875,
          address: "Route de Bassar, Kara",
          phone: "+228 93 45 67 89",
          description:
            "Cuisine togolaise authentique. Spécialités du Nord-Togo.",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_id: null,
        },
        {
          id: "demo-5",
          role: "delivery",
          name: "LinkaDrop Kara",
          latitude: 9.5515,
          longitude: 1.1895,
          address: "Centre-ville, Kara",
          phone: "+228 94 56 78 90",
          description:
            "Service de livraison rapide dans toute la ville de Kara. Moto et vélo.",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_id: null,
        },
        {
          id: "demo-6",
          role: "delivery",
          name: "Express Kara Nord",
          latitude: 9.553,
          longitude: 1.188,
          address: "Quartier Kpéwa, Kara",
          phone: "+228 95 67 89 01",
          description: "Livraison spécialisée pour les quartiers nord de Kara.",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_id: null,
        },
        {
          id: "demo-7",
          role: "client",
          name: "Zone Résidentielle Plateau",
          latitude: 9.5505,
          longitude: 1.191,
          address: "Plateau, Commune de Kara",
          phone: "+228 96 78 90 12",
          description:
            "Zone résidentielle calme avec plusieurs familles actives sur LinkaMarket.",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_id: null,
        },
        {
          id: "demo-8",
          role: "client",
          name: "Quartier Lycée",
          latitude: 9.5485,
          longitude: 1.1925,
          address: "Près du Lycée de Kara, Quartier Tchré",
          phone: "+228 97 89 01 23",
          description:
            "Zone étudiante avec forte demande de livraison et services.",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_id: null,
        },
      ],
      error: null,
    };
  },

  async insert(data: any[]) {
    console.log("Mode démonstration: Simulation d'ajout de location", data);
    return { data: null, error: null };
  },

  async update(data: any) {
    console.log(
      "Mode démonstration: Simulation de mise à jour de location",
      data,
    );
    return { data: null, error: null };
  },
};

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
