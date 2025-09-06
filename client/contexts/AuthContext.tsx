import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authService, type AuthUser, type RegisterData, type UserRole } from "@/services/auth";

export type { UserRole, AuthUser as User };

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ user?: AuthUser; requiresVerification?: boolean }>;
  register: (data: RegisterData) => Promise<{ requiresVerification: boolean; user?: AuthUser }>;
  sendVerificationCode: (email: string) => Promise<{ code: string }>;
  verifyEmail: (email: string, code: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
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
      const result = await authService.login(email, password);
      setUser(result.user);
      return { user: result.user, requiresVerification: result.requiresVerification };
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const result = await authService.register(data);
      if (result.user) {
        setUser(result.user);
      }
      return { requiresVerification: result.requiresVerification };
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationCode = async (email: string) => {
    try {
      return await authService.sendVerificationCode(email);
    } catch (error) {
      throw error;
    }
  };

  const verifyEmail = async (email: string, code: string) => {
    try {
      const verified = await authService.verifyEmail(email, code);
      if (verified && user) {
        // Update user to mark email as verified
        setUser({ ...user, emailConfirmed: true });
      }
      return verified;
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await authService.resetPassword(email);
    } catch (error) {
      throw error;
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      await authService.updatePassword(newPassword);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<AuthUser>) => {
    if (!user) return;

    try {
      const updatedUser = await authService.updateProfile(user.id, data);
      setUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    sendVerificationCode,
    verifyEmail,
    resetPassword,
    updatePassword,
    logout,
    updateProfile,
  };

  // Validate value before providing
  if (!value || typeof value !== "object") {
    console.error("AuthContext value is invalid:", value);
    return <div>AuthContext Error: Please refresh the page</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
