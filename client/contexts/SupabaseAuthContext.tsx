import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";
import { toast } from "sonner";

export type UserRole = "client" | "merchant" | "delivery";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  phone?: string;
  // Champs commerçants
  business_name?: string;
  business_address?: string;
  business_description?: string;
  business_phone?: string;
  // Champs livreurs
  vehicle_type?: string;
  delivery_zone?: string;
  driver_license?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role: UserRole,
    additionalData?: Partial<Profile>,
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const SupabaseAuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger le profil utilisateur
  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Erreur lors du chargement du profil:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Erreur lors du chargement du profil:", error);
      return null;
    }
  };

  // Rafraîchir le profil
  const refreshProfile = async () => {
    if (user) {
      const profileData = await loadProfile(user.id);
      setProfile(profileData);
    }
  };

  // Gérer les changements d'authentification
  useEffect(() => {
    // Obtenir la session initiale
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        loadProfile(session.user.id).then(setProfile);
      }

      setIsLoading(false);
    });

    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const profileData = await loadProfile(session.user.id);
        setProfile(profileData);
      } else {
        setProfile(null);
      }

      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Inscription
  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole,
    additionalData?: Partial<Profile>,
  ) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
            ...additionalData,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Créer ou mettre à jour le profil
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert({
            id: data.user.id,
            email,
            full_name: fullName,
            role,
            ...additionalData,
          })
          .select()
          .single();

        if (profileError) {
          console.error("Erreur lors de la création du profil:", profileError);
        }
      }

      toast.success("Compte créé avec succès ! Vérifiez votre email.");
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error);
      throw new Error(error.message || "Erreur lors de la création du compte");
    } finally {
      setIsLoading(false);
    }
  };

  // Connexion
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast.success("Connexion réussie !");
    } catch (error: any) {
      console.error("Erreur lors de la connexion:", error);
      throw new Error(error.message || "Erreur lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  // Déconnexion
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      toast.success("Déconnexion réussie");
    } catch (error: any) {
      console.error("Erreur lors de la déconnexion:", error);
      toast.error("Erreur lors de la déconnexion");
    }
  };

  // Mettre à jour le profil
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      throw new Error("Utilisateur non connecté");
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setProfile(data);
      toast.success("Profil mis à jour avec succès");
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      throw new Error(
        error.message || "Erreur lors de la mise à jour du profil",
      );
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook pour obtenir le rôle utilisateur facilement
export const useUserRole = () => {
  const { profile } = useAuth();
  return profile?.role || null;
};

// Hook pour vérifier si l'utilisateur a un rôle spécifique
export const useHasRole = (requiredRole: UserRole) => {
  const { profile } = useAuth();
  return profile?.role === requiredRole;
};
