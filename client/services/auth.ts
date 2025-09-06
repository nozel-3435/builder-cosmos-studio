import { supabase, type Database } from "@/lib/supabase";

export type UserRole = "client" | "merchant" | "delivery" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  // Role-specific fields
  businessName?: string;
  businessAddress?: string;
  vehicleType?: string;
  deliveryZone?: string;
  emailConfirmed: boolean;
  profileCompleted: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  // Role-specific data
  businessName?: string;
  businessAddress?: string;
  businessDescription?: string;
  vehicleType?: string;
  deliveryZone?: string;
}

export interface LoginResponse {
  user: AuthUser;
  requiresVerification?: boolean;
}

// Demo data for non-Supabase mode
const demoUsers = new Map<string, any>();

export const authService = {
  /**
   * Login user with email/password
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    // Check for admin credentials first
    if (email === "NOZIMA" && password === "TOUT2000@") {
      const adminUser: AuthUser = {
        id: "admin-nozima",
        email: "admin@linkamarket.com",
        name: "NOZIMA",
        role: "admin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
        emailConfirmed: true,
        profileCompleted: true,
      };

      // Store admin session
      sessionStorage.setItem("admin_authenticated", "true");
      sessionStorage.setItem("admin_timestamp", Date.now().toString());
      
      return { user: adminUser };
    }

    if (isDemoMode) {
      // Demo mode fallback
      return this.loginDemo(email, password);
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error("Aucun utilisateur trouvé");
      }

      // Get user profile
      const profile = await this.getUserProfile(data.user.id);
      
      return { 
        user: profile,
        requiresVerification: !data.user.email_confirmed_at 
      };
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Échec de la connexion. Vérifiez vos identifiants.");
    }
  },

  /**
   * Register new user
   */
  async register(userData: RegisterData): Promise<{ user?: AuthUser; requiresVerification: boolean }> {
    if (isDemoMode) {
      return this.registerDemo(userData);
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: `${userData.firstName} ${userData.lastName}`,
            role: userData.role,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error("Erreur lors de la création du compte");
      }

      // Try to create profile; gracefully fallback if schema/policies are missing
      let profile: AuthUser | null = null;
      try {
        profile = await this.createProfile(data.user.id, userData);
      } catch (e: any) {
        console.warn("Profile creation failed, falling back to minimal user:", e?.message || e);
        profile = {
          id: data.user.id,
          email: data.user.email || userData.email,
          name: `${userData.firstName} ${userData.lastName}`.trim(),
          role: userData.role,
          phone: userData.phone,
          businessName: userData.businessName,
          businessAddress: userData.businessAddress,
          vehicleType: userData.vehicleType,
          deliveryZone: userData.deliveryZone,
          emailConfirmed: Boolean(data.user.email_confirmed_at),
          profileCompleted: false,
        };
      }

      return {
        user: profile,
        requiresVerification: !data.user.email_confirmed_at,
      };
    } catch (error: any) {
      console.error("Registration error:", error);
      const msg = typeof error?.message === "string" ? error.message : "Échec de l'inscription. Veuillez réessayer.";
      throw new Error(msg);
    }
  },

  /**
   * Send email verification code
   */
  async sendVerificationCode(email: string): Promise<{ code: string }> {
    if (isDemoMode) {
      // Generate demo code
      const code = Math.random().toString().slice(2, 10); // 8 digits
      localStorage.setItem(`verification_code_${email}`, code);
      console.log(`Demo verification code for ${email}: ${code}`);
      return { code };
    }

    try {
      // In a real implementation, you would send an email with a code
      // For now, we'll generate a code and store it in Supabase
      const code = Math.random().toString().slice(2, 10); // 8 digits
      
      // Store verification code in a custom table or use Supabase functions
      const { error } = await supabase
        .from('verification_codes')
        .upsert({
          email,
          code,
          expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
          used: false
        });

      if (error && !error.message.includes('does not exist')) {
        throw error;
      }

      // In production, send email here
      console.log(`Verification code for ${email}: ${code}`);
      
      return { code };
    } catch (error) {
      console.error("Send verification error:", error);
      throw new Error("Erreur lors de l'envoi du code de vérification");
    }
  },

  /**
   * Verify email with code
   */
  async verifyEmail(email: string, code: string): Promise<boolean> {
    if (isDemoMode) {
      const storedCode = localStorage.getItem(`verification_code_${email}`);
      if (storedCode === code) {
        localStorage.removeItem(`verification_code_${email}`);
        return true;
      }
      return false;
    }

    try {
      // In a real implementation, verify against stored code
      const { data, error } = await supabase
        .from('verification_codes')
        .select('*')
        .eq('email', email)
        .eq('code', code)
        .eq('used', false)
        .single();

      if (error || !data) {
        return false;
      }

      // Check if code has expired
      if (new Date(data.expires_at) < new Date()) {
        return false;
      }

      // Mark code as used
      await supabase
        .from('verification_codes')
        .update({ used: true })
        .eq('id', data.id);

      // Update user email_confirmed_at if auth user exists
      const { data: authUser } = await supabase.auth.getUser();
      if (authUser.user && authUser.user.email === email) {
        // You might need to use Supabase admin functions to update email_confirmed_at
      }

      return true;
    } catch (error) {
      console.error("Verify email error:", error);
      return false;
    }
  },

  /**
   * Reset password
   */
  async resetPassword(email: string): Promise<void> {
    if (isDemoMode) {
      console.log(`Demo password reset for ${email}`);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Reset password error:", error);
      throw new Error("Erreur lors de la réinitialisation du mot de passe");
    }
  },

  /**
   * Update password with reset token
   */
  async updatePassword(newPassword: string): Promise<void> {
    if (isDemoMode) {
      console.log("Demo password update");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Update password error:", error);
      throw new Error("Erreur lors de la mise à jour du mot de passe");
    }
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    // Clear admin session
    sessionStorage.removeItem("admin_authenticated");
    sessionStorage.removeItem("admin_timestamp");
    
    if (isDemoMode) {
      localStorage.removeItem("linka_user");
      return;
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  /**
   * Get current user session
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    if (isDemoMode) {
      const savedUser = localStorage.getItem("linka_user");
      return savedUser ? JSON.parse(savedUser) : null;
    }

    try {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) return null;

      try {
        return await this.getUserProfile(data.user.id);
      } catch (e) {
        const meta: any = data.user.user_metadata || {};
        return {
          id: data.user.id,
          email: data.user.email || "",
          name: meta.full_name || meta.name || "",
          role: (meta.role as UserRole) || "client",
          avatar: meta.avatar_url,
          phone: meta.phone,
          emailConfirmed: Boolean(data.user.email_confirmed_at),
          profileCompleted: false,
        };
      }
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(userId: string, updates: Partial<AuthUser>): Promise<AuthUser> {
    if (isDemoMode) {
      const savedUser = localStorage.getItem("linka_user");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        const updatedUser = { ...user, ...updates };
        localStorage.setItem("linka_user", JSON.stringify(updatedUser));
        return updatedUser;
      }
      throw new Error("Utilisateur non trouvé");
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          full_name: updates.name,
          phone: updates.phone,
          avatar_url: updates.avatar,
          business_name: updates.businessName,
          business_address: updates.businessAddress,
          vehicle_type: updates.vehicleType,
          delivery_zone: updates.deliveryZone,
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return this.mapProfileToAuthUser(data);
    } catch (error) {
      console.error("Update profile error:", error);
      throw new Error("Erreur lors de la mise à jour du profil");
    }
  },

  // Private helper methods
  async getUserProfile(userId: string): Promise<AuthUser> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new Error("Profil utilisateur non trouvé");
    }

    return this.mapProfileToAuthUser(data);
  },

  async createProfile(userId: string, userData: RegisterData): Promise<AuthUser> {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email: userData.email,
        full_name: `${userData.firstName} ${userData.lastName}`,
        role: userData.role,
        phone: userData.phone,
        business_name: userData.businessName,
        business_address: userData.businessAddress,
        business_description: userData.businessDescription,
        vehicle_type: userData.vehicleType,
        delivery_zone: userData.deliveryZone,
      })
      .select()
      .single();

    if (error) {
      throw new Error("Erreur lors de la création du profil");
    }

    return this.mapProfileToAuthUser(data);
  },

  mapProfileToAuthUser(profile: any): AuthUser {
    return {
      id: profile.id,
      email: profile.email,
      name: profile.full_name,
      role: profile.role,
      avatar: profile.avatar_url,
      phone: profile.phone,
      businessName: profile.business_name,
      businessAddress: profile.business_address,
      vehicleType: profile.vehicle_type,
      deliveryZone: profile.delivery_zone,
      emailConfirmed: true, // Assume confirmed if in profiles table
      profileCompleted: !!(profile.full_name && profile.phone),
    };
  },

  async loginDemo(email: string, password: string): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock user data
    const mockUser: AuthUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split("@")[0],
      role: email.includes("merchant") ? "merchant" : 
            email.includes("delivery") ? "delivery" : "client",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      emailConfirmed: true,
      profileCompleted: true,
    };

    demoUsers.set(email, mockUser);
    localStorage.setItem("linka_user", JSON.stringify(mockUser));
    
    return { user: mockUser };
  },

  async registerDemo(userData: RegisterData): Promise<{ user: AuthUser; requiresVerification: boolean }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: AuthUser = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      name: `${userData.firstName} ${userData.lastName}`,
      role: userData.role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
      phone: userData.phone,
      businessName: userData.businessName,
      businessAddress: userData.businessAddress,
      vehicleType: userData.vehicleType,
      deliveryZone: userData.deliveryZone,
      emailConfirmed: false,
      profileCompleted: true,
    };

    demoUsers.set(userData.email, newUser);
    localStorage.setItem("linka_user", JSON.stringify(newUser));
    
    return { 
      user: newUser,
      requiresVerification: true 
    };
  }
};
