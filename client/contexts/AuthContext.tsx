import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type UserRole = "client" | "merchant" | "delivery" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  // Role-specific fields
  businessName?: string; // For merchants
  businessAddress?: string; // For merchants
  vehicleType?: string; // For delivery drivers
  deliveryZone?: string; // For delivery drivers
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    additionalData?: Partial<User>,
  ) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    console.error("useAuth called outside AuthProvider");
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // Additional safety check to ensure context methods exist
  if (!context || typeof context !== "object") {
    console.error("AuthContext is not an object:", context);
    throw new Error("AuthContext is corrupted. Please refresh the page.");
  }

  if (
    typeof context.login !== "function" ||
    typeof context.logout !== "function"
  ) {
    console.error("AuthContext methods are not properly initialized:", {
      login: typeof context.login,
      logout: typeof context.logout,
      context: context,
    });
    throw new Error("AuthContext is corrupted. Please refresh the page.");
  }

  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem("linka_user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - In real app, this would be replaced with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data based on email for demo
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split("@")[0],
        role: email.includes("merchant")
          ? "merchant"
          : email.includes("delivery")
            ? "delivery"
            : "client",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };

      setUser(mockUser);
      localStorage.setItem("linka_user", JSON.stringify(mockUser));
    } catch (error) {
      throw new Error("Échec de la connexion. Vérifiez vos identifiants.");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    additionalData?: Partial<User>,
  ) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        ...additionalData,
      };

      setUser(newUser);
      localStorage.setItem("linka_user", JSON.stringify(newUser));
    } catch (error) {
      throw new Error("Échec de l'inscription. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("linka_user");
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("linka_user", JSON.stringify(updatedUser));
    } catch (error) {
      throw new Error("Échec de la mise à jour du profil.");
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
