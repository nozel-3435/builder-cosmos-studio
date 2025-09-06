import { supabase, type Database } from "@/lib/supabase";

export type UserRole = "client" | "merchant" | "delivery" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
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

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("Aucun utilisateur trouvé");

    const profile = await this.getUserProfile(data.user.id).catch(() => {
      const meta: any = data.user.user_metadata || {};
      const fallback: AuthUser = {
        id: data.user.id,
        email: data.user.email || email,
        name: meta.full_name || meta.name || email.split("@")[0],
        role: (meta.role as UserRole) || "client",
        avatar: meta.avatar_url,
        phone: meta.phone,
        emailConfirmed: Boolean(data.user.email_confirmed_at),
        profileCompleted: false,
      };
      return fallback;
    });

    return { user: profile, requiresVerification: !data.user.email_confirmed_at };
  },

  async register(userData: RegisterData): Promise<{ user?: AuthUser; requiresVerification: boolean }> {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: { full_name: `${userData.firstName} ${userData.lastName}`, role: userData.role },
      },
    });
    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("Erreur lors de la création du compte");

    let profile: AuthUser | null = null;
    try {
      profile = await this.createProfile(data.user.id, userData);
    } catch (e: any) {
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

    return { user: profile!, requiresVerification: !data.user.email_confirmed_at };
  },

  async sendVerificationCode(email: string): Promise<{ code: string }> {
    const code = Math.random().toString().slice(2, 10);
    const { error } = await supabase.from('verification_codes').upsert({
      email,
      code,
      expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      used: false,
    });
    if (error && !String(error.message).includes('does not exist')) throw error;
    // Send email via provider here in production
    console.log(`Verification code for ${email}: ${code}`);
    return { code };
  },

  async verifyEmail(email: string, code: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('verification_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .eq('used', false)
      .single();
    if (error || !data) return false;
    if (new Date(data.expires_at) < new Date()) return false;
    await supabase.from('verification_codes').update({ used: true }).eq('id', data.id);
    return true;
  },

  async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
    if (error) throw new Error(error.message);
  },

  async updatePassword(newPassword: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw new Error(error.message);
  },

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Logout error:', error);
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return null;
    try {
      return await this.getUserProfile(data.user.id);
    } catch {
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
  },

  async updateProfile(userId: string, updates: Partial<AuthUser>): Promise<AuthUser> {
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
    if (error) throw new Error(error.message);
    return this.mapProfileToAuthUser(data);
  },

  async getUserProfile(userId: string): Promise<AuthUser> {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (error) throw new Error('Profil utilisateur non trouvé');
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
    if (error) throw new Error('Erreur lors de la création du profil');
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
      emailConfirmed: true,
      profileCompleted: !!(profile.full_name && profile.phone),
    };
  },
};
